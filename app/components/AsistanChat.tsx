"use client";

import { useState, useRef, lazy, Suspense } from "react";
import { GOL_LISTESI, BOLGE_LISTESI, golBul } from "../../lib/gol-listesi";
import type { HaritaNokta } from "./GolHaritasi";

const GolHaritasi = lazy(() => import("./GolHaritasi"));

type MapData = { noktalar: HaritaNokta[] };

const HEDEF_BALIK = ["Sazan", "Yayın Balığı", "Turna", "Çipura / Levrek (baraj)", "Diğer"];
const HAVA = ["Açık ve güneşli", "Parçalı bulutlu", "Kapalı / bulutlu", "Yağmurlu", "Rüzgarlı"];
const SU_SICAKLIGI = ["Soğuk (10°C altı)", "Serin (10–15°C)", "Ilık (15–22°C)", "Sıcak (22°C üzeri)"];

const ILKGOL = GOL_LISTESI[0].isim;

function buildMessage(form: { gol: string; hedef: string; hava: string; su: string; notlar: string }) {
  return `Göl/Baraj: ${form.gol}
Hedef balık: ${form.hedef}
Hava: ${form.hava}
Su sıcaklığı: ${form.su}${form.notlar ? `\nEk bilgi: ${form.notlar}` : ""}`;
}

function parseMapData(text: string): MapData | null {
  const start = text.indexOf("HARITA_BASLANGIC");
  const end = text.indexOf("HARITA_BITIS");
  if (start === -1 || end === -1) return null;
  const jsonStr = text.slice(start + "HARITA_BASLANGIC".length, end).trim();
  try {
    const parsed = JSON.parse(jsonStr);
    if (parsed && Array.isArray(parsed.noktalar)) return { noktalar: parsed.noktalar };
  } catch { /* ignore */ }
  return null;
}

export default function AsistanChat() {
  const [phase, setPhase] = useState<"form" | "loading" | "map">("form");
  const [form, setForm] = useState({ gol: ILKGOL, hedef: HEDEF_BALIK[0], hava: HAVA[0], su: SU_SICAKLIGI[2], notlar: "" });
  const [mapData, setMapData] = useState<MapData | null>(null);
  const bufRef = useRef("");

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleStart(e: React.FormEvent) {
    e.preventDefault();
    setPhase("loading");
    bufRef.current = "";

    try {
      const res = await fetch("/api/asistan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: buildMessage(form) }] }),
      });
      if (!res.ok || !res.body) throw new Error();

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        bufRef.current += decoder.decode(value, { stream: true });
      }

      const data = parseMapData(bufRef.current);
      if (data) setMapData(data);
    } catch { /* ignore */ }

    setPhase("map");
  }

  function handleReset() {
    setPhase("form");
    setMapData(null);
    bufRef.current = "";
  }

  const secilenGol = golBul(form.gol);

  if (phase === "form") {
    return (
      <form className="asistan-form" onSubmit={handleStart}>
        <div className="field">
          <label htmlFor="as-gol">Göl veya Baraj</label>
          <select id="as-gol" value={form.gol} onChange={(e) => update("gol", e.target.value)}>
            {BOLGE_LISTESI.map((bolge) => (
              <optgroup key={bolge} label={bolge}>
                {GOL_LISTESI.filter((g) => g.bolge === bolge).map((g) => (
                  <option key={g.isim} value={g.isim}>{g.isim}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>
        <div className="field-row">
          <div className="field">
            <label htmlFor="as-hedef">Hedef Balık</label>
            <select id="as-hedef" value={form.hedef} onChange={(e) => update("hedef", e.target.value)}>
              {HEDEF_BALIK.map((b) => <option key={b}>{b}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="as-hava">Hava Durumu</label>
            <select id="as-hava" value={form.hava} onChange={(e) => update("hava", e.target.value)}>
              {HAVA.map((h) => <option key={h}>{h}</option>)}
            </select>
          </div>
        </div>
        <div className="field">
          <label htmlFor="as-su">Su Sıcaklığı</label>
          <select id="as-su" value={form.su} onChange={(e) => update("su", e.target.value)}>
            {SU_SICAKLIGI.map((s) => <option key={s}>{s}</option>)}
          </select>
        </div>
        <div className="field">
          <label htmlFor="as-notlar">
            Ek Bilgi <span style={{ fontWeight: 300, opacity: 0.6 }}>(isteğe bağlı)</span>
          </label>
          <textarea
            id="as-notlar" rows={3}
            value={form.notlar} onChange={(e) => update("notlar", e.target.value)}
            placeholder="Derinlik, sazlık, akıntı, daha önce ne tuttunuz, günün saati..."
          />
        </div>
        <button className="btn" type="submit">Strateji Oluştur</button>
      </form>
    );
  }

  if (phase === "loading") {
    return (
      <div className="asistan-map-phase">
        <div className="asistan-map-header">
          <span className="eyebrow">{form.gol}</span>
        </div>
        <div className="asistan-map-container">
          <div className="asistan-map-overlay">
            <div className="asistan-map-spinner" />
            <p>Strateji hesaplanıyor…</p>
          </div>
          <div className="gol-haritasi" />
        </div>
      </div>
    );
  }

  return (
    <div className="asistan-map-phase">
      <div className="asistan-map-header">
        <span className="eyebrow">{form.gol}</span>
        <div className="asistan-map-legend">
          <span><span className="legend-dot" style={{ background: "#B08A4F" }} />Yem</span>
          <span><span className="legend-dot" style={{ background: "#0C1B26" }} />Bekleme</span>
          <span><span className="legend-dot" style={{ background: "#c0392b" }} />Dikkat</span>
        </div>
        <button className="btn btn--ghost asistan-reset-btn" onClick={handleReset} type="button">
          ← Yeni Arama
        </button>
      </div>

      {mapData && secilenGol ? (
        <div className="asistan-map-container">
          <Suspense fallback={<div className="asistan-harita-loading">Harita yükleniyor…</div>}>
            <GolHaritasi
              lat={secilenGol.lat}
              lng={secilenGol.lng}
              noktalar={mapData.noktalar}
              golAdi={form.gol}
            />
          </Suspense>
          <p className="asistan-map-hint">Noktalara tıklayarak tavsiyeyi okuyun</p>
        </div>
      ) : (
        <div className="asistan-map-container">
          <div className="asistan-map-overlay asistan-map-overlay--error">
            <p>Strateji oluşturulamadı.<br />Lütfen tekrar deneyin.</p>
            <button className="btn" onClick={handleReset} type="button">Geri Dön</button>
          </div>
        </div>
      )}
    </div>
  );
}
