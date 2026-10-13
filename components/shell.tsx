"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Search,
  UserRound,
  ShoppingBag,
  Menu,
  ArrowUpRight,
  ArrowRight,
  Plus,
} from "lucide-react";
import { products, getProduct, money, categories } from "@/lib/catalog";
import { subtotalOf, lineKey } from "@/lib/commerce";
import { useStore } from "./store";
import { Modal, Quantity, EmptyState, Field } from "./ui";
export function Wordmark() {
  return (
    <span className="wordmark">
      VELT<span className="brand-dot">↗</span>
    </span>
  );
}
export function Mark() {
  return (
    <svg viewBox="0 0 64 64" aria-label="VELT folded V symbol" role="img">
      <path d="M8 13h13l12 26 9-26h14L35 54H24z" fill="currentColor" />
      <path d="m33 39 9-26h14L35 54z" fill="currentColor" opacity=".55" />
    </svg>
  );
}
export function Header() {
  const [search, setSearch] = useState(false);
  const [menu, setMenu] = useState(false);
  const [mega, setMega] = useState(false);
  const [query, setQuery] = useState("");
  const { state, setDrawer } = useStore();
  const path = usePathname();
  const count = state.cart.reduce((n, l) => n + l.quantity, 0);
  const results = query.trim()
    ? products.filter((p) =>
        `${p.model} ${p.name} ${p.category} ${p.uses.join(" ")}`
          .toLowerCase()
          .includes(query.trim().toLowerCase()),
      )
    : products.slice(0, 4);
  return (
    <>
      <div className="announcement">
        <span>Fewer things. Fuller days.</span>
        <Link href="/membership">
          Meet VELT / In Use <ArrowUpRight size={12} />
        </Link>
      </div>
      <header className="header">
        <Link className="logo" href="/" aria-label="VELT homepage">
          <Wordmark />
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <div
            className="shop-nav"
            onMouseEnter={() => setMega(true)}
            onMouseLeave={() => setMega(false)}
          >
            <Link
              className={path.startsWith("/shop") ? "active" : ""}
              href="/shop"
            >
              Shop <Plus size={11} />
            </Link>
            <button
              className="sr-only"
              onClick={() => setMega(!mega)}
              aria-expanded={mega}
            >
              Toggle shop categories
            </button>
            {mega && (
              <div className="mega">
                <div>
                  <p className="eyebrow">The first collection</p>
                  <h2>
                    Objects for
                    <br />
                    the overlap.
                  </h2>
                  <Link href="/shop" onClick={() => setMega(false)}>
                    Shop everything <ArrowRight size={16} />
                  </Link>
                </div>
                <div>
                  {categories.map((c) => (
                    <Link
                      onClick={() => setMega(false)}
                      href={`/shop/${c.slug}`}
                      key={c.slug}
                    >
                      <strong>{c.title}</strong>
                      <span>{c.description}</span>
                    </Link>
                  ))}
                </div>
                <Link
                  className="mega-image"
                  href="/product/p02-transit-pack"
                  onClick={() => setMega(false)}
                >
                  <img
                    src="/images/p02-transit-pack.webp"
                    alt="P—02 Transit Pack"
                  />
                  <span>P—02 / The everyday, considered.</span>
                </Link>
              </div>
            )}
          </div>
          <Link href="/collections/the-commute">The daily edit</Link>
          <Link href="/journal">Journal</Link>
          <Link href="/membership">
            In Use <span className="nav-dot" />
          </Link>
          <Link href="/about">Our point of view</Link>
        </nav>
        <div className="header-actions">
          <button
            className="icon-button"
            aria-label="Search products"
            onClick={() => setSearch(true)}
          >
            <Search size={19} />
          </button>
          <Link
            className="icon-button account-icon"
            href="/account"
            aria-label="Your account"
          >
            <UserRound size={19} />
          </Link>
          <button
            className="cart-action"
            onClick={() => setDrawer(true)}
            aria-label={`Open bag, ${count} items`}
          >
            <ShoppingBag size={18} />
            <span>Bag ({count})</span>
          </button>
          <button
            className="icon-button mobile-menu-button"
            onClick={() => setMenu(true)}
            aria-label="Open navigation"
          >
            <Menu size={21} />
          </button>
        </div>
      </header>
      <Modal
        open={search}
        onClose={() => setSearch(false)}
        title="Find your next everyday."
      >
        <label className="search-input">
          <Search size={20} />
          <input
            aria-label="Search by product, category or use"
            placeholder="Try ‘commute’, ‘pack’, or ‘P—02’"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <p className="eyebrow">
          {query
            ? `${results.length} products found`
            : "A few good places to start"}
        </p>
        <div className="search-results">
          {results.map((p) => (
            <Link
              key={p.slug}
              href={`/product/${p.slug}`}
              onClick={() => setSearch(false)}
            >
              <img src={p.image} alt="" width="70" height="70" />
              <span>
                {p.model} / {p.name}
                <small>
                  {p.capacity} · {money(p.price)}
                </small>
              </span>
              <ArrowUpRight size={18} />
            </Link>
          ))}
        </div>
        {!results.length && (
          <p>No matches. Try a category or a use, like “weekend”.</p>
        )}
        <Link
          href="/product-finder"
          className="underlink"
          onClick={() => setSearch(false)}
        >
          Let the finder help <ArrowRight size={16} />
        </Link>
      </Modal>
      <Modal open={menu} onClose={() => setMenu(false)} title="VELT" sheet>
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {[
            ["/shop", "Shop everything"],
            ...categories.map((c) => [`/shop/${c.slug}`, c.title]),
            ["/product-finder", "Find your setup"],
            ["/journal", "Journal"],
            ["/membership", "In Use membership"],
            ["/about", "Our point of view"],
            ["/account", "Your account"],
          ].map(([href, title]) => (
            <Link key={href} onClick={() => setMenu(false)} href={href}>
              {title}
              <ArrowUpRight size={19} />
            </Link>
          ))}
        </nav>
      </Modal>
    </>
  );
}
export function CartDrawer() {
  const { state, drawer, setDrawer, quantity, remove } = useStore();
  const subtotal = subtotalOf(state.cart);
  return (
    <Modal
      open={drawer}
      onClose={() => setDrawer(false)}
      title={`Your bag (${state.cart.reduce((n, l) => n + l.quantity, 0)})`}
      sheet
    >
      {!state.cart.length ? (
        <EmptyState
          title="A little room for something useful."
          body="Find the objects that fit your day."
        />
      ) : (
        <>
          <div className="drawer-lines">
            {state.cart.map((l) => {
              const p = getProduct(l.slug)!;
              return (
                <div className="cart-line" key={lineKey(l)}>
                  <Link
                    href={`/product/${p.slug}`}
                    onClick={() => setDrawer(false)}
                  >
                    <img src={p.image} alt={p.name} width="90" height="90" />
                  </Link>
                  <div>
                    <Link
                      href={`/product/${p.slug}`}
                      onClick={() => setDrawer(false)}
                    >
                      {p.model} / {p.name}
                    </Link>
                    <p>
                      {l.color}
                      {l.size ? ` / ${l.size}` : ""}
                    </p>
                    <Quantity
                      label={p.name}
                      value={l.quantity}
                      onChange={(q) => quantity(lineKey(l), q)}
                    />
                  </div>
                  <div className="cart-line-end">
                    <span>{money(p.price * l.quantity)}</span>
                    <button
                      className="text-button"
                      onClick={() => remove(lineKey(l))}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="drawer-bottom">
            <p className="shipping-note">
              {subtotal >= 150
                ? "Your bag qualifies for complimentary standard shipping."
                : `${money(150 - subtotal)} away from complimentary standard shipping.`}
            </p>
            <div className="summary-row">
              <span>Subtotal</span>
              <strong>{money(subtotal)}</strong>
            </div>
            <p className="muted small">
              Shipping calculated at checkout. Demo purchase only.
            </p>
            <Link
              className="button"
              href="/checkout"
              onClick={() => setDrawer(false)}
            >
              Continue to checkout <ArrowUpRight size={17} />
            </Link>
            <Link
              className="underlink"
              href="/cart"
              onClick={() => setDrawer(false)}
            >
              View your bag <ArrowRight size={16} />
            </Link>
          </div>
        </>
      )}
    </Modal>
  );
}
export function Footer() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { notify } = useStore();
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-message">
          <p className="eyebrow">A note, every so often.</p>
          <h2>
            Good things.
            <br />
            Worth keeping up with.
          </h2>
          <p>
            New objects, packing notes, and a different view of the everyday.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
                setError("Enter a valid email address.");
                return;
              }
              setError("");
              setSubscribed(true);
              notify(
                "Preview complete. No email was sent or subscription created.",
              );
            }}
          >
            <Field
              name="newsletter"
              label="Email address"
              type="email"
              value={email}
              onChange={setEmail}
              error={error}
            />
            <button
              className="newsletter-submit"
              aria-label="Preview newsletter signup"
            >
              <ArrowRight size={23} />
            </button>
          </form>
          {subscribed && (
            <p role="status">
              You’re on the concept list. No email will be sent.
            </p>
          )}
        </div>
        <div className="footer-links">
          <div>
            <h3>Objects</h3>
            {categories.map((c) => (
              <Link key={c.slug} href={`/shop/${c.slug}`}>
                {c.title}
              </Link>
            ))}
            <Link href="/product-finder">Find your setup</Link>
            <Link href="/compare">Compare</Link>
          </div>
          <div>
            <h3>In good use</h3>
            <Link href="/membership">Membership</Link>
            <Link href="/materials">Materials</Link>
            <Link href="/repair">Care & repair</Link>
            <Link href="/support">Shipping & returns</Link>
            <Link href="/account">Your account</Link>
          </div>
          <div>
            <h3>A point of view</h3>
            <Link href="/about">About VELT</Link>
            <Link href="/journal">Journal</Link>
            <Link href="/brand">Brand system</Link>
            <Link href="/campaign">Campaigns</Link>
            <Link href="/case-study">Case study</Link>
          </div>
        </div>
      </div>
      <div className="footer-wordmark">
        VELT<span>↗</span>
      </div>
      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} VELT. A concept by Anthony Volatile.
        </span>
        <span>Designed for the days in between.</span>
        <Link href="/case-study">
          Volatile Solutions <ArrowUpRight size={12} />
        </Link>
      </div>
      <p className="footer-disclaimer">
        Self-initiated portfolio concept. Fictional products and policies. No
        payment processing, real authentication, or order fulfillment.
      </p>
    </footer>
  );
}
