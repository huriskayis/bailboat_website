export const metadata = {
  title: "Gizlilik Politikası — VELA Atölye",
  robots: { index: false },
};

export default function GizlilikPage() {
  return (
    <article className="wrap legal-page">
      <header className="legal-page__head">
        <p className="eyebrow">Yasal</p>
        <h1>Gizlilik Politikası</h1>
        <p className="legal-page__meta">Son güncelleme: Eylül 2026</p>
      </header>

      <div className="legal-page__body">
        <h2>1. Veri Sorumlusu</h2>
        <p>
          Bu politika, <strong>VELA Atölye</strong> ("biz", "atölye") tarafından
          velayembotu.com ("site") aracılığıyla işlenen kişisel verilere ilişkindir.
          Veri sorumlusu olarak 6698 sayılı Kişisel Verilerin Korunması Kanunu
          (KVKK) kapsamındaki yükümlülüklerimizi yerine getiririz.
        </p>
        <p>
          İletişim: <a href="mailto:info@velayembotu.com">info@velayembotu.com</a>
        </p>

        <h2>2. Toplanan Veriler ve Amaçları</h2>
        <p>
          Ön sipariş ve iletişim formları aracılığıyla ad-soyad, telefon numarası,
          e-posta adresi ve varsa teslimat adresi bilgilerinizi alırız. Bu veriler;
          sipariş talebinizin değerlendirilmesi, sizinle iletişime geçilmesi ve
          siparişin tamamlanması amacıyla kullanılır.
        </p>
        <p>
          Ödeme işlemleri, PCI-DSS uyumlu iyzico altyapısı üzerinden gerçekleşir.
          Kart bilgileriniz hiçbir şekilde sistemlerimizde saklanmaz.
        </p>

        <h2>3. Verilerin Saklanması ve Paylaşımı</h2>
        <p>
          Kişisel verileriniz yalnızca siparişinizin karşılanması ve yasal
          yükümlülüklerin yerine getirilmesi için gerektiği süre boyunca saklanır.
          Verileriniz; ödeme altyapısı sağlayıcısı iyzico dışında üçüncü taraflarla
          paylaşılmaz, satılmaz ve kiralanmaz.
        </p>

        <h2>4. Çerezler</h2>
        <p>
          Site, temel işlevsellik ve Vercel Analytics için anonim ziyaretçi
          istatistikleri toplayabilir. Kişisel veri içeren pazarlama çerezi
          kullanılmamaktadır.
        </p>

        <h2>5. Haklarınız</h2>
        <p>
          KVKK Madde 11 kapsamında; verilerinize erişme, düzeltme, silme ve
          işlemeye itiraz etme haklarına sahipsiniz. Bu haklarınızı kullanmak için
          <a href="mailto:info@velayembotu.com"> info@velayembotu.com</a> adresine
          yazabilirsiniz.
        </p>
      </div>
    </article>
  );
}
