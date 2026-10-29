import { COMPANY } from "@/lib/company";

export const metadata = {
  title: "Gizlilik Politikası — VELA Yem Botu",
  robots: { index: false },
};

export default function GizlilikPage() {
  return (
    <article className="wrap legal-page">
      <header className="legal-page__head">
        <p className="eyebrow">Yasal</p>
        <h1>Gizlilik Politikası</h1>
        <p className="legal-page__meta">Son güncelleme: Ekim 2026 · Sürüm 2.0</p>
      </header>

      <div className="legal-page__body">
        <h2>1. Veri Sorumlusu</h2>
        <p>
          Bu politika, <strong>{COMPANY.SATICI_UNVAN}</strong> ("biz") tarafından{" "}
          {COMPANY.SITE_URL} ("site") aracılığıyla işlenen kişisel verilere ilişkindir.
          Veri sorumlusu olarak 6698 sayılı Kişisel Verilerin Korunması Kanunu
          (KVKK) kapsamındaki yükümlülüklerimizi yerine getiririz.
        </p>
        <p>
          Adres: {COMPANY.ADRES}<br />
          İletişim: <a href={`mailto:${COMPANY.EPOSTA}`}>{COMPANY.EPOSTA}</a>
        </p>

        <h2>2. Toplanan Veriler ve Amaçları</h2>
        <p>
          Sipariş, stok bildirimi ve iletişim formları aracılığıyla ad-soyad, telefon
          numarası, e-posta adresi ve varsa teslimat ile fatura adresi bilgilerinizi
          alırız. Bu veriler; sipariş talebinin değerlendirilmesi, sizinle iletişime
          geçilmesi ve siparişin tamamlanması amacıyla kullanılır.
        </p>
        <p>
          Ödeme işlemleri, PCI-DSS uyumlu iyzico altyapısı üzerinden gerçekleşir.
          Kart bilgileriniz hiçbir şekilde sistemlerimizde saklanmaz.
        </p>

        <h2>3. Verilerin Saklanması ve Paylaşımı</h2>
        <p>
          Kişisel verileriniz yalnızca siparişinizin karşılanması ve yasal
          yükümlülüklerin yerine getirilmesi için gerektiği süre boyunca saklanır.
          Verileriniz aşağıdaki taraflarla paylaşılabilir:
        </p>
        <ul>
          <li><strong>iyzico Ödeme Hizmetleri A.Ş.</strong> — ödeme işleminin gerçekleştirilmesi için</li>
          <li><strong>{COMPANY.KARGO_FIRMASI}</strong> — teslimat adresinizin ürün gönderimi amacıyla iletilmesi için</li>
          <li><strong>Vercel Inc.</strong> — site barındırma ve anonim analitik hizmetleri için</li>
        </ul>
        <p>
          Verileriniz yukarıda belirtilen taraflar dışında üçüncü kişilerle
          paylaşılmaz, satılmaz ve kiralanmaz.
        </p>

        <h2>4. Çerezler</h2>
        <p>
          Site, temel işlevsellik ve Vercel Analytics için anonim ziyaretçi
          istatistikleri toplayabilir. Kişisel veri içeren pazarlama çerezi
          kullanılmamaktadır. Ayrıntılar için{" "}
          <a href="/cerez-politikasi">Çerez Politikamıza</a> bakınız.
        </p>

        <h2>5. Haklarınız</h2>
        <p>
          KVKK Madde 11 kapsamında; verilerinize erişme, düzeltme, silme ve
          işlemeye itiraz etme haklarına sahipsiniz. Ayrıntılar için{" "}
          <a href="/kvkk-aydinlatma">KVKK Aydınlatma Metnimizi</a> inceleyebilirsiniz.
          Bu haklarınızı kullanmak için{" "}
          <a href={`mailto:${COMPANY.EPOSTA}`}>{COMPANY.EPOSTA}</a> adresine yazabilirsiniz.
        </p>
      </div>
    </article>
  );
}
