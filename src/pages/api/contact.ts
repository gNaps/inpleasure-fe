import type { APIRoute } from "astro";
import { Resend } from "resend";

export interface emailProps {
  name: string;
  email: string;
  message: string;
}

const sendMail = async ({ name, email, message }: emailProps) => {
  const resend = new Resend(import.meta.env.PUBLIC_RESEND_API_KEY);
  resend.emails.send({
    from: "info@gabrielenapoli.dev",
    to: import.meta.env.PUBLIC_MAIL_TO,
    subject: `Hai ricevuto una nuova richiesta da [${name} - ${email}]`,
    html: message,
  });

  console.log('mail inviata !!!')
  console.log('to ', import.meta.env.PUBLIC_MAIL_TO)
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

  await sendMail({name, email, message});

  return new Response(
    JSON.stringify({
      message: "Success!",
    }),
    { status: 200 }
  );
};
