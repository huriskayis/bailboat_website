"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const nav = [
  { href: "/", label: "Anasayfa" },
  { href: "/koleksiyon", label: "Koleksiyon" },
  { href: "/atolye", label: "Atölye" },
  { href: "/servislerimiz", label: "Servislerimiz" },
  { href: "/sss", label: "SSS" },
  { href: "/iletisim", label: "İletişim" },
];

export default function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="wrap site-header__row">
        <Link href="/" className="wordmark" aria-label="VELA Atölye — anasayfa">
          VELA
          <span className="wordmark__sub">ATÖLYE</span>
        </Link>

        <nav className="site-nav" aria-label="Ana menü">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="site-nav__link">
              {n.label}
            </Link>
          ))}
        </nav>

        <button
          className="nav-toggle"
          aria-label="Menüyü aç"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </div>

      {open && (
        <nav className="site-nav--mobile" aria-label="Mobil menü">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)}>
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
