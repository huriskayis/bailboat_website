import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { getProduct } from "@/lib/products";

export async function POST(req: NextRequest) {
  if (!process.env.STRIPE_SECRET_KEY) {
    return NextResponse.json(
      { error: "Ödeme yapılandırılmamış. STRIPE_SECRET_KEY ekleyin." },
      { status: 500 }
    );
  }

  let slug: string | undefined;
  try {
    const body = await req.json();
    slug = body.slug;
  } catch {
    return NextResponse.json({ error: "Geçersiz istek." }, { status: 400 });
  }

  const product = slug ? getProduct(slug) : undefined;
  if (!product) {
    return NextResponse.json({ error: "Ürün bulunamadı." }, { status: 404 });
  }

  const origin =
    process.env.NEXT_PUBLIC_SITE_URL ||
    req.headers.get("origin") ||
    "http://localhost:3000";

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: product.priceCents,
            product_data: {
              name: `${product.name} — ${product.klass}`,
              description: `${product.windTr} · Tam boy ${product.lengthM}`,
            },
          },
        },
      ],
      success_url: `${origin}/koleksiyon/${product.slug}?durum=basarili`,
      cancel_url: `${origin}/koleksiyon/${product.slug}?durum=iptal`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Stripe checkout hatası:", err);
    return NextResponse.json(
      { error: "Ödeme oturumu oluşturulamadı." },
      { status: 500 }
    );
  }
}
