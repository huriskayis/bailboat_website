import Link from "next/link";
import type { Product } from "@/lib/products";
import ImagePanel from "./ImagePanel";

export default function ProductCard({ p, index }: { p: Product; index: number }) {
  const num = String(index + 1).padStart(2, "0");
  return (
    <Link href={`/koleksiyon/${p.slug}`} className="card">
      <div className="card__media">
        <ImagePanel label={p.name} src={p.thumbnail} />
        <span className="card__index">{num}</span>
      </div>
      <div className="card__body">
        <p className="card__wind">
          {p.windTr} · {p.windDir}
        </p>
        <h3 className="card__name">{p.name}</h3>
        <p className="card__class">{p.klass}</p>
        <div className="card__foot">
          <span>{p.lengthM}</span>
          <span className="card__cta">İncele →</span>
        </div>
      </div>
    </Link>
  );
}
