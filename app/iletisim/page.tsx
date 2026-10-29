import ContactForm from "../components/ContactForm";
import SocialLinks from "../components/SocialLinks";
import { COMPANY } from "@/lib/company";

export const metadata = {
  title: "İletişim — VELA Yem Botu",
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
            <p><span>Ünvan</span>{COMPANY.SATICI_UNVAN}</p>
            <p><span>Adres</span>{COMPANY.ADRES}</p>
            <p><span>Vergi Dairesi / VKN</span>{COMPANY.VERGI_DAIRESI} / {COMPANY.VKN}</p>
            {COMPANY.MERSIS_NO && (
              <p><span>MERSİS</span>{COMPANY.MERSIS_NO}</p>
            )}
            <p><span>Telefon</span>{COMPANY.TELEFON}</p>
            <p><span>E-posta</span><a href={`mailto:${COMPANY.EPOSTA}`}>{COMPANY.EPOSTA}</a></p>
            <p><span>WhatsApp</span>{COMPANY.WHATSAPP}</p>
            <p><span>Çalışma Saatleri</span>{COMPANY.CALISMA_SAATLERI}</p>
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
