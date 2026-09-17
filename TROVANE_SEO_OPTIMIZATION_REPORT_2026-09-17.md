# TROVANE SEO Optimization Report

Date: 2026-09-17
Site: https://buildmetriccalc.com/
Scope: Production audit, new public-web research, content-gap analysis and local-only implementation

## 1. Current Site Snapshot

### Published products

Production `sitemap.xml` returned 10 product URLs:

1. Portable Pet Carrier Backpack for Cats & Small Dogs
2. Dual-Use Pet Car Seat Tether
3. Foldable Travel Cat Litter Box
4. Dog Car Window Safety Guard
5. Foldable Dog Car Seat with Mesh Sides and Safety Tether
6. Portable Pet Water Bottle with Silicone Drinking Bowl
7. 2-in-1 Pet Water Bottle with Foldable Feeding Bowl
8. Automatic Retractable Dog Leash
9. Reflective Full-Body Waterproof Dog Raincoat with Tail Cover
10. Soft EVA Dog Flying Disc

### Categories

1. Travel & Car — five product links verified.
2. Outdoor Feeding — two product links verified.
3. Walking & Hiking — three product links verified.

### Blogs

The Production sitemap currently lists 11 blog URLs before this local-only change, including buying guides for water bottles, carriers, car tethers, window guards, travel litter boxes and retractable leashes, plus the leak-test, cycle-test and flying-disc sample-test frameworks.

### Technical and on-page audit

- `robots.txt` returns 200, allows public content, disallows `/admin` and `/api`, and declares the sitemap.
- `sitemap.xml` returns 200 and includes the 10 product URLs above.
- The three category pages return one clear H1, self-canonical URLs and product-card links aligned with their current categories.
- The ten reviewed product URLs returned 200, self-canonical URLs and one H1. Their reviewed titles were unique within that set.
- The shared product template emits Product and BreadcrumbList JSON-LD from published product data. No structured-data changes were made in this round.
- The Guard, Carrier, Litter Box, Tether and Leash pages have relevant guide links. The new raincoat guide adds a distinct internal path to a currently published product that had no dedicated article.

## 2. Yesterday Baseline

Commit `c64e77b` — `improve b2b product seo coverage` — and both 2026-09-16 reports were reviewed before making changes.

Yesterday’s work already:

- used verified Published-product commercial copy on product pages;
- positioned `/products/outdoor-feeding` specifically as Portable Pet Water Bottles;
- improved the Portable Pet Water Bottle with Foldable Silicone Bowl title and description;
- expanded the Pet Travel Water Bottle Buyer Guide with a link to the second real water-bottle model; and
- changed generic Travel & Car “car-safety accessories” wording to the more accurate “car-travel accessories” framing.

None of those water-bottle titles, descriptions, category framing or Buyer Guide sections were edited today. Today’s actions target a previously unenhanced Guard product page and the newly verified raincoat product / B2B sizing intent.

## 3. External Research

Queries, eight readable pages, eight domains, buyer questions and page-level observations are recorded in [TROVANE_EXTERNAL_RESEARCH_2026-09-17.md](TROVANE_EXTERNAL_RESEARCH_2026-09-17.md).

Main findings:

- Car-window products repeatedly expose installation location, vehicle context, ventilation, window operation, removal and non-universal-fit concerns.
- External “universal” and security-style wording is a risk signal, not a TROVANE claim to adopt.
- Retractable-leash wholesale pages reinforce length and brake/lock selection, but TROVANE already covers that buyer task.
- Wholesale dog-raincoat pages strongly signal size-chart clarity, sample validation, colour, packaging and configuration confirmation — a distinct B2B intent not covered by an existing TROVANE article.

## 4. SEO / Content Gaps

| Gap | Current TROVANE coverage | External signal | Best destination | Decision |
|---|---|---|---|---|
| Vehicle fit and claim boundary for the Dog Car Window Safety Guard | Product page has facts; existing guide has detailed evaluation | Four retail pages focus on installation, vehicle context, ventilation and fit limitations | Existing product page | Execute Buyer Notes; no new guide |
| Wholesale dog-raincoat size-range and sample-approval workflow | Product page has complete published size data; no related guide | Two manufacturer pages focus on measurement, fit, OEM, sample and packaging decisions | New Buyer Guide | Execute |
| Retractable-leash configuration selection | Product Notes + Buyer Guide + Cycle-Test Framework | Two wholesale pages reinforce the same questions | Existing coverage | Reject as duplicate |
| Foldable dog car seat safety positioning | Product facts only; existing wording includes safety-style language | Vehicle-product retail language makes evidence boundaries material | Product/evidence review | Hold; no SEO expansion |
| Dual-Use Pet Car Seat Tether collision / restraint claims | Product Notes + Buyer Checklist | Earlier and continuing safety-risk context | Product/evidence review | Hold; no SEO expansion |

## 5. Candidate Actions

Scores are opportunity scores, not search-ranking or page-quality scores.

| Action | Target | B2B intent /25 | Product relevance /20 | External evidence /20 | Gap /15 | Verified execution /10 | Internal-link value /10 | Score | Decision |
|---|---|---:|---:|---:|---:|---:|---:|---:|---|
| Add vehicle-fit Buyer Notes | `/products/travel-car/dog-car-window-safety-guard` | 24 | 20 | 19 | 12 | 10 | 10 | 95 | EXECUTE |
| Create wholesale raincoat sizing guide | New raincoat Buyer Guide | 24 | 20 | 18 | 15 | 9 | 10 | 96 | EXECUTE |
| Expand retractable-leash content | Existing product / guides | 20 | 20 | 16 | 2 | 10 | 6 | 74 | REJECT — duplicate coverage |
| Expand Foldable Dog Car Seat safety content | Existing product page | 22 | 20 | 17 | 15 | 0 | 9 | 83 | REJECT / HOLD — evidence and claim review required |
| Create vehicle-tether safety content | Existing tether page / guide | 25 | 20 | 20 | 13 | 0 | 10 | 88 | REJECT / HOLD — evidence and intended-use review required |

## 6. Changes Executed

### A. Dog Car Window Safety Guard Buyer Notes

- URL: `/products/travel-car/dog-car-window-safety-guard`
- Before: published material, dimensions, colours and a related Guide were present, but buyers had no concise product-level list of vehicle-fit / installation questions or explicit non-universal boundary.
- After: a B2B Buyer Notes section will render after Wholesale / OEM / Project Supply and before the CTA. It lists only high-density EVA foam, the published 40.5 × 4.7 × 4.7 cm format and blue / black options; it asks buyers to confirm vehicle window/trim location, fit, installation/removal, clearance, instructions, warnings, branding and packaging.
- Reason: this addresses a direct B2B buyer task while preserving the existing Guide’s deeper evaluation role.
- Boundary: published material and dimensions do not infer universal vehicle compatibility, window-security performance, prevention of escape or crash protection.

### B. New dog-raincoat Buyer Guide

- URL: `/blog/dog-raincoat-wholesale-sizing-guide` (local only; not deployed)
- Before: the published raincoat supplied a size table but had no dedicated wholesale sizing / sample-approval content and no product-specific Buyer Guide.
- After: a new Buyer Guide gives a sourcing workflow for size range, size-chart communication, sample fit, instructions, weather / visibility claim boundaries and RFQ preparation. It links to the real published raincoat and to the existing broader pet-travel buying guide.
- Reason: it serves a distinct, externally evidenced B2B intent rather than repeating the product page or yesterday’s water-bottle content.
- Verified product facts used: polyester; XS–2XL published back/neck/chest dimensions; Vintage Green, Navy Blue and Vintage Orange; reflective edge detailing; transparent hood finish; four-leg coverage; leash access; extended tail protection.

## 7. New Blog

CREATED — local only

- Title: How Wholesale Buyers Should Build a Dog Raincoat Size Range
- Slug: `dog-raincoat-wholesale-sizing-guide`
- Target search intent: wholesale dog-raincoat sizing, sample approval and retail size-range planning
- Related published product: Reflective Full-Body Waterproof Dog Raincoat with Tail Cover
- Internal links: published raincoat product page; existing pet-travel wholesale buying guide
- External evidence: current wholesale sizing and OEM pages from Peva Products and Rainora, recorded in the external research report

## 8. Files Modified

- `lib/seo/site-keyword-map.ts`
- `lib/blog/buyer-product-guides.ts`
- `TROVANE_EXTERNAL_RESEARCH_2026-09-17.md`
- `TROVANE_SEO_OPTIMIZATION_REPORT_2026-09-17.md`

## 9. Validation

Completed after all local changes:

- `pnpm lint`: PASS — 0 errors; 3 pre-existing warnings outside this SEO work.
- `pnpm build`: PASS — 28 static pages generated, including the new Blog route.
- `git diff --check`: PASS.
- New guide route: PASS — included in the static Blog route generation.
- Internal links: PASS — the existing Guard Buyer Guide, published raincoat product page and broader pet-travel guide paths are valid project routes; the two existing Production guide/product destinations return 200.
- SEO protection: PASS — this round did not modify an existing product URL, canonical, title, meta description, H1 or Product/Breadcrumb JSON-LD.

## 10. Safety and Data Boundaries

No external specification was adopted as TROVANE data.

- Dog Car Window Safety Guard: vehicle compatibility, window security, escape prevention and crash protection remain UNKNOWN and must not be inferred.
- Raincoat: the guide does not claim certified visibility, universal fit, a pet-weight range, waterproof performance under all conditions, washing durability, certification or test results.
- Foldable Dog Car Seat with Mesh Sides and Safety Tether: potentially broad safety-style current wording needs manual product / instruction / evidence review; no SEO copy was added.
- Dual-Use Pet Car Seat Tether: no crash, restraint-strength or collision content was added because first-party evidence remains insufficient.
- Retractable leash: no change because the product page, Buyer Guide and Cycle-Test Framework already cover the same B2B selection task.

## 11. Final Recommendation

Today’s two local actions are higher value than revisiting yesterday’s water-bottle work because they address two independently evidenced buyer jobs that yesterday did not cover: vehicle-fit / claim confirmation for the Guard and wholesale size-range approval for a real raincoat product.

Recommend manual review followed by `commit → push → Production` for the two code changes and the two reports, provided validation passes. Do not expand either car-tether product’s safety claims until first-party product evidence, instructions and destination-market requirements have been reviewed.
