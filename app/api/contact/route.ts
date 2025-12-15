import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const MAX_BODY_SIZE = 5000;
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 2000;
const DEFAULT_SMTP_PORT = 587;

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function badRequest(message: string): NextResponse {
  return NextResponse.json({ ok: false, message }, { status: 400 });
}

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  message?: unknown;
}

export async function POST(request: Request) {
  const {
    SMTP_HOST,
    SMTP_PORT,
    SMTP_USER,
    SMTP_PASS,
    SMTP_SECURE,
    CONTACT_FROM,
    CONTACT_TO,
  } = process.env;

  if (
    !SMTP_HOST ||
    !SMTP_PORT ||
    !SMTP_USER ||
    !SMTP_PASS ||
    !CONTACT_FROM ||
    !CONTACT_TO
  ) {
    console.error("Missing SMTP configuration");
    return NextResponse.json(
      { ok: false, message: "Configuration SMTP manquante." },
      { status: 500 },
    );
  }

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
  const name =
    typeof contactData.name === "string" ? contactData.name.trim() : "";
  const email =
    typeof contactData.email === "string" ? contactData.email.trim() : "";
  const message =
    typeof contactData.message === "string" ? contactData.message.trim() : "";

  if (!name || !email || !message) {
    return badRequest("Tous les champs sont requis.");
  }
  if (name.length > MAX_NAME_LENGTH) {
    return badRequest("Nom trop long.");
  }
  if (email.length > MAX_EMAIL_LENGTH || !isValidEmail(email)) {
    return badRequest("Email invalide.");
  }
  if (message.length > MAX_MESSAGE_LENGTH) {
    return badRequest("Message trop long.");
  }

  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || DEFAULT_SMTP_PORT,
    secure: SMTP_SECURE === "true" || SMTP_SECURE === "1",
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS,
    },
  });

  const html = `
    <p><strong>Nom :</strong> ${name}</p>
    <p><strong>Email :</strong> ${email}</p>
    <p><strong>Message :</strong></p>
    <p>${message.replace(/\n/g, "<br />")}</p>
  `;

  try {
    await transporter.sendMail({
      from: CONTACT_FROM,
      to: CONTACT_TO,
      replyTo: email,
      subject: `Nouveau message de ${name}`,
      text: `Nom: ${name}\nEmail: ${email}\n\n${message}`,
      html,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Erreur envoi email contact", error);
    return NextResponse.json(
      { ok: false, message: "Erreur lors de l'envoi du message." },
      { status: 500 },
    );
  }
}




