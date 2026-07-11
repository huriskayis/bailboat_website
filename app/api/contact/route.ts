import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let data: Record<string, string> = {};
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  if (!data.name || !data.email || !data.message) {
    return NextResponse.json({ error: "Zorunlu alanlar eksik." }, { status: 400 });
  }

  // TODO: Buraya gerçek gönderim eklenecek (ör. Resend ile e-posta veya bir veritabanı).
  // Şimdilik yalnızca sunucu günlüğüne yazıyoruz.
  console.log("Yeni iletişim mesajı:", {
    name: data.name,
    email: data.email,
    phone: data.phone ?? "",
    message: data.message,
    at: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
