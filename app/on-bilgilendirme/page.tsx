import { COMPANY } from "@/lib/company";

export const metadata = {
  title: "Ön Bilgilendirme Formu — VELA Yem Botu",
  robots: { index: false },
};

export default function OnBilgilendirmePage() {
  return (
    <article className="wrap legal-page">
      <header className="legal-page__head">
        <p className="eyebrow">Yasal</p>
        <h1>Ön Bilgilendirme Formu</h1>
        <p className="legal-page__meta">Son güncelleme: Ekim 2026 · Sürüm 1.0</p>
      </header>

      <div className="legal-page__body">
        <p>
          Bu form; Mesafeli Sözleşmeler Yönetmeliği'nin 5. maddesi uyarınca,{" "}
          sözleşme kurulmadan önce alıcıyı bilgilendirmek amacıyla hazırlanmıştır.
        </p>

        <h2>1. Satıcıya İlişkin Bilgiler</h2>
        <p>
          <strong>Ünvan:</strong> {COMPANY.SATICI_UNVAN}<br />
          <strong>Adres:</strong> {COMPANY.ADRES}<br />
          <strong>Telefon:</strong> {COMPANY.TELEFON}<br />
          <strong>E-posta:</strong>{" "}
          <a href={`mailto:${COMPANY.EPOSTA}`}>{COMPANY.EPOSTA}</a><br />
          <strong>Vergi Dairesi / VKN:</strong> {COMPANY.VERGI_DAIRESI} / {COMPANY.VKN}
          {COMPANY.MERSIS_NO && (
            <><br /><strong>MERSİS:</strong> {COMPANY.MERSIS_NO}</>
          )}
          {COMPANY.KEP && (
            <><br /><strong>KEP:</strong> {COMPANY.KEP}</>
          )}
        </p>

        <h2>2. Malın Temel Nitelikleri</h2>
        <p>
          <strong>{COMPANY.MARKA} — Poyraz</strong> modeli; 65 cm gövdeli, 3 yem hazneli,
          GPS oto pilotlu, çift motorlu, Türkçe mobil uygulamalı el yapımı sazan yemleme botudur.
          Teknik özellikler ürün sayfasında yer almaktadır.
        </p>

        <h2>3. Vergiler Dahil Toplam Fiyat</h2>
        <p>
          Sipariş edilen ürünün KDV dahil fiyatı ödeme adımında gösterilir.{" "}
          <strong>Kargo bedeli ücretsizdir.</strong>
        </p>

        <h2>4. Ödeme Şekli</h2>
        <p>
          Ödemeler, PCI-DSS uyumlu iyzico Ödeme Hizmetleri A.Ş. altyapısı üzerinden
          güvenli biçimde gerçekleştirilir. Taksit seçenekleri ödeme adımında gösterilir.
          3D Secure doğrulaması uygulanır.
        </p>

        <h2>5. Teslimat Şekli ve Süresi</h2>
        <p>
          Ürün, sipariş ve ödeme onayından itibaren <strong>{COMPANY.KARGO_SURESI_IS_GUNU} iş günü</strong>{" "}
          içinde kargoya teslim edilir. Teslimat her halükarda 30 günü geçmez.
          Kargo, {COMPANY.KARGO_FIRMASI} aracılığıyla Türkiye geneline yapılır.
          Kargo ücreti alıcıya yansıtılmaz.
        </p>

        <h2>6. Cayma Hakkı</h2>
        <p>
          Teslim tarihinden itibaren <strong>14 gün</strong> içinde herhangi bir gerekçe
          göstermeksizin sözleşmeden cayma hakkına sahipsiniz.
        </p>
        <p>
          <strong>Cayma bildirimi için:</strong><br />
          E-posta: <a href={`mailto:${COMPANY.EPOSTA}`}>{COMPANY.EPOSTA}</a><br />
          WhatsApp: {COMPANY.WHATSAPP}<br />
          Posta: {COMPANY.ADRES}
        </p>
        <p>
          Cayma bildiriminin ardından ürünü {COMPANY.KARGO_FIRMASI} aracılığıyla
          ücretsiz olarak geri gönderebilirsiniz. Ürün tarafımıza ulaştıktan sonra{" "}
          14 gün içinde ödemeniz, ödeme yaptığınız araçla iade edilir.
        </p>
        <p>
          Ürünün, normal kullanımının ötesinde kullanımından kaynaklanan değer kaybı
          tarafınıza yansıtılabilir.
        </p>

        <h2>7. Şikâyet ve İtiraz Yolları</h2>
        <p>
          Uyuşmazlıklarda Denizli İl Ticaret Müdürlüğü'ne bağlı Tüketici Hakem Heyetleri
          ve Tüketici Mahkemeleri yetkilidir. Ayrıca{" "}
          <a href="https://tuketici.ticaret.gov.tr" target="_blank" rel="noopener noreferrer">
            tuketici.ticaret.gov.tr
          </a>{" "}
          üzerinden e-Devlet şikâyet başvurusu yapabilirsiniz.
        </p>

        <h2>8. Garanti ve Satış Sonrası Hizmet</h2>
        <p>
          Ürün, teslim tarihinden itibaren <strong>{COMPANY.GARANTI_SURESI}</strong> üretim
          kaynaklı arızalara karşı garantilidir. Garanti ve servis talepleri için{" "}
          <a href={`mailto:${COMPANY.EPOSTA}`}>{COMPANY.EPOSTA}</a> adresine yazabilir ya da
          WhatsApp üzerinden ulaşabilirsiniz.
        </p>
      </div>
    </article>
  );
}
