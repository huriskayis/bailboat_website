import { NextRequest, NextResponse } from "next/server";
import { getIyzico } from "@/lib/iyzico";
import { getProduct } from "@/lib/products";

export async function POST(req: NextRequest) {
  let body: {
    slug?: string;
    adet?: number;
    name?: string;
    email?: string;
    phone?: string;
    city?: string;
    address?: string;
  };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const { slug, adet = 1, name = "", email = "", phone = "", city = "", address = "" } = body;

  const product = slug ? getProduct(slug) : undefined;
  if (!product) {
    return NextResponse.json({ error: "Ürün bulunamadı." }, { status: 404 });
  }

  const depositAmount = (product.priceCents / 100).toFixed(2);
  const basketId = `KAPORA-${slug}-${Date.now()}`;
  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ||
    req.headers.get("origin") ||
    "http://localhost:3000";

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "127.0.0.1";

  const nameParts = name.trim().split(" ");
  const buyerName = nameParts[0] || "Ad";
  const buyerSurname = nameParts.slice(1).join(" ") || "Soyad";

  const request = {
    locale: "tr",
    conversationId: basketId,
    price: depositAmount,
    paidPrice: depositAmount,
    currency: "TRY",
    basketId,
    paymentGroup: "PRODUCT",
    callbackUrl: `${origin}/api/kapora/callback`,
    enabledInstallments: [1, 2, 3, 6],
    buyer: {
      id: email || basketId,
      name: buyerName,
      surname: buyerSurname,
      email: email || "musteri@velayembotu.com",
      identityNumber: "11111111110",
      registrationAddress: address || "Belirtilmedi",
      city: city || "Denizli",
      country: "Turkey",
      ip,
      gsmNumber: phone || "+905000000000",
    },
    shippingAddress: {
      contactName: name || "Müşteri",
      city: city || "Denizli",
      country: "Turkey",
      address: address || "Belirtilmedi",
    },
    billingAddress: {
      contactName: name || "Müşteri",
      city: city || "Denizli",
      country: "Turkey",
      address: address || "Belirtilmedi",
    },
    basketItems: [
      {
        id: `KAPORA-${slug}`,
        name: `${product.name} Kapora (${adet} adet)`,
        category1: "Yem Botu",
        itemType: "PHYSICAL",
        price: depositAmount,
      },
    ],
  };

  const iyzico = getIyzico();

  return new Promise<NextResponse>((resolve) => {
    iyzico.checkoutFormInitialize.create(request, (err, result) => {
      if (err || result.status !== "success") {
        console.error("iyzico kapora hatası:", err ?? result);
        resolve(
          NextResponse.json({ error: "Ödeme başlatılamadı." }, { status: 500 })
        );
        return;
      }
      resolve(
        NextResponse.json({
          token: result.token,
          checkoutFormContent: result.checkoutFormContent,
        })
      );
    });
  });
}
