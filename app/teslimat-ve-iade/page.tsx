export const metadata = {
  title: "Teslimat ve İade — VELA Atölye",
  robots: { index: false },
};

export default function TeslimatVeIadePage() {
  return (
    <article className="wrap legal-page">
      <header className="legal-page__head">
        <p className="eyebrow">Yasal</p>
        <h1>Teslimat ve İade Şartları</h1>
        <p className="legal-page__meta">Son güncelleme: Eylül 2026</p>
      </header>

      <div className="legal-page__body">
        <h2>1. Üretim ve Teslimat Süresi</h2>
        <p>
          VELA tekneleri sipariş üzerine, el ile üretilir. Üretim süresi sipariş
          tarihinden itibaren <strong>8–16 haftadır</strong>; mevcut yoğunluğa göre
          değişebilir. Kesin teslimat haftası sipariş onayı sırasında tarafınıza
          bildirilir.
        </p>
        <p>
          Teslimat Türkiye genelinde kargo yoluyla gerçekleştirilir. Kargo ücreti
          sipariş tutarına dahildir. Yurt dışı teslimat için lütfen bizimle
          iletişime geçin.
        </p>

        <h2>2. Ürünün Teslim Alınması</h2>
        <p>
          Kargo teslimi sırasında ürünü açarak kontrol etmenizi öneririz. Kargoya
          bağlı hasar, teslimat anında tutanak tutularak bildirilmelidir.
        </p>

        <h2>3. Cayma Hakkı ve İade</h2>
        <p>
          Ürünlerimiz, müşteri talebi doğrultusunda kişiye özel üretilmektedir.
          Bu nedenle <strong>Mesafeli Sözleşmeler Yönetmeliği Madde 15/1-(c)</strong>
          hükmü uyarınca, üretimi tamamlanmış siparişler için cayma hakkı ve iade
          uygulanmamaktadır.
        </p>
        <p>
          Üretim başlamadan önce yapılan iptal taleplerinde alınan kapora iade
          edilir. Üretim başladıktan sonraki iptal taleplerinde kapora iadesi
          yapılmaz.
        </p>

        <h2>4. Garanti ve Arıza</h2>
        <p>
          Ürünlerimiz teslimden itibaren <strong>1 yıl</strong> atölye garantisi
          kapsamındadır. Üretim kaynaklı arızalar ücretsiz olarak giderilir.
          Kullanım hatası, kaza veya dış etkenlerden kaynaklanan hasarlar garanti
          kapsamı dışındadır.
        </p>
        <p>
          Garanti ve servis talepleri için{" "}
          <a href="mailto:info@velayembotu.com">info@velayembotu.com</a> adresine
          yazabilir ya da WhatsApp üzerinden ulaşabilirsiniz.
        </p>
      </div>
    </article>
  );
}
