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
      resendDomain: `NexoCode Portfolio <${process.env.RESEND_DOMAIN_EMAIL || null}>`,
      clientEmail: process.env.CLIENT_EMAIL || null,
      apiKey: process.env.RESEND_API_KEY || null,
    };

    // console.log("Email Config:", config);

    if (!config.resendDomain || !config.clientEmail || !config.apiKey) {
      return Response.json(
        { error: "Email configuration is missing" },
        { status: 500 },
      );
    }

    const resend = new Resend(config.apiKey);

    await resend.emails.send({
      from: config.resendDomain,
      to: [config.clientEmail],
      subject: subject,
      html: `
        <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Message</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, Helvetica, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:20px 0;">
    <tr>
      <td align="center">

        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.05);">
          
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg, #6366f1, #8b5cf6); padding:24px; text-align:center;">
              <h2 style="margin:0; color:#ffffff; font-size:22px;">
                📬 New Message from Your Portfolio
              </h2>
            </td>
          </tr>

          <!-- Content -->
          <tr>
            <td style="padding:24px; color:#111827; font-size:15px; line-height:1.6;">
              
              <p style="margin:0 0 12px;">
                You’ve received a new message from your website:
              </p>

              <table width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0;">
                <tr>
                  <td style="padding:8px 0; font-weight:bold; width:80px;">Name:</td>
                  <td style="padding:8px 0;">${name}</td>
                </tr>
                <tr>
                  <td style="padding:8px 0; font-weight:bold;">Email:</td>
                  <td style="padding:8px 0;">
                    <a href="mailto:${email}" style="color:#6366f1; text-decoration:none;">
                      ${email}
                    </a>
                  </td>
                </tr>
              </table>

              <div style="margin-top:16px;">
                <p style="font-weight:bold; margin-bottom:6px;">Message:</p>
                <div style="background:#f9fafb; padding:16px; border-radius:8px; border:1px solid #e5e7eb; white-space:pre-line;">
                  ${message}
                </div>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color:#f9fafb; padding:16px; text-align:center; font-size:12px; color:#6b7280;">
              <p style="margin:0;">
                This message was sent from your portfolio contact form.
              </p>
              <p style="margin:4px 0 0;">
                🚀 Stay awesome.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
      `,
    });

    return Response.json({ success: true });
  } catch (error) {
    console.log(error);
    return Response.json({ error: "Email failed" }, { status: 500 });
  }
}
