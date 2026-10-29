import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Hakkımızda — El Yapımı Yem Botu Atölyesi Denizli",
  description: "Denizli'de el yapımı yem botu üretiyoruz. Her bot tek tek, yüksek kalite malzemelerle inşa edilir.",
};

const degerler = [
  {
    baslik: "El İşçiliği",
    aciklama: "Her tekne makineden değil ustanın elinden çıkar. Her parça, her detay tek tek ve özenle işlenir.",
  },
  {
    baslik: "Yerli Üretim",
    aciklama: "Tasarım, üretim ve montajın tamamı Denizli'deki atölyemizde yapılır. Yerli, özgün, sahici.",
  },
  {
    baslik: "Satış Sonrası Destek",
    aciklama: "Teknenizi teslim aldıktan sonra da yanınızdayız. Yedek parça, tamir ve onarım için bize ulaşın.",
  },
];

export default function AtolyePage() {
  return (
    <section className="page atolye">
      <div className="wrap">
        <header className="page__head">
          <p className="eyebrow">Atölye</p>
          <h1 className="section-title">El işçiliği, ustanın imzası</h1>
          <p className="page__lead">
            Atölyemizde her tekne tümüyle elle inşa edilir.
          </p>
        </header>

        <div className="atolye__grid">
          <div className="atolye__photo">
            <Image
              src="/images/atolye-ekip.jpg"
              alt="VELA ekibi — baba ve kızları, yem botu ile"
              fill
              sizes="(max-width: 860px) 100vw, 45vw"
              style={{ objectFit: "cover", objectPosition: "center 60%" }}
              priority
            />
          </div>
          <div className="atolye__text">
            <p className="atolye__quote">
              "Raflar ithal ürünlerle doluydu, yerli üretim neredeyse yoktu."
            </p>
            <p>
              VELA, bir babanın ve kızlarının ortak girişimiyle doğdu. Yem botu
              piyasasına baktığımızda gördüğümüz tablo netti: raflar ithal ürünlerle
              doluydu, yerli üretim neredeyse yoktu. Bu boşluğu doldurmak için kol
              sıvadık — Denizli'deki atölyemizde, kendi elimizle, kendi tasarımımızla ürettik.
            </p>
            <p>
              Her tekne; tasarımını yapan, geliştiren ve birleştiren aynı küçük ekibin
              elinden çıkar. Kullanılan her malzeme bu iş için özenle seçilir.
            </p>
            <Link href="/iletisim" className="btn" style={{ marginTop: "1rem", display: "inline-flex" }}>
              Bize Yazın
            </Link>
          </div>
        </div>

        <div className="atolye__degerler">
          {degerler.map((d) => (
            <div key={d.baslik} className="atolye__deger">
              <hr className="rule" />
              <p className="atolye__deger-baslik">{d.baslik}</p>
              <p className="atolye__deger-aciklama">{d.aciklama}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
