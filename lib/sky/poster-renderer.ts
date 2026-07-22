import path from "node:path";
import { Resvg } from "@resvg/resvg-js";
import { PDFDocument } from "pdf-lib";
import type { MomentConfig } from "@/lib/sky/moment";
import { posterStyles } from "@/lib/sky/moment";
import { skyProductConfig } from "@/lib/sky/product-config";
import type { SkyComputation, SkyStar } from "@/lib/sky/astronomy";

const { width, height, dpi } = skyProductConfig.output;

const fontFiles = [
  path.join(
    process.cwd(),
    "node_modules",
    "@fontsource",
    "cormorant-garamond",
    "files",
    "cormorant-garamond-latin-700-normal.woff",
  ),
  path.join(
    process.cwd(),
    "node_modules",
    "@fontsource",
    "inter",
    "files",
    "inter-latin-400-normal.woff",
  ),
  path.join(
    process.cwd(),
    "node_modules",
    "@fontsource",
    "inter",
    "files",
    "inter-latin-700-normal.woff",
  ),
];

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function posterX(x: number) {
  return Math.round(470 + x * 2568);
}

function posterY(y: number) {
  return Math.round(760 + y * 2568);
}

function inPoster(point: { x: number; y: number; aboveHorizon: boolean }) {
  return point.aboveHorizon && point.x >= -0.05 && point.x <= 1.05 && point.y >= -0.05 && point.y <= 1.05;
}

function starRadius(star: SkyStar) {
  return Math.max(2.4, Math.min(13, 10.8 - star.magnitude * 1.25));
}

function renderStars(stars: SkyStar[], foreground: string, accent: string) {
  return stars
    .slice(0, 1200)
    .filter(inPoster)
    .map((star) => {
      const radius = starRadius(star);
      const fill = star.major ? accent : foreground;
      const opacity = star.major ? 0.92 : Math.max(0.28, 0.78 - star.magnitude * 0.06);

      return `<circle cx="${posterX(star.x)}" cy="${posterY(star.y)}" r="${radius.toFixed(1)}" fill="${fill}" opacity="${opacity.toFixed(2)}" />`;
    })
    .join("");
}

function renderConstellationLines(sky: SkyComputation, color: string) {
  return sky.constellationLines
    .flatMap((constellation) =>
      constellation.segments.map((segment) => {
        const points = segment.filter(inPoster);
        if (points.length < 2) return "";

        const d = points
          .map((point, index) => `${index === 0 ? "M" : "L"} ${posterX(point.x)} ${posterY(point.y)}`)
          .join(" ");

        return `<path d="${d}" fill="none" stroke="${color}" stroke-width="2.2" opacity="0.22" stroke-linecap="round" />`;
      }),
    )
    .join("");
}

function renderLabels(sky: SkyComputation, color: string) {
  return sky.constellationLabels
    .filter((label) => label.rank <= 2 && inPoster(label))
    .slice(0, 18)
    .map(
      (label) =>
        `<text x="${posterX(label.x)}" y="${posterY(label.y)}" font-family="Inter" font-size="30" fill="${color}" opacity="0.28" text-anchor="middle">${escapeXml(label.name)}</text>`,
    )
    .join("");
}

function renderMajorStarLabels(stars: SkyStar[], color: string) {
  return stars
    .filter((star) => star.major && inPoster(star) && star.magnitude <= 1.8)
    .slice(0, 12)
    .map(
      (star) =>
        `<text x="${posterX(star.x) + 22}" y="${posterY(star.y) - 18}" font-family="Inter" font-size="28" fill="${color}" opacity="0.46">${escapeXml(star.name)}</text>`,
    )
    .join("");
}

function renderBodies(sky: SkyComputation, accent: string, foreground: string) {
  return sky.bodies
    .filter((body) => body.body !== "Sun" && inPoster(body))
    .map((body) => {
      const radius = body.body === "Moon" ? 48 : 18;
      const fill = body.body === "Moon" ? accent : foreground;
      const labelOpacity = body.body === "Moon" ? 0.72 : 0.46;

      return `<g>
        <circle cx="${posterX(body.x)}" cy="${posterY(body.y)}" r="${radius}" fill="${fill}" opacity="0.9" />
        <text x="${posterX(body.x) + radius + 20}" y="${posterY(body.y) + 10}" font-family="Inter" font-size="30" fill="${foreground}" opacity="${labelOpacity}">${body.body}</text>
      </g>`;
    })
    .join("");
}

function renderMilkyWay(sky: SkyComputation, color: string) {
  return sky.milkyWay.polygons
    .map((polygon) => {
      const points = polygon.filter(inPoster);
      if (points.length < 3) return "";

      return `<polygon points="${points
        .map((point) => `${posterX(point.x)},${posterY(point.y)}`)
        .join(" ")}" fill="${color}" opacity="0.055" />`;
    })
    .join("");
}

export function createPosterSvg(config: MomentConfig, sky: SkyComputation) {
  const style = posterStyles[config.style];
  const isVintage = config.style === "vintage-observatory";
  const skyCircleStroke = isVintage ? style.foreground : style.accent;
  const coordinateText = `${config.latitude.toFixed(4)}, ${config.longitude.toFixed(4)} - ${config.timezone}`;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="${width}" height="${height}" fill="${style.background}" />
  <rect width="${width}" height="${height}" fill="${style.paperTexture}" />
  <circle cx="${width / 2}" cy="2044" r="1290" fill="${style.skyGlow}" opacity="0.78" />
  <circle cx="${width / 2}" cy="2044" r="1290" fill="none" stroke="${skyCircleStroke}" stroke-width="5" opacity="0.68" />
  <circle cx="${width / 2}" cy="2044" r="960" fill="none" stroke="${style.foreground}" stroke-width="2" opacity="0.16" />
  <circle cx="${width / 2}" cy="2044" r="620" fill="none" stroke="${style.foreground}" stroke-width="2" opacity="0.12" />
  <path d="M ${width / 2 - 1290} 2044 H ${width / 2 + 1290} M ${width / 2} 754 V 3334" stroke="${style.foreground}" stroke-width="1.6" opacity="0.1" />
  ${renderMilkyWay(sky, style.secondaryAccent)}
  ${renderConstellationLines(sky, style.foreground)}
  ${renderStars(sky.stars, style.foreground, style.accent)}
  ${renderBodies(sky, style.accent, style.foreground)}
  ${renderLabels(sky, style.foreground)}
  ${renderMajorStarLabels(sky.majorStars, style.foreground)}
  <text x="${width / 2}" y="3820" text-anchor="middle" font-family="Cormorant Garamond" font-size="132" font-weight="700" fill="${style.foreground}" letter-spacing="4">${escapeXml(config.title)}</text>
  <text x="${width / 2}" y="3970" text-anchor="middle" font-family="Inter" font-size="42" fill="${style.foreground}" opacity="0.76">${escapeXml(config.placeName)}, ${escapeXml(config.country)}</text>
  <text x="${width / 2}" y="4062" text-anchor="middle" font-family="Inter" font-size="34" fill="${style.foreground}" opacity="0.58">${escapeXml(config.localDate)} - ${escapeXml(config.localTime)} local - ${escapeXml(coordinateText)}</text>
  <text x="${width / 2}" y="4176" text-anchor="middle" font-family="Inter" font-size="32" fill="${style.foreground}" opacity="0.48">Moon phase ${sky.moonPhaseDegrees} degrees - ${sky.catalog.renderedStarCount} stars in the horizon arrangement</text>
  <text x="${width / 2}" y="4348" text-anchor="middle" font-family="Cormorant Garamond" font-size="58" fill="${style.accent}">${escapeXml(config.message)}</text>
  <text x="${width / 2}" y="4548" text-anchor="middle" font-family="Inter" font-size="26" fill="${style.foreground}" opacity="0.38">${escapeXml(sky.visibility.statement)}</text>
  <text x="${width / 2}" y="4705" text-anchor="middle" font-family="Inter" font-size="34" fill="${style.foreground}" opacity="0.52">THE SKY REMEMBERS</text>
</svg>`;
}

export function renderPosterPng(svg: string) {
  const renderer = new Resvg(svg, {
    dpi,
    font: {
      loadSystemFonts: false,
      fontFiles,
      serifFamily: "Cormorant Garamond",
      sansSerifFamily: "Inter",
      defaultFontFamily: "Inter",
    },
    fitTo: {
      mode: "width",
      value: width,
    },
  });

  return renderer.render().asPng();
}

export async function renderPosterPdf(pngBytes: Uint8Array) {
  const pdf = await PDFDocument.create();
  const page = pdf.addPage([841.89, 1190.55]);
  const image = await pdf.embedPng(pngBytes);
  page.drawImage(image, {
    x: 0,
    y: 0,
    width: 841.89,
    height: 1190.55,
  });

  return pdf.save();
}
