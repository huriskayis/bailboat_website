import Link from "next/link";
import WindMark from "./WindMark";
import SocialLinks from "./SocialLinks";

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
            <Link href="/atolye">Atölye</Link>
            <Link href="/iletisim">İletişim</Link>
          </div>
          <div>
            <p className="site-footer__head">Atölye</p>
            <span>Denizli, Türkiye</span>
            <a href="mailto:info@velayembotu.com">info@velayembotu.com</a>
          </div>
        </div>
      </div>

      <div className="wrap site-footer__base">
        <span>© {new Date().getFullYear()} VELA Atölye</span>
        <span>El yapımı · Sınırlı sayıda</span>
      </div>
    </footer>
  );
}
