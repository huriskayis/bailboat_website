import { listedProducts } from "@/lib/products";
import ProductCard from "../components/ProductCard";

export const metadata = {
  title: "Yem Botu Modelleri ve Fiyatları — Koleksiyon",
  description: "El yapımı yem botu modelleri ve fiyatları. Türkiye geneline gönderim.",
};

export default function KoleksiyonPage() {
  const listed = listedProducts();
  return (
    <section className="page collection">
      <div className="wrap">
        <header className="page__head">
          <p className="eyebrow">Koleksiyon</p>
          <h1 className="section-title">Ürünlerimiz</h1>
          <p className="page__lead">
            Atölyemizde el işçiliğiyle, sınırlı sayıda üretilen yem botları.
          </p>
        </header>
        <div className="grid">
          {listed.map((p, i) => (
            <ProductCard key={p.slug} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
