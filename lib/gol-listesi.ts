export type GolYer = {
  isim: string;
  lat: number;
  lng: number;
  bolge: string;
};

export const GOL_LISTESI: GolYer[] = [
  // Ege & Akdeniz
  { isim: "Bafa Gölü",          lat: 37.495, lng: 27.522, bolge: "Ege / Akdeniz" },
  { isim: "Kemer Barajı",       lat: 37.601, lng: 28.047, bolge: "Ege / Akdeniz" },
  { isim: "Avlan Gölü",         lat: 36.743, lng: 29.686, bolge: "Ege / Akdeniz" },
  { isim: "Kovada Gölü",        lat: 37.748, lng: 30.850, bolge: "Ege / Akdeniz" },
  { isim: "Eğirdir Gölü",       lat: 37.920, lng: 30.870, bolge: "Ege / Akdeniz" },
  { isim: "Beyşehir Gölü",      lat: 37.690, lng: 31.640, bolge: "Ege / Akdeniz" },
  { isim: "Suğla Gölü",         lat: 37.502, lng: 31.958, bolge: "Ege / Akdeniz" },

  // Marmara & Trakya
  { isim: "Uluabat Gölü",       lat: 40.168, lng: 28.585, bolge: "Marmara / Trakya" },
  { isim: "Manyas Gölü",        lat: 40.198, lng: 28.008, bolge: "Marmara / Trakya" },
  { isim: "İznik Gölü",         lat: 40.432, lng: 29.520, bolge: "Marmara / Trakya" },
  { isim: "Sapanca Gölü",       lat: 40.701, lng: 30.254, bolge: "Marmara / Trakya" },
  { isim: "Büyükçekmece Gölü",  lat: 41.020, lng: 28.578, bolge: "Marmara / Trakya" },
  { isim: "Terkos Gölü",        lat: 41.355, lng: 28.612, bolge: "Marmara / Trakya" },
  { isim: "Ömerli Barajı",      lat: 41.055, lng: 29.313, bolge: "Marmara / Trakya" },

  // İç Anadolu
  { isim: "Akşehir Gölü",       lat: 38.378, lng: 31.479, bolge: "İç Anadolu" },
  { isim: "Eber Gölü",          lat: 38.648, lng: 31.372, bolge: "İç Anadolu" },
  { isim: "Hirfanlı Barajı",    lat: 39.120, lng: 33.516, bolge: "İç Anadolu" },
  { isim: "Porsuk Barajı",      lat: 39.780, lng: 30.480, bolge: "İç Anadolu" },
  { isim: "Sarıyar Barajı",     lat: 40.055, lng: 31.402, bolge: "İç Anadolu" },
  { isim: "Mogan Gölü",         lat: 39.780, lng: 32.770, bolge: "İç Anadolu" },
  { isim: "Eymir Gölü",         lat: 39.895, lng: 32.775, bolge: "İç Anadolu" },
  { isim: "Gölbaşı Gölü",       lat: 39.790, lng: 32.806, bolge: "İç Anadolu" },

  // Karadeniz
  { isim: "Abant Gölü",         lat: 40.603, lng: 31.280, bolge: "Karadeniz" },
  { isim: "Almus Barajı",       lat: 40.396, lng: 36.945, bolge: "Karadeniz" },
  { isim: "Altınkaya Barajı",   lat: 41.298, lng: 35.600, bolge: "Karadeniz" },
  { isim: "Derbent Barajı",     lat: 39.573, lng: 36.700, bolge: "Karadeniz" },

  // Doğu & Güneydoğu Anadolu
  { isim: "Atatürk Barajı",     lat: 37.480, lng: 38.300, bolge: "Doğu / Güneydoğu" },
  { isim: "Keban Barajı",       lat: 38.774, lng: 38.752, bolge: "Doğu / Güneydoğu" },
  { isim: "Karakaya Barajı",    lat: 38.256, lng: 38.400, bolge: "Doğu / Güneydoğu" },
  { isim: "Tortum Gölü",        lat: 40.561, lng: 41.451, bolge: "Doğu / Güneydoğu" },
  { isim: "Çıldır Gölü",        lat: 41.070, lng: 43.038, bolge: "Doğu / Güneydoğu" },
];

export function golBul(isim: string): GolYer | undefined {
  return GOL_LISTESI.find((g) => g.isim === isim);
}

export const BOLGE_LISTESI = [...new Set(GOL_LISTESI.map((g) => g.bolge))];
