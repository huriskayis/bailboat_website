import { COMPANY } from "@/lib/company";

export const metadata = {
  title: "Çerez Politikası — VELA Yem Botu",
  robots: { index: false },
};

export default function CerezPolitikasiPage() {
  return (
    <article className="wrap legal-page">
      <header className="legal-page__head">
        <p className="eyebrow">Yasal</p>
        <h1>Çerez Politikası</h1>
        <p className="legal-page__meta">Son güncelleme: Ekim 2026 · Sürüm 1.0</p>
      </header>

      <div className="legal-page__body">
        <p>
          Bu politika; <strong>{COMPANY.SATICI_UNVAN}</strong> tarafından işletilen{" "}
          {COMPANY.SITE_URL} adresinde çerez ve benzeri izleme teknolojilerinin nasıl
          kullanıldığını açıklamaktadır.
        </p>

        <h2>1. Çerez Nedir?</h2>
        <p>
          Çerezler, bir web sitesini ziyaret ettiğinizde tarayıcınıza kaydedilen küçük metin
          dosyalarıdır. Siteyi her ziyaretinizde tarayıcınız bu dosyaları sunucuya geri gönderir.
        </p>

        <h2>2. Kullandığımız Çerezler</h2>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: "1rem" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", borderBottom: "1px solid var(--c-rule)" }}>Çerez / Teknoloji</th>
              <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", borderBottom: "1px solid var(--c-rule)" }}>Tür</th>
              <th style={{ textAlign: "left", padding: "0.5rem 0.75rem", borderBottom: "1px solid var(--c-rule)" }}>Amaç</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style={{ padding: "0.5rem 0.75rem", borderBottom: "1px solid var(--c-rule)" }}>Oturum çerezleri</td>
              <td style={{ padding: "0.5rem 0.75rem", borderBottom: "1px solid var(--c-rule)" }}>Zorunlu</td>
              <td style={{ padding: "0.5rem 0.75rem", borderBottom: "1px solid var(--c-rule)" }}>Sitenin temel işlevselliği (sayfa yükleme, form güvenliği)</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5rem 0.75rem", borderBottom: "1px solid var(--c-rule)" }}>Vercel Analytics</td>
              <td style={{ padding: "0.5rem 0.75rem", borderBottom: "1px solid var(--c-rule)" }}>Analitik</td>
              <td style={{ padding: "0.5rem 0.75rem", borderBottom: "1px solid var(--c-rule)" }}>Anonim ziyaretçi istatistikleri (sayfa görüntülenme, referrer). Kişisel veri içermez.</td>
            </tr>
            <tr>
              <td style={{ padding: "0.5rem 0.75rem" }}>iyzico ödeme formu</td>
              <td style={{ padding: "0.5rem 0.75rem" }}>İşlevsel</td>
              <td style={{ padding: "0.5rem 0.75rem" }}>Ödeme adımında iyzico güvenli form yüklenir; çerezleri iyzico'nun gizlilik politikasına tabidir.</td>
            </tr>
          </tbody>
        </table>

        <h2>3. Kişisel Pazarlama Çerezi Kullanılmıyor</h2>
        <p>
          Sitemizde reklam takibi, yeniden hedefleme veya kişisel profil oluşturmaya yönelik
          herhangi bir üçüncü taraf pazarlama çerezi kullanılmamaktadır.
        </p>

        <h2>4. Çerezleri Yönetme</h2>
        <p>
          Tarayıcı ayarlarınızdan çerezleri silebilir veya yeni çerez yerleştirilmesini
          engelleyebilirsiniz. Bu durumda sitenin bazı işlevleri çalışmayabilir.
        </p>

        <h2>5. İletişim</h2>
        <p>
          Bu politikayla ilgili sorularınız için{" "}
          <a href={`mailto:${COMPANY.EPOSTA}`}>{COMPANY.EPOSTA}</a> adresine yazabilirsiniz.
        </p>
      </div>
    </article>
  );
}
