import Link from "next/link";

export default function NotFound() {
  return (
    <section className="page" style={{ textAlign: "center" }}>
      <div className="wrap">
        <p className="eyebrow">404</p>
        <h1 className="section-title" style={{ marginTop: "1rem" }}>
          Bu rota bulunamadı
        </h1>
        <p className="page__lead" style={{ margin: "1.2rem auto 2.4rem" }}>
          Aradığınız sayfa mevcut değil. Koleksiyona dönebilirsiniz.
        </p>
        <Link href="/koleksiyon" className="btn">
          Koleksiyona Dön
        </Link>
      </div>
    </section>
  );
}
