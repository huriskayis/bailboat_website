import Link from "next/link";
import Image from "next/image";
import WindMark from "./WindMark";
import SocialLinks from "./SocialLinks";
import { COMPANY } from "@/lib/company";

function TroyLogo() {
  return (
    <Image
      src="/images/troy-logo.png"
      alt="Troy"
      width={72}
      height={34}
      style={{ objectFit: "contain" }}
    />
  );
}

function VisaLogo() {
  return (
    <svg width="50" height="32" viewBox="0 0 50 32" fill="none" aria-label="Visa" role="img">
      <rect width="50" height="32" rx="4" fill="#1A1F71" />
      <text x="25" y="22" textAnchor="middle" fill="white" fontSize="14" fontWeight="700"
        fontFamily="Arial, sans-serif" fontStyle="italic" letterSpacing="1">
        VISA
      </text>
    </svg>
  );
}

function MastercardLogo() {
  return (
    <svg width="50" height="32" viewBox="0 0 50 32" fill="none" aria-label="Mastercard" role="img">
      <rect width="50" height="32" rx="4" fill="#252525" />
      <circle cx="19" cy="16" r="9" fill="#EB001B" />
      <circle cx="31" cy="16" r="9" fill="#F79E1B" />
      <path d="M25 9.27A9 9 0 0 1 31 16a9 9 0 0 1-6 6.73A9 9 0 0 1 19 16a9 9 0 0 1 6-6.73Z" fill="#FF5F00" />
    </svg>
  );
}

function IyzicoLogo() {
  return (
    <svg width="72" height="32" viewBox="0 0 72 32" fill="none" aria-label="iyzico ile öde" role="img">
      <rect width="72" height="32" rx="4" fill="#00AEF0" />
      <text x="36" y="20" textAnchor="middle" fill="white" fontSize="13" fontWeight="700"
        fontFamily="Arial, sans-serif" letterSpacing="0.5">
        iyzico
      </text>
    </svg>
  );
}

export default function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="wrap site-footer__grid">
        <div className="site-footer__brand">
          <WindMark size={64} />
          <p className="wordmark wordmark--footer">
            VELA<span className="wordmark__sub">ATÖLYE</span>
          </p>
          <p className="site-footer__note">
            Atölyemizde el işçiliğiyle inşa edilen yem botları.
          </p>
          <SocialLinks className="site-footer__social" />
        </div>

        <div className="site-footer__cols">
          <div>
            <p className="site-footer__head">Keşfet</p>
            <Link href="/koleksiyon">Koleksiyon</Link>
            <Link href="/atolye">Hakkımızda</Link>
            <Link href="/iletisim">İletişim</Link>
          </div>
          <div>
            <p className="site-footer__head">Yasal</p>
            <Link href="/on-bilgilendirme">Ön Bilgilendirme Formu</Link>
            <Link href="/mesafeli-satis">Mesafeli Satış Sözleşmesi</Link>
            <Link href="/teslimat-ve-iade">Teslimat ve İade</Link>
            <Link href="/gizlilik">Gizlilik Politikası</Link>
            <Link href="/kvkk-aydinlatma">KVKK Aydınlatma Metni</Link>
            <Link href="/cerez-politikasi">Çerez Politikası</Link>
          </div>
          <div>
            <p className="site-footer__head">Satıcı</p>
            <p style={{ fontSize: "0.8rem", lineHeight: 1.5, opacity: 0.7 }}>
              {COMPANY.SATICI_UNVAN}<br />
              {COMPANY.ADRES}<br />
              VKN: {COMPANY.VKN}<br />
              {COMPANY.TELEFON}<br />
              <a href={`mailto:${COMPANY.EPOSTA}`}>{COMPANY.EPOSTA}</a>
            </p>
          </div>
        </div>
      </div>

      <div className="wrap site-footer__payments">
        <span className="site-footer__payments-label">Güvenli Ödeme</span>
        <div className="site-footer__payment-logos">
          <TroyLogo />
          <VisaLogo />
          <MastercardLogo />
          <IyzicoLogo />
        </div>
      </div>

      <div className="wrap site-footer__base">
        <span>© {new Date().getFullYear()} {COMPANY.SATICI_UNVAN}</span>
        <span>El yapımı · Sınırlı sayıda</span>
      </div>
    </footer>
  );
}
