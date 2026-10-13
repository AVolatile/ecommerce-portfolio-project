"use client";
import { money } from "@/lib/catalog";
import { recommend, type FinderAnswers } from "@/lib/commerce";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useStore } from "../store";
import { ButtonLink, ConceptNote, Eyebrow, PageIntro } from "../ui";

const questions = [
  {
    key: "use",
    title: "What does your day look like?",
    help: "Choose the part of your routine the bag needs to work hardest for.",
    options: [
      "Daily commute",
      "Gym / training",
      "Weekend travel",
      "International travel",
      "Day use",
    ],
  },
  {
    key: "load",
    title: "How much comes with you?",
    help: "Think about your usual load, rather than the occasional exception.",
    options: ["Light", "Medium", "Heavy"],
  },
  {
    key: "laptop",
    title: "Is a laptop part of the picture?",
    help: "A dedicated sleeve matters when your work comes along.",
    options: ["Yes", "No"],
  },
  {
    key: "weather",
    title: "Do you spend time in the rain?",
    help: "Our concept bags resist light rain. They are not waterproof.",
    options: ["Yes", "No"],
  },
  {
    key: "carryOn",
    title: "Does it need to travel in the cabin?",
    help: "Always check your airline’s current rules and your packed dimensions.",
    options: ["Yes", "No"],
  },
  {
    key: "size",
    title: "What feels right on your shoulder?",
    help: "Compact for a lighter day. Roomy for a little flexibility.",
    options: ["Compact", "Balanced", "Roomy"],
  },
];

export function Finder() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Partial<FinderAnswers>>({});
  const { compare } = useStore();
  const done = step === questions.length;
  const q = questions[Math.min(step, 5)];
  const chosen = answers[q.key as keyof FinderAnswers];
  if (done) {
    const ranked = recommend(answers as FinderAnswers);
    const p = ranked[0].product;
    const alt = ranked[1].product;
    return (
      <>
        <PageIntro
          kicker="Your setup / Considered, not complicated"
          title="A good fit for your kind of day."
        >
          <p>
            Based on your routine, your load, and the space you like to carry.
          </p>
        </PageIntro>
        <section className="finder-result">
          <div className="recommendation">
            <img src={p.image} alt={p.name} />
            <div>
              <Eyebrow>Our first recommendation / {p.model}</Eyebrow>
              <h2>{p.name}</h2>
              <p>{p.description}</p>
              <ul className="match-reasons">
                <li>
                  {p.uses.includes(answers.use!)
                    ? `Designed around ${answers.use!.toLowerCase()}.`
                    : `A flexible option for ${answers.use!.toLowerCase()}.`}
                </li>
                <li>
                  {p.capacity} of room for a {answers.load!.toLowerCase()} load.
                </li>
                <li>
                  {answers.laptop === "Yes"
                    ? p.laptop !== "—"
                      ? `Dedicated storage for a laptop up to ${p.laptop}.`
                      : "No laptop sleeve; choose an alternate pack if your laptop travels daily."
                    : "No extra capacity selected just for a laptop."}
                </li>
                <li>
                  {answers.weather === "Yes"
                    ? "Water-resistant fabric for light showers; use a rain cover for prolonged rain."
                    : "Simple construction for the everyday."}
                </li>
                <li>
                  {answers.carryOn === "Yes"
                    ? "Cabin-size concept dimensions. Confirm your airline’s limits."
                    : "Sized around your routine, with no airline constraint added."}
                </li>
              </ul>
              <ButtonLink href={`/product/${p.slug}`}>
                Explore {p.model} · {money(p.price)}
              </ButtonLink>
            </div>
          </div>
          <div className="alternate">
            <div>
              <Eyebrow>Another way to carry it</Eyebrow>
              <h3>
                {alt.model} / {alt.name}
              </h3>
              <p>
                {alt.capacity} · {alt.description}
              </p>
            </div>
            <Link
              className="underlink"
              href="/compare"
              onClick={() => {
                compare(p.slug);
                compare(alt.slug);
              }}
            >
              Compare the details <ArrowRight size={16} />
            </Link>
          </div>
          <button
            className="text-button"
            style={{ marginTop: 25 }}
            onClick={() => {
              setStep(0);
              setAnswers({});
            }}
          >
            Start with a different day
          </button>
          <ConceptNote>
            Recommendations use local catalog matching. They are not a fit
            guarantee.
          </ConceptNote>
        </section>
      </>
    );
  }
  return (
    <>
      <PageIntro kicker="The VELT finder" title="Find your kind of useful.">
        <p>
          Six questions. A clear recommendation. A little less second-guessing.
        </p>
      </PageIntro>
      <div className="finder-layout">
        <aside className="finder-aside">
          <Eyebrow>Objects for the overlap.</Eyebrow>
          <img src="/images/p02-transit-pack.webp" alt="Transit Pack" />
          <p>
            Start with your routine.
            <br />
            The right bag follows.
          </p>
          <span className="small muted">
            About a minute / No email required
          </span>
        </aside>
        <div className="finder-question">
          <div
            className="steps"
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={6}
            aria-valuenow={step + 1}
            aria-label={`Step ${step + 1} of 6`}
          >
            {questions.map((_, i) => (
              <span key={i} className={i <= step ? "done" : ""} />
            ))}
          </div>
          <Eyebrow>0{step + 1} / 06</Eyebrow>
          <h2>{q.title}</h2>
          <p>{q.help}</p>
          <div className="answer-options" role="group" aria-label={q.title}>
            {q.options.map((v) => (
              <button
                key={v}
                onClick={() => setAnswers({ ...answers, [q.key]: v })}
                aria-pressed={chosen === v}
              >
                {v}
                <span className="answer-circle">
                  {chosen === v && <Check size={12} />}
                </span>
              </button>
            ))}
          </div>
          <div className="finder-navigation">
            <button
              className="text-button"
              disabled={step === 0}
              onClick={() => setStep(step - 1)}
            >
              Back
            </button>
            <button
              className="button"
              disabled={!chosen}
              onClick={() => setStep(step + 1)}
            >
              {step === 5 ? "See my setup" : "Next question"}
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
