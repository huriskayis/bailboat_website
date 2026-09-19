"use client";

import { useState, useRef, lazy, Suspense } from "react";
import type { HaritaNokta } from "./GolHaritasi";

const GolHaritasi = lazy(() => import("./GolHaritasi"));

type GolKonum = { lat: number; lng: number };
type MapData = { noktalar: HaritaNokta[] };

const HEDEF_BALIK = ["Sazan", "Yayın Balığı", "Turna", "Çipura / Levrek (baraj)", "Diğer"];
const HAVA = ["Açık ve güneşli", "Parçalı bulutlu", "Kapalı / bulutlu", "Yağmurlu", "Rüzgarlı"];
const SU_SICAKLIGI = ["Soğuk (10°C altı)", "Serin (10–15°C)", "Ilık (15–22°C)", "Sıcak (22°C üzeri)"];

const TURKEY_CENTER: GolKonum = { lat: 39.1, lng: 35.2 };

function buildMessage(form: { gol: string; hedef: string; hava: string; su: string; notlar: string }) {
  return `Göl/Nehir: ${form.gol}
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

async function geocodeGol(golAdi: string): Promise<GolKonum | null> {
  try {
    const q = encodeURIComponent(`${golAdi}, Türkiye`);
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?q=${q}&format=json&limit=1&countrycodes=tr`,
      { headers: { "User-Agent": "VelaAtolye/1.0" } }
    );
    const data = await res.json();
    if (data[0]) return { lat: parseFloat(data[0].lat), lng: parseFloat(data[0].lon) };
  } catch { /* ignore */ }
  return null;
}

export default function AsistanChat() {
  const [phase, setPhase] = useState<"form" | "loading" | "map">("form");
  const [form, setForm] = useState({ gol: "", hedef: HEDEF_BALIK[0], hawa: HAVA[0], su: SU_SICAKLIGI[2], notlar: "" });
  const [golKonum, setGolKonum] = useState<GolKonum>(TURKEY_CENTER);
  const [mapData, setMapData] = useState<MapData | null>(null);
  const [geocodeFailed, setGeocodeFailed] = useState(false);
  const bufRef = useRef("");

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleStart(e: React.FormEvent) {
    e.preventDefault();
    if (!form.gol.trim()) return;

    setPhase("loading");
    bufRef.current = "";

    // Geocode and AI call in parallel
    const [konum] = await Promise.allSettled([
      geocodeGol(form.gol).then((k) => {
        if (k) { setGolKonum(k); setGeocodeFailed(false); }
        else { setGeocodeFailed(true); }
        return k;
      }),
    ]);
    void konum;

    // AI call
    try {
      const res = await fetch("/api/asistan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: buildMessage({ ...form, hava: form.hawa }) }],
        }),
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
    setGeocodeFailed(false);
  }

  if (phase === "form") {
    return (
      <form className="asistan-form" onSubmit={handleStart}>
        <div className="field">
          <label htmlFor="as-gol">Göl veya Nehir Adı</label>
          <input
            id="as-gol" type="text" required
            value={form.gol} onChange={(e) => update("gol", e.target.value)}
            placeholder="örn. Atatürk Barajı, Kemer Gölü, Büyük Menderes..."
          />
        </div>
        <div className="field-row">
          <div className="field">
            <label htmlFor="as-hedef">Hedef Balık</label>
            <select id="as-hedef" value={form.hedef} onChange={(e) => update("hedef", e.target.value)}>
              {HEDEF_BALIK.map((b) => <option key={b}>{b}</option>)}
            </select>
          </div>
          <div className="field">
            <label htmlFor="as-hawa">Hava Durumu</label>
            <select id="as-hawa" value={form.hawa} onChange={(e) => update("hawa", e.target.value)}>
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

  // map phase
  return (
    <div className="asistan-map-phase">
      <div className="asistan-map-header">
        <div className="asistan-map-meta">
          <span className="eyebrow">{form.gol}</span>
          {geocodeFailed && (
            <span className="asistan-geo-warn">Konum bulunamadı — yaklaşık işaretleme</span>
          )}
        </div>
        <div className="asistan-map-legend">
          <span><span className="legend-dot" style={{ background: "#B08A4F" }} />Yem</span>
          <span><span className="legend-dot" style={{ background: "#0C1B26" }} />Bekleme</span>
          <span><span className="legend-dot" style={{ background: "#c0392b" }} />Dikkat</span>
        </div>
        <button className="btn btn--ghost asistan-reset-btn" onClick={handleReset} type="button">
          ← Yeni Arama
        </button>
      </div>

      {mapData ? (
        <div className="asistan-map-container">
          <Suspense fallback={<div className="asistan-harita-loading">Harita yükleniyor…</div>}>
            <GolHaritasi
              lat={golKonum.lat}
              lng={golKonum.lng}
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
