import Link from "next/link";
import { listedProducts } from "@/lib/products";
import ProductCard from "./components/ProductCard";
import WindMark from "./components/WindMark";

export default function HomePage() {
  const listed = listedProducts();
  return (
    <>
      {/* Hero */}
      <section className="hero">
        <div className="wrap hero__inner">
          <WindMark size={110} className="hero__mark" />
          <p className="eyebrow">Atölye Yapımı · Sınırlı Sayıda</p>
          <h1 className="hero__title">
            Rüzgârın adını taşıyan
            <br />
            yem botları
          </h1>
          <hr className="rule hero__rule" />
          <p className="hero__lead">
            Türkiye'de, kendi atölyemizde, yerli ustalarımızın eliyle üretilen her tekne
            kalite güvencemizdir. Satın aldığınız gün başlayan servis desteğiyle yanınızdayız.
          </p>
          <div className="hero__actions">
            <Link href="/koleksiyon" className="btn">
              Koleksiyonu Keşfedin
            </Link>
            <Link href="/atolye" className="btn--ghost btn">
              Atölyemiz
            </Link>
          </div>
        </div>
        <div className="hero__horizon" aria-hidden="true" />
      </section>

      {/* Atelier thesis */}
      <section className="thesis">
        <div className="wrap thesis__grid">
          <p className="eyebrow">Atölye</p>
          <p className="thesis__text">
            Denizli'deki atölyemizde her tekne, ustalarımızın elleriyle sıfırdan inşa edilir —
            makineden değil, insandan geçer. Yılda sınırlı sayıda üretim yapıyoruz;
            çünkü her teknenin hakkını vermek, hızdan önce gelir.
          </p>
          <div className="thesis__meta">
            <div>
              <span className="thesis__num">Yerli Üretim</span>
              <span className="thesis__label">Denizli</span>
            </div>
            <div>
              <span className="thesis__num">El yapımı</span>
              <span className="thesis__label">Her tekne</span>
            </div>
          </div>
        </div>
      </section>

      {/* Collection */}
      <section className="collection" id="koleksiyon">
        <div className="wrap">
          <div className="collection__head">
            <div>
              <p className="eyebrow">Koleksiyon</p>
              <h2 className="section-title">Yem Botları</h2>
            </div>
            <Link href="/koleksiyon" className="link-brass">
              Tümünü Gör
            </Link>
          </div>
          <div className="grid">
            {listed.map((p, i) => (
              <ProductCard key={p.slug} p={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
