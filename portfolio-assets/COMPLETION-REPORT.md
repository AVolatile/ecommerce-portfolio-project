# VELT / Completion report

Completed in the local workspace. Publication was declined by the user; the registered private Sites project remains unpublished. No source was pushed to its external repository.

## Brand

**VELT — Objects for the overlap.** The name is short, tactile, and category-independent. The positioning serves active professionals who want fewer objects that work across commuting, training, everyday use, and short travel. The close-set wordmark pairs with a folded V symbol: two paths meeting in one form. Trademark availability has not been established.

The palette is Graphite, Chalk, Mineral, Petrol, and Signal orange; darker Rust supports accessible small-text accents. Barlow Condensed handles display headlines and DM Sans handles product information and reading. Both fonts are hosted locally. Products use a numbered P / B / A / S naming system and plain functional names.

Original AI-generated studio and transit photography creates a tactile, architectural visual language. Packaging studies cover the shipping box, hangtag, care insert, membership card, woven label, and accessory sleeve. Voice is direct, useful, and understated: **“A 24L carry for workdays that turn into overnights.”**

## Product catalog

| Category    | Products                                                               | Price range | Principal routines                    |
| ----------- | ---------------------------------------------------------------------- | ----------- | ------------------------------------- |
| Packs       | P—01 Day Pack, P—02 Transit Pack, P—03 Travel Pack                     | $168–$288   | Commute, training, short travel       |
| Bags        | B—01 Weekender, B—02 Utility Duffel                                    | $158–$218   | Weekend departures, gym               |
| Accessories | A—01 Packing Set, A—02 Tech Organizer, A—03 Utility Pouch, A—04 Bottle | $38–$68     | Organization, hydration, everyday use |
| Soft goods  | S—01 Overshirt, S—02 Light Shell, S—03 Utility Cap                     | $36–$198    | Useful layers and everyday movement   |

Twelve typed products include descriptions, features, proposed materials, dimensions, capacity, weight, use cases, colors, inventory states, local imagery, and pairings. No customer reviews or false social proof are presented.

## Marketing

Completed routes: `/`, `/about`, `/membership`, `/materials`, `/repair`, `/support`, `/journal`, `/campaign`, `/brand`, and `/case-study`, plus five curated collections and four full article pages. In total, 47 user-facing routes were checked, including all commerce and account routes.

## Commerce

The shop includes category navigation, six filtering dimensions, availability filtering, and sorting. Search matches names, categories, models, and use cases. Twelve PDPs provide galleries, labeled color controls, apparel sizes, quantities, availability, purchase feedback, specs, shipping, care, and related objects. Mobile PDPs include a sticky purchase action.

The finder asks six questions and returns a primary recommendation, an alternate, an explanation, and comparison access. Comparison supports up to three objects across twelve attribute rows. The cart supports separate variants, quantity updates, removal, shipping-threshold feedback, a persistent promo, and one useful optional pairing.

Guest checkout covers Contact, Shipping, Delivery, Payment, Review, and Confirmation. Field-specific validation checks name, email format, street, city, valid US state code, and ZIP format. A fixed dummy card avoids collecting payment credentials. Completed demo orders appear in order history and product ownership. No payment, delivery, or real account is created.

## Membership

**VELT / In Use** proposes $48/year, $40 annual repair credit, early access, member colors, priority support, an additional year of concept warranty, and practical ownership content. Free local activation connects to member status, anniversary, repair credit, release previews, and ownership history. Saved preferences and wishlist state persist on the device. Repair assessment remains accessible without membership.

## Editorial

Four complete journal articles: three-day packing, commuter-pack selection, technical-fabric care, and the case for fewer bags. Five collections: the commute, the weekend, one-bag travel, training, and daily carry. Materials explain construction proposals without unsupported certifications. Repair includes care guidance, eligibility, policy concepts, field validation, and a clear enquiry-preview success state.

## Campaign

Eight concepts: brand launch, travel pack, training, accessories, membership, weekend, repair, and packing editorial. Layouts vary between candid lifestyle, studio product, Signal split frames, member-card presentation, detail crops, and editorial composition.

Completed exports: eight 1080×1080 concept PNGs; social at 1080×1080, 1080×1350, and 1080×1920; display at 300×250, 728×90, 160×600, and 970×250; four 1200×1800 posters. Total: **19 downloadable campaign images**.

## Lifecycle

Eight responsive HTML previews: brand launch, product launch, browse follow-up, cart reminder, order confirmation, shipping update, post-purchase care, and membership invitation. The lifecycle prioritizes consent for marketing, a calm single cart reminder, operational order updates, care, repair, and a later member invitation. No email or ad was sent or placed. Production templates require real event data, mailing-provider integration, consent, and unsubscribe controls.

## Brand system

`/brand` presents positioning, naming rationale, wordmark, folded V symbol, palette, typography, product families, material and photography direction, packaging studies, spacing, icons, motion, voice, editorial, email, campaign rules, and working UI components. Downloadable identity, symbol, packaging SVGs, and palette JSON are included.

## Case study

`/case-study` connects the opportunity, brand strategy, commerce, discovery, membership, editorial, campaigns, lifecycle, accessibility, and implementation. It states only what was built and keeps the self-initiated concept disclaimer explicit. No commercial outcomes are invented.

## Architecture

Next.js 16 App Router, React 19, TypeScript, CSS tokens, local fonts, optimized WebP assets, and static export. Twenty focused feature modules separate commerce, account, ownership, membership, editorial, and brand responsibilities. Shared UI and shell components provide consistent controls. Typed catalog and commerce models centralize data and behavior. An external React store persists device-local state and synchronizes browser tabs.

Six style files separate foundation, storefront, commerce, ownership/editorial, brand, and responsive rules. Static routes are generated from the typed registry. Unknown routes use the custom 404. Metadata defaults to noindex.

## Accessibility

Semantic landmarks, skip navigation, visible focus, meaningful alternative text, correctly labeled fields, field-specific validation, screen-reader status feedback, keyboard-operable selection controls, accessible comparison headers, keyboard-scrollable comparison, reduced motion, native dialogs, Escape dismissal, focus restoration, and explicit Tab wrapping are implemented. Color tokens were corrected from measured contrast findings.

## Validation

| Check                                  | Result                                                        |
| -------------------------------------- | ------------------------------------------------------------- |
| TypeScript                             | Pass                                                          |
| ESLint, React hooks, JSX accessibility | Pass                                                          |
| Production static build                | Pass                                                          |
| Commerce boundary tests                | 6 / 6 pass                                                    |
| Production browser journey tests       | 7 / 7 pass                                                    |
| Route checks                           | 47 checked                                                    |
| Responsive checks                      | 96 / 96; no document overflow                                 |
| Viewports                              | 320, 375, 390, 430, 768, 1024, 1280, 1440                     |
| Accessibility smoke checks             | 12 representative screens; no detected WCAG A/AA violations   |
| Keyboard                               | Skip link, dialog containment, Escape, focus restoration pass |
| Console                                | No errors in final production audit                           |
| Links and imagery                      | No broken targets detected                                    |
| Static artifact references             | 94 local references resolved                                  |
| Responsive email previews              | 16 / 16 at 375px and 600px                                    |
| Production dependency audit            | 0 known vulnerabilities                                       |

Automated checks are a smoke test and do not imply accessibility certification, physical product validation, or real commerce readiness. Evidence is in `portfolio-assets/validation/audit.json` and `browser-results.json`.

## Files created

Key directories: `app/`, `components/commerce/`, `components/account/`, `components/membership/`, `components/ownership/`, `components/editorial/`, `components/brand/`, `styles/`, `lib/`, `public/`, `scripts/`, `tests/`, and `portfolio-assets/`.

Important files: `README.md`, `lib/catalog.ts`, `lib/commerce.ts`, `lib/routes.ts`, `components/store.tsx`, `components/ui.tsx`, `app/layout.tsx`, `app/page.tsx`, `next.config.ts`, and `.openai/hosting.json`.

## Portfolio assets

- `portfolio-assets/velt-static-export.zip`: complete portable static build.
- `portfolio-assets/EXPORT-GUIDE.md`: 4:3 cover guidance and capture sequence.
- `portfolio-assets/cover-1280x960.png`: actual editorial brand/product/storefront/campaign collage.
- `portfolio-assets/screenshots/`: desktop and 390px production screenshots for twelve key experiences.
- `public/campaign-assets/`: 19 campaign exports.
- `public/brand-assets/`: identity, symbol, packaging, and palette.
- `public/emails/`: eight responsive HTML templates.
- `portfolio-assets/IMAGE-PROMPTS.md`: built-in generation prompts and saved asset lineage.

Recommended presentation sequence: homepage, product detail, finder, comparison, checkout, membership, campaign, brand system, and case study.

## Remaining opportunities

For a real business, the highest-value next steps are brand and trademark clearance; actual manufacturing, measurements, and photography for every color; a commerce inventory/order/payment backend; real customer authentication; and a consent-based email lifecycle connected to verified fulfillment events. Human assistive-technology testing and real device checks would broaden the automated accessibility evidence.

This is a self-initiated concept project created to demonstrate consumer brand strategy, commerce UX, merchandising, frontend development, campaign systems, and lifecycle design.
