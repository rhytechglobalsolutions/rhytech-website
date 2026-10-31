
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    if (
      !process.env.RESEND_API_KEY ||
      !process.env.CONTACT_FROM_EMAIL ||
      !process.env.CONTACT_TO_EMAIL
    ) {
      console.error("Contact form email environment variables are missing.");

      return NextResponse.json(
        { message: "The enquiry service is temporarily unavailable." },
        { status: 500 }
      );
    }

    const body = await request.json();

    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const company = String(body.company ?? "").trim();
    const phone = String(body.phone ?? "").trim();
    const service = String(body.service ?? "").trim();
    const message = String(body.message ?? "").trim();
    const website = String(body.website ?? "").trim();

    // Honeypot: silently reject submissions from basic bots.
    if (website) {
      return NextResponse.json({ success: true });
    }

    if (!name || name.length > 100) {
      return NextResponse.json(
        { message: "Please enter a valid name." },
        { status: 400 }
      );
    }

    if (!emailPattern.test(email) || email.length > 254) {
      return NextResponse.json(
        { message: "Please enter a valid email address." },
        { status: 400 }
      );
    }

    if (!service || service.length > 100) {
      return NextResponse.json(
        { message: "Please select a service." },
        { status: 400 }
      );
    }

    if (message.length < 10 || message.length > 5000) {
      return NextResponse.json(
        { message: "Project details must be between 10 and 5000 characters." },
        { status: 400 }
      );
    }

    if (company.length > 150 || phone.length > 50) {
      return NextResponse.json(
        { message: "Please check your company or phone details." },
        { status: 400 }
      );
    }

    const { data, error } = await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL,
      to: [process.env.CONTACT_TO_EMAIL],
      replyTo: email,
      subject: `New Website Enquiry: ${service}`,
      text: `
NEW WEBSITE ENQUIRY

Name: ${name}
Email: ${email}
Company: ${company || "Not provided"}
Phone: ${phone || "Not provided"}
Service: ${service}

PROJECT DETAILS:
${message}

---
Sent through the Rhytech Global Solutions contact form.
      `,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:650px;margin:auto;color:#222;">
          <h2 style="color:#4338ca;">New Website Enquiry</h2>
          <p>You have received a new enquiry through your website.</p>

          <table style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:10px;border:1px solid #ddd;"><strong>Name</strong></td>
              <td style="padding:10px;border:1px solid #ddd;">${escapeHtml(name)}</td>
            </tr>
            <tr>
              <td style="padding:10px;border:1px solid #ddd;"><strong>Email</strong></td>
              <td style="padding:10px;border:1px solid #ddd;">${escapeHtml(email)}</td>
            </tr>
            <tr>
              <td style="padding:10px;border:1px solid #ddd;"><strong>Company</strong></td>
              <td style="padding:10px;border:1px solid #ddd;">${escapeHtml(company || "Not provided")}</td>
            </tr>
            <tr>
              <td style="padding:10px;border:1px solid #ddd;"><strong>Phone</strong></td>
              <td style="padding:10px;border:1px solid #ddd;">${escapeHtml(phone || "Not provided")}</td>
            </tr>
            <tr>
              <td style="padding:10px;border:1px solid #ddd;"><strong>Service</strong></td>
              <td style="padding:10px;border:1px solid #ddd;">${escapeHtml(service)}</td>
            </tr>
          </table>

          <h3>Project Details</h3>
          <p style="white-space:pre-wrap;line-height:1.6;">${escapeHtml(message)}</p>

          <hr style="border:none;border-top:1px solid #ddd;margin:25px 0;" />
          <small>Sent through the Rhytech Global Solutions contact form.</small>
        </div>
      `,
    });

    if (error) {
      console.error("Resend email error:", error);

      return NextResponse.json(
        { message: "We couldn't send your enquiry. Please try again." },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Your enquiry has been sent successfully.",
      id: data?.id,
    });
  } catch (error) {
    console.error("Contact API error:", error);

    return NextResponse.json(
      { message: "Something went wrong. Please try again later." },
      { status: 500 }
    );
  }
}

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };

    return entities[character];
  });
}
