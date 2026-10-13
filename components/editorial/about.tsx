import {
  ButtonLink,
  ConceptNote,
  Eyebrow,
  PageIntro,
  SectionHeading,
} from "../ui";

export function About() {
  return (
    <>
      <PageIntro kicker="The VELT point of view" title="Your life has overlap.">
        <p>We think the things you own should have it, too.</p>
      </PageIntro>
      <div className="statement">
        <Eyebrow>Fewer things. Fuller days.</Eyebrow>
        <h2>
          One good object.
          <br />A lot of different days.
        </h2>
      </div>
      <section className="section editorial-two">
        <div>
          <Eyebrow>Why VELT exists.</Eyebrow>
          <h2>
            The categories are ours.
            <br />
            The days are yours.
          </h2>
          <p>
            A commute that ends at the gym. A workday that turns into a weekend
            away. A bag that carries both without looking out of place in
            either.
          </p>
          <p>
            VELT is built around the overlap in real routines. Useful products,
            quiet details, and enough flexibility to keep up when the plan
            changes.
          </p>
          <p>
            We start with the things you actually carry. Give each one a place.
            Remove what gets in the way. Then make the object feel as considered
            as the job it does.
          </p>
          <ButtonLink href="/shop">Meet the first collection</ButtonLink>
        </div>
        <img
          src="/images/lifestyle.webp"
          alt="A commuter in motion outside a transit station"
          loading="lazy"
        />
      </section>
      <section className="section" style={{ paddingTop: 0 }}>
        <SectionHeading
          kicker="A consistent point of view."
          title="Useful before anything else."
        />
        <div className="benefit-grid">
          {[
            [
              "01",
              "Design around a routine.",
              "Every feature starts with something a person needs to do. Put a laptop away. Find a key. Pack for a few days.",
            ],
            [
              "02",
              "Keep the outside quiet.",
              "Restraint is part of the function. A clean object belongs in more places, with fewer things competing for attention.",
            ],
            [
              "03",
              "Think past the purchase.",
              "Care, repair, and clear information belong in the experience from the beginning. Ownership is where the relationship starts.",
            ],
          ].map(([n, t, b]) => (
            <div className="benefit" key={n}>
              <span>{n}</span>
              <h3>{t}</h3>
              <p>{b}</p>
            </div>
          ))}
        </div>
        <ConceptNote>
          VELT is a fictional consumer brand created by Anthony Volatile /
          Volatile Solutions. The collection illustrates product and brand
          strategy; it is not manufactured or offered for sale.
        </ConceptNote>
      </section>
    </>
  );
}
