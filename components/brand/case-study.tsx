import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ButtonLink, ConceptNote, Eyebrow } from "../ui";

export function CaseStudy() {
  const sections = [
    {
      kicker: "01 / The opportunity",
      title: "A product business needs more than a storefront.",
      body: "The project adds a consumer-commerce signal to Anthony Volatile’s portfolio: a connected brand, merchandise system, discovery experience, purchase flow, and ownership relationship. The challenge was to make the whole journey feel like one considered company.",
      links: [["/about", "The brand point of view"]],
    },
    {
      kicker: "02 / Strategy & identity",
      title: "Build around overlap. Keep the outside quiet.",
      body: "VELT addresses active professionals whose routines cross work, training, and short travel. A compact wordmark, folded V symbol, numbered product families, graphite palette, and restrained orange create recognition across objects, packaging, interface, and campaigns.",
      links: [["/brand", "Explore the identity system"]],
    },
    {
      kicker: "03 / Commerce",
      title: "Make the product easy to understand, then easy to choose.",
      body: "Twelve products share a typed catalog, specific copy, consistent specifications, availability states, and related objects. Product pages pair image galleries and variant controls with measurements, care, shipping, and honest policy concepts. The cart leads into a five-stage guest checkout with validation and a fixed fictional payment method.",
      links: [
        ["/shop", "Collection"],
        ["/product/p02-transit-pack", "Product detail"],
        ["/cart", "Cart & checkout"],
      ],
      image: "/images/hero.webp",
    },
    {
      kicker: "04 / Discovery",
      title: "Give the customer a reason for the recommendation.",
      body: "Search matches names, categories, and uses. Filters narrow the catalog by routine, price, color, size, material, and stock. Comparison brings up to three objects into one table. The six-question finder ranks available bags through transparent local scoring and explains why its first recommendation fits.",
      links: [
        ["/product-finder", "Product finder"],
        ["/compare", "Compare objects"],
      ],
    },
    {
      kicker: "05 / Membership & ownership",
      title: "A relationship built on continued use.",
      body: "In Use proposes a $48 annual program centered on a $40 repair credit, early access, and care. Local membership activation connects to a customer view with anniversary, credit, release previews, order history, saved objects, and preferences. Repair support remains available outside membership.",
      links: [
        ["/membership", "In Use"],
        ["/account", "Customer experience"],
        ["/repair", "Repair enquiry"],
      ],
    },
    {
      kicker: "06 / Editorial",
      title: "Useful content earns its place.",
      body: "Four complete journal articles cover three-day packing, commuter-pack selection, technical-fabric care, and owning fewer bags. Five curated collections organize the catalog around routines. Material and policy pages separate proposed product specifications from verified claims.",
      links: [
        ["/journal", "Read the journal"],
        ["/materials", "Material notes"],
      ],
    },
    {
      kicker: "07 / Campaign & lifecycle",
      title: "One point of view, wherever it shows up.",
      body: "Eight campaign territories extend into three social formats, four display sizes, four poster studies, and eight responsive email templates. The lifecycle connects consent-based consideration, one calm cart reminder, transactional status updates, care, repair, and a later membership invitation. No campaign was placed and no email was sent.",
      links: [["/campaign", "Explore the campaign system"]],
    },
    {
      kicker: "08 / Accessibility & build",
      title: "The detail should hold up in use.",
      body: "The implementation uses semantic landmarks, a skip link, labeled forms with field-specific errors, visible focus, native dialog focus containment, keyboard-operable controls, live cart feedback, reduced motion, and accessible horizontal comparison. Responsive CSS changes layouts for small screens, including a sticky product action.",
      links: [["/support", "Demo & policy details"]],
    },
  ];
  return (
    <>
      <section className="case-cover">
        <div>
          <Eyebrow>Anthony Volatile / Volatile Solutions</Eyebrow>
          <h1>VELT</h1>
          <h2>
            Premium consumer commerce
            <br />+ membership brand.
          </h2>
          <div className="case-disciplines">
            <span>Brand strategy</span>
            <span>Commerce UX</span>
            <span>Product design</span>
            <span>Frontend</span>
            <span>Campaign</span>
            <span>Lifecycle</span>
          </div>
        </div>
        <img
          src="/images/p02-transit-pack.webp"
          alt="VELT Transit Pack, a key object in the consumer brand concept"
        />
      </section>
      <div className="case-facts">
        <div>
          <small>Project type</small>
          <span>Self-initiated concept</span>
        </div>
        <div>
          <small>Role</small>
          <span>Strategy → design → implementation</span>
        </div>
        <div>
          <small>Audience</small>
          <span>Active, design-aware professionals</span>
        </div>
        <div>
          <small>Outcome</small>
          <span>A complete interactive demonstration</span>
        </div>
      </div>
      {sections.map((s) => (
        <section className="case-section" key={s.kicker}>
          <Eyebrow>{s.kicker}</Eyebrow>
          <div>
            <h2>{s.title}</h2>
            <p>{s.body}</p>
            <div className="case-links">
              {s.links.map(([href, title]) => (
                <Link className="underlink" key={href} href={href}>
                  {title}
                  <ArrowRight size={15} />
                </Link>
              ))}
            </div>
            {s.image && (
              <div className="case-visual">
                <img
                  src={s.image}
                  alt="VELT commerce campaign product art"
                  loading="lazy"
                />
              </div>
            )}
          </div>
        </section>
      ))}
      <section className="case-section">
        <Eyebrow>09 / What was built</Eyebrow>
        <div>
          <h2>
            A reusable foundation.
            <br />A specific point of view.
          </h2>
          <ul>
            <li>
              Next.js static export, React, TypeScript, and responsive CSS
              tokens.
            </li>
            <li>
              Centralized product, collection, editorial, membership, and
              campaign models.
            </li>
            <li>
              Persistent local cart, comparison, wishlist, preferences, profile,
              orders, and membership.
            </li>
            <li>
              Functional discovery, simulated purchase, repair enquiry, and
              ownership flows.
            </li>
            <li>
              Original AI-generated concept photography, local optimized assets,
              and identity SVGs.
            </li>
            <li>
              Downloadable campaign creatives, responsive HTML email previews,
              and portfolio export guidance.
            </li>
          </ul>
          <p>
            No backend, real authentication, payments, fulfillment, marketing
            automation, or commercial performance metrics are represented.
          </p>
        </div>
      </section>
      <section className="section">
        <h2>A concept with a complete customer journey.</h2>
        <ConceptNote>
          This is a self-initiated concept project created to demonstrate
          consumer brand strategy, commerce UX, merchandising, frontend
          development, campaign systems, and lifecycle design.
        </ConceptNote>
        <div className="case-links">
          <ButtonLink href="/">Explore VELT</ButtonLink>
          <ButtonLink href="/brand" secondary>
            View the brand system
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
