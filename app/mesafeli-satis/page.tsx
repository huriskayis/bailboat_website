export const metadata = {
  title: "Mesafeli Satış Sözleşmesi — VELA Atölye",
  robots: { index: false },
};

export default function MesafeliSatisPage() {
  return (
    <article className="wrap legal-page">
      <header className="legal-page__head">
        <p className="eyebrow">Yasal</p>
        <h1>Mesafeli Satış Sözleşmesi</h1>
        <p className="legal-page__meta">Son güncelleme: Eylül 2026</p>
      </header>

      <div className="legal-page__body">
        <h2>Taraflar</h2>
        <p>
          <strong>Satıcı:</strong> VELA Atölye — Denizli, Türkiye
          &nbsp;|&nbsp; <a href="mailto:info@velayembotu.com">info@velayembotu.com</a>
          &nbsp;|&nbsp; velayembotu.com
        </p>
        <p>
          <strong>Alıcı:</strong> Sipariş formunu dolduran ve ödemeyi gerçekleştiren kişi.
        </p>

        <h2>1. Konu</h2>
        <p>
          Bu sözleşme; alıcının velayembotu.com üzerinden verdiği sipariş
          kapsamında, satıcı tarafından üretilen ve teslim edilen yem botu ile
          ilgili karşılıklı hak ve yükümlülükleri düzenler. 6502 sayılı
          Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği
          hükümleri uygulanır.
        </p>

        <h2>2. Ürün ve Fiyat</h2>
        <p>
          Sipariş edilen ürünün adı, teknik özellikleri ve fiyatı, sipariş
          onayında tarafınıza yazılı olarak iletilir. Fiyatlar Türk Lirası (TRY)
          cinsinden olup KDV dahildir.
        </p>

        <h2>3. Ödeme</h2>
        <p>
          Toplu siparişlerde sözleşme kurulumu sırasında 1 (bir) adet ürün
          bedelini karşılayan kapora alınır. Kalan tutar, teslimat öncesinde en
          fazla 6 taksit seçeneğiyle tahsil edilir. Ödemeler iyzico altyapısı
          üzerinden güvenli biçimde gerçekleştirilir.
        </p>

        <h2>4. Teslimat</h2>
        <p>
          Ürünler sipariş üzerine üretilir; teslimat süresi 8–16 haftadır.
          Kesin tarih sipariş onayında bildirilir. Teslimat kargo ile Türkiye
          genelinde yapılır; kargo bedeli satıcı tarafından karşılanır.
        </p>

        <h2>5. Cayma Hakkı</h2>
        <p>
          Ürünler alıcı talebi doğrultusunda özel ölçü ve özelliklere göre
          üretildiğinden, Mesafeli Sözleşmeler Yönetmeliği Madde 15/1-(c) hükmü
          gereğince cayma hakkı kullanılamaz. Üretim başlamadan önce yapılan iptal
          taleplerinde alınan kapora iade edilir.
        </p>

        <h2>6. Garanti</h2>
        <p>
          Teslim tarihinden itibaren 1 yıl süreyle üretim kaynaklı arızalara
          karşı garanti verilir. Garanti, kullanım hatasından kaynaklanan hasarları
          kapsamaz.
        </p>

        <h2>7. Uyuşmazlık</h2>
        <p>
          Uyuşmazlıklarda Denizli Tüketici Hakem Heyeti veya Tüketici Mahkemeleri
          yetkilidir.
        </p>
      </div>
    </article>
  );
}
