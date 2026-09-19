import Link from "next/link";

export const metadata = {
  title: "Ödeme Tamamlanamadı — VELA Atölye",
  robots: { index: false },
};

export default function OdemeHatasi() {
  return (
    <main className="wrap" style={{ paddingBlock: "6rem", maxWidth: "44rem" }}>
      <p className="eyebrow">Ödeme Tamamlanamadı</p>
      <p className="form-done__text">
        Ödeme işlemi tamamlanamadı veya iptal edildi.
      </p>
      <p style={{ color: "var(--slate)", marginBottom: "2.4rem", lineHeight: 1.7 }}>
        Tekrar denemek isterseniz siparişinize dönebilirsiniz. Sorun devam ederse
        bize WhatsApp'tan ulaşın, yardımcı olalım.
      </p>
      <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <Link href="/koleksiyon" className="btn">
          Koleksiyona Dön
        </Link>
        <a
          href="https://wa.me/905513649490"
          className="btn btn--ghost"
          target="_blank"
          rel="noopener noreferrer"
        >
          WhatsApp ile Yaz
        </a>
      </div>
    </main>
  );
}
