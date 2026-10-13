"use client";
import { Promo } from "./promo";

import { getProduct, money } from "@/lib/catalog";
import { lineKey, shippingCost, subtotalOf } from "@/lib/commerce";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useStore } from "../store";
import {
  ButtonLink,
  ConceptNote,
  EmptyState,
  Eyebrow,
  PageIntro,
  Quantity,
} from "../ui";

export function Cart() {
  const { state, quantity, remove, add, promo: setPromo } = useStore();
  const promo = state.promo;
  const subtotal = subtotalOf(state.cart);
  const discount = promo === "FIRSTUSE" && subtotal >= 100 ? 15 : 0;
  const shipping = shippingCost(subtotal);
  const addon = getProduct("a02-tech-organizer")!;
  return (
    <>
      <PageIntro
        kicker="Your considered setup"
        title="Everything in its place."
      >
        <p>A few useful things, ready for the next part of your day.</p>
      </PageIntro>
      <div className="container">
        {state.cart.length ? (
          <div className="cart-layout">
            <div>
              {state.cart.map((l) => {
                const p = getProduct(l.slug)!;
                return (
                  <article className="cart-line" key={lineKey(l)}>
                    <Link href={`/product/${p.slug}`}>
                      <img src={p.image} alt={p.name} />
                    </Link>
                    <div>
                      <Link href={`/product/${p.slug}`}>
                        {p.model} / {p.name}
                      </Link>
                      <p>
                        {l.color}
                        {l.size ? ` / ${l.size}` : ""}
                      </p>
                      <Quantity
                        value={l.quantity}
                        onChange={(q) => quantity(lineKey(l), q)}
                        label={p.name}
                      />
                    </div>
                    <div className="cart-line-end">
                      <span>{money(p.price * l.quantity)}</span>
                      <button
                        className="text-button"
                        onClick={() => remove(lineKey(l))}
                      >
                        Remove
                      </button>
                    </div>
                  </article>
                );
              })}
              {!state.cart.some((l) => l.slug === addon.slug) && (
                <div className="add-on">
                  <Eyebrow>A useful pairing, if you need it.</Eyebrow>
                  <div>
                    <img src={addon.image} alt={addon.name} />
                    <div>
                      <h3>{addon.name}</h3>
                      <p className="small muted">
                        A place for the cables. {money(addon.price)}.
                      </p>
                      <button
                        className="text-button"
                        onClick={() =>
                          add({
                            slug: addon.slug,
                            color: addon.colors[0],
                            quantity: 1,
                          })
                        }
                      >
                        Add {addon.model} <ArrowUpRight size={13} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <aside className="order-summary">
              <h2>Your bag, considered.</h2>
              <p className="shipping-note">
                {subtotal >= 150
                  ? "Complimentary standard shipping is included."
                  : `${money(150 - subtotal)} to complimentary standard shipping.`}
              </p>
              <div className="shipping-progress">
                <span
                  style={{ width: `${Math.min(100, (subtotal / 150) * 100)}%` }}
                />
              </div>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{money(subtotal)}</span>
              </div>
              {discount > 0 && (
                <div className="summary-row">
                  <span>FIRSTUSE</span>
                  <span>−{money(discount)}</span>
                </div>
              )}
              <div className="summary-row">
                <span>Standard shipping</span>
                <span>{shipping ? money(shipping) : "Included"}</span>
              </div>
              <Promo value={promo} onApply={setPromo} />
              <div className="summary-row total">
                <strong>Estimated total</strong>
                <strong>{money(subtotal - discount + shipping)}</strong>
              </div>
              <p className="small muted">
                USD. Tax is not calculated in this concept.
              </p>
              <ButtonLink href="/checkout">Continue to checkout</ButtonLink>
              <ConceptNote>
                Checkout is a local demonstration. No real payment or
                fulfillment.
              </ConceptNote>
            </aside>
          </div>
        ) : (
          <EmptyState
            title="A little room for something useful."
            body="Your bag is empty. Find a setup that fits the way you move."
          />
        )}
      </div>
    </>
  );
}
