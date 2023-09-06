import type { APIRoute } from "astro";
import { Resend } from "resend";

export interface emailProps {
  name: string;
  email: string;
  message: string;
}

const sendMail = async ({ name, email, message }: emailProps) => {
  console.log('begin send')
  try {
    const res = await fetch(import.meta.env.PUBLIC_SUPABASE_URL, {
      method: "POST",
      body: JSON.stringify({
        to: import.meta.env.PUBLIC_MAIL_TO,
        subject: "inPleasure - Hai ricevuto un nuovo messaggio!",
        html: `Messaggio ricevuto da: <strong>${name} - ${email}</strong> <br><br> ${message}`,
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${import.meta.env.PUBLIC_SUPABASE_TOKEN}`,
      },
    });
    console.log('sended')
  } catch (err) {
    console.log('error', err)
  }
  
};

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { name, email, message } = body;
  if (!name || !email || !message) {
    return new Response(
      JSON.stringify({
        message: "Missing required fields",
      }),
      { status: 400 }
    );
  }

  await sendMail({ name, email, message });

  return new Response(
    JSON.stringify({
      message: "Success!",
    }),
    { status: 200 }
  );
};
