"use client";
import { getProduct, products } from "@/lib/catalog";
import { ArrowRight, ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Accordion, ConceptNote, Eyebrow, Field, PageIntro } from "../ui";

export function Repair() {
  const [product, setProduct] = useState("");
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  return (
    <>
      <PageIntro
        kicker="Care / Repair / Repeat"
        title="A small fix. A longer story."
      >
        <p>
          Keep useful things in use. Start with a little care. When something
          needs attention, tell us what happened.
        </p>
      </PageIntro>
      <div className="container">
        <div className="repair-layout">
          <div>
            <h2>The repair comes before the replacement.</h2>
            <p className="muted">
              The concept service assesses VELT packs, bags, and accessories for
              repair. Not every repair is possible. An assessment would confirm
              the work, cost, and delivery time before anything is charged.
            </p>
            <Accordion title="What could be repaired?" open>
              <p>
                Zipper sliders, loose seams, webbing, buckles, and replaceable
                bottle lids. Damage to coatings or structural fabric may require
                a different approach.
              </p>
            </Accordion>
            <Accordion title="What does the concept warranty cover?">
              <p>
                Manufacturing defects for two years. An active In Use concept
                membership adds a third year. Wear, accidental damage, and
                cosmetic marks are assessed as paid service.
              </p>
            </Accordion>
            <Accordion title="What happens after an enquiry?">
              <p>
                A real service would review the product and damage, request
                photographs, and send an estimate. Work would proceed only after
                you approve it. This demo does not send a request or accept
                uploads.
              </p>
            </Accordion>
            <Accordion title="How should I care for my pack?">
              <p>
                Wipe with a damp cloth and mild soap. Clear dirt from the zipper
                teeth with a soft brush. Air dry with compartments open. Keep it
                away from a tumble dryer or radiator.
              </p>
            </Accordion>
            <Link href="/journal/technical-fabric-care" className="underlink">
              The full care notes <ArrowRight size={16} />
            </Link>
            <ConceptNote>
              No environmental certifications or quantified longevity claims are
              made.
            </ConceptNote>
          </div>
          {sent ? (
            <div className="form-success" role="status">
              <Check size={35} />
              <h2 style={{ marginTop: 25 }}>The details are ready.</h2>
              <p>
                Your enquiry preview is complete. No information was sent, no
                service ticket was created, and no email will arrive.
              </p>
              <p>
                {getProduct(product)?.name} / {type}
              </p>
              <button className="button" onClick={() => setSent(false)}>
                Review your enquiry <ArrowUpRight size={16} />
              </button>
            </div>
          ) : (
            <form
              className="form-panel"
              noValidate
              onSubmit={(e) => {
                e.preventDefault();
                const v: Record<string, string> = {};
                if (!product) v.product = "Choose the VELT object.";
                if (!type) v.type = "Choose a repair type.";
                if (!name.trim()) v.name = "Enter a demo name.";
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
                  v.email = "Enter a valid email format.";
                if (description.trim().length < 20)
                  v.description =
                    "Describe the damage in at least 20 characters.";
                setErrors(v);
                if (!Object.keys(v).length) setSent(true);
              }}
            >
              <Eyebrow>A repair enquiry / Preview only</Eyebrow>
              <h2>Tell us what needs attention.</h2>
              <div className="field">
                <label htmlFor="repair-product">Your object</label>
                <select
                  id="repair-product"
                  value={product}
                  onChange={(e) => setProduct(e.target.value)}
                  aria-invalid={!!errors.product}
                  aria-describedby={
                    errors.product ? "repair-product-error" : undefined
                  }
                >
                  <option value="">Choose an object</option>
                  {products.map((p) => (
                    <option key={p.slug} value={p.slug}>
                      {p.model} / {p.name}
                    </option>
                  ))}
                </select>
                {errors.product && (
                  <p className="field-error" id="repair-product-error">
                    {errors.product}
                  </p>
                )}
              </div>
              <div className="field">
                <label htmlFor="repair-type">Repair type</label>
                <select
                  id="repair-type"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  aria-invalid={!!errors.type}
                  aria-describedby={
                    errors.type ? "repair-type-error" : undefined
                  }
                >
                  <option value="">Choose a type</option>
                  {[
                    "Zipper",
                    "Stitching",
                    "Hardware / buckle",
                    "Bottle lid / seal",
                    "Other / not sure",
                  ].map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
                {errors.type && (
                  <p className="field-error" id="repair-type-error">
                    {errors.type}
                  </p>
                )}
              </div>
              <Field
                label="Demo name"
                name="repair-name"
                value={name}
                onChange={setName}
                error={errors.name}
              />
              <Field
                label="Demo email"
                name="repair-email"
                type="email"
                value={email}
                onChange={setEmail}
                error={errors.email}
              />
              <div className="field">
                <label htmlFor="repair-description">What happened?</label>
                <textarea
                  id="repair-description"
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  aria-invalid={!!errors.description}
                  aria-describedby={
                    errors.description ? "repair-description-error" : undefined
                  }
                />
                {errors.description && (
                  <p className="field-error" id="repair-description-error">
                    {errors.description}
                  </p>
                )}
              </div>
              <button className="button wide">
                Preview enquiry <ArrowUpRight size={16} />
              </button>
              <ConceptNote>
                Use fictional details. Nothing is submitted to a server.
              </ConceptNote>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
