# BuildMetric Handoff

This document is for a brand-new Codex session with no prior context. It summarizes what we are building, what is already done, what is currently blocked or pending, and what mistakes should not be repeated.

## Project

BuildMetric is an SEO-driven DIY calculator and planning tools website for English-speaking homeowners, mainly targeting the United States, Canada, the United Kingdom, and Australia.

Positioning:

- Simple, accurate, beautiful online tools for DIY planning.
- Professional, trustworthy, minimal, modern, and premium.
- Inspired by Apple-style clarity, but still practical and SEO-focused.
- Avoid farm-style visuals, cartoon UI, and overly colorful interfaces.

Founder constraints:

- Solo founder.
- Limited time and budget.
- Prioritize simplicity, maintainability, SEO, and deployability.
- Do not over-engineer.

Tech stack:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Static-first pages
- Deployed from GitHub to Vercel

Workspace:

```text
C:\Users\27823\Documents\dulizhan
```

Production URL currently in use:

```text
https://buildmetric-iota.vercel.app
```

GitHub repo:

```text
https://github.com/q7-7/buildmetric.git
```

Main branch:

```text
main
```

## Current Site State

The site is live on Vercel and builds successfully.

Core routes:

- `/`
- `/tools`
- `/blog`
- `/about`
- `/methodology`
- `/editorial-policy`
- `/privacy-policy`
- `/backyard-diy`
- `/backyard-chickens`
- `/garden-diy`
- `/shed-planning`
- `/home-improvement`
- `/robots.txt`
- `/sitemap.xml`
- `/llms.txt`
- `/feed.xml`
- `/feed.json`

Current calculators:

- `/tools/chicken-coop-size-calculator`
- `/tools/chicken-run-size-calculator`
- `/tools/chicken-feed-calculator`
- `/tools/raised-garden-bed-soil-calculator`
- `/tools/shed-cost-calculator`
- `/tools/mulch-calculator`
- `/tools/gravel-calculator`
- `/tools/fence-cost-calculator`
- `/tools/concrete-slab-calculator`
- `/tools/paint-calculator`

Current build output generates 65 static routes.

## What Has Been Completed

Initial MVP:

- Next.js + TypeScript + Tailwind project setup.
- Header, footer, navigation, shared layout.
- Homepage.
- Tools directory.
- Chicken Coop Size Calculator.
- SEO metadata, canonical URLs, Open Graph, structured data, sitemap, robots.
- README.

SEO and deployment fixes:

- Replaced hard-coded production URLs with `NEXT_PUBLIC_SITE_URL` / shared site config.
- Fixed fake related article links.
- Added `aria-live="polite"` to calculator results.
- Fixed footer encoding artifact.
- Improved focus-visible styles.
- Verified lint and production build.

Deployment:

- GitHub repo created and pushed.
- Netlify was tried first, but the free team build minutes were exhausted.
- Vercel is now the preferred host and is working.
- Vercel project URL is `https://buildmetric-iota.vercel.app`.
- Vercel project has `NEXT_PUBLIC_SITE_URL` set to:

```text
https://buildmetric-iota.vercel.app
```

SEO/GEO foundation:

- Added `/sitemap.xml`.
- Added `/robots.txt`.
- Added `/llms.txt`.
- Added `/feed.xml`.
- Added `/feed.json`.
- Added Organization, WebSite, SiteNavigation, WebApplication, FAQ, article, and breadcrumb-style structured data where relevant.
- Added methodology and editorial policy pages to support trust.
- Added topic hub pages for topical authority.
- Added calculator formula summaries and assumptions.
- Added related guides to all newer tool pages so tools are not isolated.

Content:

- Blog index exists.
- 35 blog pages currently exist.
- Tool pages include calculator, explanation, formula logic, examples, FAQ, next steps, related tools, and related guides.
- Topic hubs connect related tools and articles.

Visual/UI:

- Site has been improved from overly plain MVP toward a more premium, Apple-like planning tools style.
- Homepage uses a stronger hero with tool preview.
- UI is still intentionally minimal and performance-focused.

## Current Verification Status

Recent checks passed:

```text
pnpm run lint
pnpm run build
```

Important: `npm` may not be available in PATH in this environment. Use bundled pnpm if needed:

```powershell
$env:PATH="C:\Users\27823\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;$env:PATH"; & "C:\Users\27823\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback\pnpm.cmd" run lint
```

```powershell
$env:PATH="C:\Users\27823\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;$env:PATH"; & "C:\Users\27823\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback\pnpm.cmd" run build
```

## Current Blockers / Open Issues

No code blocker is active right now.

Operational items still pending:

- Bing indexing is in progress. The sitemap has been submitted and discovered 35 URLs.
- Some individual URLs were manually requested for indexing, but Bing request quota may run out daily.
- Google Search Console is not set up because the founder is in China and does not have a Google account. This is not fatal for now.
- A custom domain has not been purchased yet. Attempts to buy through Namecheap/Porkbun had payment friction with PayPal/bank card.
- Netlify should not be used right now because the team build minutes are exhausted. Vercel is the active deployment path.

## Next Recommended Steps

Best next step:

1. Review the deployed Vercel site after the latest push.
2. Confirm the 5 newer tool pages show related guides near the bottom:
   - `/tools/mulch-calculator`
   - `/tools/gravel-calculator`
   - `/tools/fence-cost-calculator`
   - `/tools/concrete-slab-calculator`
   - `/tools/paint-calculator`
3. If those look good, continue improving all calculator pages with practical UX features:
   - Saved/shareable result URLs.
   - Print-friendly result summaries.
   - Better unit labels and assumptions.
   - Clearer "minimum vs comfortable" guidance when inputs change.
4. Then deepen content clusters:
   - Add more targeted blog posts around each calculator.
   - Add comparison/intention articles like "mulch vs gravel", "paint coverage by room", "concrete slab thickness guide".
   - Keep all content tied to calculator pages with internal links.
5. When a custom domain is purchased, update:
   - `NEXT_PUBLIC_SITE_URL` in Vercel.
   - Bing Webmaster property.
   - sitemap submission.
   - canonical URLs via rebuild.

Do not pause development just because Bing has not indexed everything yet. Indexing takes time. Keep improving useful pages and internal links.

## Important Mistakes To Avoid

Do not use Netlify as the primary deployment target right now.

- Netlify free team build minutes were exhausted.
- Live site may still serve traffic, but production deploys can be blocked.
- Use Vercel instead.

Do not submit a sitemap under the wrong Bing property.

- If the Bing property is `https://buildmetric-iota.vercel.app/`, the sitemap must be:

```text
https://buildmetric-iota.vercel.app/sitemap.xml
```

- Do not submit the old Netlify sitemap to the Vercel property.
- Do not submit the Vercel sitemap to the old Netlify property.

Do not assume `/sitemap.xml` is broken because the browser says "XML file has no style information."

- That browser message is normal.
- The sitemap is valid if it lists URL entries.

Do not worry if Bing says "discovered but not crawled" or "not indexed" immediately.

- This is normal for a new site.
- Request indexing for important pages when quota allows, but do not burn time repeatedly checking the same URLs.

Do not rely on Google Search Console as a blocker.

- It is helpful, but not required to continue building.
- Bing Webmaster is already available and useful.

Do not add fake blog links.

- If a link is shown, the route should exist.
- Placeholder cards are okay only if they are not misleading links.

Do not make calculator input options meaningless.

- The user noticed when different options produced the same output.
- If an option is visible, either it should affect the result or the page should clearly explain that it is context-only.

Do not overbuild accounts, payments, databases, or premium features yet.

- The project is still in organic traffic-building mode.
- Keep features static, fast, and simple.

Do not make the site too plain.

- The user wants minimal and premium, but not empty.
- Use restrained visual assets, icons, cards, diagrams, comparison blocks, and planning summaries where they genuinely help.

Do not make the site overly decorative or cartoonish.

- Avoid farm-style or playful illustration-heavy design.
- Keep the professional calculator-tool feel.

Do not forget mobile.

- Every calculator must remain usable on small screens.
- Inputs, results, headers, and cards should not overlap.

## Known Environment Notes

Git:

- Git is installed now.
- The repo is initialized and tracking `origin/main`.
- Git push may occasionally fail with:

```text
schannel: failed to receive handshake, SSL/TLS connection failed
```

- Usually retrying `git push` works.

Package manager:

- Use pnpm. The project may not have npm available in PATH.

Line ending warnings:

- Git may show warnings like:

```text
LF will be replaced by CRLF the next time Git touches it
```

- This is not a deployment blocker.

Vercel:

- Vercel is connected to GitHub.
- Pushes to `main` trigger deployment.
- If environment variables change, redeploy production.
- For redeploy, select Production and do not use stale build cache unless intentionally needed.

## Useful Commands

Check status:

```powershell
git status --short
```

Run lint:

```powershell
$env:PATH="C:\Users\27823\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;$env:PATH"; & "C:\Users\27823\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback\pnpm.cmd" run lint
```

Run build:

```powershell
$env:PATH="C:\Users\27823\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;$env:PATH"; & "C:\Users\27823\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback\pnpm.cmd" run build
```

Commit:

```powershell
git add .
git commit -m "Your commit message"
git push
```

## Working Style For Next Session

The user prefers proactive execution. If they say "继续下一步", choose the highest-leverage next step and implement it.

Use Chinese when communicating with the user.

Keep explanations beginner-friendly, especially for GitHub, Vercel, Bing Webmaster, and domain/DNS tasks.

When making code changes:

- Read existing patterns first.
- Keep changes scoped.
- Run lint and build.
- Commit and push if the user is in deployment flow.

High-leverage future work:

- Improve calculator UX.
- Add content depth and internal links.
- Improve topic hubs.
- Add more practical downloadable/printable planning summaries later.
- Buy and connect a custom domain when payment is solved.
