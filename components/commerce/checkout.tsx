"use client";
import { Confirmation } from "./confirmation";

import { Promo } from "./promo";

import { getProduct, money } from "@/lib/catalog";
import {
  isAvailable,
  lineKey,
  shippingCost,
  subtotalOf,
  US_STATES,
  type Address,
  type Order,
} from "@/lib/commerce";
import { ArrowUpRight, CreditCard } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";
import { useStore } from "../store";
import { ConceptNote, EmptyState, Field, PageIntro } from "../ui";

const initialAddress: Address = {
  name: "",
  email: "",
  street: "",
  city: "",
  region: "",
  postal: "",
  country: "United States",
};

const stages = ["Contact", "Shipping", "Delivery", "Payment", "Review"];

export function Checkout() {
  const { state, place, notify, promo: setPromo } = useStore();
  const promo = state.promo;
  const [step, setStep] = useState(0);
  const [address, setAddress] = useState<Address>(initialAddress);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [delivery, setDelivery] = useState("standard");
  const [consent, setConsent] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const processing = useRef(false);
  const subtotal = subtotalOf(state.cart);
  const discount = promo === "FIRSTUSE" && subtotal >= 100 ? 15 : 0;
  const shipping = shippingCost(subtotal, delivery === "express");
  const total = subtotal - discount + shipping;
  const change = (field: keyof Address, value: string) => {
    setAddress({ ...address, [field]: value });
    setErrors({ ...errors, [field]: "" });
  };
  const advance = () => {
    const e: Record<string, string> = {};
    if (step === 0) {
      if (!address.name.trim()) e.name = "Enter the name for this demo order.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address.email))
        e.email = "Enter a valid email address.";
    }
    if (step === 1) {
      if (address.street.trim().length < 5)
        e.street = "Enter a street number and street name.";
      if (!address.city.trim()) e.city = "Enter a city.";
      if (!US_STATES.has(address.region.trim().toUpperCase()))
        e.region = "Enter a valid two-letter US state code.";
      if (!/^\d{5}(-\d{4})?$/.test(address.postal.trim()))
        e.postal = "Use a 5-digit US ZIP code.";
    }
    if (step === 3 && !consent)
      e.consent = "Confirm that you understand this is a demonstration.";
    setErrors(e);
    if (Object.keys(e).length) {
      setTimeout(
        () =>
          document.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
        0,
      );
      return;
    }
    setStep(step + 1);
  };
  const handlePlaceOrder = () => {
    if (processing.current) return;
    if (
      !state.cart.length ||
      state.cart.some((l) => !isAvailable(getProduct(l.slug)!))
    ) {
      notify("Your bag has changed. Review it before placing a demo order.");
      return;
    }
    processing.current = true;
    const o: Order = {
      id: `VL-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
      date: new Date().toISOString(),
      lines: state.cart.map((l) => ({ ...l })),
      subtotal,
      discount,
      shipping,
      total,
      address: { ...address },
      delivery,
    };
    place(o);
    setOrder(o);
  };
  if (order) return <Confirmation order={order} />;
  if (!state.cart.length)
    return (
      <>
        <PageIntro kicker="Checkout" title="Start with your setup." />
        <div className="container">
          <EmptyState
            title="Your bag is empty."
            body="Add an available product to preview checkout."
          />
        </div>
      </>
    );
  return (
    <>
      <PageIntro
        kicker="Checkout / Local demonstration"
        title="The next part starts here."
      >
        <p>
          Guest checkout. Use fictional details. No card data, payment, email,
          or delivery is processed.
        </p>
      </PageIntro>
      <div className="container">
        <div className="checkout-layout">
          <section className="checkout-panel">
            <nav className="checkout-steps" aria-label="Checkout progress">
              {stages.map((s, i) => (
                <span
                  className={i === step ? "current" : ""}
                  key={s}
                  aria-current={i === step ? "step" : undefined}
                >
                  {i < step ? "✓" : `0${i + 1}`} {s}
                </span>
              ))}
            </nav>
            <h2>
              {
                [
                  "A way to keep you informed.",
                  "Where it would arrive.",
                  "Choose the pace.",
                  "A payment preview.",
                  "One last look.",
                ][step]
              }
            </h2>
            {step === 0 && (
              <>
                <p>
                  Prefer a saved profile?{" "}
                  <Link className="text-button" href="/login">
                    Open your demo account
                  </Link>
                </p>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    advance();
                  }}
                  noValidate
                >
                  <div className="fields-grid">
                    <div className="full">
                      <Field
                        name="name"
                        label="Full name"
                        value={address.name}
                        onChange={(v) => change("name", v)}
                        error={errors.name}
                        autoComplete="off"
                        placeholder="Alex Sample"
                      />
                    </div>
                    <div className="full">
                      <Field
                        name="email"
                        type="email"
                        label="Email address"
                        value={address.email}
                        onChange={(v) => change("email", v)}
                        error={errors.email}
                        autoComplete="off"
                        placeholder="alex@example.com"
                      />
                    </div>
                  </div>
                  <button type="submit" className="button wide">
                    Continue to shipping <ArrowUpRight size={17} />
                  </button>
                </form>
              </>
            )}
            {step === 1 && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  advance();
                }}
                noValidate
              >
                <p className="small muted">
                  The concept supports US addresses. Values are checked for
                  format, not verified with a postal service.
                </p>
                <div className="fields-grid">
                  <div className="full">
                    <Field
                      name="street"
                      label="Street address"
                      value={address.street}
                      onChange={(v) => change("street", v)}
                      error={errors.street}
                      autoComplete="off"
                      placeholder="100 Sample Street"
                    />
                  </div>
                  <Field
                    name="city"
                    label="City"
                    value={address.city}
                    onChange={(v) => change("city", v)}
                    error={errors.city}
                    autoComplete="off"
                  />
                  <Field
                    name="region"
                    label="State code"
                    value={address.region}
                    onChange={(v) => change("region", v)}
                    error={errors.region}
                    autoComplete="off"
                    placeholder="NY"
                  />
                  <Field
                    name="postal"
                    label="ZIP code"
                    value={address.postal}
                    onChange={(v) => change("postal", v)}
                    error={errors.postal}
                    autoComplete="off"
                  />
                  <Field
                    name="country"
                    label="Country"
                    value={address.country}
                    onChange={() => {}}
                    autoComplete="off"
                  />
                </div>
                <button className="button wide">
                  Continue to delivery <ArrowUpRight size={17} />
                </button>
              </form>
            )}
            {step === 2 && (
              <>
                <p>Illustrative delivery windows from dispatch.</p>
                <div className="delivery-options">
                  {[
                    [
                      "standard",
                      "Standard",
                      "3–5 business days",
                      shippingCost(subtotal),
                    ],
                    ["express", "Express", "1–2 business days", 18],
                  ].map(([id, title, days, price]) => (
                    <label key={id}>
                      <input
                        type="radio"
                        name="delivery"
                        value={id}
                        checked={delivery === id}
                        onChange={() => setDelivery(String(id))}
                      />
                      <span>
                        {title}
                        <small>{days}</small>
                      </span>
                      <strong>
                        {price ? money(Number(price)) : "Included"}
                      </strong>
                    </label>
                  ))}
                </div>
                <button className="button wide" onClick={advance}>
                  Continue to payment <ArrowUpRight size={17} />
                </button>
              </>
            )}
            {step === 3 && (
              <>
                <p>
                  A fixed fictional card is provided. There are no editable
                  card, security code, or payment credential fields.
                </p>
                <div className="demo-payment">
                  <div className="card-chip">
                    <CreditCard size={27} />
                    <span>DEMO CARD / •••• 4242</span>
                  </div>
                  <span className="small muted">
                    Fictional method · No charge · No payment provider connected
                  </span>
                </div>
                <label className="check-label">
                  <input
                    type="checkbox"
                    checked={consent}
                    aria-invalid={!!errors.consent}
                    aria-describedby={
                      errors.consent ? "consent-error" : undefined
                    }
                    onChange={(e) => {
                      setConsent(e.target.checked);
                      setErrors({ ...errors, consent: "" });
                    }}
                  />
                  I understand this creates a local demo order and does not make
                  a purchase.
                </label>
                {errors.consent && (
                  <p id="consent-error" className="field-error">
                    {errors.consent}
                  </p>
                )}
                <button className="button wide" onClick={advance}>
                  Review your setup <ArrowUpRight size={17} />
                </button>
              </>
            )}
            {step === 4 && (
              <>
                <div className="review-details">
                  <h3>Contact</h3>
                  <p>
                    {address.name}
                    <br />
                    {address.email}
                  </p>
                  <button className="text-button" onClick={() => setStep(0)}>
                    Edit contact
                  </button>
                </div>
                <div className="review-details">
                  <h3>Shipping</h3>
                  <p>
                    {address.street}
                    <br />
                    {address.city}, {address.region} {address.postal}
                    <br />
                    United States
                  </p>
                  <button className="text-button" onClick={() => setStep(1)}>
                    Edit shipping
                  </button>
                </div>
                <div className="review-details">
                  <h3>Delivery & payment</h3>
                  <p>
                    {delivery === "express"
                      ? "Express / 1–2"
                      : "Standard / 3–5"}{" "}
                    business days
                    <br />
                    Demo card •••• 4242 / No charge
                  </p>
                </div>
                <button className="button wide" onClick={handlePlaceOrder}>
                  Place demo order · {money(total)} <ArrowUpRight size={17} />
                </button>
              </>
            )}
            {step > 0 && (
              <button
                className="text-button"
                style={{ marginTop: 20 }}
                onClick={() => setStep(step - 1)}
              >
                Back to {stages[step - 1].toLowerCase()}
              </button>
            )}
          </section>
          <aside className="order-summary">
            <h2>Your setup.</h2>
            {state.cart.map((l) => {
              const p = getProduct(l.slug)!;
              return (
                <div className="cart-line" key={lineKey(l)}>
                  <img src={p.image} alt={p.name} width="60" height="60" />
                  <div>
                    {p.model} / {p.name}
                    <p>
                      {l.color}
                      {l.size ? ` / ${l.size}` : ""} · Qty {l.quantity}
                    </p>
                  </div>
                  <span>{money(p.price * l.quantity)}</span>
                </div>
              );
            })}
            <div style={{ marginTop: 25 }}>
              <div className="summary-row">
                <span>Subtotal</span>
                <span>{money(subtotal)}</span>
              </div>
              <div className="summary-row">
                <span>Delivery</span>
                <span>{shipping ? money(shipping) : "Included"}</span>
              </div>
              {discount > 0 && (
                <div className="summary-row">
                  <span>FIRSTUSE</span>
                  <span>−{money(discount)}</span>
                </div>
              )}
              <Promo value={promo} onApply={setPromo} />
              <div className="summary-row total">
                <strong>Total</strong>
                <strong>{money(total)}</strong>
              </div>
              <ConceptNote>
                USD. Taxes and fulfillment are outside this demo. Contact and
                address remain on this device.
              </ConceptNote>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
