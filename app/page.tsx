import Link from "next/link";
import { ArrowRight, ArrowUpRight, Plus } from "lucide-react";
import { products, articles } from "@/lib/catalog";
import {
  ButtonLink,
  Eyebrow,
  ProductCard,
  SectionHeading,
} from "@/components/ui";
export default function Home() {
  return (
    <>
      <section className="hero">
        <img
          className="hero-image"
          src="/images/hero.webp"
          alt="VELT Transit Pack in graphite, resting against concrete in afternoon light"
          fetchPriority="high"
          width="1536"
          height="1024"
        />
        <div className="hero-content">
          <Eyebrow>Objects for the overlap / Collection 01</Eyebrow>
          <h1>
            One day.
            <br />
            Many ways
            <br />
            to <span>move.</span>
          </h1>
          <p>
            Considered packs, bags, and everyday essentials.
            <br />
            For work. For a few days away. For everything between.
          </p>
          <div className="hero-buttons">
            <ButtonLink href="/shop">Shop the collection</ButtonLink>
            <ButtonLink href="/product-finder" secondary>
              Find your setup
            </ButtonLink>
          </div>
        </div>
        <div className="hero-caption">
          <span>
            <i />
            P—02 / TRANSIT PACK
          </span>
          <Link href="/product/p02-transit-pack">
            24L. All day, and then some.
            <ArrowUpRight size={16} />
          </Link>
        </div>
        <div className="hero-side">DESIGNED TO BE IN USE. / VELT 01</div>
      </section>
      <div className="brand-strip">
        <span>A place for your day.</span>
        <span>
          Work <Plus size={12} /> Training <Plus size={12} /> Travel{" "}
          <Plus size={12} /> Everyday
        </span>
        <Link href="/about">
          Our point of view <ArrowUpRight size={14} />
        </Link>
      </div>
      <section className="section essentials">
        <SectionHeading
          kicker="The first collection"
          title="Less, but better considered."
          href="/shop"
          link="Shop all objects"
        />
        <div className="featured-grid">
          {[products[1], products[3], products[6], products[8]].map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      </section>
      <section className="overlap-story">
        <div className="story-image">
          <img
            src="/images/lifestyle.webp"
            alt="A commuter wearing a VELT pack outside a concrete train station"
            loading="lazy"
            width="1536"
            height="1024"
          />
          <span>THE HOURS IN BETWEEN / 01</span>
        </div>
        <div className="story-copy">
          <Eyebrow>One object. More of your life.</Eyebrow>
          <h2>
            Your day doesn’t
            <br />
            end at your desk.
          </h2>
          <p>
            Neither should your bag. We design around the overlap: the laptop
            and the gym kit. The Tuesday commute and the Friday departure.
          </p>
          <p>
            Fewer things to switch between.
            <br />
            More reasons to take them with you.
          </p>
          <Link className="underlink" href="/collections/the-commute">
            Meet your everyday system <ArrowRight size={18} />
          </Link>
          <div className="use-line">
            <span>
              08:30
              <br />
              <strong>Work.</strong>
            </span>
            <span>
              18:00
              <br />
              <strong>Move.</strong>
            </span>
            <span>
              Friday
              <br />
              <strong>Leave.</strong>
            </span>
          </div>
        </div>
      </section>
      <section className="section category-section">
        <SectionHeading
          kicker="Different days. Same point of view."
          title="Find your kind of useful."
        />
        <div className="category-grid">
          {[
            {
              title: "For the everyday.",
              category: "Packs",
              slug: "packs",
              image: "p01-day-pack",
              count: "01–03",
            },
            {
              title: "For a few days away.",
              category: "Bags",
              slug: "bags",
              image: "b01-weekender",
              count: "04–05",
            },
            {
              title: "For the little things.",
              category: "Accessories",
              slug: "accessories",
              image: "a02-tech-organizer",
              count: "06–09",
            },
          ].map((c) => (
            <Link
              className="category-tile"
              href={`/shop/${c.slug}`}
              key={c.slug}
            >
              <img
                src={`/images/${c.image}.webp`}
                alt={c.category}
                loading="lazy"
                width="600"
                height="600"
              />
              <span className="category-count">OBJECTS / {c.count}</span>
              <div>
                <small>{c.category}</small>
                <h3>{c.title}</h3>
                <ArrowUpRight size={24} />
              </div>
            </Link>
          ))}
        </div>
      </section>
      <section className="finder-banner">
        <div>
          <Eyebrow>A little direction goes a long way.</Eyebrow>
          <h2>
            What does
            <br />
            your day carry?
          </h2>
          <p>Six questions. A setup that makes sense for you.</p>
          <ButtonLink href="/product-finder">Find your setup</ButtonLink>
        </div>
        <div className="finder-diagram">
          <span>YOUR DAY</span>
          <div>
            <span>Work</span>
            <span>Training</span>
            <span>Travel</span>
          </div>
          <svg viewBox="0 0 350 120" aria-hidden="true">
            <path
              d="M50 0v35l125 60V120M175 0v120M300 0v35L175 95"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
          <div className="diagram-result">
            A considered fit. <ArrowUpRight size={20} />
          </div>
        </div>
      </section>
      <section className="section material-section">
        <div>
          <Eyebrow>Nothing here is an afterthought.</Eyebrow>
          <h2>
            Quiet on the outside.
            <br />
            Considered all the way through.
          </h2>
          <p>
            Textured nylon. Replaceable hardware. Openings that work with one
            hand. Small decisions that add up to something you’ll keep reaching
            for.
          </p>
          <Link href="/materials" className="underlink">
            The details, up close <ArrowRight size={17} />
          </Link>
        </div>
        <div className="material-visual">
          <img
            src="/images/hero.webp"
            alt="Close crop of the Transit Pack’s textured nylon, stitching, and front pocket"
            loading="lazy"
          />
          <span>420D NYLON / GRAPHITE / CONSIDERED CONSTRUCTION</span>
        </div>
      </section>
      <section className="membership-banner">
        <div>
          <Eyebrow>VELT / In Use</Eyebrow>
          <h2>
            For the things
            <br />
            you keep using.
          </h2>
          <p>
            A membership built around ownership. Repair credit, early access,
            and more life in the objects you already love.
          </p>
          <ButtonLink href="/membership" secondary>
            Meet In Use
          </ButtonLink>
        </div>
        <div className="member-card">
          <span>VELT / IN USE</span>
          <span className="member-symbol">↗</span>
          <div>
            <strong>
              Keep it close.
              <br />
              Keep it going.
            </strong>
            <span>
              MEMBER / 0001
              <br />
              OWNERSHIP, CONSIDERED.
            </span>
          </div>
        </div>
      </section>
      <section className="section journal-section">
        <SectionHeading
          kicker="Notes on getting out and getting on."
          title="A different view of the everyday."
          href="/journal"
          link="Read the journal"
        />
        <div className="journal-grid">
          {articles.slice(0, 3).map((a, i) => (
            <Link
              className="journal-card"
              href={`/journal/${a.slug}`}
              key={a.slug}
            >
              <div className={`journal-art art-${i}`}>
                <img
                  src={
                    i === 0
                      ? "/images/lifestyle.webp"
                      : `/images/${a.image}.webp`
                  }
                  alt=""
                  loading="lazy"
                />
                <span>NOTE / 0{i + 1}</span>
              </div>
              <Eyebrow>
                {a.category} / {a.read} read
              </Eyebrow>
              <h3>
                {a.title}
                <ArrowUpRight size={19} />
              </h3>
            </Link>
          ))}
        </div>
      </section>
      <div className="repair-strip">
        <span>Good things deserve a longer story.</span>
        <Link href="/repair">
          Care. Repair. Repeat. <ArrowUpRight size={18} />
        </Link>
      </div>
    </>
  );
}
