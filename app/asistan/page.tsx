import AsistanChat from "../components/AsistanChat";

export const metadata = {
  title: "Balık Asistanı — VELA Atölye",
  description: "Yapay zeka destekli balıkçılık danışmanı. Göl, hava ve hedef balığa göre yem bırakma stratejisi al.",
};

export default function AsistanPage() {
  return (
    <section className="wrap asistan-page">
      <header className="asistan-page__head">
        <p className="eyebrow">Yapay Zeka Danışmanı</p>
        <h1 className="section-title">Bugün nereye olta atayım?</h1>
        <p className="asistan-page__lead">
          Göl, hava ve hedef balık bilgilerini girin — yem bırakma stratejinizi
          yapay zeka hazırlasın.
        </p>
      </header>
      <AsistanChat />
    </section>
  );
}
