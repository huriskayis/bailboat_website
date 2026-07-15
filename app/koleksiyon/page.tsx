import { products } from "@/lib/products";
import ProductCard from "../components/ProductCard";

export const metadata = {
  title: "Yem Botu Modelleri ve Fiyatları — Koleksiyon",
  description: "El yapımı yem botu modelleri ve fiyatları. Poyraz, Lodos, Meltem ve daha fazlası. Türkiye geneline gönderim. WhatsApp ile sipariş alınır.",
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
