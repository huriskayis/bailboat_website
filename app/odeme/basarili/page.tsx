import Link from "next/link";

export const metadata = {
  title: "Ödeme Alındı — VELA Atölye",
  robots: { index: false },
};

export default function OdemeBasarili() {
  return (
    <main className="wrap" style={{ paddingBlock: "6rem", maxWidth: "44rem" }}>
      <p className="eyebrow">Ödeme Alındı</p>
      <p className="form-done__text">
        Kapora ödemeniz başarıyla tamamlandı. Siparişiniz garantilenmiştir.
      </p>
      <p style={{ color: "var(--slate)", marginBottom: "2.4rem", lineHeight: 1.7 }}>
        En kısa sürede sizi arayarak teslimat tarihi ve kalan ödeme detaylarını birlikte netleştireceğiz.
        Sorularınız için bize WhatsApp'tan ulaşabilirsiniz.
      </p>
      <Link href="/koleksiyon" className="btn">
        Koleksiyona Dön
      </Link>
    </main>
  );
}
