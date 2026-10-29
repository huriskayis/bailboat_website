import { COMPANY } from "@/lib/company";

export const metadata = {
  title: "Mesafeli Satış Sözleşmesi — VELA Yem Botu",
  robots: { index: false },
};

export default function MesafeliSatisPage() {
  return (
    <article className="wrap legal-page">
      <header className="legal-page__head">
        <p className="eyebrow">Yasal</p>
        <h1>Mesafeli Satış Sözleşmesi</h1>
        <p className="legal-page__meta">Son güncelleme: Ekim 2026 · Sürüm 2.0</p>
      </header>

      <div className="legal-page__body">
        <h2>1. Taraflar</h2>
        <p>
          <strong>Satıcı:</strong><br />
          Ünvan: {COMPANY.SATICI_UNVAN}<br />
          Adres: {COMPANY.ADRES}<br />
          Vergi Dairesi / VKN: {COMPANY.VERGI_DAIRESI} / {COMPANY.VKN}<br />
          Telefon: {COMPANY.TELEFON}<br />
          E-posta: <a href={`mailto:${COMPANY.EPOSTA}`}>{COMPANY.EPOSTA}</a>
          {COMPANY.MERSIS_NO && <><br />MERSİS: {COMPANY.MERSIS_NO}</>}
        </p>
        <p>
          <strong>Alıcı:</strong> Sipariş formunu dolduran ve ödemeyi gerçekleştiren kişi.
        </p>

        <h2>2. Konu</h2>
        <p>
          Bu sözleşme; Alıcının {COMPANY.SITE_URL} üzerinden verdiği sipariş kapsamında,
          Satıcı tarafından teslim edilen yem botu ile ilgili karşılıklı hak ve
          yükümlülükleri düzenler. 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve
          Mesafeli Sözleşmeler Yönetmeliği hükümleri uygulanır.
        </p>

        <h2>3. Ürün ve Fiyat</h2>
        <p>
          Sipariş edilen ürünün adı, teknik özellikleri ve KDV dahil fiyatı sipariş
          onayında yazılı olarak iletilir. Kargo bedeli Satıcı tarafından karşılanır;
          Alıcıya ayrıca yansıtılmaz.
        </p>

        <h2>4. Ödeme</h2>
        <p>
          Ödemeler, PCI-DSS uyumlu iyzico Ödeme Hizmetleri A.Ş. altyapısı üzerinden
          güvenli biçimde gerçekleştirilir. 3D Secure doğrulaması uygulanır. Taksit
          seçenekleri ödeme adımında gösterilir. Kart bilgileri Satıcı sistemlerinde
          işlenmez veya saklanmaz.
        </p>

        <h2>5. Teslimat</h2>
        <p>
          Ürün, sipariş ve ödeme onayından itibaren <strong>{COMPANY.KARGO_SURESI_IS_GUNU} iş günü</strong>{" "}
          içinde {COMPANY.KARGO_FIRMASI} aracılığıyla kargoya verilir. Teslimat her
          halükarda 30 günü geçmez. Kargo Türkiye genelinde ücretsizdir.
        </p>

        <h2>6. Cayma Hakkı</h2>
        <p>
          Alıcı, teslim tarihinden itibaren <strong>14 gün</strong> içinde herhangi bir
          gerekçe göstermeksizin ve cezai şart ödemeksizin sözleşmeden cayma hakkına
          sahiptir.
        </p>
        <p>
          Cayma bildiriminin yapılabileceği adresler:<br />
          E-posta: <a href={`mailto:${COMPANY.EPOSTA}`}>{COMPANY.EPOSTA}</a><br />
          WhatsApp: {COMPANY.WHATSAPP}<br />
          Posta: {COMPANY.ADRES}
        </p>

        <h2>7. Cayma Hakkı Kullanımında İade</h2>
        <p>
          Alıcı, cayma hakkını kullandığını bildirdikten sonra ürünü{" "}
          {COMPANY.KARGO_FIRMASI} aracılığıyla ücretsiz olarak Satıcıya gönderir.
          Ürün Satıcıya ulaştıktan itibaren 14 gün içinde ödeme, Alıcının kullandığı
          ödeme aracıyla iade edilir.
        </p>
        <p>
          Ürünün, teslim alındığı günden cayma bildirim tarihine kadar normal
          kullanımın ötesinde kullanılmasından kaynaklanan değer kaybı Alıcıya
          yansıtılabilir.
        </p>

        <h2>8. Garanti</h2>
        <p>
          Ürün, teslim tarihinden itibaren <strong>{COMPANY.GARANTI_SURESI}</strong>{" "}
          üretim kaynaklı arızalara karşı garantilidir. Garanti; kullanım hatası,
          kaza veya dış etkenlerden kaynaklanan hasarları kapsamaz.
        </p>

        <h2>9. Uyuşmazlık</h2>
        <p>
          Uyuşmazlıklarda Denizli İl Ticaret Müdürlüğü'ne bağlı Tüketici Hakem
          Heyetleri ve Tüketici Mahkemeleri yetkilidir.
        </p>

        <h2>10. Yürürlük</h2>
        <p>
          Bu sözleşme, Alıcının sipariş onayını tamamlamasıyla birlikte yürürlüğe girer.
        </p>
      </div>
    </article>
  );
}
