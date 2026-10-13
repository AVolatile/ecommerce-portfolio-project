import type { Metadata } from "next";
import { StoreProvider } from "@/components/store";
import { Header, Footer, CartDrawer } from "@/components/shell";
import "@fontsource/barlow-condensed/latin-600.css";
import "@fontsource/dm-sans/latin-400.css";
import "@fontsource/dm-sans/latin-500.css";
import "@fontsource/dm-sans/latin-600.css";
import "@fontsource/dm-sans/latin-700.css";
import "./globals.css";
export const metadata: Metadata = {
  metadataBase: new URL(
    "https://velt-objects-in-use.lushshore129.chatgpt.site",
  ),
  title: { default: "VELT — Objects for the overlap.", template: "%s / VELT" },
  description:
    "Considered packs, bags, and everyday objects for work, training, and a few days away. A consumer brand concept by Anthony Volatile.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "VELT — Fewer things. Fuller days.",
    description: "A complete consumer commerce and membership brand concept.",
    images: [{ url: "/images/og.jpg", width: 1200, height: 630 }],
  },
  icons: { icon: "/favicon.svg" },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <StoreProvider>
          <Header />
          <main id="main">{children}</main>
          <Footer />
          <CartDrawer />
        </StoreProvider>
      </body>
    </html>
  );
}
