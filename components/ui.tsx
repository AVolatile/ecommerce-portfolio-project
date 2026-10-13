"use client";
import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  X,
  Heart,
  Plus,
  Minus,
  Check,
} from "lucide-react";
import { money, colorValues, type Product } from "@/lib/catalog";
import { useStore } from "./store";
export function Arrow() {
  return <ArrowUpRight size={18} aria-hidden="true" />;
}
export function ButtonLink({
  href,
  children,
  secondary = false,
}: {
  href: string;
  children: ReactNode;
  secondary?: boolean;
}) {
  return (
    <Link className={`button ${secondary ? "secondary" : ""}`} href={href}>
      {children}
      <Arrow />
    </Link>
  );
}
export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>;
}
export function PageIntro({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="page-intro">
      <Eyebrow>{kicker}</Eyebrow>
      <h1>{title}</h1>
      {children && <div className="intro-copy">{children}</div>}
    </div>
  );
}
export function ProductCard({
  product: p,
  compact = false,
}: {
  product: Product;
  compact?: boolean;
}) {
  const { state, save, compare } = useStore();
  return (
    <article className={`product-card ${compact ? "compact" : ""}`}>
      <div className="product-image">
        <Link
          href={`/product/${p.slug}`}
          aria-label={`View ${p.model} ${p.name}`}
        >
          <img
            src={p.image}
            alt={`${p.name} in ${p.colors[0]}`}
            loading="lazy"
            width="560"
            height="560"
          />
        </Link>
        <span className="product-model">{p.model}</span>
        <button
          className={`save-button ${state.wishlist.includes(p.slug) ? "saved" : ""}`}
          onClick={() => save(p.slug)}
          aria-label={`${state.wishlist.includes(p.slug) ? "Unsave" : "Save"} ${p.name}`}
          aria-pressed={state.wishlist.includes(p.slug)}
        >
          <Heart
            size={17}
            fill={state.wishlist.includes(p.slug) ? "currentColor" : "none"}
          />
        </button>
        {p.stock !== "In stock" && (
          <span className="inventory-badge">{p.stock}</span>
        )}
      </div>
      <div className="product-heading">
        <Link href={`/product/${p.slug}`}>
          {p.name}
          <span>
            {p.capacity} / {p.uses[0]}
          </span>
        </Link>
        <span>{money(p.price)}</span>
      </div>
      <div className="product-meta">
        <div
          className="mini-swatches"
          aria-label={`Available colors: ${p.colors.join(", ")}`}
        >
          {p.colors.map((c) => (
            <i key={c} style={{ background: colorValues[c] }} title={c} />
          ))}
          <span>{p.colors.length} colors</span>
        </div>
        <button
          className="text-button compare-action"
          aria-pressed={state.compare.includes(p.slug)}
          onClick={() => compare(p.slug)}
        >
          {state.compare.includes(p.slug) ? (
            <Check size={12} />
          ) : (
            <Plus size={12} />
          )}{" "}
          Compare
        </button>
      </div>
    </article>
  );
}
export function ProductGrid({ items }: { items: Product[] }) {
  return (
    <div className="product-grid">
      {items.map((p) => (
        <ProductCard key={p.slug} product={p} />
      ))}
    </div>
  );
}
export function SectionHeading({
  kicker,
  title,
  href,
  link = "Explore the collection",
}: {
  kicker?: string;
  title: string;
  href?: string;
  link?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        {kicker && <Eyebrow>{kicker}</Eyebrow>}
        <h2>{title}</h2>
      </div>
      {href && (
        <Link className="underlink" href={href}>
          {link}
          <ArrowRight size={17} />
        </Link>
      )}
    </div>
  );
}
export function Quantity({
  value,
  onChange,
  label = "Quantity",
}: {
  value: number;
  onChange: (n: number) => void;
  label?: string;
}) {
  return (
    <div className="quantity" role="group" aria-label={label}>
      <button
        aria-label={`Decrease ${label}`}
        disabled={value <= 1}
        onClick={() => onChange(value - 1)}
      >
        <Minus size={14} />
      </button>
      <span aria-live="polite">{value}</span>
      <button
        aria-label={`Increase ${label}`}
        disabled={value >= 10}
        onClick={() => onChange(value + 1)}
      >
        <Plus size={14} />
      </button>
    </div>
  );
}
export function Modal({
  open,
  onClose,
  title,
  children,
  sheet = false,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  sheet?: boolean;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
    const previous = document.body.style.overflow;
    if (open) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);
  return (
    <dialog
      ref={ref}
      aria-label={title}
      onKeyDown={(e) => {
        if (e.key !== "Tab") return;
        const nodes = [
          ...e.currentTarget.querySelectorAll<HTMLElement>(
            'a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),[tabindex="0"]',
          ),
        ].filter((n) => n.getClientRects().length > 0);
        const first = nodes[0];
        const last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }}
      className={sheet ? "sheet" : "modal"}
      onCancel={onClose}
      onPointerDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="dialog-header">
        <h2>{title}</h2>
        <button
          className="icon-button"
          onClick={onClose}
          aria-label={`Close ${title}`}
        >
          <X size={21} />
        </button>
      </div>
      {children}
    </dialog>
  );
}
export function EmptyState({
  title,
  body,
  href = "/shop",
  action = "Explore the collection",
}: {
  title: string;
  body: string;
  href?: string;
  action?: string;
}) {
  return (
    <div className="empty-state">
      <span className="empty-symbol">↗</span>
      <h2>{title}</h2>
      <p>{body}</p>
      <ButtonLink href={href}>{action}</ButtonLink>
    </div>
  );
}
export function Accordion({
  title,
  children,
  open = false,
}: {
  title: string;
  children: ReactNode;
  open?: boolean;
}) {
  return (
    <details className="accordion" open={open || undefined}>
      <summary>
        {title}
        <Plus size={16} />
      </summary>
      <div>{children}</div>
    </details>
  );
}
export function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  autoComplete,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  autoComplete?: string;
  placeholder?: string;
}) {
  return (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        placeholder={placeholder}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
      {error && (
        <p className="field-error" id={`${name}-error`}>
          {error}
        </p>
      )}
    </div>
  );
}
export function ConceptNote({ children }: { children?: ReactNode }) {
  return (
    <p className="concept-note">
      {children ||
        "A self-initiated brand concept. Products, pricing, policies, and membership are illustrative. No payments or orders are processed."}
    </p>
  );
}
