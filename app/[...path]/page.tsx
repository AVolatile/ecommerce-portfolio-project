import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { products, articles, collections, getProduct } from "@/lib/catalog";
import { routePaths } from "@/lib/routes";
import { Shop, ProductDetail, Finder, Compare } from "@/components/discovery";
import { Cart, Checkout } from "@/components/purchase";
import { Membership, Account, Auth, Repair } from "@/components/ownership";
import {
  About,
  Journal,
  JournalArticle,
  Collection,
  Materials,
  Support,
} from "@/components/editorial";
import { Campaign, Brand, CaseStudy } from "@/components/brand-pages";
import { ConfirmationRoute } from "@/components/confirmation-route";
export function generateStaticParams() {
  return routePaths.map((p) => ({ path: p.split("/") }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ path: string[] }>;
}): Promise<Metadata> {
  const { path } = await params;
  const key = path.join("/");
  const p = path[0] === "product" ? getProduct(path[1]) : null;
  const a =
    path[0] === "journal" ? articles.find((a) => a.slug === path[1]) : null;
  const title = p
    ? `${p.model} ${p.name}`
    : a
      ? a.title
      : key
          .split("/")
          .map((s) => s.replaceAll("-", " "))
          .join(" / ");
  return {
    title,
    description: p
      ? p.description
      : a
        ? a.intro
        : `Explore ${title} in the VELT consumer brand and commerce concept.`,
    robots: { index: false, follow: false },
  };
}
export default async function Route({
  params,
}: {
  params: Promise<{ path: string[] }>;
}) {
  const { path } = await params;
  const key = path.join("/");
  if (!routePaths.includes(key)) notFound();
  if (path[0] === "shop") return <Shop key={key} category={path[1]} />;
  if (path[0] === "product") {
    const p = products.find((p) => p.slug === path[1]);
    if (!p) notFound();
    return <ProductDetail key={p.slug} product={p} />;
  }
  if (path[0] === "collections" && collections.some((c) => c.slug === path[1]))
    return <Collection slug={path[1]} />;
  if (path[0] === "journal" && path[1]) {
    const a = articles.find((a) => a.slug === path[1]);
    if (!a) notFound();
    return <JournalArticle article={a} />;
  }
  if (path[0] === "account") return <Account section={path[1]} />;
  switch (key) {
    case "compare":
      return <Compare />;
    case "product-finder":
      return <Finder />;
    case "membership":
      return <Membership />;
    case "journal":
      return <Journal />;
    case "about":
      return <About />;
    case "materials":
      return <Materials />;
    case "repair":
      return <Repair />;
    case "support":
      return <Support />;
    case "cart":
      return <Cart />;
    case "checkout":
      return <Checkout />;
    case "order-confirmation":
      return <ConfirmationRoute />;
    case "login":
      return <Auth />;
    case "signup":
      return <Auth signup />;
    case "campaign":
      return <Campaign />;
    case "brand":
      return <Brand />;
    case "case-study":
      return <CaseStudy />;
    default:
      notFound();
  }
}
