"use client";

import { useEffect, useRef } from "react";

export type HaritaNokta = {
  isim: string;
  yon: string;
  mesafe: number;
  tip: "yem" | "bekleme" | "dikkat";
  aciklama: string;
};

type Props = {
  lat: number;
  lng: number;
  noktalar: HaritaNokta[];
  golAdi: string;
};

const YON_VEKTORU: Record<string, [number, number]> = {
  "kuzey":       [1, 0],
  "kuzey-dogu":  [0.7, 0.7],
  "dogu":        [0, 1],
  "guney-dogu":  [-0.7, 0.7],
  "guney":       [-1, 0],
  "guney-bati":  [-0.7, -0.7],
  "bati":        [0, -1],
  "kuzey-bati":  [0.7, -0.7],
  "merkez":      [0, 0],
};

const TIP_RENK: Record<string, string> = {
  yem:     "#B08A4F",
  bekleme: "#0C1B26",
  dikkat:  "#c0392b",
};

const TIP_ETIKET: Record<string, string> = {
  yem:     "Yem",
  bekleme: "Bekleme",
  dikkat:  "Dikkat",
};

const BASE_OFFSET = 0.025;

export default function GolHaritasi({ lat, lng, noktalar, golAdi }: Props) {
  const mapRef = useRef<HTMLDivElement>(null);
  const instanceRef = useRef<unknown>(null);

  useEffect(() => {
    if (!mapRef.current || instanceRef.current) return;

    import("leaflet").then((L) => {
      if (!mapRef.current || instanceRef.current) return;

      // Fix default icon paths for Next.js
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      delete (L.Icon.Default.prototype as any)._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });

      const map = L.map(mapRef.current, { zoomControl: true }).setView([lat, lng], 13);
      instanceRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 18,
      }).addTo(map);

      // Lake center marker
      const centerIcon = L.divIcon({
        html: `<div style="width:12px;height:12px;border-radius:50%;background:#1C3742;border:2px solid #B08A4F;"></div>`,
        className: "",
        iconSize: [12, 12],
        iconAnchor: [6, 6],
      });
      L.marker([lat, lng], { icon: centerIcon })
        .addTo(map)
        .bindPopup(`<strong>${golAdi}</strong><br>Merkez`);

      // Strategy point markers
      noktalar.forEach((nokta, i) => {
        const [dy, dx] = YON_VEKTORU[nokta.yon] ?? [0, 0];
        const nLat = lat + dy * BASE_OFFSET * nokta.mesafe;
        const nLng = lng + dx * BASE_OFFSET * nokta.mesafe;
        const renk = TIP_RENK[nokta.tip] ?? "#B08A4F";
        const etiket = TIP_ETIKET[nokta.tip] ?? nokta.tip;

        const icon = L.divIcon({
          html: `<div style="
            min-width:28px;padding:3px 7px;
            background:${renk};color:#EFEAE0;
            font-size:11px;font-weight:600;letter-spacing:0.05em;
            border-radius:2px;white-space:nowrap;
            box-shadow:0 2px 6px rgba(0,0,0,0.25);
          ">${i + 1}. ${nokta.isim}</div>`,
          className: "",
          iconAnchor: [14, 14],
        });

        L.marker([nLat, nLng], { icon })
          .addTo(map)
          .bindPopup(`
            <strong>${nokta.isim}</strong>
            <span style="display:inline-block;margin-left:6px;padding:1px 5px;background:${renk};color:#fff;font-size:10px;border-radius:2px;">${etiket}</span>
            <br><br>${nokta.aciklama}
          `);
      });

      // Fit bounds to all markers
      if (noktalar.length > 0) {
        const allPoints: L.LatLngExpression[] = [[lat, lng], ...noktalar.map((n) => {
          const [dy, dx] = YON_VEKTORU[n.yon] ?? [0, 0];
          return [lat + dy * BASE_OFFSET * n.mesafe, lng + dx * BASE_OFFSET * n.mesafe] as L.LatLngExpression;
        })];
        map.fitBounds(L.latLngBounds(allPoints), { padding: [40, 40] });
      }
    });

    return () => {
      if (instanceRef.current) {
        (instanceRef.current as { remove: () => void }).remove();
        instanceRef.current = null;
      }
    };
  }, [lat, lng, noktalar, golAdi]);

  return <div ref={mapRef} className="gol-haritasi" />;
}
