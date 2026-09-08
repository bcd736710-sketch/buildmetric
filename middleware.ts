import { NextRequest, NextResponse } from "next/server";

const retiredExactPaths = new Set([
  "/backyard-chickens",
  "/tools/chicken-coop-size-calculator",
  "/tools/chicken-run-size-calculator",
  "/tools/chicken-feed-calculator",
  "/tools/paint-calculator",
  "/tools/gravel-calculator",
  "/tools/concrete-slab-calculator",
  "/tools/fence-cost-calculator",
  "/tools/mulch-calculator",
  "/tools/shed-cost-calculator",
  "/tools/raised-garden-bed-soil-calculator",
  "/product/5x6-chicken-coop-plans",
  "/blog/chicken-coop-materials-list",
  "/blog/chicken-coop-cleaning-schedule",
  "/blog/best-chicken-coop-bedding",
  "/blog/chicken-coop-door-size-guide",
  "/blog/predator-proof-chicken-run-guide",
  "/blog/how-much-space-does-a-chicken-need",
  "/blog/how-big-should-a-chicken-coop-be",
  "/blog/chicken-coop-ventilation-guide",
  "/blog/how-much-chicken-feed-per-day",
  "/blog/chicken-coop-layout-ideas-for-small-backyards",
  "/blog/chicken-run-flooring-ideas",
  "/blog/how-much-does-it-cost-to-build-a-chicken-coop",
  "/blog/walk-in-chicken-coop-size-guide",
  "/blog/chicken-coop-nesting-box-guide",
  "/blog/chicken-coop-insulation-guide",
  "/blog/chicken-coop-roost-bar-height-guide",
  "/blog/chicken-coop-nesting-box-size-guide",
]);

const retiredToolPath = /^\/tools\/(?:chicken|coop|poultry|.*calculator)/;
const legacyVercelHosts = new Set([
  "buildmetric-new.vercel.app",
  "buildmetric-iota.vercel.app",
]);

export function middleware(request: NextRequest) {
  const host = request.nextUrl.hostname.toLowerCase();
  if (legacyVercelHosts.has(host)) {
    const destination = request.nextUrl.clone();
    destination.protocol = "https:";
    destination.hostname = "buildmetriccalc.com";
    return NextResponse.redirect(destination, 308);
  }

  if (retiredExactPaths.has(request.nextUrl.pathname) || retiredToolPath.test(request.nextUrl.pathname)) {
    return new NextResponse("Gone", {
      status: 410,
      headers: {
        "Cache-Control": "public, max-age=0, s-maxage=86400",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
