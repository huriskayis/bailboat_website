import { COMPANY } from "@/lib/company";

export const metadata = {
  title: "KVKK Aydınlatma Metni — VELA Yem Botu",
  robots: { index: false },
};

export default function KvkkAydinlatmaPage() {
  return (
    <article className="wrap legal-page">
      <header className="legal-page__head">
        <p className="eyebrow">Yasal</p>
        <h1>KVKK Aydınlatma Metni</h1>
        <p className="legal-page__meta">Son güncelleme: Ekim 2026 · Sürüm 1.0</p>
      </header>

      <div className="legal-page__body">
        <p>
          Bu metin; 6698 sayılı Kişisel Verilerin Korunması Kanunu'nun ("KVKK") 10.
          maddesi kapsamında veri sorumlusu sıfatıyla <strong>{COMPANY.SATICI_UNVAN}</strong>{" "}
          ("Satıcı") tarafından hazırlanmıştır.
        </p>

        <h2>1. Veri Sorumlusu</h2>
        <p>
          <strong>Ünvan:</strong> {COMPANY.SATICI_UNVAN}<br />
          <strong>Adres:</strong> {COMPANY.ADRES}<br />
          <strong>E-posta:</strong>{" "}
          <a href={`mailto:${COMPANY.EPOSTA}`}>{COMPANY.EPOSTA}</a><br />
          <strong>Telefon:</strong> {COMPANY.TELEFON}
          {COMPANY.MERSIS_NO && (
            <><br /><strong>MERSİS:</strong> {COMPANY.MERSIS_NO}</>
          )}
        </p>

        <h2>2. İşlenen Kişisel Veriler ve Amaçları</h2>
        <p>
          Sitemiz aracılığıyla aşağıdaki kişisel verileriniz işlenmektedir:
        </p>
        <ul>
          <li><strong>Ad, soyad, e-posta, telefon:</strong> Sipariş, stok bildirimi ve iletişim formları aracılığıyla toplanır; sipariş sürecinin yürütülmesi, iletişim kurulması ve sözleşmesel yükümlülüklerin yerine getirilmesi amacıyla işlenir.</li>
          <li><strong>Teslimat ve fatura adresi:</strong> Ürün teslimi ve fatura düzenlenmesi amacıyla toplanır.</li>
          <li><strong>IP adresi ve ziyaretçi istatistikleri:</strong> Vercel Analytics hizmeti aracılığıyla anonim olarak toplanır; sitenin işlevselliğinin değerlendirilmesi amacıyla kullanılır.</li>
          <li><strong>Ödeme bilgileri:</strong> Ödeme işlemleri PCI-DSS uyumlu iyzico altyapısı üzerinden gerçekleşir; kart bilgileriniz sistemlerimizde işlenmez veya saklanmaz.</li>
        </ul>

        <h2>3. Kişisel Verilerin Aktarıldığı Taraflar ve Amaçlar</h2>
        <ul>
          <li><strong>iyzico Ödeme Hizmetleri A.Ş.:</strong> Ödeme işleminin gerçekleştirilmesi.</li>
          <li><strong>{COMPANY.KARGO_FIRMASI}:</strong> Teslimat adresinizin ürün gönderimi amacıyla iletilmesi.</li>
          <li><strong>Vercel Inc.:</strong> Site barındırma ve anonim analitik hizmetleri.</li>
        </ul>
        <p>
          Verileriniz yukarıda belirtilen amaçlar ve taraflar dışında üçüncü kişilerle paylaşılmaz,
          satılmaz ve kiralanmaz.
        </p>

        <h2>4. Toplama Yöntemi ve Hukuki Sebebi</h2>
        <p>
          Verileriniz; sipariş, stok bildirimi ve iletişim formları ile elektronik ortamda toplanmaktadır.
          İşlemenin hukuki sebepleri: sözleşmenin kurulması ve ifası (KVKK m. 5/2-c), meşru menfaat
          (KVKK m. 5/2-f) ve açık rıza (stok bildirimi iletişim izni için).
        </p>

        <h2>5. Saklama Süresi</h2>
        <p>
          Sipariş ve sözleşme kayıtları Türk Ticaret Kanunu ve ilgili mevzuat uyarınca asgari
          10 yıl, tüketici işlem kayıtları ise en az 3 yıl saklanır. Diğer veriler işleme amacının
          ortadan kalkmasıyla silinir veya anonim hale getirilir.
        </p>

        <h2>6. KVKK Madde 11 Kapsamındaki Haklarınız</h2>
        <p>
          Veri sahibi olarak aşağıdaki haklara sahipsiniz:
        </p>
        <ul>
          <li>Kişisel veri işlenip işlenmediğini öğrenme,</li>
          <li>İşlenmişse buna ilişkin bilgi talep etme,</li>
          <li>İşlenme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
          <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme,</li>
          <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme,</li>
          <li>Kanunun 7. maddesinde öngörülen şartlar çerçevesinde silinmesini veya yok edilmesini isteme,</li>
          <li>İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle kişinin kendisi aleyhine bir sonucun ortaya çıkmasına itiraz etme,</li>
          <li>Kanuna aykırı işlenmesi sebebiyle zarara uğraması hâlinde zararın giderilmesini talep etme.</li>
        </ul>
        <p>
          Haklarınızı kullanmak için{" "}
          <a href={`mailto:${COMPANY.EPOSTA}`}>{COMPANY.EPOSTA}</a> adresine yazabilirsiniz.
        </p>
      </div>
    </article>
  );
}
