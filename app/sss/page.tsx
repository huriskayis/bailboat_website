export const metadata = {
  title: "Sıkça Sorulan Sorular — VELA Atölye",
  description: "Yem botları hakkında merak ettiğiniz her şey.",
};

const faqs = [
  {
    q: "Yem botu ile birlikte yedek batarya geliyor mu?",
    a: 'Paket içeriğinde bir adet yüksek kapasiteli batarya yer almaktadır. Uzun süreli kullanımlar için yedek batarya ihtiyacınız olursa, sitemizdeki "Aksesuarlar" bölümünden kolaylıkla temin edebilirsiniz.',
  },
  {
    q: "Yem botunu nasıl kontrol edebilirim? Kumandası var mı?",
    a: "Yem botumuz geleneksel kumandalar yerine çok daha gelişmiş ve kullanıcı dostu bir mobil uygulama ile kontrol edilmektedir. Uygulama üzerinden botun tüm hareketlerini yönetebilir, gelişmiş navigasyon özelliklerini kullanabilir ve anlık verileri takip edebilirsiniz.",
  },
  {
    q: "Yedek parça konusunda sorun yaşar mıyım?",
    a: "Müşteri memnuniyetini önemsiyoruz. Batarya, pervane ve diğer tüm yedek parça ihtiyaçlarınız için sitemizdeki ilgili kategorileri ziyaret edebilirsiniz. İhtiyacınız olan her parça stoklarımızda düzenli olarak bulunmaktadır.",
  },
  {
    q: "Yem botunu araç çakmaklığından şarj edebilir miyim?",
    a: "Evet, uygun bir dönüştürücü (invertör) kullanarak botunuzu araç içinde de kolaylıkla şarj edebilirsiniz. Bu sayede av sahasında veya teknede elektriğe doğrudan erişiminiz olmasa bile bataryalarınızı taze tutabilirsiniz.",
  },
  {
    q: "Botun şarj durumunu nasıl takip ederim? Şarjı biterse ne olur?",
    a: "Botunuzun şarj durumunu mobil uygulama üzerinden anlık olarak takip edebilirsiniz. Güvenliğiniz için geliştirilen sistem, şarj seviyesi kritik bir düzeye geldiğinde sizi uyarır ve botunuzun başlangıç noktasına otomatik olarak geri dönmesini sağlar.",
  },
  {
    q: "Botun kaç konum (nokta) hafızası var?",
    a: "Yem botumuz gelişmiş GPS sistemi sayesinde 20 farklı konumu hafızasında tutabilir. İstediğiniz yemleme noktalarını uygulamaya kaydedebilir ve botunuzun tam olarak hedeflediğiniz koordinata hatasız gitmesini sağlayabilirsiniz.",
  },
  {
    q: "Uygulama ve kullanım kılavuzu Türkçe mi?",
    a: "Evet, hem mobil uygulamamız hem de ürünle birlikte gelen kullanım kılavuzumuz tamamen Türkçe dil desteğine sahiptir. Kurulumdan kullanıma kadar her adımda size rehberlik edecek şekilde tasarlanmıştır.",
  },
  {
    q: "Teknik destek veya kurulum yardımı alabilir miyim?",
    a: "Elbette! Satın alım öncesi veya sonrası tüm sorularınız için WhatsApp destek hattımızdan veya web sitemizdeki iletişim formundan bize dilediğiniz zaman ulaşabilirsiniz. Ekibimiz, botunuzun kurulumu ve kullanımı konusunda size her türlü desteği sağlamaya hazırdır.",
  },
];

export default function SSSPage() {
  return (
    <section className="page sss">
      <div className="wrap">
        <header className="page__head">
          <p className="eyebrow">Destek</p>
          <h1 className="section-title">Sıkça Sorulan Sorular</h1>
          <p className="page__lead">
            Yem botları hakkında merak ettiğiniz her şeyin yanıtı burada.
          </p>
        </header>

        <dl className="faq-list">
          {faqs.map((item, i) => (
            <details key={i} className="faq-item">
              <summary className="faq-item__q">
                <span>{item.q}</span>
                <span className="faq-item__icon" aria-hidden="true" />
              </summary>
              <dd className="faq-item__a">{item.a}</dd>
            </details>
          ))}
        </dl>
      </div>
    </section>
  );
}
