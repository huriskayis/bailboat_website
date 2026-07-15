export type MediaItem =
  | { type: "image"; src: string }
  | { type: "video"; src: string };

export type Product = {
  slug: string;
  name: string;
  windTr: string;
  windDir: string;
  klass: string;
  lengthM: string;
  priceCents: number;
  tagline: string;
  description: string;
  specs: { label: string; value: string }[];
  thumbnail?: string;
  media?: MediaItem[];
  active?: boolean;
};

const lorem =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod " +
  "tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, " +
  "quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. " +
  "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu " +
  "fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in " +
  "culpa qui officia deserunt mollit anim id est laborum.";

const baseSpecs = (l: string) => [
  { label: "Tam Boy", value: l },
  { label: "Genişlik", value: "— m" },
  { label: "Su Çekimi", value: "— m" },
  { label: "Yem Kapasitesi", value: "— kg" },
  { label: "Deplasman", value: "— t" },
  { label: "Tekne Malzemesi", value: "El yatırması kompozit" },
];

export const products: Product[] = [
  {
    slug: "poyraz",
    name: "Poyraz",
    windTr: "Kuzeydoğu",
    windDir: "KD",
    klass: "Performans Serisi",
    lengthM: "65 cm",
    priceCents: 2000000,
    tagline: "Sert rüzgârlar için doğmuş bir yem botu.",
    description: lorem,
    specs: baseSpecs("65 cm"),
    active: true,
    thumbnail: "/images/poyraz1.png",
    media: [
      { type: "image", src: "/images/poyraz1.png" },
      { type: "image", src: "/images/poyraz2.png" },
      { type: "video", src: "/images/poyraz3.mp4" },
      { type: "image", src: "/images/poyraz4.png" },
    ],
  },
  {
    slug: "yildiz",
    name: "Yıldız",
    windTr: "Kuzey",
    windDir: "K",
    klass: "Amiral Serisi",
    lengthM: "95 cm",
    priceCents: 52000000,
    tagline: "Kuzey yıldızına yönelen amiral tekne.",
    description: lorem,
    specs: baseSpecs("95 cm"),
  },
  {
    slug: "karayel",
    name: "Karayel",
    windTr: "Kuzeybatı",
    windDir: "KB",
    klass: "Performans Serisi",
    lengthM: "58 cm",
    priceCents: 29800000,
    tagline: "Çevik, keskin, hırçın sulara hazır.",
    description: lorem,
    specs: baseSpecs("58 cm"),
  },
  {
    slug: "lodos",
    name: "Lodos",
    windTr: "Güneybatı",
    windDir: "GB",
    klass: "Seyir Serisi",
    lengthM: "72 cm",
    priceCents: 38500000,
    tagline: "Uzun seyirler için ılık, dingin bir denge.",
    description: lorem,
    specs: baseSpecs("72 cm"),
  },
  {
    slug: "kible",
    name: "Kıble",
    windTr: "Güney",
    windDir: "G",
    klass: "Seyir Serisi",
    lengthM: "78 cm",
    priceCents: 41200000,
    tagline: "Güneye açılan sabırlı bir gezgin.",
    description: lorem,
    specs: baseSpecs("78 cm"),
  },
  {
    slug: "gundogusu",
    name: "Gündoğusu",
    windTr: "Doğu",
    windDir: "D",
    klass: "Performans Serisi",
    lengthM: "62 cm",
    priceCents: 31600000,
    tagline: "Gün doğarken ufka ilk ulaşan.",
    description: lorem,
    specs: baseSpecs("62 cm"),
  },
  {
    slug: "kesisleme",
    name: "Keşişleme",
    windTr: "Güneydoğu",
    windDir: "GD",
    klass: "Seyir Serisi",
    lengthM: "85 cm",
    priceCents: 44800000,
    tagline: "Sıcak sulara nazik bir yönelme.",
    description: lorem,
    specs: baseSpecs("85 cm"),
  },
  {
    slug: "meltem",
    name: "Meltem",
    windTr: "Yaz Esintisi",
    windDir: "—",
    klass: "Zarafet Serisi",
    lengthM: "52 cm",
    priceCents: 26900000,
    tagline: "Yaz akşamlarının hafif, zarif esintisi.",
    description: lorem,
    specs: baseSpecs("52 cm"),
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}
