import Link from "next/link";
import type { Product } from "@/lib/products";
import ImagePanel from "./ImagePanel";

export default function ProductCard({ p, index }: { p: Product; index: number }) {
  const num = String(index + 1).padStart(2, "0");
  const active = p.active === true;

  const media = (
    <div className={`card__media`}>
      <ImagePanel label={p.name} src={p.thumbnail} />
      <span className="card__index">{num}</span>
      {!active && <span className="card__sold">Stokta Yok</span>}
    </div>
  );

  const body = (
    <div className="card__body">
      <p className="card__wind">{p.windTr} · {p.windDir}</p>
      <h3 className="card__name">{p.name}</h3>
      <p className="card__class">{p.klass}</p>
      <div className="card__foot">
        <span>{p.lengthM}</span>
        {active
          ? <span className="card__cta">İncele →</span>
          : <span className="card__unavailable">Mevcut Değil</span>
        }
      </div>
    </div>
  );

  if (!active) {
    return (
      <div className="card card--inactive" aria-disabled="true">
        {media}
        {body}
      </div>
    );
  }

  return (
    <Link href={`/koleksiyon/${p.slug}`} className="card">
      {media}
      {body}
    </Link>
  );
}
