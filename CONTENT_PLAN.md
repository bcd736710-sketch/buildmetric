# BuildMetric Content Plan

BuildMetric is currently focused on SEO-driven DIY calculators and supporting guides for English-speaking homeowners.

## Current Site Inventory

- Tools: 5
- Articles: 15
- Primary categories: Backyard Chickens, Garden DIY, Backyard DIY
- Deployment: Netlify
- Search setup: Bing Webmaster Tools, sitemap submitted

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

Next ideas:

- Chicken Coop Materials List
- Chicken Coop Cleaning Schedule
- Best Chicken Coop Bedding
- Walk-In Chicken Coop Size Guide
- Predator Proof Chicken Run Guide

### Garden DIY

Primary tool:

- Raised Garden Bed Soil Calculator

Published guides:

- How Much Soil Do I Need for a Raised Garden Bed?
- Raised Garden Bed Depth Guide
- Best Soil Mix for Raised Garden Beds
- How Many Bags of Soil for a 4x8 Raised Bed?

Next ideas:

- Raised Garden Bed Size Guide
- Raised Garden Bed Cost Guide
- 4x8 Raised Garden Bed Layout
- Raised Garden Bed Drainage Guide
- Compost for Raised Garden Beds

### Backyard DIY

Primary tool:

- Shed Cost Calculator

Published guides:

- How Much Does It Cost to Build a Shed?
- DIY Shed Materials List
- 10x12 Shed Cost Guide
- Shed Foundation Cost Guide

Next ideas:

- DIY Shed Permit Basics
- Shed Roofing Cost Guide
- 8x10 Shed Cost Guide
- Shed Door Size Guide
- Backyard Storage Shed Planning Checklist

## Publishing Checklist

For every new article:

- Add the post to `lib/blog.ts`
- Create a static article route under `app/blog/[slug]/page.tsx`
- Add clear internal links to related tools and guides
- Confirm the article appears on `/blog`
- Confirm the article appears in `/sitemap.xml`
- Run `pnpm run lint`
- Run `pnpm run build`
- Deploy through Netlify
- Resubmit `https://buildmetric.netlify.app/sitemap.xml` in Bing Webmaster Tools
- Request indexing for high-priority URLs when quota is available

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

## Near-Term Focus

Do not add payments, accounts, databases, comments, or a CMS yet.

The next useful phase is to monitor Bing indexing for a few days, then add another focused batch of 5 guides only after the current pages are stable.
