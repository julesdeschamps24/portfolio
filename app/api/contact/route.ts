import { NextResponse } from "next/server";
import { HUBSPOT } from "@/lib/constants";
import { z } from "zod";

const MAX_BODY_SIZE = 5000;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 2000;

// Schéma de validation Zod
const contactSchema = z.object({
  firstname: z.string().trim().min(1, "Prénom requis").max(MAX_NAME_LENGTH, "Prénom trop long"),
  lastname: z.string().trim().min(1, "Nom requis").max(MAX_NAME_LENGTH, "Nom trop long"),
  email: z.string().trim().email("Email invalide").max(MAX_EMAIL_LENGTH, "Email trop long"),
  message: z.string().trim().min(1, "Message requis").max(MAX_MESSAGE_LENGTH, "Message trop long"),
  pageUri: z.string().optional().default(""),
  pageName: z.string().optional().default(""),
  hutk: z.string().optional().nullable(),
});

function badRequest(message: string): NextResponse {
  return NextResponse.json({ ok: false, message }, { status: 400 });
}

export async function POST(request: Request) {
  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return badRequest("Impossible de lire le corps de la requête.");
  }

  if (rawBody.length > MAX_BODY_SIZE) {
    return badRequest("Requête trop volumineuse.");
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return badRequest("Corps de requête invalide (JSON attendu).");
  }

  const result = contactSchema.safeParse(payload);

  if (!result.success) {
    // On retourne la première erreur rencontrée pour simplifier le feedback
    const firstError = result.error.issues[0];
    return badRequest(firstError.message);
  }

  const data = result.data;

  // Construction du payload HubSpot
  const hubspotPayload: {
    fields: Array<{ name: string; value: string }>;
    context: {
      pageUri: string;
      pageName: string;
      hutk?: string;
    };
  } = {
    fields: [
      { name: HUBSPOT.FIELD_MAPPING.firstname, value: data.firstname },
      { name: HUBSPOT.FIELD_MAPPING.lastname, value: data.lastname },
      { name: HUBSPOT.FIELD_MAPPING.email, value: data.email },
      { name: HUBSPOT.FIELD_MAPPING.message, value: data.message },
    ],
    context: {
      pageUri: data.pageUri,
      pageName: data.pageName,
    },
  };

  // Ajouter le cookie hubspotutk si présent
  if (data.hutk) {
    hubspotPayload.context.hutk = data.hutk;
  }

  try {
    const response = await fetch(HUBSPOT.ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(hubspotPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Erreur HubSpot Forms API:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });
      return NextResponse.json(
        { ok: false, message: "Échec de l'envoi" },
        { status: 500 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erreur lors de l'envoi vers HubSpot:", error);
    return NextResponse.json(
      { ok: false, message: "Échec de l'envoi" },
      { status: 500 },
    );
  }
}
