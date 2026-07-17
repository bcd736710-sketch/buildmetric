# BuildMetric Content Plan

BuildMetric is currently focused on SEO-driven DIY calculators and supporting guides for English-speaking homeowners.

## Current Site Inventory

- Tools: 10
- Articles: 25
- Primary categories: Backyard Chickens, Garden DIY, Backyard DIY, Shed Planning, Home Improvement
- Production domain: https://buildmetriccalc.com
- Deployment: Vercel via GitHub
- Search setup: Google Search Console and Bing Webmaster Tools verified; sitemap submitted and accepted

## Content Clusters

### Backyard Chickens

Primary tools:

- Chicken Coop Size Calculator
- Chicken Run Size Calculator
- Chicken Feed Calculator

Published guides:

- How Much Space Does a Chicken Need?
- How Big Should a Chicken Coop Be?
- Chicken Coop Ventilation Guide
- How Much Chicken Feed Per Day?
- Chicken Coop Layout Ideas for Small Backyards
- Chicken Run Flooring Ideas
- How Much Does It Cost to Build a Chicken Coop?
- Chicken Coop Materials List
- Chicken Coop Cleaning Schedule
- Best Chicken Coop Bedding
- Chicken Coop Door Size Guide
- Predator Proof Chicken Run Guide

Next ideas:

- Walk-In Chicken Coop Size Guide
- Chicken Coop Nesting Box Guide
- Chicken Coop Insulation Guide
- Chicken Coop Roost Bar Height Guide
- Chicken Coop Nesting Box Size Guide

### Garden DIY

Primary tool:

- Raised Garden Bed Soil Calculator

Published guides:

- How Much Soil Do I Need for a Raised Garden Bed?
- Raised Garden Bed Depth Guide
- Best Soil Mix for Raised Garden Beds
- How Many Bags of Soil for a 4x8 Raised Bed?
- Raised Garden Bed Size Guide
- Raised Garden Bed Cost Guide

Next ideas:

- 4x8 Raised Garden Bed Layout
- Raised Garden Bed Drainage Guide
- Compost for Raised Garden Beds
- Raised Garden Bed Irrigation Basics
- Raised Garden Bed Watering Guide

### Backyard DIY

Primary tool:

- Shed Cost Calculator
- Mulch Calculator
- Gravel Calculator
- Fence Cost Calculator
- Concrete Slab Calculator
- Paint Calculator

Published guides:

- How Much Does It Cost to Build a Shed?
- DIY Shed Materials List
- 10x12 Shed Cost Guide
- Shed Foundation Cost Guide
- DIY Shed Permit Basics
- Shed Roofing Cost Guide
- 8x10 Shed Cost Guide

Next ideas:

- Shed Door Size Guide
- Backyard Storage Shed Planning Checklist
- Shed Ramp Planning Guide
- Shed Ventilation Guide
- Shed Flooring Options Guide

## Publishing Checklist

For every new article:

- Add the post to `lib/blog.ts`
- Create a static article route under `app/blog/[slug]/page.tsx`
- Add clear internal links to related tools and guides
- Confirm the article appears on `/blog`
- Confirm the article appears in `/sitemap.xml`
- Run `pnpm run lint`
- Run `pnpm run build`
- Deploy through Vercel from the GitHub `main` branch
- Confirm `https://buildmetriccalc.com/sitemap.xml` includes the new URL
- Request indexing only for high-priority URLs when quota is available

## Indexing Tracker

Use this table manually after deployment.

| URL | Cluster | Priority | Index requested | Indexed | Notes |
| --- | --- | --- | --- | --- | --- |
| `/` | Site | High | Yes | Pending | Homepage |
| `/tools` | Site | High | Yes | Pending | Tool directory |
| `/blog` | Site | High | Yes | Pending | Guide directory |
| `/tools/chicken-coop-size-calculator` | Backyard Chickens | High | Yes | Pending | Core tool |
| `/tools/chicken-run-size-calculator` | Backyard Chickens | High | Yes | Pending | Core tool |
| `/tools/chicken-feed-calculator` | Backyard Chickens | High | Yes | Pending | Core tool |
| `/tools/raised-garden-bed-soil-calculator` | Garden DIY | High | Yes | Pending | Core tool |
| `/tools/shed-cost-calculator` | Backyard DIY | High | Yes | Pending | Core tool |
| `/blog/diy-shed-materials-list` | Backyard DIY | High | No | Pending | Commercial intent |
| `/blog/10x12-shed-cost-guide` | Backyard DIY | High | No | Pending | Commercial intent |
| `/blog/how-many-bags-of-soil-for-a-4x8-raised-bed` | Garden DIY | High | No | Pending | Calculator intent |
| `/blog/chicken-coop-materials-list` | Backyard Chickens | High | No | Pending | Commercial intent |
| `/blog/chicken-coop-cleaning-schedule` | Backyard Chickens | Medium | No | Pending | Maintenance intent |
| `/blog/best-chicken-coop-bedding` | Backyard Chickens | High | No | Pending | Affiliate potential |
| `/blog/raised-garden-bed-size-guide` | Garden DIY | Medium | No | Pending | Planning intent |
| `/blog/diy-shed-permit-basics` | Backyard DIY | Medium | No | Pending | Planning intent |
| `/blog/shed-roofing-cost-guide` | Backyard DIY | High | No | Pending | Commercial intent |
| `/blog/8x10-shed-cost-guide` | Backyard DIY | High | No | Pending | Commercial intent |
| `/blog/raised-garden-bed-cost-guide` | Garden DIY | High | No | Pending | Commercial intent |
| `/blog/chicken-coop-door-size-guide` | Backyard Chickens | Medium | No | Pending | Planning intent |
| `/blog/predator-proof-chicken-run-guide` | Backyard Chickens | High | No | Pending | Safety intent |

## Near-Term Focus

Do not add payments, accounts, databases, comments, or a CMS yet.

The next useful phase is to monitor Google and Bing indexing, improve pages that get impressions, and add tightly related commercial-intent guides around the strongest calculators.
