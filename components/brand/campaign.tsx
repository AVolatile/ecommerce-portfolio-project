import { campaigns, emails, getProduct } from "@/lib/catalog";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ConceptNote, Eyebrow, SectionHeading } from "../ui";

export function CampaignArt({
  index,
  format = "square",
}: {
  index: number;
  format?: string;
}) {
  const c = campaigns[index];
  const image =
    index === 0
      ? "/images/lifestyle.webp"
      : index === 6
        ? "/images/hero.webp"
        : `/images/${c.product}.webp`;
  return (
    <div className={`campaign-art ${c.tone} ${format} concept-${index}`}>
      <span>VELT / {c.label.toUpperCase()}</span>
      <h2>{c.title}</h2>
      {index === 4 ? (
        <div className="campaign-member-visual">
          <span>VELT / IN USE</span>
          <b>↗</b>
          <strong>
            Keep it close.
            <br />
            Keep it going.
          </strong>
          <small>OWNERSHIP, CONSIDERED. / CONCEPT</small>
        </div>
      ) : (
        <img
          src={image}
          alt={`${c.title} / ${getProduct(c.product)!.name}`}
          loading="lazy"
        />
      )}
      {index === 7 && (
        <div className="campaign-number" aria-hidden="true">
          03
        </div>
      )}
      <small>FEWER THINGS. FULLER DAYS. / VELT</small>
    </div>
  );
}

export function Campaign() {
  return (
    <>
      <div className="campaign-top">
        <Eyebrow>VELT / Collection 01 / Launch system</Eyebrow>
        <h1>
          A point of view.
          <br />
          Out in the world.
        </h1>
        <p>
          One identity. Eight campaign territories. A system that moves from a
          quiet product detail to a very loud wall.
        </p>
      </div>
      <nav className="campaign-tabs" aria-label="Campaign sections">
        <a href="#concepts">Concepts</a>
        <a href="#social">Social</a>
        <a href="#display">Display</a>
        <a href="#posters">Out of home</a>
        <a href="#email">Lifecycle</a>
      </nav>
      <section className="section" id="concepts">
        <SectionHeading
          kicker="Eight ways into the same idea."
          title="Objects. Routines. A little overlap."
        />
        <div className="campaign-grid">
          {campaigns.map((c, i) => (
            <div key={c.title}>
              <CampaignArt index={i} />
              <div className="campaign-caption">
                <span>
                  0{i + 1} / {c.label}
                </span>
                <a
                  download
                  href={`/campaign-assets/concept-${i + 1}-1080x1080.png`}
                >
                  Download creative <ArrowUpRight size={12} />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
      <section className="section" id="social" style={{ paddingTop: 0 }}>
        <SectionHeading
          kicker="Paid social / 1080 × 1080 / 1080 × 1350 / 1080 × 1920"
          title="Built for different frames."
        />
        <div className="social-format-grid">
          <div>
            <CampaignArt index={0} />
            <p className="campaign-caption">
              Feed / 1:1{" "}
              <a download href="/campaign-assets/social-square.png">
                Export ↗
              </a>
            </p>
          </div>
          <div>
            <CampaignArt index={2} format="portrait" />
            <p className="campaign-caption">
              Portrait / 4:5{" "}
              <a download href="/campaign-assets/social-portrait.png">
                Export ↗
              </a>
            </p>
          </div>
          <div>
            <CampaignArt index={4} format="story" />
            <p className="campaign-caption">
              Story / 9:16{" "}
              <a download href="/campaign-assets/social-story.png">
                Export ↗
              </a>
            </p>
          </div>
        </div>
      </section>
      <section
        className="section"
        id="display"
        style={{ background: "var(--paper)" }}
      >
        <SectionHeading
          kicker="Display / A modular message"
          title="Small space. Clear intent."
        />
        <div className="display-ads">
          <div>
            <div className="display-ad mpu">
              <span className="eyebrow">VELT / P—02</span>
              <h3>
                Workday.
                <br />
                And then some.
              </h3>
              <img src="/images/p02-transit-pack.webp" alt="Transit Pack" />
            </div>
            <a
              className="campaign-caption"
              download
              href="/campaign-assets/display-300x250.png"
            >
              300 × 250 / Download ↗
            </a>
          </div>
          <div>
            <div className="display-ad skyscraper">
              <span className="eyebrow">VELT</span>
              <h3>
                One bag.
                <br />A few
                <br />
                more days.
              </h3>
              <img src="/images/p03-travel-pack.webp" alt="Travel Pack" />
              <span className="small">P—03 / 35L</span>
            </div>
            <a
              className="campaign-caption"
              download
              href="/campaign-assets/display-160x600.png"
            >
              160 × 600 / Download ↗
            </a>
          </div>
          <div className="display-horizontal">
            <div>
              <div className="display-ad leaderboard">
                <strong>VELT</strong>
                <h3>Your day has more than one part.</h3>
                <ArrowUpRight size={22} />
              </div>
              <a
                className="campaign-caption"
                download
                href="/campaign-assets/display-728x90.png"
              >
                728 × 90 / Download ↗
              </a>
            </div>
            <div>
              <div className="display-ad billboard">
                <div>
                  <Eyebrow>VELT / COLLECTION 01</Eyebrow>
                  <h3>
                    Fewer things.
                    <br />
                    Fuller days.
                  </h3>
                </div>
                <img src="/images/b01-weekender.webp" alt="Weekender" />
              </div>
              <a
                className="campaign-caption"
                download
                href="/campaign-assets/display-970x250.png"
              >
                970 × 250 / Download ↗
              </a>
            </div>
          </div>
        </div>
      </section>
      <section className="section" id="posters">
        <SectionHeading
          kicker="Out of home / Four clear statements"
          title="A little louder. Just as considered."
        />
        <div className="poster-grid">
          {[0, 1, 2, 5].map((i, n) => (
            <div key={i}>
              <CampaignArt index={i} format="poster" />
              <a
                className="campaign-caption"
                download
                href={`/campaign-assets/poster-${n + 1}.png`}
              >
                Poster 0{n + 1} / Download ↗
              </a>
            </div>
          ))}
        </div>
      </section>
      <section className="section" id="email" style={{ paddingTop: 0 }}>
        <SectionHeading
          kicker="Eight moments / One continuous relationship"
          title="A useful note at the right time."
        />
        <div className="email-gallery">
          {emails.map((e) => (
            <article className="email-preview" key={e.slug}>
              <span>VELT↗</span>
              <Eyebrow>{e.slug.replaceAll("-", " ")}</Eyebrow>
              <h3>{e.title}</h3>
              <img
                src={`/images/${e.product}.webp`}
                alt={getProduct(e.product)!.name}
              />
              <p>{e.body}</p>
              <Link href={e.href} className="button">
                {e.cta}
                <ArrowUpRight size={13} />
              </Link>
              <a
                href={`/emails/${e.slug}.html`}
                target="_blank"
                rel="noreferrer"
              >
                Open responsive HTML / ↗
              </a>
            </article>
          ))}
        </div>
      </section>
      <section className="section" style={{ background: "var(--paper)" }}>
        <SectionHeading
          kicker="Retention without pressure."
          title="From consideration to continued use."
        />
        <div className="lifecycle">
          {[
            [
              "Consideration",
              "Consent + interest",
              "Useful product details, a comparison, or a packing guide. Browse reminders require explicit marketing consent.",
            ],
            [
              "Cart reminder",
              "One day / then stop",
              "One calm reminder of a saved setup. No countdowns, stock pressure, or escalating discounts.",
            ],
            [
              "Post-purchase",
              "Event-triggered",
              "Confirmation, dispatch, and delivery notes tied to real order events. Clear information comes first.",
            ],
            [
              "Ownership",
              "After delivery",
              "Care notes before a membership invitation. Repair remains available without a subscription.",
            ],
          ].map(([t, s, b]) => (
            <div key={t}>
              <small>{s}</small>
              <h3>{t}</h3>
              <p>{b}</p>
            </div>
          ))}
        </div>
        <ConceptNote>
          All creative and email previews are concept artifacts. No advertising
          was placed and no email was sent. Templates require a production
          consent model, unsubscribe handling, and verified transactional data.
        </ConceptNote>
      </section>
    </>
  );
}
