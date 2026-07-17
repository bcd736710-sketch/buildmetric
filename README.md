# BuildMetric

BuildMetric is an SEO-driven DIY calculator and planning website for English-speaking homeowners. It focuses on simple, fast, trustworthy calculators and practical guides for backyard, garden, shed, painting, concrete, gravel, mulch, fencing, and related home projects.

Production site: https://buildmetriccalc.com

Repository: https://github.com/bcd736710-sketch/buildmetric.git

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Vercel deployment

## Run Locally

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```txt
http://localhost:3000
```

Create a production build:

```bash
npm run build
```

## Environment Variables

Set the public site URL before deploying so canonical URLs, Open Graph data,
JSON-LD, `robots.txt`, and `sitemap.xml` point to the correct domain:

```bash
NEXT_PUBLIC_SITE_URL=https://buildmetriccalc.com
```

## Project Structure

```txt
app/
  layout.tsx
  page.tsx
  blog/
  backyard-diy/
  backyard-chickens/
  garden-diy/
  shed-planning/
  home-improvement/
  tools/
    page.tsx
    chicken-coop-size-calculator/
      page.tsx
components/
  container.tsx
  footer.tsx
  header.tsx
  tool-card.tsx
lib/
  calculators.ts
  site.ts
```

## How to Add a New Calculator

1. Add the calculator metadata to `lib/calculators.ts`.
2. Add the formula and typed options in a focused file inside `lib/`.
3. Create a calculator component in `components/`.
4. Add a route under `app/tools/[calculator-slug]/page.tsx`.
5. Include SEO metadata, explanatory content, FAQ content, and real internal links only when the target pages exist.

Keep each calculator simple: clear inputs, readable formulas, useful outputs, and enough supporting content for search intent.

## Deploy to Vercel

1. Push changes to the GitHub `main` branch.
2. Let Vercel deploy the imported GitHub repository.
3. Keep `NEXT_PUBLIC_SITE_URL` set to `https://buildmetriccalc.com`.
4. Confirm the production domain and sitemap after deployment.

No database, authentication, or payment provider is currently required.

## Current Product Notes

- The site is static-first and SEO-first.
- The production domain is `https://buildmetriccalc.com`.
- The Vercel preview domain is only a fallback/debugging alias.
- Google Search Console and Bing Webmaster Tools are configured for the production domain.
- Newsletter, monetization, accounts, payments, and database-backed content are intentionally excluded for now.
