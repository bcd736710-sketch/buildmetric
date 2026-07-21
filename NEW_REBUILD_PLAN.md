# NEW_REBUILD_PLAN

## Core Premise

BuildMetric is changing from a broad DIY calculator website into a minimal single-product independent store.

Phase one sells only one product:

**5x6 Chicken Coop Plans**

The existing repository, Next.js App Router project, Vercel deployment, analytics setup, search verification, and production domain must remain in place:

`https://buildmetriccalc.com`

Do not create a new repository, a new Next.js project, a new Vercel project, a product catalog, a shopping cart, user accounts, or a marketplace-style ecommerce system.

## Phase One MVP Goal

Create a simple product sales site where the homepage `/` is the complete sales page.

Visitor path:

1. See the chicken coop plan immediately.
2. Understand what the product is.
3. Review what is included.
4. See placeholder previews/gallery until real assets are ready.
5. Read conservative FAQs.
6. Click `Get the Plans`.

## Final Phase One Route Structure

### Primary Route

- `/`
  - Complete sales page for 5x6 Chicken Coop Plans.

### Routes Kept Live

Existing routes remain live to avoid breaking URLs:

- `/blog`
- `/blog/[slug]`
- `/backyard-chickens`
- `/contact`
- `/privacy-policy`
- `/affiliate-disclosure`
- `/editorial-policy`
- `/methodology`
- all old calculator/tool/topic routes

### Routes Not Created In Phase One

- `/product/5x6-chicken-coop-plans`

There is only one product, so no separate product detail page is needed.

## Header MVP

Header links:

- `The Plan` -> `/#the-plan`
- `What's Included` -> `/#whats-included`
- `FAQ` -> `/#faq`
- `Get the Plans` -> purchase CTA / placeholder state

Do not include:

- Tools
- Backyard DIY
- Garden DIY
- Shed Planning
- Home Improvement
- Blog in header during phase one

Blog can remain in the footer.

## Footer MVP

Footer should support trust and basic navigation, not promote the old tools site.

Keep footer links to:

- Home
- The Plan
- What's Included
- FAQ
- Blog
- Contact
- Privacy
- Editorial Policy
- Affiliate Disclosure

Remove main footer promotion of:

- Tools
- broad DIY hubs
- old topic hubs as primary navigation

## Components

### New Core Components Only

Create only these phase-one components:

- `ProductHero`
- `ProductGallery`
- `ProductDetails`
- `ProductPreview`
- `ProductFAQ`
- `PurchaseButton`

Simple sections may remain directly composed in `app/page.tsx` or inside these core components.

Do not create one component per homepage section.

### Product Config

Create:

- `lib/product.ts`

This is the editable source of truth for:

- product name
- product slug
- price
- currency
- checkout URL
- availability
- button text
- digital download messaging
- no physical product notice
- product overview copy
- included items
- project-at-a-glance values
- audience copy
- gallery placeholders
- preview placeholders
- FAQ

Unknown facts must stay `TBD` or conservative placeholder text.

## Homepage MVP Structure

### Section 1: Hero

Headline:

`Build Your Own Backyard Chicken Coop`

Subheadline:

`A complete 5' x 6' chicken coop building plan designed to help DIY builders go from materials to finished coop with less guesswork.`

Buttons:

- `Get the Plans`
- `See What's Included`

Right side:

- safe chicken coop placeholder, not copyrighted third-party imagery

### Section 2: Product Overview

Product:

`5' x 6' Chicken Coop Plans`

Price:

`$17.95`

Show:

- Digital download
- No physical product will be shipped

Included-items text stays configurable and conservative.

### Section 3: Finished Project Gallery

Placeholder gallery for future product images:

- front
- side
- back
- interior
- nesting box

Do not use marketplace images.

### Section 4: Project At A Glance

Show:

- Size: `5 ft x 6 ft`
- Digital product: `Instant download`
- Skill level: `TBD`
- Chicken capacity: `TBD`
- Estimated build cost: `TBD`
- Build time: `TBD`

Do not invent missing numbers.

### Section 5: What's Included

Placeholder cards:

- Building Plans
- Material List
- Cut List
- Step-by-Step Guide

### Section 6: Who This Is For

Conservative audience copy:

- backyard chicken owners
- DIY homeowners
- people who prefer building over buying a prefab coop

### Section 7: Product Preview

Placeholder preview area for:

- PDF page preview
- structure diagrams
- material list sample
- instruction pages

### Section 8: FAQ

Include at least:

- Is this a physical chicken coop?
- How will I receive the plans?
- What file format will I receive?
- What measurements are used?
- Can beginners build this?
- Can I modify the design?

Unknown details must remain conservative/configurable.

### Section 9: Final CTA

Repeat:

- `5' x 6' Chicken Coop Plans`
- `$17.95`
- `Get the Plans`

## Purchase Button

Create a configurable `PurchaseButton`.

It must support:

- product price
- checkout URL
- button text
- availability
- placeholder state when checkout is not ready

Do not hard-code a payment platform.

Possible future platforms:

- PayPal
- Stripe
- Lemon Squeezy
- other digital product checkout

## SEO MVP

Phase one updates only basic homepage SEO metadata.

Target keywords:

- chicken coop plans
- DIY chicken coop plans
- 5x6 chicken coop plans
- backyard chicken coop plans

Do not add Product JSON-LD in phase one because:

- final product contents are not confirmed
- checkout is not connected
- availability is not confirmed

Keep:

- Google Analytics
- Vercel Analytics
- Google Search Console verification
- Bing verification
- robots
- canonical logic

## Blog MVP

Do not migrate the blog system in phase one.

Keep existing blog URLs live.

Do not delete articles.

Do not rewrite unrelated articles.

Do not unify dynamic/static blog implementation yet.

Only remove broad blog/tool promotion from the new homepage and header.

Blog cleanup is phase two.

## Old Calculator Handling

Phase one only:

- remove from Header
- remove from Footer primary navigation
- remove from Homepage
- stop linking from the new sales page

Do not:

- delete old calculator code
- delete old calculator URLs
- redirect old URLs
- add noindex
- do URL migration
- build `ToolPageLayout`

## Phase One Implementation Files

Expected new files:

- `lib/product.ts`
- `components/purchase-button.tsx`
- `components/product-hero.tsx`
- `components/product-gallery.tsx`
- `components/product-details.tsx`
- `components/product-preview.tsx`
- `components/product-faq.tsx`
- `IMPLEMENTATION_REPORT.md`

Expected modified files:

- `app/page.tsx`
- `components/header.tsx`
- `components/footer.tsx`
- maybe `lib/site.ts` if homepage/global copy needs a light update

No product detail route is created in phase one.

## Validation

After implementation run:

- lint
- typecheck
- production build

Then stop and provide `IMPLEMENTATION_REPORT.md`.

