import Link from "next/link";
import type { ReactNode } from "react";

export const metadata = {
  title: "VELA Uygulaması — Yem Botunuzu Telefonunuzdan Kontrol Edin",
  description: "VELA mobil uygulaması ile yem botunuzu telefonunuzdan yönetin. Türkçe arayüz, gelişmiş harita görünümü ve daha fazlası.",
};

function PhoneMockup({ screen }: { screen: "map" | "control" | "settings" }) {
  return (
    <div className="app-phone">
      <div className="app-phone__frame">
        <div className="app-phone__notch" />
        <div className="app-phone__screen">
          {screen === "map" && <MapScreen />}
          {screen === "control" && <ControlScreen />}
          {screen === "settings" && <SettingsScreen />}
        </div>
      </div>
    </div>
  );
}

function MapScreen() {
  return (
    <div className="mock-screen mock-screen--map">
      <div className="mock-statusbar">
        <span>09:41</span><span>●●●</span>
      </div>
      <div className="mock-map">
        {/* Grid lines simulating map */}
        <svg width="100%" height="100%" viewBox="0 0 200 260" preserveAspectRatio="xMidYMid slice">
          {/* Map background */}
          <rect width="200" height="260" fill="#1a3a4a" />
          {/* Water texture lines */}
          {[0,20,40,60,80,100,120,140,160,180,200,220,240,260].map(y => (
            <line key={y} x1="0" y1={y} x2="200" y2={y} stroke="#1e4255" strokeWidth="0.5" />
          ))}
          {[0,25,50,75,100,125,150,175,200].map(x => (
            <line key={x} x1={x} y1="0" x2={x} y2="260" stroke="#1e4255" strokeWidth="0.5" />
          ))}
          {/* Shore / land area */}
          <path d="M0 180 Q40 160 80 170 Q120 180 160 165 Q180 158 200 162 L200 260 L0 260 Z" fill="#2a4a35" opacity="0.6" />
          {/* Path trail */}
          <polyline points="100,130 95,115 90,100 88,85 92,70 100,58" stroke="#B08A4F" strokeWidth="1.5" strokeDasharray="3,2" fill="none" opacity="0.8" />
          {/* Boat position */}
          <circle cx="100" cy="130" r="6" fill="#B08A4F" opacity="0.3" />
          <circle cx="100" cy="130" r="3" fill="#B08A4F" />
          {/* Target point */}
          <circle cx="100" cy="58" r="5" fill="none" stroke="#B08A4F" strokeWidth="1.5" />
          <circle cx="100" cy="58" r="2" fill="#B08A4F" />
          {/* Scale bar */}
          <line x1="20" y1="245" x2="60" y2="245" stroke="#94A6AC" strokeWidth="1" />
          <text x="30" y="242" fill="#94A6AC" fontSize="6" fontFamily="sans-serif">50 m</text>
        </svg>
        <div className="mock-map__badge">Canlı Konum</div>
      </div>
      <div className="mock-bottom-bar">
        <span className="mock-stat"><span>Hız</span>2.4 km/s</span>
        <span className="mock-stat"><span>Mesafe</span>87 m</span>
        <span className="mock-stat"><span>Pil</span>76%</span>
      </div>
    </div>
  );
}

function ControlScreen() {
  return (
    <div className="mock-screen mock-screen--control">
      <div className="mock-statusbar mock-statusbar--light">
        <span>09:41</span><span>●●●</span>
      </div>
      <div className="mock-control-header">
        <p className="mock-label">Kontrol Paneli</p>
        <p className="mock-boat-name">Poyraz</p>
      </div>
      <div className="mock-joystick-area">
        <div className="mock-joystick">
          <div className="mock-joystick__ring" />
          <div className="mock-joystick__dot" />
          {["↑","↓","←","→"].map((d,i) => (
            <span key={i} className={`mock-arrow mock-arrow--${["up","down","left","right"][i]}`}>{d}</span>
          ))}
        </div>
      </div>
      <div className="mock-controls-row">
        <button className="mock-btn">Yem Bırak</button>
        <button className="mock-btn mock-btn--active">Dön</button>
      </div>
      <div className="mock-speed-bar">
        <span className="mock-label">Hız</span>
        <div className="mock-bar"><div className="mock-bar__fill" style={{width:"55%"}} /></div>
        <span className="mock-label">%55</span>
      </div>
    </div>
  );
}

function SettingsScreen() {
  return (
    <div className="mock-screen mock-screen--settings">
      <div className="mock-statusbar mock-statusbar--light">
        <span>09:41</span><span>●●●</span>
      </div>
      <div className="mock-control-header">
        <p className="mock-label">Ayarlar</p>
        <p className="mock-boat-name">Uygulama</p>
      </div>
      <div className="mock-settings-list">
        {[
          { label: "Dil", value: "Türkçe ✓" },
          { label: "Harita Görünümü", value: "Uydu" },
          { label: "Hız Sınırı", value: "Açık" },
          { label: "Bildirimler", value: "Açık" },
          { label: "Bağlantı", value: "Wi-Fi" },
        ].map((item) => (
          <div key={item.label} className="mock-setting-row">
            <span>{item.label}</span>
            <span className="mock-setting-val">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const features: { eyebrow: string; title: ReactNode; desc: string; screen: "map" | "control" | "settings" }[] = [
  {
    eyebrow: "Türkçe Arayüz",
    title: <><mark>Türkçe</mark> — anlaşılır,<br />sade kontrol</>,
    desc: "Uygulamamız baştan sona Türkçe tasarlandı. Menüler, uyarılar ve ayarlar — hepsi dilediğiniz gibi anlaşılır. Tekniğe değil, balığa odaklanın.",
    screen: "settings" as const,
  },
  {
    eyebrow: "Gelişmiş Harita",
    title: "Uydu görüntüsü, hassas konum",
    desc: "Yüksek çözünürlüklü uydu haritası üzerinde teknenizin anlık konumunu, rotasını ve yem bıraktığı noktaları gerçek zamanlı takip edin.",
    screen: "map" as const,
  },
  {
    eyebrow: "Kumanda Yok, Yatırım Var",
    title: "Her kuruş tekneye gidiyor",
    desc: "Ayrıca kumanda almanıza gerek yok. Bu bütçeyi teknenin kalitesine, donanımına ve yazılımın sürekli geliştirilmesine aktarıyoruz. Telefon zaten cebinizde.",
    screen: "control" as const,
  },
];

export default function UygulamaPage() {
  return (
    <section className="page uygulama">
      <div className="wrap">
        <header className="page__head">
          <p className="eyebrow">Uygulama</p>
          <h1 className="section-title">Telefonunuz,<br />yeni kumandanız</h1>
          <p className="page__lead">
            VELA tekneleri, özel geliştirdiğimiz mobil uygulama ile kontrol edilir.
            Kumanda kutusu yok — sadece telefonunuz ve su.
          </p>
        </header>

        <div className="app-features">
          {features.map((f, i) => (
            <div key={f.eyebrow} className={`app-feature ${i % 2 === 1 ? "app-feature--reverse" : ""}`}>
              <div className="app-feature__text">
                <p className="eyebrow">{f.eyebrow}</p>
                <h2 className="app-feature__title">{f.title}</h2>
                <p className="app-feature__desc">{f.desc}</p>
              </div>
              <div className="app-feature__visual">
                <PhoneMockup screen={f.screen} />
              </div>
            </div>
          ))}
        </div>

        <div className="app-cta">
          <p className="eyebrow">İlginizi mi çekti?</p>
          <p className="app-cta__text">Uygulamayı görmek veya tekne hakkında bilgi almak için bize yazın.</p>
          <Link href="/iletisim" className="btn">Atölyeye Yazın</Link>
        </div>
      </div>
    </section>
  );
}
