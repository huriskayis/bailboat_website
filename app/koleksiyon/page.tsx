import { products } from "@/lib/products";
import ProductCard from "../components/ProductCard";

export const metadata = {
  title: "Koleksiyon — VELA Atölye",
  description: "Rüzgârların adını taşıyan el yapımı yem botları.",
};

export default function KoleksiyonPage() {
  return (
    <section className="page collection">
      <div className="wrap">
        <header className="page__head">
          <p className="eyebrow">Koleksiyon</p>
          <h1 className="section-title">Rüzgârlar</h1>
          <p className="page__lead">
            Sekiz tekne, sekiz rüzgâr. Her biri atölyemizde tek tek,
            dünya standartlarında inşa edilir.
          </p>
        </header>
        <div className="grid">
          {products.map((p, i) => (
            <ProductCard key={p.slug} p={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
