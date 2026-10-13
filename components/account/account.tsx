"use client";
import { getProduct, money, products } from "@/lib/catalog";
import { isAvailable } from "@/lib/commerce";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useStore } from "../store";
import {
  ConceptNote,
  EmptyState,
  Eyebrow,
  PageIntro,
  ProductGrid,
  SectionHeading,
} from "../ui";

function AccountNav() {
  const path = usePathname();
  const { state, logout } = useStore();
  return (
    <nav className="account-nav" aria-label="Account navigation">
      {[
        ["/account", "Overview"],
        ["/account/orders", "Your orders"],
        ["/account/wishlist", "Saved objects"],
        ["/account/membership", "In Use membership"],
      ].map(([href, title]) => (
        <Link
          className={path.replace(/\/$/, "") === href ? "selected" : ""}
          key={href}
          href={href}
        >
          {title}
        </Link>
      ))}
      {state.profile ? (
        <button onClick={logout}>Sign out of demo profile</button>
      ) : (
        <Link href="/login">Open a demo profile</Link>
      )}
    </nav>
  );
}

export function Account({ section = "overview" }: { section?: string }) {
  const { state, add, save, notify, preferences, join } = useStore();
  const wish = state.wishlist
    .map(getProduct)
    .filter((p): p is NonNullable<typeof p> => !!p);
  const owned = [
    ...new Set(state.orders.flatMap((o) => o.lines.map((l) => l.slug))),
  ]
    .map(getProduct)
    .filter((p): p is NonNullable<typeof p> => !!p);
  const titles: Record<string, string> = {
    overview: `${state.profile ? `${state.profile.name.split(" ")[0]}’s` : "Your"} everyday, considered.`,
    orders: "The things you’ve brought along.",
    wishlist: "For another kind of day.",
    membership: "Keep it in good use.",
  };
  return (
    <>
      <PageIntro
        kicker="Your VELT / Device-local demo"
        title={titles[section] || titles.overview}
      >
        <p>
          {state.profile
            ? `Local profile: ${state.profile.email}`
            : "Browse as a guest, or create a local profile. No password or real authentication required."}
        </p>
      </PageIntro>
      <div className="container">
        <div className="account-layout">
          <AccountNav />
          <div>
            {section === "overview" && (
              <>
                <div className="account-panels">
                  <div className="account-card">
                    <Eyebrow>Your recent order</Eyebrow>
                    <h2>
                      {state.orders[0]?.id || "The first day is still ahead."}
                    </h2>
                    <p>
                      {state.orders[0]
                        ? `${state.orders[0].lines.length} objects / ${money(state.orders[0].total)} / Demo confirmed`
                        : "Your completed demo purchases appear here, with the setup you chose."}
                    </p>
                    <Link href="/account/orders" className="underlink">
                      Your orders <ArrowRight size={15} />
                    </Link>
                  </div>
                  <div className="account-card">
                    <Eyebrow>VELT / In Use</Eyebrow>
                    <h2>
                      {state.member
                        ? "A longer story."
                        : "Ownership is just the beginning."}
                    </h2>
                    <p>
                      {state.member
                        ? "Active concept membership / $40 annual repair credit."
                        : "Repair credit, early access, and support for the things you keep using."}
                    </p>
                    <Link className="underlink" href="/account/membership">
                      {state.member ? "View membership" : "Meet In Use"}
                      <ArrowRight size={15} />
                    </Link>
                  </div>
                  <div className="account-card">
                    <Eyebrow>Saved for later</Eyebrow>
                    <h2>
                      {wish.length} considered{" "}
                      {wish.length === 1 ? "object" : "objects"}.
                    </h2>
                    <p>A place for the setup you’re still thinking about.</p>
                    <Link href="/account/wishlist" className="underlink">
                      Your saved objects <ArrowRight size={15} />
                    </Link>
                  </div>
                  <div className="account-card">
                    <Eyebrow>Your delivery details</Eyebrow>
                    <h2>
                      {state.orders[0]
                        ? "A familiar next stop."
                        : "No address saved yet."}
                    </h2>
                    <p>
                      {state.orders[0]
                        ? `${state.orders[0].address.street}, ${state.orders[0].address.city}. Saved from your latest demo order.`
                        : "Delivery details appear after completing a demo checkout. Use fictional details."}
                    </p>
                  </div>
                  <div className="account-card wide">
                    <Eyebrow>Different days. Your preferences.</Eyebrow>
                    <h2>What earns a place in your day?</h2>
                    <div className="preference-options">
                      {[
                        "Daily commute",
                        "Training",
                        "Weekend travel",
                        "Care notes",
                      ].map((v) => (
                        <label key={v}>
                          <input
                            type="checkbox"
                            checked={state.preferences.includes(v)}
                            onChange={(e) =>
                              preferences(
                                e.target.checked
                                  ? [...state.preferences, v]
                                  : state.preferences.filter((x) => x !== v),
                              )
                            }
                          />
                          {v}
                        </label>
                      ))}
                    </div>
                    <p>
                      Preferences are saved locally. No emails or marketing
                      actions are triggered.
                    </p>
                  </div>
                </div>
                {owned.length > 0 && (
                  <div className="owned-products">
                    <h2>In your rotation.</h2>
                    <ProductGrid items={owned} />
                  </div>
                )}
              </>
            )}
            {section === "wishlist" &&
              (wish.length ? (
                <>
                  <ProductGrid items={wish} />
                  <div className="owned-products">
                    <h2>Ready for the next part?</h2>
                    {wish.map((p) => (
                      <div className="summary-row" key={p.slug}>
                        <span>
                          {p.model} / {p.name}
                        </span>
                        <div className="order-actions">
                          <button
                            className="text-button"
                            disabled={!isAvailable(p)}
                            onClick={() => {
                              add({
                                slug: p.slug,
                                color: p.colors[0],
                                quantity: 1,
                                ...(p.capacity === "XS–XL"
                                  ? { size: "M" }
                                  : {}),
                              });
                              save(p.slug);
                            }}
                          >
                            Move to bag
                          </button>
                          <button
                            className="text-button"
                            onClick={() => save(p.slug)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <EmptyState
                  title="Keep a few possibilities close."
                  body="Save an object with the heart icon. It will be here when you come back."
                />
              ))}
            {section === "orders" &&
              (state.orders.length ? (
                state.orders.map((o) => (
                  <article className="order-card" key={o.id}>
                    <div className="order-card-top">
                      <span>
                        {o.id} /{" "}
                        {new Date(o.date).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                      <span className="status-badge">Demo confirmed</span>
                    </div>
                    <h2>
                      {o.lines.map((l) => getProduct(l.slug)?.name).join(" + ")}
                    </h2>
                    <div className="order-items">
                      {o.lines.map((l, i) => (
                        <Link href={`/product/${l.slug}`} key={i}>
                          <img
                            src={getProduct(l.slug)!.image}
                            alt={`${getProduct(l.slug)!.name} / ${l.color}`}
                          />
                        </Link>
                      ))}
                    </div>
                    <p className="small muted">
                      {money(o.total)} · {o.delivery} concept delivery · No real
                      shipment
                    </p>
                    <div className="order-actions">
                      <button
                        className="text-button"
                        onClick={() =>
                          notify(
                            "This demo order has no shipment or tracking number.",
                          )
                        }
                      >
                        Tracking concept
                      </button>
                      <button
                        className="text-button"
                        onClick={() => {
                          const available = o.lines.filter((l) =>
                            isAvailable(getProduct(l.slug)!),
                          );
                          available.forEach(add);
                          if (available.length < o.lines.length)
                            notify(
                              "Available items added. Unavailable objects were skipped.",
                            );
                        }}
                      >
                        Add again
                      </button>
                      <Link href="/repair" className="text-button">
                        Care / repair enquiry
                      </Link>
                      <Link href="/support" className="text-button">
                        Order support
                      </Link>
                    </div>
                  </article>
                ))
              ) : (
                <EmptyState
                  title="The first day is still ahead."
                  body="Complete a demo checkout to see your order and ownership history here."
                />
              ))}
            {section === "membership" && (
              <>
                {state.member ? (
                  <>
                    <div className="membership-account-card">
                      <Eyebrow>VELT / In Use / Active concept</Eyebrow>
                      <h2>Good things, kept going.</h2>
                      <p>
                        Member since{" "}
                        {state.memberSince
                          ? new Date(state.memberSince).toLocaleDateString(
                              "en-US",
                              { month: "long", year: "numeric" },
                            )
                          : "today"}
                        . No payment or renewal is scheduled.
                      </p>
                      <div className="member-stats">
                        <span>
                          <strong>$40</strong>Annual repair credit concept
                        </span>
                        <span>
                          <strong>{owned.length}</strong>Objects in your
                          rotation
                        </span>
                        <span>
                          <strong>01</strong>Collection access
                        </span>
                      </div>
                    </div>
                    <div className="account-panels">
                      <div className="account-card">
                        <Eyebrow>Your anniversary</Eyebrow>
                        <h2>
                          {state.memberSince
                            ? new Date(
                                new Date(state.memberSince).setFullYear(
                                  new Date(state.memberSince).getFullYear() + 1,
                                ),
                              ).toLocaleDateString("en-US", {
                                month: "long",
                                day: "numeric",
                                year: "numeric",
                              })
                            : "One year from activation"}
                        </h2>
                        <p>
                          Illustrative membership year. No recurring billing is
                          connected.
                        </p>
                      </div>
                      <div className="account-card">
                        <Eyebrow>A closer connection</Eyebrow>
                        <h2>A small fix. A longer story.</h2>
                        <p>
                          Your annual concept credit is available for an
                          approved repair assessment.
                        </p>
                        <Link href="/repair" className="underlink">
                          Start an enquiry <ArrowRight size={15} />
                        </Link>
                      </div>
                    </div>
                    <div className="owned-products">
                      <SectionHeading
                        kicker="A first look"
                        title="Coming into the rotation."
                      />
                      <ProductGrid
                        items={products.filter(
                          (p) => p.stock === "Coming soon",
                        )}
                      />
                      <p className="small muted" style={{ marginTop: 20 }}>
                        Preview release / S—02. No purchase or notification is
                        available yet.
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="account-card">
                    <Eyebrow>VELT / In Use</Eyebrow>
                    <h2>For the things you keep using.</h2>
                    <p>
                      $40 annual repair credit, early access, and a longer
                      concept warranty. $48 a year in the fictional program.
                    </p>
                    <button className="button" onClick={join}>
                      Activate free demo membership <ArrowUpRight size={16} />
                    </button>
                    <Link href="/membership" className="underlink">
                      Explore the program <ArrowRight size={16} />
                    </Link>
                  </div>
                )}
                <ConceptNote>
                  No real membership entitlements are created. Ownership is
                  based only on completed local demo orders.
                </ConceptNote>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
