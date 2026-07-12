import Link from "next/link";

export const metadata = {
  title: "Servislerimiz — VELA Atölye",
  description: "Yem botunuz için uzun ömürlü pil ve batarya değişim hizmeti. Denizli'de profesyonel servis.",
};

export default function ServislerimizPage() {
  return (
    <section className="page servis">
      <div className="wrap">
        <header className="page__head">
          <p className="eyebrow">Servislerimiz</p>
          <h1 className="section-title">Pil & Batarya Değişimi</h1>
          <p className="page__lead">
            Elinizde bir yem botunuz var ama bataryasından memnun değil misiniz?
            Uzun ömürlü pillerimizle botunuzu yeniden güçlendiriyoruz.
          </p>
        </header>

        <div className="servis__grid">
          <div className="servis__content">
            <div className="servis__block">
              <p className="eyebrow">Ne Yapıyoruz?</p>
              <p>
                Mevcut yem botunuzun orijinal pilini söküp yerine yüksek kapasiteli,
                uzun dayanıklı bataryalarımızı takıyoruz. Markadan bağımsız tüm
                yem botu modellerine uyumlu çözümler sunuyoruz.
              </p>
            </div>

            <div className="servis__features">
              {[
                { title: "Uzun Ömürlü Hücreler", desc: "Standart pillerden %40'a kadar daha fazla kullanım süresi." },
                { title: "Tüm Modellere Uyum", desc: "Hangi marka veya model olursa olsun değişim yapıyoruz." },
                { title: "Hızlı Servis", desc: "Aynı gün teslim. Botunuzu bırakın, hazır olunca haber verelim." },
                { title: "Garanti", desc: "Tüm batarya değişimlerimiz 12 ay garantilidir." },
              ].map((f) => (
                <div key={f.title} className="servis__feature">
                  <hr className="rule" />
                  <p className="servis__feature-title">{f.title}</p>
                  <p className="servis__feature-desc">{f.desc}</p>
                </div>
              ))}
            </div>

            <Link href="/iletisim" className="btn" style={{ marginTop: "2rem" }}>
              Randevu Al
            </Link>
          </div>

          <div className="servis__map-col">
            <p className="eyebrow" style={{ marginBottom: "1rem" }}>Bizi Bulun</p>
            <p className="servis__address">
              Ali Usta Pil Batarya Değişim Merkezi<br />
              Denizli, Türkiye
            </p>
            <div className="servis__map">
              <iframe
                src="https://maps.google.com/maps?q=Ali+Usta+Pil+Batarya+De%C4%9Fi%C5%9Fim+Merkezi+Denizli&output=embed&hl=tr&z=15"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ali Usta Pil Batarya Değişim Merkezi — Denizli"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
