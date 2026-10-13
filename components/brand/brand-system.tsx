import { products } from "@/lib/catalog";
import {
  ArrowRight,
  Heart,
  Search,
  ShoppingBag,
  SlidersHorizontal,
} from "lucide-react";
import Link from "next/link";
import { Mark } from "../shell";
import {
  ButtonLink,
  ConceptNote,
  Eyebrow,
  PageIntro,
  ProductCard,
  SectionHeading,
} from "../ui";

export function Brand() {
  return (
    <>
      <PageIntro
        kicker="VELT / Identity & experience guidelines / 01"
        title="A quiet object.<br/>A clear point of view."
      >
        <p>
          A brand built around overlap: different routines, fewer objects, and
          design that earns its place.
        </p>
      </PageIntro>
      <div className="brand-identity">
        <span className="brand-word">VELT</span>
        <Mark />
        <p>
          WORDMARK / CLOSE-SET, OPEN TO THE DAY. &nbsp; SYMBOL / A FOLDED V, TWO
          ROUTES INTO ONE FORM.
        </p>
      </div>
      <section className="section editorial-two">
        <div>
          <Eyebrow>01 / Positioning</Eyebrow>
          <h2>Objects for the overlap.</h2>
          <p>
            For active professionals who value fewer, more useful things. VELT
            sits between the daily commute, the training session, and a short
            departure.
          </p>
          <p>
            The invented four-letter name is compact, tactile, and
            category-independent. Its hard edges work on a woven label; its open
            forms hold their own at billboard scale. This concept makes no
            trademark availability claim.
          </p>
        </div>
        <div>
          <Eyebrow>Identity principle</Eyebrow>
          <h2>Restraint is functional.</h2>
          <p>
            The wordmark is confident without extra decoration. The folded V
            symbol brings two paths together, a small expression of the brand’s
            central idea.
          </p>
          <p>
            Keep one wordmark width of clear space around the identity. Use the
            symbol for the favicon, hardware, small labels, and membership.
          </p>
          <a
            href="/brand-assets/velt-identity.svg"
            download
            className="underlink"
          >
            Download identity SVG <ArrowRight size={17} />
          </a>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <SectionHeading
          kicker="02 / Color"
          title="Graphite first. Signal with intent."
        />
        <div className="palette-grid">
          {[
            ["Graphite", "#242724"],
            ["Chalk", "#f6f5f0"],
            ["Mineral", "#b3b0a4"],
            ["Signal", "#ed552d"],
            ["Petrol", "#344b4d"],
          ].map(([n, c]) => (
            <div className="palette-swatch" key={n}>
              <div style={{ background: c }} />
              <strong>{n}</strong>
              <span>{c.toUpperCase()}</span>
            </div>
          ))}
        </div>
        <ConceptNote>
          Signal is a campaign accent. Use the darker Rust #B33416 for small
          text on Chalk to preserve contrast. White on Signal is reserved for
          large display text only.
        </ConceptNote>
      </section>
      <section className="section" style={{ background: "var(--paper)" }}>
        <SectionHeading
          kicker="03 / Typography"
          title="Two voices. One clear hierarchy."
        />
        <div className="type-showcase">
          <div>
            <Eyebrow>Barlow Condensed / Display / 600</Eyebrow>
            <div className="type-display">
              FULLER
              <br />
              DAYS.
            </div>
            <p>
              Campaign and hero headlines. Tight leading, natural breaks, no
              stretched letterforms. 64–120px desktop, 58–94px mobile.
            </p>
          </div>
          <div>
            <Eyebrow>DM Sans / Product & reading / 400–650</Eyebrow>
            <div className="type-ui">
              A place for
              <br />
              everything
              <br />
              you actually need.
            </div>
            <p>
              Product information, navigation, editorial reading, and forms.
              Calm tracking and generous line height. 12–16px body, 28–48px
              section headings.
            </p>
          </div>
        </div>
      </section>
      <section className="section">
        <SectionHeading
          kicker="04 / A naming system"
          title="The function is the name."
        />
        <div className="benefit-grid">
          {[
            [
              "P—01 / P—02 / P—03",
              "Packs",
              "Numbered by family. A plain name explains the purpose: Day, Transit, Travel.",
            ],
            [
              "B—01 / B—02",
              "Bags",
              "Weekender and Utility Duffel. Capacity and use do the selling, without invented superlatives.",
            ],
            [
              "A / S",
              "Accessories & soft goods",
              "One catalog language, from a $36 cap to a $288 travel pack. Easy to scan, compare, and remember.",
            ],
          ].map(([e, t, b]) => (
            <div className="benefit" key={e}>
              <span>{e}</span>
              <h3>{t}</h3>
              <p>{b}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <SectionHeading
          kicker="05 / Packaging studies"
          title="The first touch should feel considered."
        />
        <div className="packaging-stage">
          <div className="package-box">
            <strong>VELT</strong>
            <small>
              OBJECTS FOR THE OVERLAP.
              <br />
              PACKED WITH A LITTLE MORE INTENT.
            </small>
          </div>
          <div className="package-tag">
            <strong>VELT</strong>
            <div>
              <Eyebrow>P—02 / 24L</Eyebrow>
              <h3>
                Transit
                <br />
                Pack.
              </h3>
            </div>
            <small>KEEP IT IN GOOD USE.</small>
          </div>
          <div className="care-card">
            <Eyebrow>VELT / In Use</Eyebrow>
            <h3>
              A small fix.
              <br />A longer story.
            </h3>
            <p>
              CARE / REPAIR / REPEAT
              <br />
              Wipe gently. Air dry. Keep going.
            </p>
          </div>
        </div>
        <ConceptNote>
          Concept shipping box, product hangtag, and care insert. Additional
          label, sleeve, and member-card SVGs are included in the brand assets.
        </ConceptNote>
        <a
          className="underlink"
          href="/brand-assets/packaging.svg"
          download
          style={{ marginTop: 20 }}
        >
          Download packaging studies <ArrowRight size={17} />
        </a>
      </section>
      <section
        className="section editorial-two"
        style={{ background: "var(--paper)" }}
      >
        <div>
          <Eyebrow>06 / Photography</Eyebrow>
          <h2>
            Motion without
            <br />
            the performance.
          </h2>
          <p>
            Afternoon transit. Hard light on concrete. Candid movement and the
            product actually in use. Faces are incidental; the routine is the
            subject.
          </p>
          <p>
            Studio imagery uses honest shadows, textured fabric, generous
            margins, and a consistent three-quarter angle. Detail crops show
            construction, without implying unverified testing.
          </p>
        </div>
        <img
          src="/images/lifestyle.webp"
          alt="VELT lifestyle direction: candid transit, concrete, graphite, and hard afternoon light"
          loading="lazy"
        />
      </section>
      <section className="section">
        <SectionHeading
          kicker="07 / Experience rules"
          title="A useful system, all the way down."
        />
        <div className="brand-rules">
          <div>
            <h3>Spacing & layout.</h3>
            <div className="spacing-demo">
              {[4, 8, 12, 16, 24, 32, 48, 64].map((n) => (
                <span key={n} style={{ height: n }} title={`${n}px`} />
              ))}
            </div>
            <p>
              4px base scale. Editorial margins breathe. Product grids use a
              consistent image ratio. Forms trade ornament for clear labels and
              feedback.
            </p>
          </div>
          <div>
            <h3>Iconography.</h3>
            <div className="icon-demo">
              <Search size={22} />
              <ShoppingBag size={22} />
              <Heart size={22} />
              <SlidersHorizontal size={22} />
            </div>
            <p>
              Simple Lucide line icons, 1.5–2px strokes. Text labels for
              unfamiliar actions. Meaning never rests on color alone.
            </p>
          </div>
          <div>
            <h3>Voice & tone.</h3>
            <p>
              Direct. Useful. Assured. “A 24L carry for workdays that turn into
              overnights.” Explain the feature through its context. No hype,
              fake scarcity, or invented heritage.
            </p>
          </div>
          <div>
            <h3>Motion.</h3>
            <p>
              150–450ms ease transitions for controls, toasts, and product
              images. No continuous movement. Reduced-motion preferences remove
              transitions and smooth scrolling.
            </p>
          </div>
          <div>
            <h3>Editorial.</h3>
            <p>
              One strong headline, a short useful introduction, and specific
              advice. Material facts and concept assumptions remain
              distinguishable. No filler articles.
            </p>
          </div>
          <div>
            <h3>Email & campaigns.</h3>
            <p>
              Oversized condensed headlines, grounded product imagery, and a
              single useful action. Transactional clarity first. Marketing
              requires consent and an easy exit.
            </p>
          </div>
        </div>
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <SectionHeading
          kicker="08 / Components in context"
          title="From identity to interaction."
        />
        <div className="editorial-two">
          <ProductCard product={products[1]} />
          <div>
            <Eyebrow>Shared UI language</Eyebrow>
            <h2>Clarity is a brand behavior.</h2>
            <div className="case-links">
              <ButtonLink href="/shop">Primary action</ButtonLink>
              <ButtonLink href="/compare" secondary>
                Secondary action
              </ButtonLink>
            </div>
            <p style={{ marginTop: 25 }}>
              Readable prices. Explicit availability. Labeled variants. A calm
              confirmation when something changes. The same rhythm from product
              discovery to ownership.
            </p>
            <Link className="underlink" href="/campaign">
              See the campaign system <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
