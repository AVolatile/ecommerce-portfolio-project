import { getProduct, type Product } from "./catalog";
export interface CartLine {
  slug: string;
  color: string;
  size?: string;
  quantity: number;
}
export interface Address {
  name: string;
  email: string;
  street: string;
  city: string;
  region: string;
  postal: string;
  country: string;
}
export interface Order {
  id: string;
  date: string;
  lines: CartLine[];
  subtotal: number;
  discount: number;
  shipping: number;
  total: number;
  address: Address;
  delivery: string;
}
export interface CommerceState {
  cart: CartLine[];
  wishlist: string[];
  compare: string[];
  member: boolean;
  memberSince: string | null;
  profile: { name: string; email: string } | null;
  orders: Order[];
  preferences: string[];
  promo: string;
}
export const EMPTY_STATE: CommerceState = {
  cart: [],
  wishlist: [],
  compare: [],
  member: false,
  memberSince: null,
  profile: null,
  orders: [],
  preferences: [],
  promo: "",
};
export const isAvailable = (p: Product) =>
  p.stock === "In stock" || p.stock === "Low stock";
export const lineKey = (line: CartLine) =>
  [line.slug, line.color, line.size || ""].join(":");
export const subtotalOf = (lines: CartLine[]) =>
  lines.reduce(
    (sum, line) => sum + (getProduct(line.slug)?.price || 0) * line.quantity,
    0,
  );
export const shippingCost = (subtotal: number, express = false) =>
  express ? 18 : subtotal >= 150 ? 0 : 8;
export function validLine(value: unknown): value is CartLine {
  if (!value || typeof value !== "object") return false;
  const v = value as CartLine;
  const p = getProduct(v.slug);
  return (
    !!p &&
    p.colors.includes(v.color) &&
    Number.isInteger(v.quantity) &&
    v.quantity > 0 &&
    v.quantity <= 10 &&
    (v.size === undefined || ["XS", "S", "M", "L", "XL"].includes(v.size))
  );
}
export function parseState(raw: string | null): CommerceState {
  if (!raw) return EMPTY_STATE;
  try {
    const s = JSON.parse(raw);
    return {
      cart: Array.isArray(s.cart) ? s.cart.filter(validLine) : [],
      wishlist: Array.isArray(s.wishlist)
        ? s.wishlist.filter(
            (v: unknown) => typeof v === "string" && getProduct(v),
          )
        : [],
      compare: Array.isArray(s.compare)
        ? s.compare
            .filter((v: unknown) => typeof v === "string" && getProduct(v))
            .slice(0, 3)
        : [],
      member: s.member === true,
      memberSince: typeof s.memberSince === "string" ? s.memberSince : null,
      profile:
        s.profile &&
        typeof s.profile.name === "string" &&
        typeof s.profile.email === "string"
          ? s.profile
          : null,
      orders: Array.isArray(s.orders)
        ? s.orders.filter(
            (v: Order) =>
              typeof v.id === "string" &&
              typeof v.date === "string" &&
              !Number.isNaN(Date.parse(v.date)) &&
              Array.isArray(v.lines) &&
              v.lines.every(validLine) &&
              v.address &&
              [
                "name",
                "email",
                "street",
                "city",
                "region",
                "postal",
                "country",
              ].every(
                (k) =>
                  typeof (v.address as unknown as Record<string, unknown>)[
                    k
                  ] === "string",
              ) &&
              [v.subtotal, v.discount, v.shipping, v.total].every(
                (n) => Number.isFinite(n) && n >= 0,
              ),
          )
        : [],
      preferences: Array.isArray(s.preferences)
        ? s.preferences.filter((v: unknown) => typeof v === "string")
        : [],
      promo: s.promo === "FIRSTUSE" ? "FIRSTUSE" : "",
    };
  } catch {
    return EMPTY_STATE;
  }
}
export interface FinderAnswers {
  use: string;
  load: string;
  laptop: string;
  weather: string;
  carryOn: string;
  size: string;
}
export function recommend(a: FinderAnswers) {
  return productsForFinder()
    .map((p) => {
      let score = p.uses.includes(a.use) ? 8 : 0;
      const cap = parseInt(p.capacity);
      const target = a.load === "Light" ? 18 : a.load === "Medium" ? 24 : 35;
      score += Math.max(0, 5 - Math.abs(cap - target) / 4);
      if (a.laptop === "Yes") score += p.laptop === "—" ? -8 : 3;
      if (a.carryOn === "Yes") score += p.carryOn ? 2 : -5;
      if (a.size === "Compact") score += cap <= 24 ? 3 : -3;
      if (a.size === "Roomy") score += cap >= 28 ? 3 : -3;
      if (a.weather === "Yes" && p.weather.startsWith("Water")) score += 2;
      return { product: p, score };
    })
    .sort((a, b) => b.score - a.score);
}
function productsForFinder() {
  return [
    "p01-day-pack",
    "p02-transit-pack",
    "p03-travel-pack",
    "b01-weekender",
    "b02-utility-duffel",
  ].map((slug) => getProduct(slug)!);
}

export const US_STATES = new Set(
  "AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY DC".split(
    " ",
  ),
);
