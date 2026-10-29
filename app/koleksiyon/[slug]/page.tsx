import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, products, formatPrice } from "@/lib/products";
import { COMPANY } from "@/lib/company";
import ImagePanel from "../../components/ImagePanel";
import MediaCarousel from "../../components/MediaCarousel";
import BuyButton from "../../components/BuyButton";
import WindMark from "../../components/WindMark";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const p = getProduct(slug);
  return {
    title: p ? `${p.name} — ${COMPANY.MARKA}` : COMPANY.MARKA,
    description: p?.tagline,
  };
}

export default async function ProductPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ durum?: string }>;
}) {
  const { slug } = await params;
  const { durum } = await searchParams;
  const p = getProduct(slug);
  if (!p) notFound();

  const priceTL = p.priceCents / 100;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.tagline,
    brand: { "@type": "Brand", name: COMPANY.MARKA },
    offers: {
      "@type": "Offer",
      price: priceTL,
      priceCurrency: "TRY",
      availability: p.inStock
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
      seller: { "@type": "Organization", name: COMPANY.SATICI_UNVAN },
    },
  };

  return (
    <article className="detail">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="wrap">
        <nav className="crumb" aria-label="Konum">
          <Link href="/koleksiyon">Koleksiyon</Link>
          <span>/</span>
          <span>{p.name}</span>
        </nav>

        {durum === "basarili" && (
          <div className="banner banner--ok">
            Siparişiniz alındı. Onay e-postası gönderildi.
          </div>
        )}
        {durum === "iptal" && (
          <div className="banner banner--muted">
            Ödeme tamamlanmadı. Dilediğiniz zaman yeniden deneyebilirsiniz.
          </div>
        )}

        <div className="detail__grid">
          <div className="detail__media">
            {p.media ? (
              <MediaCarousel items={p.media} label={p.name} tall />
            ) : (
              <ImagePanel label={p.name} tall />
            )}
          </div>

          <div className="detail__info">
            <p className="detail__wind">
              <WindMark size={22} />
              {p.windTr} · {p.windDir}
            </p>
            <h1 className="detail__name">{p.name}</h1>
            <p className="detail__class">{p.klass}</p>
            <p className="detail__tagline">{p.tagline}</p>

            <div className="detail__price">
              <span className="detail__price-label">Fiyat (KDV dahil)</span>
              <span className="detail__price-value">{formatPrice(p.priceCents)}</span>
            </div>

            {p.inStock && (
              <p className="detail__stock-info">
                {COMPANY.KARGO_SURESI_IS_GUNU} iş günü içinde kargoda · Ücretsiz kargo
              </p>
            )}

            <BuyButton slug={p.slug} inStock={p.inStock} productName={p.name} />

            <p className="detail__hint">
              <Link href="/teslimat-ve-iade">14 gün içinde koşulsuz iade</Link>
              {p.inStock && " · iyzico güvenli ödeme"}
            </p>
          </div>
        </div>

        <div className="detail__lower">
          <section className="detail__desc">
            <p className="eyebrow">Açıklama</p>
            <p>{p.description}</p>
          </section>

          <section className="detail__specs">
            <p className="eyebrow">Teknik Özellikler</p>
            <dl className="specs">
              {p.specs.map((s) => (
                <div className="specs__row" key={s.label}>
                  <dt>{s.label}</dt>
                  <dd>{s.value}</dd>
                </div>
              ))}
            </dl>
          </section>
        </div>
      </div>
    </article>
  );
}
