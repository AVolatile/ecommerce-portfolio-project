# VELT — Objects for the overlap.

A complete, self-initiated premium consumer commerce and membership brand by **Anthony Volatile / Volatile Solutions**. VELT connects identity, merchandising, discovery, purchase, campaigns, and continued ownership.

## Concept and audience

VELT serves active, design-conscious professionals, roughly 24–45, whose routines cross commuting, training, and short travel. The position is **fewer things, fuller days**. The collection favors quiet design, specific utility, flexible use, and a clear care relationship.

The four-letter name is compact, tactile, and category-independent. The folded V brings two routes into one form. Trademark availability is not established. Graphite, Chalk, Mineral, Petrol, and restrained Signal orange form the identity. Barlow Condensed carries campaign headlines; locally hosted DM Sans handles product information and reading.

## Catalog

| Family      | Model / product           | Concept price |
| ----------- | ------------------------- | ------------- |
| Packs       | P—01 Day Pack / 18L       | $168          |
| Packs       | P—02 Transit Pack / 24L   | $228          |
| Packs       | P—03 Travel Pack / 35L    | $288          |
| Bags        | B—01 Weekender / 38L      | $218          |
| Bags        | B—02 Utility Duffel / 28L | $158          |
| Accessories | A—01 Packing Set          | $58           |
| Accessories | A—02 Tech Organizer       | $68           |
| Accessories | A—03 Utility Pouch        | $38           |
| Accessories | A—04 Bottle / 750ml       | $42           |
| Soft goods  | S—01 Overshirt            | $138          |
| Soft goods  | S—02 Light Shell          | $198          |
| Soft goods  | S—03 Utility Cap          | $36           |

Every object has typed specifications, materials, use cases, colors, availability, related products, and local imagery. In-stock, low-stock, sold-out, and coming-soon states are represented. No reviews, customers, endorsements, certifications, sales, or performance statistics are fabricated.

## Commerce and membership

Search by product, family, or routine. Filter by use, price, color, capacity, material, and availability; sort by price or name. Compare up to three objects. The six-question finder scores five bag candidates by use, load, laptop needs, weather, cabin compatibility, and preferred size, then explains a primary and alternate recommendation.

Color and apparel-size variants have separate cart keys. Quantities are limited to 10 per variant in this demonstration. Standard shipping is $8, complimentary at a $150 merchandise subtotal before discount; express is $18. `FIRSTUSE` previews $15 off subtotals of $100 or more, and persists from cart to checkout.

Checkout has Contact, Shipping, Delivery, Payment, and Review stages, followed by confirmation. It validates required values, email format, US state codes, and ZIP format; it does not verify deliverability. A fixed fictional card is shown; there are no editable payment credential fields. A completed demo order clears the bag and appears in local order history.

**VELT / In Use** proposes $48/year, a $40 annual repair credit, early access, member colors, priority support, and an additional year of concept manufacturing-defect warranty. Activation is free and local. No billing or real entitlement exists. Account views connect member status, anniversary, saved objects, preferences, and product ownership from demo orders.

## Routes

- `/`: editorial consumer homepage.
- `/shop`, `/shop/packs`, `/shop/bags`, `/shop/accessories`, `/shop/apparel`.
- `/product/[slug]`: twelve generated product pages.
- `/compare`, `/product-finder`.
- `/collections/the-commute`, `/collections/the-weekend`, `/collections/one-bag-travel`, `/collections/training`, `/collections/daily-carry`.
- `/membership`, `/about`, `/materials`, `/repair`, `/support`.
- `/journal`: index and four complete article routes: `three-days-one-bag`, `commuter-pack-checklist`, `technical-fabric-care`, `fewer-bags`.
- `/cart`, `/checkout`, `/order-confirmation`.
- `/account`, `/account/orders`, `/account/wishlist`, `/account/membership`, `/login`, `/signup`.
- `/campaign`, `/brand`, `/case-study`.

The typed route registry lives in `lib/routes.ts`. Unknown routes use the custom 404. Metadata defaults to `noindex,nofollow`.

## Stack and architecture

Next.js 16 App Router, React 19, TypeScript, CSS design tokens, and Lucide icons. `output: 'export'` prerenders HTML for each known route. No runtime application server is needed for hosting.

- `app/`: root shell, homepage, statically generated route dispatcher, CSS entry point, 404.
- `styles/`: foundation tokens, storefront, commerce, ownership/editorial, brand, and responsive rules.
- `components/ui.tsx`: shared buttons, cards, gallery-related controls, dialogs, fields, accordions, empty states, and concept notices.
- `components/commerce/`: focused shop, product detail, comparison, finder, cart, promo, checkout, and confirmation modules.
- `components/account/`: profile, account overview, order history, saved objects, and membership status.
- `components/membership/` and `components/ownership/`: program presentation and repair enquiry.
- `components/editorial/`: brand story, collections, journal, materials, and support.
- `components/brand/`: campaigns, identity presentation, and case study.
- `components/store.tsx`: React external-store subscription and device-local persistence.
- `lib/catalog.ts`: products, variants, categories, collections, journal, membership, campaigns, and emails.
- `lib/commerce.ts`: types, state recovery, cart arithmetic, shipping, availability, and finder scoring.
- `scripts/`: image preparation, creative export, browser audit, and static-output verification.
- `tests/`: commerce boundary tests and real browser journey tests.

Browser data uses `velt-commerce-v1` in localStorage. Invalid JSON recovers to a clean state. Known product references and order fields are checked on restoration. Storage events synchronize other open tabs. Local profiles are a UX demonstration and provide no real authentication or authorization.

## Demo behavior

Use fictional contact and shipping details. Profiles, addresses, orders, preferences, and membership stay on the device. Search and newsletter previews send nothing. The repair form provides field-specific validation and a clear preview success state without sending a ticket. Sold-out and upcoming objects cannot be added to the bag. Clear browser site data to reset the demonstration.

## Responsive and accessible behavior

CSS deliberately changes content grids, navigation, product galleries, account navigation, checkout, and campaign layouts on small screens. Product pages have a mobile sticky purchase action. Filters and cart use native dialog sheets; comparison remains horizontally scrollable and keyboard focusable.

Semantic landmarks, a skip link, visible focus, meaningful labels, field-specific errors, non-color-only selection states, image alternative text, accessible table headers, live cart feedback, and reduced-motion handling are implemented. Dialogs support Escape, focus restoration, and explicit Tab wrapping.

## Development and validation

Use Node **22.13+** or a current Node 24 release for the full development-tool engine requirements.

```sh
npm ci
npm run dev
npm run typecheck
npm run lint
npm test
npx playwright install chromium
npm run test:browser
npm run assets
npm run build
npm run qa
```

Browser tests expect the development server at `http://127.0.0.1:3000`. Run the full viewport and accessibility audit with:

```sh
node --import tsx scripts/browser-audit.ts
```

The audit covers 320, 375, 390, 430, 768, 1024, 1280, and 1440px across twelve representative experiences. Results and screenshots live in `portfolio-assets/`. Automated accessibility is a smoke check, not a certification. The standalone email audit covers eight templates at 375px and 600px; `scripts/email-audit.ts` expects the production export at port 4000.

## Assets and campaign system

Original concept photography was created with the built-in image generation tool. Sources and prompt records live under `portfolio-assets/image-source/` and `portfolio-assets/IMAGE-PROMPTS.md`. Sharp prepares local WebP derivatives. All runtime photographs and fonts are local.

`public/campaign-assets/` includes eight campaign concepts at 1080×1080, social exports at 1080×1080, 1080×1350, and 1080×1920, display creative at 300×250, 728×90, 160×600, and 970×250, and four 1200×1800 poster studies. `public/brand-assets/` contains identity, symbol, packaging SVGs, and palette JSON.

`public/emails/` contains eight responsive standalone HTML previews: brand launch, product launch, browse follow-up, cart reminder, order confirmation, shipping update, care, and membership invitation. No emails are sent. Production handoff requires consent, unsubscribe handling, verified order fields, and absolute asset URLs.

## Deployment and portfolio use

`npm run build` emits `out/`. Deploy that directory to a static host that serves directory `index.html` files and uses `404.html` for missing routes. Next.js runtime hosting is unnecessary for this export. `.openai/hosting.json` records the private Sites project and output directory. Publication uses the Sites source and archive workflow. Keep the existing project ID when updating.

**Delivery is local-only at the user’s request.** The registered Sites project remains unpublished; no source was pushed. The existing hosting manifest is retained for an explicitly authorized future deployment.

See `portfolio-assets/EXPORT-GUIDE.md` for the 1280×960 portfolio cover, curated screen captures, campaign assets, and presentation recommendations. The in-product `/case-study` describes only implemented work. Keep its concept disclaimer visible when presenting screenshots.

## Concept disclaimer

This is a self-initiated concept project created to demonstrate consumer brand strategy, commerce UX, merchandising, frontend development, campaign systems, and lifecycle design. VELT, its products, policies, and membership are illustrative. There is no real commerce backend, authentication, payment processing, shipping, advertising placement, or mailing automation. Product capabilities and warranty terms have not been validated through manufacturing or testing.
