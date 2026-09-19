import { NextRequest, NextResponse } from "next/server";
import { getIyzico } from "@/lib/iyzico";

export async function POST(req: NextRequest) {
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ||
    req.headers.get("origin") ||
    "http://localhost:3000";

  let token: string | null = null;

  try {
    const formData = await req.formData();
    token = formData.get("token") as string | null;
  } catch {
    return NextResponse.redirect(`${origin}?durum=kapora-hatasi`);
  }

  if (!token) {
    return NextResponse.redirect(`${origin}?durum=kapora-hatasi`);
  }

  const iyzico = getIyzico();

  return new Promise<NextResponse>((resolve) => {
    iyzico.checkoutFormResult.retrieve({ token: token! }, (err, result) => {
      // basketId formatı: KAPORA-{slug}-{timestamp}
      const slug = result?.basketId?.split("-")[1] ?? "";
      const base = slug ? `${origin}/koleksiyon/${slug}` : origin;

      if (!err && result?.paymentStatus === "SUCCESS") {
        resolve(NextResponse.redirect(`${base}?durum=kapora-alindi`));
      } else {
        console.error("iyzico callback hatası:", err ?? result);
        resolve(NextResponse.redirect(`${base}?durum=kapora-hatasi`));
      }
    });
  });
}
