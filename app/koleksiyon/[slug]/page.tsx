import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, products, formatPrice } from "@/lib/products";
import ImagePanel from "../../components/ImagePanel";
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
    title: p ? `${p.name} — VELA Atölye` : "VELA Atölye",
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

  return (
    <article className="detail">
      <div className="wrap">
        <nav className="crumb" aria-label="Konum">
          <Link href="/koleksiyon">Koleksiyon</Link>
          <span>/</span>
          <span>{p.name}</span>
        </nav>

        {durum === "basarili" && (
          <div className="banner banner--ok">
            Talebiniz alındı. Atölyemiz kısa süre içinde sizinle iletişime geçecek.
          </div>
        )}
        {durum === "iptal" && (
          <div className="banner banner--muted">
            Ödeme tamamlanmadı. Dilediğiniz zaman yeniden deneyebilirsiniz.
          </div>
        )}

        <div className="detail__grid">
          <div className="detail__media">
            <ImagePanel label={p.name} tall />
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
              <span className="detail__price-label">Başlangıç fiyatı</span>
              <span className="detail__price-value">{formatPrice(p.priceCents)}</span>
            </div>

            <BuyButton slug={p.slug} />
            <p className="detail__hint">
              Ödeme güvenli olarak Stripe üzerinden gerçekleşir.
            </p>
          </div>
        </div>

        <div className="detail__lower">
          <section className="detail__desc">
            <p className="eyebrow">Açıklama</p>
            <p>{p.description}</p>
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
