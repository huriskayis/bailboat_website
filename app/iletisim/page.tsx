import ContactForm from "../components/ContactForm";
import SocialLinks from "../components/SocialLinks";

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
            İlgilendiğiniz model için bize birkaç satır bırakın.
            Ustalarımız size dönecek.
          </p>
          <div className="contact__detail">
            <p><span>Atölye</span>Denizli, Türkiye</p>
            <p><span>E-posta</span>info@velayembotu.com</p>
          </div>
          <div className="contact__social-block">
            <p className="contact__social-label">Atölyeden canlı</p>
            <p className="contact__social-desc">
              Yapım aşamasını, deneme sürüşlerini ve teslim anlarını
              sosyal medyadan takip edin.
            </p>
            <SocialLinks className="contact__social" />
          </div>
        </div>
        <div className="contact__form-wrap">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
