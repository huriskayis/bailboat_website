import { COMPANY } from "@/lib/company";

export const metadata = {
  title: "Teslimat ve İade — VELA Yem Botu",
  robots: { index: false },
};

export default function TeslimatVeIadePage() {
  return (
    <article className="wrap legal-page">
      <header className="legal-page__head">
        <p className="eyebrow">Yasal</p>
        <h1>Teslimat ve İade Şartları</h1>
        <p className="legal-page__meta">Son güncelleme: Ekim 2026 · Sürüm 2.0</p>
      </header>

      <div className="legal-page__body">
        <h2>1. Kargoya Teslim Süresi</h2>
        <p>
          Sipariş ve ödeme onayından itibaren <strong>{COMPANY.KARGO_SURESI_IS_GUNU} iş günü</strong>{" "}
          içinde ürün {COMPANY.KARGO_FIRMASI} aracılığıyla kargoya verilir.
          Teslimat her halükarda 30 günü geçmez. Kargo Türkiye genelinde{" "}
          <strong>ücretsizdir.</strong>
        </p>

        <h2>2. Ürünün Teslim Alınması</h2>
        <p>
          Kargo teslimi sırasında ürünü açarak kontrol etmenizi öneririz. Kargoya
          bağlı herhangi bir hasar durumunda teslim anında tutanak tutularak kargo
          firmasına bildiriniz.
        </p>

        <h2>3. 14 Günlük Cayma Hakkı ve İade</h2>
        <p>
          Teslim tarihinden itibaren <strong>14 gün</strong> içinde herhangi bir gerekçe
          göstermeksizin sözleşmeden cayabilirsiniz.
        </p>
        <p><strong>İade adımları:</strong></p>
        <ol>
          <li>
            Cayma bildiriminizi e-posta ({COMPANY.EPOSTA}), WhatsApp ({COMPANY.WHATSAPP})
            veya posta yoluyla ({COMPANY.ADRES}) yapın.
          </li>
          <li>
            Ürünü {COMPANY.KARGO_FIRMASI} aracılığıyla <strong>ücretsiz</strong> olarak
            bize gönderin.
          </li>
          <li>Ürün tarafımıza ulaştıktan sonra kontrol edilir.</li>
          <li>
            Onayın ardından 14 gün içinde ödemeniz, kullandığınız ödeme aracıyla
            iade edilir.
          </li>
        </ol>
        <p>
          Ürünün, teslim alındığı günden cayma bildirim tarihine kadar normal
          kullanımın ötesinde kullanılmasından kaynaklanan değer kaybı tarafınıza
          yansıtılabilir.
        </p>

        <h2>4. Garanti ve Servis</h2>
        <p>
          Ürünlerimiz teslimden itibaren <strong>{COMPANY.GARANTI_SURESI}</strong>{" "}
          üretim kaynaklı arızalara karşı garantilidir. Üretim kaynaklı arızalar
          ücretsiz olarak giderilir. Kullanım hatası, kaza veya dış etkenlerden
          kaynaklanan hasarlar garanti kapsamı dışındadır.
        </p>
        <p>
          Garanti ve servis talepleri için{" "}
          <a href={`mailto:${COMPANY.EPOSTA}`}>{COMPANY.EPOSTA}</a> adresine
          yazabilir ya da WhatsApp üzerinden ulaşabilirsiniz.
        </p>
      </div>
    </article>
  );
}
