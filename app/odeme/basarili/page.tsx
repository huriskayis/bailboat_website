import Link from "next/link";

export const metadata = {
  title: "Ödeme Alındı — VELA Yem Botu",
  robots: { index: false },
};

export default function OdemeBasarili() {
  return (
    <main className="wrap" style={{ paddingBlock: "6rem", maxWidth: "44rem" }}>
      <p className="eyebrow">Sipariş Alındı</p>
      <p className="form-done__text">
        Ödemeniz başarıyla tamamlandı.
      </p>
      <p style={{ color: "var(--slate)", marginBottom: "2.4rem", lineHeight: 1.7 }}>
        Sipariş onay e-postası adresinize gönderildi.
        Sorularınız için bize WhatsApp'tan ulaşabilirsiniz.
      </p>
      <Link href="/koleksiyon" className="btn">
        Koleksiyona Dön
      </Link>
    </main>
  );
}
