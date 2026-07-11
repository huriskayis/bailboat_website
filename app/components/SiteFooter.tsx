import Link from "next/link";
import WindMark from "./WindMark";

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
            Dünya standartlarında, atölyemizde el işçiliğiyle inşa edilen yelkenliler.
          </p>
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
            <span>Tersane Caddesi No. 1</span>
            <span>Bodrum, Türkiye</span>
            <a href="mailto:atolye@vela.example">atolye@vela.example</a>
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
