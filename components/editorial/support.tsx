import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Accordion, ConceptNote, PageIntro } from "../ui";

export function Support() {
  return (
    <>
      <PageIntro
        kicker="Practical answers / Policy concepts"
        title="Clear from the beginning."
      >
        <p>
          Shipping, returns, exchanges, and care. These policies describe the
          intended experience for the fictional VELT brand.
        </p>
      </PageIntro>
      <div className="container">
        <div className="support-grid">
          <div>
            <h2>Shipping.</h2>
            <Accordion title="Standard delivery" open>
              <p>
                US concept shipping is $8, complimentary for merchandise
                subtotals of $150 or more before discounts. The illustrative
                window is 3–5 business days after dispatch.
              </p>
            </Accordion>
            <Accordion title="Express delivery">
              <p>
                The concept express option is $18, with an illustrative window
                of 1–2 business days after dispatch. Weekends and carrier delays
                are excluded.
              </p>
            </Accordion>
            <Accordion title="International delivery">
              <p>
                International shipping is outside this demonstration. A
                production service would disclose duties, taxes, restrictions,
                and destination-specific rates before payment.
              </p>
            </Accordion>
          </div>
          <div>
            <h2>Returns & exchanges.</h2>
            <Accordion title="The 30-day concept policy" open>
              <p>
                Unused products, with their labels and packaging, could be
                returned within 30 days of delivery. Normal use, accidental
                damage, and customized items are outside this concept policy.
              </p>
            </Accordion>
            <Accordion title="Return delivery costs">
              <p>
                Return shipping would be the customer’s responsibility unless a
                verified manufacturing defect or incorrect shipment is
                confirmed. An estimate would be shown before the return is
                authorized.
              </p>
            </Accordion>
            <Accordion title="Exchanges">
              <p>
                An exchange would depend on stock. Where a preferred color or
                size is unavailable, a refund after inspection would be the next
                option. No returns are processed in this demo.
              </p>
            </Accordion>
          </div>
          <div>
            <h2>Care & repair.</h2>
            <Accordion title="Before replacing it" open>
              <p>
                Start with a repair assessment. Zippers, webbing, loose
                stitching, and hardware may be serviceable. Work would require a
                quote and explicit approval.
              </p>
              <Link className="underlink" href="/repair">
                Preview a repair enquiry <ArrowRight size={16} />
              </Link>
            </Accordion>
          </div>
          <div>
            <h2>Using this demonstration.</h2>
            <Accordion title="What is stored?" open>
              <p>
                Cart contents, saved items, comparisons, membership,
                preferences, a demo profile, and demo orders are saved in your
                browser’s local storage. Nothing is sent to a commerce backend.
              </p>
            </Accordion>
            <Accordion title="How do I reset it?">
              <p>
                Clear the site data in your browser settings. Use fictional
                personal details, since local demo orders retain the address you
                enter on your device.
              </p>
            </Accordion>
          </div>
        </div>
        <ConceptNote>
          These are product-design policy concepts, not terms of sale. No real
          purchases, refunds, warranties, or support cases are created.
        </ConceptNote>
      </div>
    </>
  );
}
