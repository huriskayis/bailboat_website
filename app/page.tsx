import Link from "next/link";
import { products } from "@/lib/products";
import ProductCard from "./components/ProductCard";
import WindMark from "./components/WindMark";

export default function HomePage() {
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
            Her tekne, atölyemizde dünya standartlarında el işçiliğiyle,
            tek tek inşa edilir. Denizle kurulan eski bir dostluğun sürdürülmesi.
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
            Kalıptan değil, elden çıkar. Omurgadan güverteye her ayrıntı,
            ustalarımızın sabrıyla ve denizin ölçüsüyle şekillenir.
            Sınırlı sayıda üretir, her tekneye adını veren rüzgârı yaşatırız.
          </p>
          <div className="thesis__meta">
            <div>
              <span className="thesis__num">2005</span>
              <span className="thesis__label">Kuruluş</span>
            </div>
            <div>
              <span className="thesis__num">8</span>
              <span className="thesis__label">Model</span>
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
              <h2 className="section-title">Rüzgârlar</h2>
            </div>
            <Link href="/koleksiyon" className="link-brass">
              Tümünü Gör
            </Link>
          </div>
          <div className="grid">
            {products.map((p, i) => (
              <ProductCard key={p.slug} p={p} index={i} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
