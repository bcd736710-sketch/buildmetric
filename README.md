# BuildMetric

BuildMetric is an SEO-driven DIY calculator and planning tools website for English-speaking homeowners. Phase 1 focuses on a small, fast, deployable MVP with one backyard project tool: the Chicken Coop Size Calculator.

## Tech Stack

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Vercel-ready deployment

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
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Project Structure

```txt
app/
  layout.tsx
  page.tsx
  tools/
    page.tsx
    chicken-coop-size-calculator/
      page.tsx
components/
  chicken-coop-calculator.tsx
  container.tsx
  footer.tsx
  header.tsx
  tool-card.tsx
lib/
  calculators.ts
  chicken-coop.ts
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

1. Push the project to a Git repository.
2. Import the repository in Vercel.
3. Add `NEXT_PUBLIC_SITE_URL` in Vercel project environment variables.
4. Use the default Next.js settings.
5. Deploy.

No database, authentication, or payment provider is required for Phase 1.

## Phase 1 Limitations

- Only one calculator is implemented.
- Coop style is captured as a planning input but does not change the formula yet.
- Related article links are intentionally not published until article pages exist.
- Newsletter, monetization, accounts, payments, and database-backed content are intentionally excluded.
