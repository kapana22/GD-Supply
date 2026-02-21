import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const { name, email, phone, service, area, message } = body || {};

  if (!name || !phone || !service || !message) {
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
      from: "GD Supply <info@gdsupply.ge>",
      to: ["info@gdsupply.ge"],
      subject: `GD Supply - ახალი მოთხოვნა: ${name}`,
      ...(email ? { replyTo: email } : {}),
      text: `სახელი და გვარი: ${name}
ტელეფონი: ${phone}
ელ-ფოსტა: ${email || "-"}
სერვისი: ${service}
ფართობი: ${area || "-"}

შეტყობინება:
${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
