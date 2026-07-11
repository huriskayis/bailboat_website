import Stripe from "stripe";

const key = process.env.STRIPE_SECRET_KEY;

if (!key) {
  // Anahtar tanımlı değilse, /api/checkout çağrısında anlaşılır bir hata döneriz.
  console.warn("STRIPE_SECRET_KEY tanımlı değil — .env.local dosyasını kontrol edin.");
}

export const stripe = new Stripe(key ?? "sk_test_placeholder");
