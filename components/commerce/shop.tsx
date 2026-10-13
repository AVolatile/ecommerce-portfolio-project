"use client";
import { categories, colorValues, money, products } from "@/lib/catalog";
import { isAvailable } from "@/lib/commerce";
import { ArrowUpRight, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { ConceptNote, EmptyState, Modal, PageIntro, ProductGrid } from "../ui";

export function Shop({ category }: { category?: string }) {
  const [sort, setSort] = useState("featured");
  const [filter, setFilter] = useState(false);
  const [use, setUse] = useState("");
  const [price, setPrice] = useState("");
  const [color, setColor] = useState("");
  const [capacity, setCapacity] = useState("");
  const [material, setMaterial] = useState("");
  const [stock, setStock] = useState(false);
  const cat = categories.find((c) => c.slug === category);
  let items = products.filter(
    (p) =>
      (!category || p.category === category) &&
      (!use || p.uses.includes(use)) &&
      (!price || p.price <= Number(price)) &&
      (!color || p.colors.includes(color)) &&
      (!stock || isAvailable(p)) &&
      (!capacity ||
        (capacity === "compact"
          ? parseInt(p.capacity) <= 24
          : parseInt(p.capacity) > 24)) &&
      (!material || p.material.toLowerCase().includes(material)),
  );
  if (sort === "low") items = [...items].sort((a, b) => a.price - b.price);
  if (sort === "high") items = [...items].sort((a, b) => b.price - a.price);
  if (sort === "name")
    items = [...items].sort((a, b) => a.name.localeCompare(b.name));
  const clear = () => {
    setUse("");
    setPrice("");
    setColor("");
    setStock(false);
    setCapacity("");
    setMaterial("");
  };
  const active = !!(use || price || color || stock || capacity || material);
  return (
    <>
      <PageIntro
        kicker="Collection 01 / Objects in use"
        title={cat ? cat.title : "Objects for the overlap."}
      >
        <p>
          {cat
            ? cat.description
            : "Packs, bags, layers, and the little things. A considered collection for days that don’t fit a single category."}
        </p>
      </PageIntro>
      <div className="container">
        <div className="shop-toolbar">
          <nav className="category-tabs" aria-label="Product categories">
            <Link href="/shop" className={!category ? "selected" : ""}>
              All objects
            </Link>
            {categories.map((c) => (
              <Link
                key={c.slug}
                href={`/shop/${c.slug}`}
                className={category === c.slug ? "selected" : ""}
              >
                {c.title}
              </Link>
            ))}
          </nav>
          <div className="shop-tools">
            <button className="filter-button" onClick={() => setFilter(true)}>
              <SlidersHorizontal size={14} /> Filters {active ? "· Active" : ""}
            </button>
            <label>
              Sort by{" "}
              <select
                aria-label="Sort products"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="featured">Featured</option>
                <option value="low">Price: low to high</option>
                <option value="high">Price: high to low</option>
                <option value="name">Name: A–Z</option>
              </select>
            </label>
          </div>
        </div>
        {active && (
          <div className="active-filters">
            <span>
              {[
                use,
                price && `Under ${money(Number(price))}`,
                color,
                capacity,
                material,
                stock && "Available now",
              ]
                .filter(Boolean)
                .join(" / ")}
            </span>
            <button className="text-button" onClick={clear}>
              Clear filters
            </button>
          </div>
        )}
        <p className="result-count" role="status">
          {items.length} considered objects
        </p>
        {items.length ? (
          <ProductGrid items={items} />
        ) : (
          <EmptyState
            title="A little too specific?"
            body="Try another use or open up the filters."
          />
        )}
        <ConceptNote />
      </div>
      <Modal
        open={filter}
        onClose={() => setFilter(false)}
        title="A closer fit."
        sheet
      >
        <div className="filter-fields">
          <label>
            Use
            <select
              aria-label="Use"
              value={use}
              onChange={(e) => setUse(e.target.value)}
            >
              <option value="">All uses</option>
              {[
                "Daily commute",
                "Gym / training",
                "Weekend travel",
                "International travel",
                "Day use",
              ].map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </label>
          <label>
            Price
            <select
              aria-label="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            >
              <option value="">Any price</option>
              <option value="75">Under $75</option>
              <option value="175">Under $175</option>
              <option value="250">Under $250</option>
            </select>
          </label>
          <label>
            Color
            <select
              aria-label="Color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            >
              <option value="">All colors</option>
              {Object.keys(colorValues).map((v) => (
                <option key={v}>{v}</option>
              ))}
            </select>
          </label>
          <label>
            Capacity
            <select
              aria-label="Capacity"
              value={capacity}
              onChange={(e) => setCapacity(e.target.value)}
            >
              <option value="">All sizes</option>
              <option value="compact">Up to 24L</option>
              <option value="roomy">Above 24L</option>
            </select>
          </label>
          <label>
            Material
            <select
              aria-label="Material"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
            >
              <option value="">All materials</option>
              <option value="nylon">Nylon</option>
              <option value="steel">Stainless steel</option>
              <option value="cotton">Cotton blend</option>
            </select>
          </label>
          <label className="check-label">
            <input
              type="checkbox"
              checked={stock}
              onChange={(e) => setStock(e.target.checked)}
            />{" "}
            Available now
          </label>
        </div>
        <button className="button wide" onClick={() => setFilter(false)}>
          Show {items.length} objects <ArrowUpRight size={16} />
        </button>
        <button className="text-button" onClick={clear}>
          Clear filters
        </button>
      </Modal>
    </>
  );
}
