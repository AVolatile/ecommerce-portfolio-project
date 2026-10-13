"use client";
import { colorValues, getProduct, money, type Product } from "@/lib/catalog";
import { isAvailable } from "@/lib/commerce";
import { ArrowRight, ArrowUpRight, Check, Heart, Plus } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useStore } from "../store";
import {
  Accordion,
  ConceptNote,
  Eyebrow,
  ProductCard,
  Quantity,
  SectionHeading,
} from "../ui";

export function ProductDetail({ product: p }: { product: Product }) {
  const [color, setColor] = useState(p.colors[0]);
  const [size, setSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [gallery, setGallery] = useState(0);
  const { add, save, compare, state, notify } = useStore();
  const available = isAvailable(p);
  const sized = p.slug === "s01-overshirt" || p.slug === "s02-light-shell";
  const galleryImages = [
    p.image,
    p.slug.includes("pack") ? "/images/lifestyle.webp" : p.image,
    p.image,
  ];
  const addItem = () =>
    add({ slug: p.slug, color, quantity, ...(sized ? { size } : {}) });
  const related = p.related
    .map(getProduct)
    .filter((v): v is Product => !!v && v.slug !== p.slug)
    .slice(0, 3);
  return (
    <>
      <div className="container" style={{ paddingBottom: 0 }}>
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/shop">Shop</Link>
          <span>/</span>
          <Link href={`/shop/${p.category}`}>{p.category}</Link>
          <span>/</span>
          <span>{p.name}</span>
        </nav>
      </div>
      <section className="pdp">
        <div className="product-gallery">
          <div className="gallery-main">
            <img
              className={gallery === 2 ? "detail-crop" : ""}
              src={galleryImages[gallery]}
              alt={
                gallery === 0
                  ? `${p.model} ${p.name} studio view in ${p.colors[0]}`
                  : gallery === 1
                    ? `${p.name} editorial concept view`
                    : `Close crop of ${p.name} construction`
              }
              width="700"
              height="700"
            />
            <span className="gallery-counter">0{gallery + 1} / 03</span>
          </div>
          <div
            className="gallery-thumbs"
            role="group"
            aria-label="Product gallery"
          >
            {["Studio view", "In context", "A closer look"].map((title, i) => (
              <button
                key={title}
                aria-label={`Show ${title}`}
                aria-pressed={gallery === i}
                onClick={() => setGallery(i)}
              >
                <img src={galleryImages[i]} alt="" />
                <span>{title}</span>
              </button>
            ))}
          </div>
          <p className="gallery-note">
            Concept imagery. Studio view shows {p.colors[0]}; selected colors
            are indicated below.
          </p>
        </div>
        <div className="pdp-details">
          <Eyebrow>
            {p.model} / {p.category} / Collection 01
          </Eyebrow>
          <h1>{p.name}</h1>
          <p className="pdp-price">{money(p.price)}</p>
          <p className="pdp-description">{p.description}</p>
          <p className="selection-label">
            Color / <strong>{color}</strong>
          </p>
          <div className="swatches" role="group" aria-label="Choose color">
            {p.colors.map((c) => (
              <button
                key={c}
                style={{ background: colorValues[c] }}
                aria-label={c}
                aria-pressed={color === c}
                onClick={() => setColor(c)}
              >
                {color === c && <Check size={18} />}
              </button>
            ))}
          </div>
          {sized && (
            <>
              <p className="selection-label">
                Size / <strong>{size}</strong>
              </p>
              <div
                className="size-options"
                role="group"
                aria-label="Choose size"
              >
                {["XS", "S", "M", "L", "XL"].map((s) => (
                  <button
                    key={s}
                    aria-pressed={size === s}
                    onClick={() => setSize(s)}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <p className="small muted">
                {p.dimensions}. Choose your usual size for the stated fit.
              </p>
            </>
          )}
          <div className="pdp-actions">
            <Quantity value={quantity} onChange={setQuantity} />
            <button className="button" disabled={!available} onClick={addItem}>
              {available ? "Add to bag" : p.stock}
              <ArrowUpRight size={18} />
            </button>
          </div>
          <p className="shipping-note">
            {p.stock} · Standard shipping{" "}
            {p.price >= 150 ? "included" : "$8; complimentary over $150"}.
            Concept 30-day returns.
          </p>
          {!available && (
            <button
              className="underlink"
              onClick={() =>
                notify(
                  "Interest noted for this preview. No notification email will be sent.",
                )
              }
            >
              Preview a release notification <ArrowRight size={15} />
            </button>
          )}
          <div className="product-aux">
            <button
              className="text-button"
              aria-pressed={state.wishlist.includes(p.slug)}
              onClick={() => save(p.slug)}
            >
              <Heart size={13} />{" "}
              {state.wishlist.includes(p.slug) ? "Saved" : "Save for later"}
            </button>
            <button
              className="text-button"
              aria-pressed={state.compare.includes(p.slug)}
              onClick={() => compare(p.slug)}
            >
              <Plus size={13} />{" "}
              {state.compare.includes(p.slug)
                ? "In comparison"
                : "Add to compare"}
            </button>
            <Link className="text-button" href="/compare">
              View comparison
            </Link>
          </div>
          <div className="pdp-facts">
            <div>
              <small>Capacity / fit</small>
              <span>{p.capacity}</span>
            </div>
            <div>
              <small>Weight</small>
              <span>{p.weight}</span>
            </div>
            <div>
              <small>Laptop</small>
              <span>{p.laptop}</span>
            </div>
          </div>
          <Accordion title="The considered details" open>
            <ul>
              {p.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          </Accordion>
          <Accordion title="Materials & measurements">
            <dl className="specs-list">
              <dt>Material</dt>
              <dd>{p.material}</dd>
              <dt>Dimensions</dt>
              <dd>{p.dimensions}</dd>
              <dt>Capacity / size</dt>
              <dd>{p.capacity}</dd>
              <dt>Weight</dt>
              <dd>{p.weight}</dd>
              <dt>Weather</dt>
              <dd>{p.weather}</dd>
              <dt>Best for</dt>
              <dd>{p.uses.join(", ")}</dd>
            </dl>
          </Accordion>
          <Accordion title="Care, repair & concept warranty">
            <p>
              {p.category === "apparel"
                ? "Follow the garment care label. Air dry and avoid high heat."
                : "Wipe with a damp cloth and mild soap. Air dry, away from heat. Do not machine wash packs."}{" "}
              The concept warranty covers manufacturing defects for two years.
              Wear, accidental damage, and airline damage are assessed
              separately.
            </p>
            <Link className="underlink" href="/repair">
              Keep it in good use <ArrowRight size={15} />
            </Link>
          </Accordion>
          <Accordion title="Shipping & returns">
            <p>
              Concept US delivery: 3–5 business days standard, 1–2 express.
              Unused products can be returned within 30 days. Shipping and taxes
              are illustrative; no orders are dispatched.
            </p>
            <Link href="/support" className="underlink">
              Full policy concept <ArrowRight size={15} />
            </Link>
          </Accordion>
          <ConceptNote>
            No customer reviews are presented. All product specifications and
            images belong to this fictional brand concept.
          </ConceptNote>
        </div>
      </section>
      <section className="section">
        <SectionHeading
          kicker="Better together"
          title="A system, in small pieces."
        />
        <div className="product-grid">
          {related.map((r) => (
            <ProductCard product={r} key={r.slug} />
          ))}
        </div>
      </section>
      <div className="sticky-atc">
        <span>
          {p.model} / {p.name}
          <br />
          {money(p.price)} · {color}
          {sized ? ` / ${size}` : ""}
        </span>
        <button className="button" disabled={!available} onClick={addItem}>
          {available ? "Add to bag" : p.stock}
          <ArrowUpRight size={16} />
        </button>
      </div>
    </>
  );
}
