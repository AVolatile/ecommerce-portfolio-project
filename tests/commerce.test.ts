import { test } from "node:test";
import assert from "node:assert/strict";
import {
  parseState,
  EMPTY_STATE,
  subtotalOf,
  shippingCost,
  recommend,
  lineKey,
  validLine,
} from "../lib/commerce";
import { products } from "../lib/catalog";
test("shipping threshold and express rates do not drift at the boundary", () => {
  assert.equal(shippingCost(149), 8);
  assert.equal(shippingCost(150), 0);
  assert.equal(shippingCost(500, true), 18);
});
test("invalid persisted state recovers without corrupt cart quantities or unknown products", () => {
  assert.deepEqual(parseState("{broken"), EMPTY_STATE);
  const s = parseState(
    JSON.stringify({
      cart: [
        { slug: "p02-transit-pack", color: "Graphite", quantity: 2 },
        { slug: "p02-transit-pack", color: "Graphite", quantity: -2 },
        { slug: "missing", color: "Graphite", quantity: 1 },
      ],
      orders: [{ id: "bad", date: "wrong", lines: [], address: {}, total: 0 }],
    }),
  );
  assert.equal(s.cart.length, 1);
  assert.equal(s.orders.length, 0);
  assert.equal(subtotalOf(s.cart), 456);
});
test("variant keys separate colors and apparel sizes", () => {
  assert.notEqual(
    lineKey({
      slug: "s01-overshirt",
      color: "Graphite",
      size: "M",
      quantity: 1,
    }),
    lineKey({
      slug: "s01-overshirt",
      color: "Graphite",
      size: "L",
      quantity: 1,
    }),
  );
  assert.equal(
    validLine({ slug: "p01-day-pack", color: "Pink", quantity: 1 }),
    false,
  );
  assert.equal(
    validLine({ slug: "p01-day-pack", color: "Graphite", quantity: 1.5 }),
    false,
  );
});
test("the finder prefers an available laptop pack for a heavy international routine", () => {
  const r = recommend({
    use: "International travel",
    load: "Heavy",
    laptop: "Yes",
    weather: "Yes",
    carryOn: "Yes",
    size: "Roomy",
  });
  assert.equal(r[0].product.slug, "p03-travel-pack");
  assert.notEqual(r[0].product.laptop, "—");
});
test("the finder fits a light commute with the compact day pack", () => {
  assert.equal(
    recommend({
      use: "Daily commute",
      load: "Light",
      laptop: "Yes",
      weather: "No",
      carryOn: "No",
      size: "Compact",
    })[0].product.slug,
    "p01-day-pack",
  );
});
test("every related object resolves and catalog identifiers remain unique", () => {
  const slugs = new Set(products.map((p) => p.slug));
  assert.equal(slugs.size, 12);
  for (const p of products)
    for (const related of p.related) assert.ok(slugs.has(related));
});
