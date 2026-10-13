import { articles, type Article } from "@/lib/catalog";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { ButtonLink, ConceptNote, Eyebrow, PageIntro } from "../ui";

export function Journal() {
  return (
    <>
      <PageIntro
        kicker="The VELT journal / Useful notes"
        title="A different view of the everyday."
      >
        <p>
          Packing lists, thoughtful details, and a little perspective on the
          things that come along.
        </p>
      </PageIntro>
      <div className="container">
        <div className="journal-index">
          {articles.map((a, i) => (
            <Link
              className="journal-card"
              href={`/journal/${a.slug}`}
              key={a.slug}
            >
              <div className="journal-art">
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
                <ArrowUpRight size={20} />
              </h3>
              <p className="small muted" style={{ marginTop: 15 }}>
                {a.intro}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export function JournalArticle({ article: a }: { article: Article }) {
  return (
    <>
      <PageIntro kicker={`${a.category} / ${a.read} read`} title={a.title}>
        <p>{a.intro}</p>
      </PageIntro>
      <div className="article-layout">
        <aside>
          <p>
            VELT / Packing & care notes
            <br />
            Collection 01
          </p>
          <Link className="underlink" href="/journal">
            All notes <ArrowRight size={14} />
          </Link>
        </aside>
        <article>
          <img
            src={
              a.slug === "three-days-one-bag"
                ? "/images/lifestyle.webp"
                : `/images/${a.image}.webp`
            }
            alt={`Editorial illustration for ${a.title}`}
          />
          {a.sections.map((s) => (
            <section key={s.title}>
              <h2>{s.title}</h2>
              <p>{s.body}</p>
            </section>
          ))}
          <div style={{ marginTop: 35 }}>
            <ButtonLink
              href={
                a.slug === "technical-fabric-care"
                  ? "/repair"
                  : "/product-finder"
              }
            >
              {a.slug === "technical-fabric-care"
                ? "Care & repair"
                : "Find your setup"}
            </ButtonLink>
          </div>
          <ConceptNote>
            Editorial content created for the VELT concept. Confirm travel rules
            with your carrier and care instructions with the actual product
            manufacturer.
          </ConceptNote>
        </article>
      </div>
    </>
  );
}
