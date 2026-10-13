import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Accordion, ConceptNote, Eyebrow, PageIntro } from "../ui";

export function Materials() {
  return (
    <>
      <PageIntro
        kicker="Material notes / The details matter"
        title="Considered all the way through."
      >
        <p>
          Nothing here is an afterthought. Not the weave, the lining, the
          opening, or the way a buckle gets replaced.
        </p>
      </PageIntro>
      <div className="container">
        <div className="material-grid">
          {[
            [
              "Graphite / 420D nylon",
              "A textured outer fabric for the packs and bags. The proposed weave balances structure and flexibility. Water resistance is a concept specification, not a test result.",
              "",
            ],
            [
              "Mineral / Soft lining",
              "A light interior makes small objects easier to see. The proposed polyester lining separates your kit without adding unnecessary compartments.",
              "mineral",
            ],
            [
              "Petrol / Lightweight nylon",
              "For the shell and lightweight accessories. Flexible enough to pack down, with a water-repellent finish proposed for light showers. Not waterproof.",
              "petrol",
            ],
            [
              "Clay / Hardware & webbing",
              "Buckles, pull tabs, and straps selected with replacement in mind. Service access should be considered at the design stage, rather than added later.",
              "clay",
            ],
          ].map(([t, b, c]) => (
            <article className="material-card" key={t}>
              <div
                className={`material-sample ${c}`}
                role="img"
                aria-label={`${t} illustrative texture`}
              />
              <Eyebrow>Proposed material palette</Eyebrow>
              <h2>{t}</h2>
              <p>{b}</p>
            </article>
          ))}
        </div>
        <section style={{ marginTop: 65 }} className="editorial-two">
          <div>
            <Eyebrow>Construction before claims.</Eyebrow>
            <h2>
              Make the details
              <br />
              easy to live with.
            </h2>
            <p>
              The concept pairs reinforced stress points, covered seams, and
              accessible zip sliders. Published production specifications would
              require supplier confirmation and real durability testing.
            </p>
            <Link className="underlink" href="/repair">
              Care and repair <ArrowRight size={16} />
            </Link>
          </div>
          <div>
            <Accordion title="Weather resistance" open>
              <p>
                Concept bags are intended for light showers. The seams are not
                represented as sealed, and no waterproof rating is claimed. Use
                a cover in prolonged rain.
              </p>
            </Accordion>
            <Accordion title="No unverified certifications">
              <p>
                No recycled-content percentages, carbon-neutral claims, chemical
                certifications, patented textiles, or laboratory results are
                asserted.
              </p>
            </Accordion>
            <Accordion title="A straightforward care routine">
              <p>
                Spot clean with mild soap and a damp cloth. Air dry. Avoid
                bleach, machine washing, and high heat on packs and bags.
              </p>
            </Accordion>
          </div>
        </section>
        <ConceptNote>
          Material swatches are visual studies. Specifications are illustrative
          proposals for a fictional catalog.
        </ConceptNote>
      </div>
    </>
  );
}
