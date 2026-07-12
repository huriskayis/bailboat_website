import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  let data: Record<string, string> = {};
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  if (!data.name || !data.email || !data.message) {
    return NextResponse.json({ error: "Zorunlu alanlar eksik." }, { status: 400 });
  }

  const { error } = await resend.emails.send({
    from: "VELA Atölye <onboarding@resend.dev>",
    to: "info@velayembotu.com",
    replyTo: data.email,
    subject: `Yeni mesaj: ${data.name}`,
    text: [
      `Ad Soyad: ${data.name}`,
      `E-posta: ${data.email}`,
      `Telefon: ${data.phone ?? "—"}`,
      "",
      data.message,
    ].join("\n"),
  });

  if (error) {
    console.error("Resend hatası:", error);
    return NextResponse.json({ error: "Mesaj gönderilemedi." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
