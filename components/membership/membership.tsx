"use client";
import { membership } from "@/lib/catalog";
import { ArrowUpRight } from "lucide-react";
import { useStore } from "../store";
import {
  Accordion,
  ButtonLink,
  ConceptNote,
  Eyebrow,
  SectionHeading,
} from "../ui";

export function Membership() {
  const { state, join } = useStore();
  return (
    <>
      <section className="membership-hero">
        <div>
          <Eyebrow>VELT / In Use</Eyebrow>
          <h1>
            The best part
            <br />
            is getting
            <br />
            used.
          </h1>
          <p>
            A closer relationship with the things you own. Repair credit, early
            access, and useful support for the long run.
          </p>
          {state.member ? (
            <ButtonLink href="/account/membership">Your membership</ButtonLink>
          ) : (
            <button className="button" onClick={join}>
              Activate concept membership <ArrowUpRight size={17} />
            </button>
          )}
          <span className="membership-price">
            $48 / year concept · Activation is free in this demo
          </span>
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
      <section className="section">
        <SectionHeading
          kicker="More than a transaction."
          title="A reason to keep things going."
        />
        <div className="benefit-grid">
          {membership.benefits.map((b, i) => (
            <div className="benefit" key={b}>
              <span>0{i + 1} / IN USE</span>
              <h3>{b}</h3>
              <p>
                {
                  [
                    "Put $40 toward assessed repairs each membership year. Credit has no cash value and does not roll over.",
                    "See planned products before the wider release. Access is an invitation, not a purchase requirement.",
                    "Quiet variations on the objects you already know. Releases depend on availability.",
                    "A direct place to ask about care, compatibility, and the product you own.",
                    "Manufacturing defects are covered for a third year while the concept membership is active.",
                    "Practical notes on getting more out of your setup, with optional community sessions.",
                  ][i]
                }
              </p>
            </div>
          ))}
        </div>
      </section>
      <section className="membership-how">
        <div>
          <Eyebrow>A simple idea.</Eyebrow>
          <h2>
            Own fewer things.
            <br />
            Know them better.
          </h2>
          <p>
            The membership price is $48 a year, with $40 set aside for repairs.
            The rest is about access, care, and a more useful relationship.
          </p>
          <ConceptNote>
            Illustrative program terms. No recurring billing, payments, actual
            events, or service entitlements are created.
          </ConceptNote>
        </div>
        <div>
          <Accordion title="How does repair credit work?" open>
            <p>
              Credit applies to an assessed repair after approval. It covers up
              to $40 of service cost each concept year. Unused credit expires at
              the anniversary; shipping costs are quoted separately.
            </p>
          </Accordion>
          <Accordion title="Is there automatic renewal?">
            <p>
              There is no billing or automatic renewal in this demonstration. A
              production implementation would require explicit consent and clear
              cancellation controls.
            </p>
          </Accordion>
          <Accordion title="Do I have to be a member to get a repair?">
            <p>
              No. Repair assessment and care guidance would be available to all
              VELT owners. Members would receive credit and priority support.
            </p>
          </Accordion>
          <Accordion title="Can I leave the program?">
            <p>
              The demo activation adds a local membership state only. You can
              clear your browser’s site data to reset all demo state.
            </p>
          </Accordion>
        </div>
      </section>
    </>
  );
}
