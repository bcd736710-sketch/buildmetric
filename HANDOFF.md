# BuildMetric Handoff

This file is for a brand-new Codex session with no prior context. Read this first before doing anything.

## What We Are Building

BuildMetric is an English DIY calculator and planning website for homeowners, mainly targeting the United States, Canada, the United Kingdom, and Australia.

The product direction:

- Simple, accurate, beautiful calculators for backyard, garden, shed, painting, concrete, gravel, mulch, fencing, and similar home projects.
- SEO-first, static-first, fast, trustworthy, and easy to maintain.
- Premium and clean visual style, not cartoonish, not farm-style, not over-decorated.
- The founder is solo, budget-conscious, and wants practical next steps toward monetization.

Tech stack:

- Next.js App Router
- React
- TypeScript
- Tailwind CSS
- Static-first routes
- GitHub -> Vercel deployment

Workspace:

```text
C:\Users\27823\Documents\dulizhan
```

Primary production domain:

```text
https://buildmetriccalc.com
```

Temporary Vercel domain:

```text
https://buildmetric-new.vercel.app
```

Current GitHub repository:

```text
https://github.com/bcd736710-sketch/buildmetric.git
```

Main branch:

```text
main
```

## What Has Been Completed

Core site:

- Homepage.
- Tools index.
- Blog index and guide pages.
- About, Methodology, Editorial Policy, Privacy, Affiliate Disclosure, Partnerships, Contact.
- Topic hubs:
  - `/backyard-diy`
  - `/backyard-chickens`
  - `/garden-diy`
  - `/shed-planning`
  - `/home-improvement`
- SEO utility routes:
  - `/robots.txt`
  - `/sitemap.xml`
  - `/llms.txt`
  - `/feed.xml`
  - `/feed.json`
  - `/humans.txt`

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

SEO/GEO foundation:

- Canonical URLs.
- Open Graph metadata.
- Organization, WebSite, WebApplication, FAQ, Article, and related structured data where relevant.
- Sitemap now uses the formal domain after Vercel environment update.
- Internal links between topic hubs, guides, tools, and footer.
- Related guides and practical explanations on calculator pages.
- Contact flow added with the founder email:

```text
qg231024@outlook.com
```

Verification and deployment:

- New GitHub account/repo is active.
- Local repo remote points to `bcd736710-sketch/buildmetric`.
- Vercel project `buildmetric-new` imports the new GitHub repo.
- Formal domain `buildmetriccalc.com` was bought through Aliyun/HiChina.
- Aliyun DNS is configured and active:
  - `@` A record -> `216.198.79.1`
  - `www` CNAME -> `cname.vercel-dns.com`
- Vercel shows:
  - `buildmetriccalc.com` Valid Configuration
  - `buildmetric-new.vercel.app` Valid Configuration
- `https://buildmetriccalc.com` opens successfully.
- `https://buildmetriccalc.com/sitemap.xml` opens successfully and lists URLs using the formal domain.

Search console status:

- Google Search Console property for `https://buildmetriccalc.com/` is verified.
- Google sitemap `/sitemap.xml` shows success and discovered 82 pages.
- Bing Webmaster Tools site for `https://buildmetriccalc.com/` is verified.
- Bing sitemap `https://buildmetriccalc.com/sitemap.xml` shows success and discovered 82 URLs.

Latest relevant commits:

```text
cb1f4b7 Add Bing verification for custom domain
c3f3e40 Add Google verification for custom domain
de375f8 Add Google Search Console verification
7cc26f6 Prepare site for monetization
2cfbe1c Add project routes to topic hubs
```

Verification meta tags currently in `app/layout.tsx`:

Google:

```text
KZHn52r1HB9-ff1UmPuhMcJEQyhUpSCceal7icrKEDw
NVovzWT0yCiXKftowwkpMsHpUUmhZZkb9zCod4MEi-w
```

Bing:

```text
33D5684FC661A2807740B2027FAB673E
285C044377F9CFB06B672A0D6D302E6F
```

## Current State

There is no active code blocker.

The major setup phase is done:

- Domain purchased.
- DNS connected.
- Vercel production working.
- Google Search Console verified.
- Bing Webmaster verified.
- Sitemaps accepted by both Google and Bing.

The project is now moving from technical setup into:

- Waiting for search engines to crawl and index.
- Improving content quality and internal linking.
- Preparing monetization.
- Adding more high-intent calculators and guides.

Important: indexing is not instant. Google and Bing may take days or weeks to show impressions or indexed pages. Do not keep repeatedly resubmitting the same sitemap or constantly changing domains.

## Current Pending Items

Search/indexing:

- Let Google and Bing process the formal domain sitemap.
- If indexing request quota is available, request indexing only for a few priority pages:
  - `https://buildmetriccalc.com/`
  - `https://buildmetriccalc.com/tools`
  - `https://buildmetriccalc.com/blog`
  - `https://buildmetriccalc.com/tools/paint-calculator`
  - `https://buildmetriccalc.com/tools/gravel-calculator`
- Do not mass-submit dozens of URLs every day.

Product/content:

- Improve calculator UX where it helps conversion and usefulness.
- Add more content clusters around commercial-intent topics.
- Add more practical calculators before trying to monetize heavily.
- Review older docs that may still mention old domains and update them to the formal domain.

Monetization:

- Monetization has not really started yet.
- Good future options:
  - Affiliate links for DIY tools/materials.
  - Sponsored placements later.
  - Printable planning PDFs later.
  - Email capture later.
  - Ads only after traffic is meaningful.

## Next Recommended Plan

Best next session plan:

1. Update old project docs to use `https://buildmetriccalc.com` and the new GitHub repo.
2. Check `README.md`, `BING_SUBMISSION_URLS.md`, and any docs for old references:
   - `buildmetric-iota.vercel.app`
   - `buildmetric-new.vercel.app` if described as primary
   - `q7-7/buildmetric`
   - old Netlify references
3. Keep `buildmetric-new.vercel.app` only as a temporary Vercel alias, not the main production URL.
4. Run lint/build after code changes.
5. Commit and push automatically when changes are complete.
6. Then start a monetization roadmap:
   - Prioritize affiliate-ready calculator pages.
   - Add buying-intent guide pages.
   - Add clear affiliate disclosure placements where needed.
   - Build content clusters around the highest-value calculators.

Recommended first monetization-oriented content clusters:

- Paint:
  - paint calculator
  - paint coverage guide
  - primer guide
  - interior vs exterior paint guide
  - tool/material checklist
- Gravel:
  - gravel calculator
  - driveway gravel depth
  - gravel vs mulch
  - gravel types guide
- Concrete:
  - concrete slab calculator
  - slab thickness guide
  - concrete bag calculator guide
  - DIY slab checklist
- Shed:
  - shed cost calculator
  - shed foundation guide
  - permit checklist
  - material comparison

## Pitfalls: Do Not Repeat These

Do not use the old GitHub repo as the main repo.

- Old repo/account path: `q7-7/buildmetric`
- It caused access/account problems.
- Current repo is `bcd736710-sketch/buildmetric`.

Do not treat `buildmetric-iota.vercel.app` as production.

- It was an old Vercel project/domain.
- Current production is `https://buildmetriccalc.com`.

Do not treat `buildmetric-new.vercel.app` as the main brand domain.

- It is only the Vercel temporary alias.
- Use it only for fallback/debugging.
- Search console and sitemap work should now focus on `https://buildmetriccalc.com`.

Do not submit old-domain sitemaps anymore.

Avoid:

```text
https://buildmetric-iota.vercel.app/sitemap.xml
https://buildmetric-new.vercel.app/sitemap.xml
```

Use:

```text
https://buildmetriccalc.com/sitemap.xml
```

Do not panic when a browser says:

```text
This XML file does not appear to have any style information associated with it.
```

That is normal for XML sitemaps. The sitemap is fine if it lists `<url>` and `<loc>` entries.

Do not keep changing domains or canonical URLs.

- Search engines need stability.
- The formal domain is now chosen.
- Keep canonical, sitemap, GSC, Bing, and Vercel aligned to `https://buildmetriccalc.com`.

Do not repeatedly request indexing for many pages.

- Google has quota limits.
- Bing may also throttle.
- Sitemap success is more important than manual-requesting every URL.
- Submit only high-priority pages manually.

Do not assume "submitted" means "indexed."

- Google/Bing accepting the sitemap means they can discover URLs.
- Actual indexing can take days or weeks.
- No impressions in the first day is normal.

Do not use Netlify as the primary deploy target.

- Netlify free team build minutes were previously exhausted.
- Vercel is the active deployment path.

Do not add fake links or placeholder routes.

- If a link is shown, the route should exist.
- Internal links are important for SEO, but fake/dead links damage trust.

Do not overbuild accounts, payments, databases, or paid features yet.

- The site still needs organic traffic first.
- Keep the product static, fast, and simple.

Do not make calculator options meaningless.

- If an input option is visible, it should affect the result or be clearly explained.
- The user noticed when options did not change output.

Do not make the site too plain or too decorative.

- The desired style is premium, practical, clean, and useful.
- Avoid empty-looking pages.
- Avoid cartoon/farm-style visuals.

Do not forget mobile.

- Calculators must remain usable on small screens.
- Text must not overflow buttons/cards.
- Inputs, outputs, and nav should not overlap.

## Environment Notes

Use pnpm through the bundled runtime if normal `pnpm`/`npm` is unavailable:

```powershell
$env:PATH="C:\Users\27823\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;$env:PATH"; & "C:\Users\27823\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback\pnpm.cmd" run lint
```

```powershell
$env:PATH="C:\Users\27823\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin;$env:PATH"; & "C:\Users\27823\.cache\codex-runtimes\codex-primary-runtime\dependencies\bin\fallback\pnpm.cmd" run build
```

Common checks:

```powershell
git status --short --branch
git log --oneline -5
```

Commit/push flow:

```powershell
git add .
git commit -m "Update handoff for custom domain launch"
git push
```

Git push may occasionally fail with SSL/TLS handshake errors on Windows. Retry usually works.

Line-ending warnings like `LF will be replaced by CRLF` are not deployment blockers.

## User Working Style

The user prefers Chinese explanations.

The user often says things like:

- "继续下一步"
- "一次性完成多个操作"
- "推送"
- "然后呢"
- "这个怎么选"

When that happens:

- Be proactive.
- Choose the highest-leverage next step.
- Explain exact clicks for GitHub, Vercel, Aliyun, Google Search Console, and Bing Webmaster.
- For code/doc changes, implement directly, verify, commit, and push.
- Keep explanations beginner-friendly.

The user previously said future pushes do not need manual confirmation. If a change is made and verified, push it unless there is a clear reason not to.
