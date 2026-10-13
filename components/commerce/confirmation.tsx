"use client";
import { getProduct, money } from "@/lib/catalog";
import { lineKey, type Order } from "@/lib/commerce";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import { useStore } from "../store";
import { ButtonLink, Eyebrow } from "../ui";

export function Confirmation({ order: o }: { order: Order }) {
  const { state, join } = useStore();
  return (
    <section className="confirmation">
      <span className="empty-symbol">
        <Check size={42} />
      </span>
      <Eyebrow>Demo order / {o.id}</Eyebrow>
      <h1>
        A good start.
        <br />A lot of days ahead.
      </h1>
      <p>
        Your setup is saved on this device. This is a confirmation preview; no
        payment was made, no email was sent, and nothing will be dispatched.
      </p>
      <div className="confirmation-grid">
        <div className="confirmation-card">
          <h2>Your considered setup.</h2>
          {o.lines.map((l) => {
            const p = getProduct(l.slug)!;
            return (
              <div className="summary-row" key={lineKey(l)}>
                <span>
                  {p.name} / {l.color}
                  {l.size ? ` / ${l.size}` : ""} × {l.quantity}
                </span>
                <span>{money(p.price * l.quantity)}</span>
              </div>
            );
          })}
          <div className="summary-row total">
            <span>Demo total</span>
            <strong>{money(o.total)}</strong>
          </div>
        </div>
        <div className="confirmation-card">
          <h2>The next stop.</h2>
          <p>
            {o.address.name}
            <br />
            {o.address.street}
            <br />
            {o.address.city}, {o.address.region} {o.address.postal}
          </p>
          <p>
            Illustrative delivery: {o.delivery === "express" ? "1–2" : "3–5"}{" "}
            business days from dispatch.
            <br />
            Tracking will remain unavailable in this concept.
          </p>
          <Link className="underlink" href="/account/orders">
            View demo orders <ArrowRight size={16} />
          </Link>
        </div>
      </div>
      <div className="confirmation-card">
        <Eyebrow>Ownership, considered.</Eyebrow>
        <h2>Keep it close. Keep it going.</h2>
        <p>
          Read the care notes, build your local profile, or explore In Use for
          repair credit and early access.
        </p>
        <div className="case-links">
          <ButtonLink href="/repair">Care & repair</ButtonLink>
          <ButtonLink href="/signup" secondary>
            Create demo profile
          </ButtonLink>
          {!state.member && (
            <button className="button secondary" onClick={join}>
              Activate concept membership <ArrowUpRight size={16} />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
