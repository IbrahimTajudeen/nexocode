import { Resend } from "resend";
import { NextRequest } from "next/server";

interface EmailConfig {
  resendDomain: string | null;
  clientEmail: string | null;
  apiKey: string | null;
}

interface EmailRequest {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message }: EmailRequest = await req.json();
    const config: EmailConfig = {
        resendDomain: process.env.RESEND_DOMAIN_EMAIL || null,
        clientEmail: process.env.CLIENT_EMAIL || null,
        apiKey: process.env.RESEND_API_KEY || null,
    }

    if (!config.resendDomain || !config.clientEmail || !config.apiKey) {
        return Response.json({ error: "Email configuration is missing" }, { status: 500 });
    }

    const resend = new Resend(config.apiKey);

    await resend.emails.send({
      from: config.resendDomain,
      to: [config.clientEmail],
      subject: subject,
      html: `
        <h2>New Message from your portfolio</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
  console.log(error)
    return Response.json({ error: "Email failed" }, { status: 500 });
  }
}