import ContactForm from "../components/ContactForm";

export const metadata = {
  title: "İletişim — VELA Atölye",
  description: "Atölyemizle iletişime geçin.",
};

export default function IletisimPage() {
  return (
    <section className="page contact">
      <div className="wrap contact__grid">
        <div className="contact__intro">
          <p className="eyebrow">İletişim</p>
          <h1 className="section-title">Atölyeye yazın</h1>
          <p className="page__lead">
            İlgilendiğiniz model, seyir planınız ya da özel bir talebiniz için
            bize birkaç satır bırakın. Ustalarımız size dönecek.
          </p>
          <div className="contact__detail">
            <p><span>Atölye</span>Denizli, Türkiye</p>
            <p><span>E-posta</span>info@velayembotu.com</p>
            <p><span>Telefon</span>+90 000 000 00 00</p>
          </div>
        </div>
        <div className="contact__form-wrap">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
