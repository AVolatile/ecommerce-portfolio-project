"use client";
import { getProduct, money, products, type Product } from "@/lib/catalog";
import { useStore } from "../store";
import { ButtonLink, ConceptNote, EmptyState, Eyebrow, PageIntro } from "../ui";

const compareRows: [string, (p: Product) => string][] = [
  ["Price", (p) => money(p.price)],
  ["Capacity / fit", (p) => p.capacity],
  ["Dimensions", (p) => p.dimensions],
  ["Weight", (p) => p.weight],
  ["Laptop", (p) => p.laptop],
  ["Carry-on concept", (p) => (p.carryOn ? "Yes; check airline limits" : "No")],
  ["Weather resistance", (p) => p.weather],
  ["External pockets", (p) => p.pockets],
  ["Materials", (p) => p.material],
  ["Concept warranty", () => "2 years / 3 with In Use"],
  ["Best for", (p) => p.uses.join(", ")],
  ["Availability", (p) => p.stock],
];

export function Compare() {
  const { state, compare } = useStore();
  const selected = state.compare
    .map(getProduct)
    .filter((p): p is Product => !!p);
  return (
    <>
      <PageIntro
        kicker="The details, side by side"
        title="A considered comparison."
      >
        <p>
          Choose two or three objects. Look at the space, the construction, and
          where each one fits.
        </p>
      </PageIntro>
      <div className="container">
        <div className="compare-picker">
          {selected.map((p) => (
            <button
              key={p.slug}
              className="button secondary"
              onClick={() => compare(p.slug)}
            >
              {p.model} / {p.name} ×
            </button>
          ))}
          {selected.length < 3 && (
            <select
              aria-label="Add product to comparison"
              value=""
              onChange={(e) => {
                if (e.target.value) compare(e.target.value);
              }}
            >
              <option value="">Add an object to compare</option>
              {products
                .filter((p) => !state.compare.includes(p.slug))
                .map((p) => (
                  <option key={p.slug} value={p.slug}>
                    {p.model} / {p.name}
                  </option>
                ))}
            </select>
          )}
        </div>
        {selected.length ? (
          <>
            <div
              className="compare-scroll"
              tabIndex={0}
              role="region"
              aria-label="Scrollable product comparison"
            >
              <table className="compare-table">
                <thead>
                  <tr>
                    <th scope="col">In the details.</th>
                    {selected.map((p) => (
                      <th scope="col" className="compare-product" key={p.slug}>
                        <img src={p.image} alt={p.name} />
                        <Eyebrow>{p.model}</Eyebrow>
                        <h2>{p.name}</h2>
                        <ButtonLink href={`/product/${p.slug}`}>
                          View object
                        </ButtonLink>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {compareRows.map(([title, fn]) => (
                    <tr key={title}>
                      <th scope="row">{title}</th>
                      {selected.map((p) => (
                        <td key={p.slug}>{fn(p)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="compare-hint">
              On smaller screens, scroll sideways to keep the details together.{" "}
              {selected.length === 1 ? "Add a second object to compare." : ""}
            </p>
          </>
        ) : (
          <EmptyState
            title="Some decisions are easier side by side."
            body="Choose products above, or add them from the collection."
          />
        )}
        <ConceptNote />
      </div>
    </>
  );
}
