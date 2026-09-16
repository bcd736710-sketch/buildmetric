# TROVANE SEO Optimization Report

Date: 2026-09-16  
Site: https://buildmetriccalc.com/  
Brand positioning: Pet Outdoor & Travel B2B Supplier

## 1. Current Site Audit

### Published products reviewed

1. Portable Pet Carrier Backpack for Cats & Small Dogs
2. Dual-Use Pet Car Seat Tether
3. Foldable Travel Cat Litter Box
4. Dog Car Window Safety Guard
5. Portable Pet Water Bottle with Silicone Drinking Bowl
6. 2-in-1 Pet Water Bottle with Foldable Feeding Bowl
7. Automatic Retractable Dog Leash

The product list was verified against the live product-category pages. The repository has a dog-flying-disc guide, but that product was not present in the live Walking & Hiking category, so it was excluded from product-driven actions.

### Categories reviewed

1. Travel & Car
2. Outdoor Feeding
3. Walking & Hiking

### Published blog content reviewed

The source defines 11 current blog URLs: the broad Pet Travel Accessories Wholesale guide plus 10 buyer/product-evaluation guides (water-bottle selection and leakage, carrier selection, tether, window guard, litter box, leash, and a flying-disc sample test). The previous live crawl exposed eight older article cards; the code includes newer articles that should be rechecked after deployment/cache refresh.

### Page inventory

| URL / page group | Type | Title / H1 | Canonical and indexability | Main links, alt, and schema |
|---|---|---|---|---|
| `/` | Home | `Pet Outdoor & Travel Products for B2B Buyers | TROVANE` / home B2B supplier heading | Self-canonical; indexable | Links to category/product content; Organization and WebSite JSON-LD; branded image alt |
| `/products` | Collection | `Pet Outdoor & Travel Product Categories | TROVANE` / `Pet Outdoor & Travel Product Categories` | Self-canonical; indexable | Links to all published categories; CollectionPage, ItemList, BreadcrumbList; category image alt |
| `/products/travel-car` | Category | `Pet Travel & Car Accessories for B2B Buyers | TROVANE` / `Pet Travel & Car Products` | Self-canonical; indexable | Links to four live products and wholesale guide; CollectionPage, ItemList, BreadcrumbList |
| `/products/outdoor-feeding` | Category | **updated** `Portable Pet Water Bottles for B2B Buyers | TROVANE` / **updated** `Portable Pet Water Bottles for B2B Buyers` | Self-canonical; indexable | Links to two published bottle products and retail-selection guide; CollectionPage, ItemList, BreadcrumbList |
| `/products/walking-hiking` | Category | `Dog Walking & Hiking Accessories for B2B Buyers | TROVANE` / `Dog Walking & Hiking Accessories` | Self-canonical; indexable | Links to live leash and leash guide; CollectionPage, ItemList, BreadcrumbList |
| `/products/travel-car/portable-pet-carrier-backpack` | Product | `Portable Pet Carrier Backpack for B2B Buyers | TROVANE` / product name | Self-canonical; indexable | Category, RFQ/sample, carrier guide; Product and BreadcrumbList JSON-LD; product/gallery alt |
| `/products/travel-car/dual-use-pet-car-seat-tether` | Product | `Pet Car Seat Tether | Wholesale & Custom | TROVANE` / `Dual-Use Pet Car Seat Tether` | Self-canonical; indexable | Category, RFQ/sample, tether guide; Product and BreadcrumbList JSON-LD |
| `/products/travel-car/foldable-travel-cat-litter-box` | Product | `Foldable Travel Cat Litter Box for B2B Buyers | TROVANE` / product name | Self-canonical; indexable | Category, RFQ/sample, litter guide; Product and BreadcrumbList JSON-LD |
| `/products/travel-car/dog-car-window-safety-guard` | Product | `Dog Car Window Safety Guard for B2B Buyers | TROVANE` / product name | Self-canonical; indexable | Category, RFQ/sample, guide; Product and BreadcrumbList JSON-LD |
| `/products/outdoor-feeding/portable-pet-water-bottle-foldable-silicone-bowl` | Product | **updated** `Portable Pet Water Bottle with Silicone Bowl for B2B Buyers | TROVANE` / product name | Self-canonical; indexable | Category, RFQ/sample, water-bottle guide; Product and BreadcrumbList JSON-LD |
| `/products/outdoor-feeding/portable-pet-water-bottle-foldable-feeding-bowl` | Product | `2-in-1 Pet Water Bottle | Wholesale & Custom | TROVANE` / product name | Self-canonical; indexable | Category, RFQ/sample, water-bottle guide; Product and BreadcrumbList JSON-LD |
| `/products/walking-hiking/automatic-retractable-dog-leash` | Product | `Retractable Dog Leash for B2B Buyers | TROVANE` / product name | Self-canonical; indexable | Category, RFQ/sample, leash guide; Product and BreadcrumbList JSON-LD |
| `/blog` and `/blog/[slug]` | Blog collection/articles | Collection title plus product-specific article title/H1 | Self-canonical; indexable | Product and guide links; CollectionPage/ItemList/BreadcrumbList on collection and BlogPosting/BreadcrumbList on articles |
| `/robots.txt`, `/sitemap.xml` | Technical | n/a | robots allows public content and disallows `/admin`, `/api`; sitemap declared | Sitemap code draws from published product/category data and blog slugs |

### Technical SEO findings

- No missing canonical path was found in the reviewed public page implementations.
- No `noindex` directive was found on intended public product, category, blog, home, or listing pages.
- The sitemap implementation uses published categories and products, while `robots.txt` references the sitemap and blocks admin/API paths.
- Product pages have a single rendering H1, contextual category/buyer-guide links, image alt fallbacks, Product JSON-LD, and BreadcrumbList JSON-LD.
- A high-value implementation gap was found: product-specific `commercialCopy` existed in the confirmed SEO map but was not rendered in the product page. Every product showed a generic one-line wholesale section instead.
- A relevance gap was found on Outdoor Feeding: its live published range is two portable water bottles, but its old title/H1 targeted the much broader phrase `outdoor pet feeding products`.
- `app/products/travel-car/pet-travel-carrier/page.tsx` is a separate legacy route implementation. It is currently modified in the user worktree and was not changed. Its relation to a live published record must be verified before any redirect/canonical consolidation.

## 2. External Research

Queries researched:

- `portable pet water bottle wholesale OEM private label supplier`
- `pet water bottle with bowl wholesale for retailers`
- `foldable travel cat litter box wholesale manufacturer`
- `pet carrier backpack wholesale retailer buying guide`
- `pet water bottle wholesale`
- `portable cat litter box manufacturer wholesale`
- `pet carrier backpack safety sizing ventilation`
- `extension tether pet car safety`
- `dog hiking portable water bowl and leash guide`

External Pages Reviewed: 10 full-body pages  
External Domains Reviewed: 8

Primary external evidence set:

1. [Center for Pet Safety — Extension Tether Advisory](https://centerforpetsafety.org/extension-tether-advisory/) — vehicle-tether evidence and safety-claim boundaries.
2. [VCA — Road Trips and Car Travel With Your Cat](https://vcahospitals.com/know-your-pet/road-trips-and-car-travel-with-your-cat) — carrier, litter, water, and cleanup journey needs.
3. [VCA — Road Trip Safety Tips](https://vcahospitals.com/resources/lifestyle-dog/hazards-safety/road-trip-safety-tips) — containment, water, rest stops, litter, outdoor planning.
4. [VCA — Cat Crate Training and Travel](https://vcahospitals.com/mountain-vista/know-your-pet/cat-behavior-and-training-crate-training-and-travel) — carrier access, cleaning, acclimation, and containment.
5. [PetMD — Best Hiking Gear for Dogs](https://www.petmd.com/dog/general-health/best-hiking-gear-for-dogs) — leash, portable bowl, carrier, cleanability, and trail use.
6. [Ruffwear — How To Hike With Your Dog](https://ruffwear.com/blogs/explored/how-to-hike-with-your-dog) — water, weather, leash, gear acclimation.
7. [Kurgo — How to Keep Your Dog Safe on the Trail](https://www.kurgo.com/blog/how-to-keep-your-dog-safe-on-the-trail) — clean water, travel bowl, leash, harness, and trail preparation.
8. [Chewy — How To Travel With a Dog](https://www.chewy.com/education/dog/general/how-to-travel-with-a-dog) — retailer travel checklist, hydration, breaks, and leashing.
9. [Eland Bag — Portable Cat Litter Box Manufacturer Wholesale Guide](https://elandbag.com/blog/portable-cat-litter-box-manufacturer-wholesale.html) — B2B checks for containment, folding, cleaning, odor, packaging, and customization.
10. [Alibaba — How to Choose Pet Water Bottle Wholesale](https://www.alibaba.com/supplier/guide/pet-water-bottle-wholesale.html) — procurement models, samples, customization, packaging, and documentation.

Additional current-search result checks were made against Faire, JTPAWS, Petnourix, and PetFairs. They were not used as primary evidence, and their product properties, minimum quantities, certifications, test results, and other product claims were not transferred to TROVANE.

### Main external findings

- Buyers repeatedly seek product-specific wholesale/OEM information, sample validation, packaging, logo/color choices, and a clear distinction between stock supply and customization.
- For portable water bottles, commercial investigation intent concentrates on portable bowl format, carrying/storage, leakage risk, cleaning, and exact configuration—not broad `outdoor feeding` language.
- Carrier buyers emphasize usable space, ventilation, entry, loaded structure, cleaning, packaging, and sample review. TROVANE already covers this editorially.
- Litter-box buyers focus on containment, fold recovery, cleanability, drying, odor, and sample checks. TROVANE already covers this editorially.
- Vehicle-tether safety is a claim-control issue: external safety guidance should not be turned into a TROVANE product claim. It requires evidence review before content expansion.

## 3. SEO / Content Gaps

| Priority | Current TROVANE state | External signal | Gap | Buyer value | Recommended treatment |
|---|---|---|---|---|---|
| P1 | The Outdoor Feeding category contains two water bottles but was titled/H1ed as broad outdoor feeding. | Wholesale results use product-specific water-bottle, integrated-bowl, OEM, customization, packaging, and sample intent. | Page intent was broader and less commercial than the published range. | Makes the category easier for retail/distribution buyers to self-qualify. | Update existing category metadata/H1/copy. |
| P1 | Product map stored model-specific commercial content, but product pages rendered a generic wholesale paragraph. | Supplier/wholesale pages emphasize model-specific configuration, samples, packaging, and sourcing terms. | Verified B2B information was not visible to crawlers or buyers. | Reduces generic supplier copy and supports exact-model RFQs. | Render existing verified commercial copy. |
| P2 | Water-bottle selection guide linked only one featured model in the visible comparison section. | Two-in-one/portable-bowl comparison and retail sourcing are recurring product-search intents. | The second published water-bottle model had weaker contextual blog discovery. | Helps buyers compare formats before request/sampling. | Add a factual contextual product link to the existing guide. |
| P1 (blocked) | Tether page avoids crash-tested wording but presents a vehicle-use tether. | Center for Pet Safety warns against extension tethers. | Product-evidence/claim review is needed, not an article gap. | Prevents unsupported retailer claims. | Do not publish new content until product/evidence review. |

## 4. Candidate Actions

### Action 1

Action: Render product-specific verified B2B commercial copy on product detail pages  
Target URL: All published dynamic product detail pages  
Score: 94/100  
Reason: Product-specific commercial copy already existed, was supported by current published data, and was silently discarded by the product-detail component. Rendering it gives buyers precise configuration, branding, packaging, sample, and order-confirmation context without inventing new facts.  
External Evidence: B2B supplier, marketplace, and retailer pages consistently surface product-specific customization, sampling, packaging, and configuration questions.  
Decision: EXECUTE

### Action 2

Action: Align Outdoor Feeding category with its actual portable-water-bottle range and B2B query intent  
Target URL: `/products/outdoor-feeding`  
Score: 91/100  
Reason: The category contains only two published portable water bottles. A category title/H1 focused on portable water bottles is more precise and aligns to commercial research intent while retaining the truthful category scope in the introductory copy.  
External Evidence: Water-bottle wholesale research repeatedly uses portable bottle, foldable/integrated bowl, retail, wholesale, customization, packaging, and sample intent.  
Decision: EXECUTE

### Action 3

Action: Add an exact-model comparison link for the larger 2-in-1 water bottle in the existing selection guide  
Target URL: `/blog/pet-travel-water-bottle-retail-selection`  
Score: 85/100  
Reason: The guide is already relevant and supports a real buying decision. Linking the second published model improves discovery and buyer comparison without creating a duplicate article.  
External Evidence: Retail and wholesale pages frame portable and 2-in-1 bottle designs as an assortment comparison.  
Decision: EXECUTE

### Action 4

Action: Publish a vehicle-tether evidence and claim-audit article  
Target URL: `/blog/pet-car-seat-tether-buyer-checklist` or a new article  
Score: 96/100  
Reason: Strong B2B relevance, but the issue is safety/evidence governance.  
External Evidence: Center for Pet Safety advises against extension tethers and warns that they can negate crash-protection claims.  
Decision: REJECT / HOLD — requires product architecture, intended-use, documentation, and market review before publication.

### Action 5

Action: Add another travel litter-box sample/QC article  
Target URL: New blog URL  
Score: 77/100  
Reason: The external B2B signal is real, but existing TROVANE buyer and use-case guides already cover the relevant tasks in depth.  
External Evidence: Portable litter-box sourcing pages highlight containment, folding, cleaning, and private label.  
Decision: REJECT — a future worksheet could enhance the existing guide, but a new article would be materially duplicative.

## 5. Changes Executed

| URL / implementation | Before | Change | Why |
|---|---|---|---|
| All `ProductDetailPage` product URLs | The wholesale section always used a generic single sentence; `commercialCopy` was unused. | Render `seo.commercialCopy` when defined, retaining the generic fallback for products without verified mapped copy. | Makes existing verified B2B product facts visible without modifying product data or adding claims. |
| `/products/outdoor-feeding` | Title/H1: `Outdoor Pet Feeding Products`; broad description. | Title/H1 now target `Portable Pet Water Bottles for B2B Buyers`; description/introduction identify two actual foldable-bowl bottle formats and retain exact-model confirmation language. | Aligns the page to its real published products and commercial buyer intent. |
| `/products/outdoor-feeding/portable-pet-water-bottle-foldable-silicone-bowl` | Generic B2C-leaning title and meta description. | Title and description now identify the portable silicone-bowl water bottle as a B2B retail/wholesale sourcing page. | Better matches page purpose without adding material, capacity, safety, or performance claims. |
| `/blog/pet-travel-water-bottle-retail-selection` | Visible product-reference section linked only to the compact silicone-bowl model. | Added a natural link to the published 2-in-1 model, specifying only its confirmed 28.5 × 7.5 cm plastic format and soft silicone bowl. | Strengthens internal discovery and product-format comparison intent. |
| `/products/travel-car` card copy | Said `car-safety accessories`. | Changed to `car-travel accessories`. | Avoids broad safety positioning while product-evidence review is unresolved. |

## 6. Files Modified

- `app/products/_components/product-detail-page.tsx`
- `lib/seo/site-keyword-map.ts`
- `lib/blog/buyer-product-guides.ts`
- `TROVANE_SEO_OPTIMIZATION_REPORT_2026-09-16.md`

The separate external research record remains at `TROVANE_EXTERNAL_RESEARCH_2026-09-16.md`.

## 7. Validation

- `pnpm lint`: PASS — 0 errors. Three pre-existing/unrelated warnings remain in `.automation-contract-audit/scripts/mobile-qa.mjs`, an admin image manager, and the catalog generator.
- `pnpm build`: PASS — compiled, type-checked, and completed page generation successfully.
- Catalog prebuild: safely skipped catalog generation because local production `DATABASE_URL` is unavailable; this did not block Next.js build validation.
- Metadata/canonical: reviewed source confirms canonical generation for home, products, category, product, blog collection, and blog article routes.
- Sitemap/robots: source confirms dynamic sitemap inclusion for published database categories/products and defined blog slugs; `robots.txt` references sitemap and blocks `/admin` and `/api`.
- Internal links: source check confirms the new guide-to-2-in-1 product link and the product-page commercial-copy path.
- 404: build route generation passed. Full dynamic product 404 behavior depends on current production database data and was not fabricated from local data.
- Diff quality: `git diff --check` produced no whitespace errors.

## 8. Not Changed

- No new blog page was created. The only high-signal unexplored editorial angle (vehicle tether evidence) is blocked by product safety/evidence review.
- No material, dimensions, weights, capacity, load rating, testing result, certification, waterproof rating, MOQ, lead time, or packaging fact from external websites was copied into TROVANE.
- No `food grade`, `BPA free`, `non-toxic`, `crash tested`, `certified`, or equivalent unsupported claim was added.
- No modification was made to the legacy `pet-travel-carrier` route because it is already modified in the user worktree; its publication/redirect status needs separate confirmation.
- No database schema, admin function, automation, Researcher, Runner, Writer, Scheduler, or TROVANE-Brain file was modified.
- No commit, push, deployment, or dependency installation was performed.

## 9. Final Result

This round optimized the highest-value verified gaps in existing pages rather than generating new content: it made already-confirmed B2B product information render on product pages, repositioned the water-bottle category around the products it actually contains, improved the silicone-bowl bottle metadata, and created a factual internal comparison path to the second water-bottle model.

Manual confirmation required: Review the exact vehicle-tether architecture, instruction set, testing/evidence, intended-use wording, and destination-market requirements before expanding content or claims around that product. Also verify whether the legacy `/products/travel-car/pet-travel-carrier` route has a live published database record before redirect/canonical work.
