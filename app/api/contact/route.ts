import { NextResponse } from "next/server";
import { Resend } from "resend";

const CONTACT_EMAIL = "gdsupply.ge@gmail.com";
const RESEND_FROM = process.env.RESEND_FROM_EMAIL || "GD Supply <onboarding@resend.dev>";

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const phone = typeof body?.phone === "string" ? body.phone.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim() : "";
  const service = typeof body?.service === "string" ? body.service.trim() : "";
  const area = typeof body?.area === "string" ? body.area.trim() : "";
  const message = typeof body?.message === "string" ? body.message.trim() : "";

  if (!name || !phone || !service) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  if (!resend) {
    return NextResponse.json(
      { error: "Email service not configured (RESEND_API_KEY missing)" },
      { status: 500 },
    );
  }

  try {
    await resend.emails.send({
      from: RESEND_FROM,
      to: [CONTACT_EMAIL],
      subject: `GD Supply - ახალი მოთხოვნა: ${name}`,
      ...(email ? { replyTo: email } : {}),
      text: `სახელი და გვარი: ${name}
ტელეფონი: ${phone}
ელ-ფოსტა: ${email || "-"}
სერვისის სახეობა: ${service}
ობიექტის ფართობი: ${area || "-"}

შეტყობინება:
${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form email send failed", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
