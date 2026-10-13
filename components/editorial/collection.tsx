import { collections, products } from "@/lib/catalog";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { ConceptNote, Eyebrow, ProductGrid } from "../ui";

export function Collection({ slug }: { slug: string }) {
  const c = collections.find((c) => c.slug === slug)!;
  const items = products.filter((p) => p.uses.includes(c.use));
  return (
    <>
      <section className="collection-hero">
        <div>
          <Eyebrow>A considered setup / {c.use}</Eyebrow>
          <h1>{c.name}.</h1>
          <p>{c.line}</p>
          <Link className="underlink" href="/product-finder">
            Find your version <ArrowRight size={16} />
          </Link>
        </div>
        <img src={`/images/${c.image}.webp`} alt={c.name} />
      </section>
      <div className="container">
        <div className="collection-note">
          <span>
            Each piece has a job.
            <br />
            Together, a little more flexibility.
          </span>
          <span>{items.length} objects / Collection 01</span>
        </div>
        <ProductGrid items={items} />
        <ConceptNote />
      </div>
    </>
  );
}
