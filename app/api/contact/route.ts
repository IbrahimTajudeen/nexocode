import { NextResponse } from "next/server"
import { Resend } from "resend"
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  ""

const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, subject, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Please fill in all required fields (Name, Email, Message)." },
        { status: 400 }
      )
    }

    const cleanedSubject = subject?.trim() || "New Portfolio Inquiry"
    let supabaseSuccess = false
    let resendSuccess = false
    let resendError = null

    // 1. Store in Supabase database
    if (supabase) {
      const { error: dbError } = await supabase.from("contact_submissions").insert([
        {
          name,
          email,
          subject: cleanedSubject,
          message,
        },
      ])

      if (!dbError) {
        supabaseSuccess = true
      } else {
        console.error("Supabase contact insert error:", dbError)
      }
    }

    // 2. Send Email via Resend
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        const recipientEmail = process.env.CONTACT_EMAIL || "donslice6@gmail.com";
        const fromEmail = process.env.RESEND_FROM_EMAIL || "Nexocode Portfolio <onboarding@resend.dev>";

        const htmlContent = `
          <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 12px; background-color: #ffffff;">
            <div style="border-bottom: 2px solid #06b6d4; padding-bottom: 16px; margin-bottom: 24px;">
              <h2 style="color: #0f172a; margin: 0; font-size: 20px; font-weight: 700;">New Contact Form Message</h2>
              <p style="color: #64748b; font-size: 13px; margin-top: 4px;">Sent from Nexocode Portfolio</p>
            </div>
            
            <div style="margin-bottom: 20px;">
              <p style="font-size: 13px; color: #64748b; margin: 0 0 4px 0; text-transform: uppercase; font-weight: 600;">Sender</p>
              <p style="font-size: 16px; color: #0f172a; margin: 0; font-weight: 600;">${name} &lt;<a href="mailto:${email}" style="color: #0284c7; text-decoration: none;">${email}</a>&gt;</p>
            </div>

            <div style="margin-bottom: 20px;">
              <p style="font-size: 13px; color: #64748b; margin: 0 0 4px 0; text-transform: uppercase; font-weight: 600;">Subject</p>
              <p style="font-size: 15px; color: #0f172a; margin: 0;">${cleanedSubject}</p>
            </div>

            <div style="margin-bottom: 24px; padding: 16px; background-color: #f8fafc; border-radius: 8px; border-left: 4px solid #06b6d4;">
              <p style="font-size: 13px; color: #64748b; margin: 0 0 8px 0; text-transform: uppercase; font-weight: 600;">Message Content</p>
              <p style="font-size: 14px; color: #334155; line-height: 1.6; white-space: pre-wrap; margin: 0;">${message}</p>
            </div>

            <div style="border-top: 1px solid #e2e8f0; pt: 16px; font-size: 12px; color: #94a3b8; text-align: center; margin-top: 24px;">
              <p style="margin: 0;">Nexocode Portfolio Notification • ${new Date().toLocaleString()}</p>
            </div>
          </div>
        `

        const textContent = `
New Contact Message from Portfolio:
------------------------------------
Name: ${name}
Email: ${email}
Subject: ${cleanedSubject}

Message:
${message}

Sent at: ${new Date().toLocaleString()}
        `

        const emailResult = await resend.emails.send({
          from: fromEmail,
          to: [recipientEmail],
          replyTo: email,
          subject: `[Nexocode Inquiry] ${cleanedSubject}`,
          html: htmlContent,
          text: textContent,
        })

        if (emailResult.error) {
          console.error("Resend API error:", emailResult.error)
          resendError = emailResult.error.message
        } else {
          resendSuccess = true
        }
      } catch (err: any) {
        console.error("Resend execution error:", err)
        resendError = err.message || "Failed to dispatch email"
      }
    }

    if (!supabaseSuccess && !resendSuccess && resendError) {
      return NextResponse.json(
        { error: `Failed to deliver message: ${resendError}` },
        { status: 500 }
      )
    }

    return NextResponse.json({
      success: true,
      message: resendSuccess
        ? "Thank you! Your message has been sent to my email and saved to the database."
        : "Thank you! Your message has been saved successfully.",
      resendDelivered: resendSuccess,
      supabaseSaved: supabaseSuccess,
    })
  } catch (error: any) {
    console.error("Contact API route exception:", error)
    return NextResponse.json(
      { error: error.message || "An unexpected error occurred while processing your message." },
      { status: 500 }
    )
  }
}
