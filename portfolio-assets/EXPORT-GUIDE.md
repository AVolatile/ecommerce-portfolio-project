# VELT / Portfolio export guide

## Cover: 1280 × 960 / 4:3

Use the included `cover-1280x960.png`. The editorial composition combines a VELT wordmark panel, original product campaign imagery, a real storefront capture, and the Signal campaign color. It avoids a laptop mockup and makes the brand, product, and customer experience visible at thumbnail size.

Keep the cover focused on three ideas: **identity + useful product + commerce**. Keep margins of at least 40px and preserve the wordmark’s clear space. Do not add fake metrics or customer quotes. Export PNG for crisp UI, or JPEG at 85–90% when file weight matters.

## Recommended capture sequence

| Story            | Route                       | Framing                                                      |
| ---------------- | --------------------------- | ------------------------------------------------------------ |
| First impression | `/`                         | 1440×960, hero and first collection transition               |
| Merchandising    | `/shop/packs`               | Title, category navigation, three pack cards                 |
| Product clarity  | `/product/p02-transit-pack` | Gallery, dimensions, color, purchase action                  |
| Discovery        | `/product-finder`           | First question and explained final recommendation            |
| Decision support | `/compare`                  | P—01, P—02, P—03 selected                                    |
| Cart             | `/cart`                     | P—02 + A—02, variants, summary, shipping threshold           |
| Checkout         | `/checkout`                 | Shipping validation and Review with dummy payment            |
| Ownership        | `/membership`               | Headline, membership card, core benefits                     |
| Retention        | `/account/membership`       | Active concept, credit, anniversary, early access            |
| Campaign breadth | `/campaign`                 | Lifestyle creative, orange product creative, membership card |
| Identity         | `/brand`                    | Wordmark + symbol, palette, packaging studies                |
| Strategic story  | `/case-study`               | Cover, opportunity, implementation disclosure                |

Desktop and 390px full-page screenshots are in `portfolio-assets/screenshots/`. Screens showing cart, account, comparison, and checkout were populated with fictional local state for presentation. They do not represent real customers or orders.

For clean hero crops, run the static production preview: development-tool badges are intentionally excluded from the final production screenshot set. Verify the image source is fully decoded before capture.

## Campaign deliverables

`public/campaign-assets/` contains 19 raster exports:

- Eight 1080×1080 campaign concepts.
- Three social formats: 1080×1080, 1080×1350, 1080×1920.
- Four display sizes: 300×250, 728×90, 160×600, 970×250.
- Four 1200×1800 posters.

Use a lifestyle frame, a product frame, and a membership frame together. Show different layouts, not eight near-identical tiles. All downloads are exposed on `/campaign`.

## Identity and email deliverables

Identity, symbol, packaging, and palette assets are in `public/brand-assets/`. Packaging includes a shipping box, hangtag, care insert, member card, woven-label study, and accessory sleeve. These are design studies rather than production dielines.

Eight responsive HTML email previews are in `public/emails/`. Capture at 600px and 375px to show email hierarchy and mobile reflow. The copy describes concept behavior without sending or promising a real notification.

## Presentation language

Suggested title: **VELT — A consumer brand from first impression to continued use.**

Suggested project descriptor: **Brand strategy / Commerce UX / Product discovery / Membership / Campaign / Lifecycle / Frontend.**

Use the actual implementation as evidence. Do not claim conversion lift, sales, users, certifications, or commercial launch results.

Include the disclaimer: “This is a self-initiated concept project created to demonstrate consumer brand strategy, commerce UX, merchandising, frontend development, campaign systems, and lifecycle design.”
