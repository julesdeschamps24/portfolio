import { NextResponse } from "next/server";
import { HUBSPOT } from "@/lib/constants";

const MAX_BODY_SIZE = 5000;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 2000;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function badRequest(message: string): NextResponse {
  return NextResponse.json({ ok: false, message }, { status: 400 });
}

interface ContactPayload {
  firstname?: unknown;
  lastname?: unknown;
  email?: unknown;
  message?: unknown;
  pageUri?: unknown;
  pageName?: unknown;
  hutk?: unknown;
}

export async function POST(request: Request) {
  const rawBody = await request.text();
  if (rawBody.length > MAX_BODY_SIZE) {
    return badRequest("Requête trop volumineuse.");
  }

  let payload: unknown;
  try {
    payload = JSON.parse(rawBody);
  } catch {
    return badRequest("Corps de requête invalide.");
  }

  const contactData = payload as ContactPayload;
  const firstname =
    typeof contactData.firstname === "string"
      ? contactData.firstname.trim()
      : "";
  const lastname =
    typeof contactData.lastname === "string"
      ? contactData.lastname.trim()
      : "";
  const email =
    typeof contactData.email === "string" ? contactData.email.trim() : "";
  const message =
    typeof contactData.message === "string" ? contactData.message.trim() : "";
  const pageUri =
    typeof contactData.pageUri === "string" ? contactData.pageUri : "";
  const pageName =
    typeof contactData.pageName === "string" ? contactData.pageName : "";
  const hutk =
    typeof contactData.hutk === "string" ? contactData.hutk : null;

  // Validation des champs requis
  if (!firstname || !lastname || !email || !message) {
    return badRequest("Tous les champs sont requis.");
  }
  if (firstname.length > MAX_NAME_LENGTH) {
    return badRequest("Prénom trop long.");
  }
  if (lastname.length > MAX_NAME_LENGTH) {
    return badRequest("Nom trop long.");
  }
  if (email.length > MAX_EMAIL_LENGTH || !isValidEmail(email)) {
    return badRequest("Email invalide.");
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return badRequest("Message trop long.");
  }

  // Construction du payload HubSpot
  const hubspotPayload: {
    fields: Array<{ name: string; value: string }>;
    context: {
      pageUri: string;
      pageName: string;
      hutk?: string;
    };
    // TODO: Si HubSpot requiert un consentement RGPD, ajouter ici :
    // legalConsentOptions: { ... }
  } = {
    fields: [
      { name: HUBSPOT.FIELD_MAPPING.firstname, value: firstname },
      { name: HUBSPOT.FIELD_MAPPING.lastname, value: lastname },
      { name: HUBSPOT.FIELD_MAPPING.email, value: email },
      // TODO: Si le champ "Message" dans HubSpot n'a pas le nom interne "message",
      // modifier HUBSPOT.FIELD_MAPPING.message dans lib/constants.ts avec le nom interne correct
      { name: HUBSPOT.FIELD_MAPPING.message, value: message },
    ],
    context: {
      pageUri,
      pageName,
    },
  };

  // Ajouter le cookie hubspotutk si présent
  if (hutk) {
    hubspotPayload.context.hutk = hutk;
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




