"use client";

import { useState, useEffect, useRef } from "react";
import { getProduct, formatPrice } from "@/lib/products";

type Status = "idle" | "sending" | "sent" | "error";
type KaporaStatus = "idle" | "paying" | "error";

export default function PreorderModal({
  productName,
  productSlug,
  onClose,
}: {
  productName: string;
  productSlug: string;
  onClose: () => void;
}) {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", phone: "", quantity: "1", message: "" });
  const [kaporaStatus, setKaporaStatus] = useState<KaporaStatus>("idle");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const iyzipayRef = useRef<HTMLDivElement>(null);

  const product = getProduct(productSlug);
  const adet = parseInt(form.quantity, 10) || 1;
  const isToplu = adet > 1;

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function updateQuantity(value: string) {
    const digits = value.replace(/\D/g, "");
    setForm((f) => ({ ...f, quantity: digits }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    const qty = parseInt(form.quantity, 10);
    const quantityLine = qty > 1 ? `\nAdet: ${qty}` : "";
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, message: `[Ön Sipariş — ${productName}]${quantityLine}\n${form.message}` }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  async function handleKaporaPay(e: React.FormEvent) {
    e.preventDefault();
    setKaporaStatus("paying");

    try {
      const res = await fetch("/api/kapora", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          slug: productSlug,
          adet,
          name: form.name,
          email: form.email,
          phone: form.phone,
          city,
          address,
        }),
      });

      const data = await res.json();

      if (!res.ok || !data.checkoutFormContent) {
        setKaporaStatus("error");
        return;
      }

      if (iyzipayRef.current) {
        iyzipayRef.current.innerHTML = data.checkoutFormContent;
        iyzipayRef.current.querySelectorAll("script").forEach((oldScript) => {
          const script = document.createElement("script");
          if (oldScript.getAttribute("src")) {
            script.src = oldScript.getAttribute("src")!;
          } else {
            script.textContent = oldScript.textContent;
          }
          document.body.appendChild(script);
        });
      }

      setKaporaStatus("idle");
    } catch {
      setKaporaStatus("error");
    }
  }

  return (
    <div className="preorder-overlay" onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className="preorder-modal">
        <button className="preorder-modal__close" onClick={onClose} aria-label="Kapat">✕</button>

        {status === "sent" && !isToplu ? (
          <div className="form-done">
            <p className="eyebrow">Talebiniz alındı</p>
            <p className="form-done__text">
              Size bir onay maili gönderdik. Teslimat tarihi ve ödeme detayları için en kısa sürede dönüş yapacağız.
            </p>
          </div>

        ) : status === "sent" && isToplu ? (
          <div>
            <div className="form-done" style={{ marginBottom: "2rem" }}>
              <p className="eyebrow">Talebiniz alındı</p>
              <p className="form-done__text">
                {adet} adet sipariş talebiniz iletildi. Şimdi 1 bot fiyatı kapora ödeyerek siparişinizi garantileyin.
              </p>
            </div>

            <div className="preorder-modal__head">
              <p className="eyebrow">Kapora Ödemesi</p>
              <p className="preorder-modal__desc">
                {product && (
                  <>
                    <strong>{formatPrice(product.priceCents)}</strong> — 1 × {productName} bedeli kapora olarak alınır.
                    Kalan tutar teslimat öncesinde en fazla 6 taksitle ödenir.
                  </>
                )}
              </p>
            </div>

            <form className="contact-form" onSubmit={handleKaporaPay}>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="kp-city">Şehir</label>
                  <input
                    id="kp-city" type="text" required
                    value={city} onChange={(e) => setCity(e.target.value)}
                    placeholder="İstanbul"
                  />
                </div>
                <div className="field">
                  <label htmlFor="kp-address">Adres</label>
                  <input
                    id="kp-address" type="text" required
                    value={address} onChange={(e) => setAddress(e.target.value)}
                    placeholder="Mahalle, cadde, no"
                  />
                </div>
              </div>
              <div className="contact-form__foot">
                <button className="btn" type="submit" disabled={kaporaStatus === "paying"}>
                  {kaporaStatus === "paying"
                    ? "Yönlendiriliyor…"
                    : product
                    ? `Kapora Öde — ${formatPrice(product.priceCents)}`
                    : "Kapora Öde"}
                </button>
                {kaporaStatus === "error" && (
                  <p className="buybox__error">Ödeme başlatılamadı, lütfen tekrar deneyin.</p>
                )}
              </div>
            </form>
          </div>

        ) : (
          <>
            <div className="preorder-modal__head">
              <p className="eyebrow">Ön Sipariş</p>
              <h2 className="preorder-modal__title">{productName}</h2>
              <p className="preorder-modal__desc">
                Formu doldurun, sizi arayalım. Teslimat tarihi ve ödeme detaylarını birlikte netleştiririz — şimdi ödeme yapmanıza gerek yok.
              </p>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="field">
                <label htmlFor="po-name">Ad Soyad</label>
                <input
                  id="po-name" type="text" required
                  value={form.name} onChange={(e) => update("name", e.target.value)}
                  placeholder="Adınız ve soyadınız"
                />
              </div>
              <div className="field">
                <label htmlFor="po-quantity">Adet</label>
                <input
                  id="po-quantity" type="text" inputMode="numeric" required
                  value={form.quantity}
                  onChange={(e) => updateQuantity(e.target.value)}
                  style={{ maxWidth: "8rem" }}
                />
              </div>
              <div className="field-row">
                <div className="field">
                  <label htmlFor="po-phone">Telefon</label>
                  <input
                    id="po-phone" type="tel" required
                    value={form.phone} onChange={(e) => update("phone", e.target.value)}
                    placeholder="+90 5xx xxx xx xx"
                  />
                </div>
                <div className="field">
                  <label htmlFor="po-email">E-posta</label>
                  <input
                    id="po-email" type="email"
                    value={form.email} onChange={(e) => update("email", e.target.value)}
                    placeholder="ornek@eposta.com"
                  />
                </div>
              </div>
              <div className="field">
                <label htmlFor="po-message">Notunuz <span style={{ fontWeight: 300, opacity: 0.6 }}>(isteğe bağlı)</span></label>
                <textarea
                  id="po-message" rows={3}
                  value={form.message} onChange={(e) => update("message", e.target.value)}
                  placeholder="Özel bir talebiniz veya sorunuz varsa buraya yazabilirsiniz."
                />
              </div>
              <div className="contact-form__foot">
                <button className="btn" type="submit" disabled={status === "sending"}>
                  {status === "sending" ? "Gönderiliyor…" : "Ön Sipariş Talebi Gönder"}
                </button>
                {status === "error" && (
                  <p className="buybox__error">Gönderilemedi, lütfen tekrar deneyin.</p>
                )}
              </div>
            </form>
          </>
        )}

        {/* iyzico ödeme formunun açılacağı nokta */}
        <div ref={iyzipayRef} id="iyzipay-checkout-form" className="responsive" />
      </div>
    </div>
  );
}
