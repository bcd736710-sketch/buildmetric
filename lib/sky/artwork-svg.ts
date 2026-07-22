import type { ProjectedPoint } from "@/lib/sky/astronomy";
import type { ArtworkScene, ArtworkStar } from "@/lib/sky/artwork-scene";

const serifFont = "'Cormorant Garamond', Georgia, 'Times New Roman', serif";
const sansFont = "'Inter', Arial, Helvetica, sans-serif";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function posterX(scene: ArtworkScene, x: number) {
  return Math.round(scene.composition.sky.cx - scene.composition.sky.r + x * scene.composition.sky.r * 2);
}

function posterY(scene: ArtworkScene, y: number) {
  return Math.round(scene.composition.sky.cy - scene.composition.sky.r + y * scene.composition.sky.r * 2);
}

function inSky(point: ProjectedPoint) {
  return point.aboveHorizon && point.x >= -0.05 && point.x <= 1.05 && point.y >= -0.05 && point.y <= 1.05;
}

function textLines(value: string, maxLength: number) {
  const words = value.trim().split(/\s+/);
  const lines: string[] = [];
  let current = "";

  words.forEach((word) => {
    const next = current ? `${current} ${word}` : word;
    if (next.length > maxLength && current) {
      lines.push(current);
      current = word;
    } else {
      current = next;
    }
  });

  if (current) lines.push(current);
  return lines.slice(0, 2);
}

function renderTexture(scene: ArtworkScene) {
  const { width, height } = scene.composition;
  const vintage = scene.style.id === "vintage-observatory";

  if (vintage) {
    return `
      <filter id="paper-grain" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="0.012" numOctaves="4" seed="23" />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer>
          <feFuncA type="table" tableValues="0 0.18" />
        </feComponentTransfer>
      </filter>
      <rect width="${width}" height="${height}" filter="url(#paper-grain)" opacity="${scene.style.paperOpacity}" />
      <path d="M 334 346 C 906 268, 2452 268, 3174 356" fill="none" stroke="${scene.style.foreground}" stroke-width="2" opacity="0.08" />
      <path d="M 334 4579 C 906 4660, 2452 4660, 3174 4572" fill="none" stroke="${scene.style.foreground}" stroke-width="2" opacity="0.08" />
    `;
  }

  return `
    <filter id="fine-grain" x="0" y="0" width="100%" height="100%">
      <feTurbulence type="fractalNoise" baseFrequency="0.018" numOctaves="3" seed="17" />
      <feComponentTransfer>
        <feFuncA type="table" tableValues="0 0.08" />
      </feComponentTransfer>
    </filter>
    <rect width="${width}" height="${height}" filter="url(#fine-grain)" opacity="${scene.style.paperOpacity}" />
  `;
}

function renderBackground(scene: ArtworkScene) {
  const { width, height, sky } = scene.composition;
  const dream = scene.style.id === "celestial-dream";
  const vintage = scene.style.id === "vintage-observatory";
  const gold = scene.style.id === "midnight-gold";

  const gradients = vintage
    ? `
      <radialGradient id="sky-ground" cx="50%" cy="36%" r="58%">
        <stop offset="0%" stop-color="#f3e7ca" />
        <stop offset="64%" stop-color="#decaa3" />
        <stop offset="100%" stop-color="#bda37a" />
      </radialGradient>
    `
    : dream
      ? `
      <radialGradient id="sky-ground" cx="50%" cy="35%" r="62%">
        <stop offset="0%" stop-color="#18245d" />
        <stop offset="46%" stop-color="#101742" />
        <stop offset="100%" stop-color="#060717" />
      </radialGradient>
      <radialGradient id="haze" cx="38%" cy="28%" r="62%">
        <stop offset="0%" stop-color="#8d84c9" stop-opacity="0.28" />
        <stop offset="58%" stop-color="#614f93" stop-opacity="0.08" />
        <stop offset="100%" stop-color="#614f93" stop-opacity="0" />
      </radialGradient>
    `
      : `
      <radialGradient id="sky-ground" cx="50%" cy="35%" r="60%">
        <stop offset="0%" stop-color="#10121d" />
        <stop offset="62%" stop-color="#050711" />
        <stop offset="100%" stop-color="#010208" />
      </radialGradient>
      <radialGradient id="haze" cx="50%" cy="30%" r="56%">
        <stop offset="0%" stop-color="#d5ad61" stop-opacity="0.16" />
        <stop offset="100%" stop-color="#d5ad61" stop-opacity="0" />
      </radialGradient>
    `;

  return `
    <defs>
      ${gradients}
      <clipPath id="sky-disc">
        <circle cx="${sky.cx}" cy="${sky.cy}" r="${sky.r}" />
      </clipPath>
    </defs>
    <rect width="${width}" height="${height}" fill="${scene.style.background}" />
    ${renderTexture(scene)}
    <circle cx="${sky.cx}" cy="${sky.cy}" r="${sky.r}" fill="url(#sky-ground)" />
    ${!vintage ? `<circle cx="${sky.cx}" cy="${sky.cy}" r="${sky.r}" fill="url(#haze)" opacity="${gold ? 0.88 : 1}" />` : ""}
    <circle cx="${sky.cx}" cy="${sky.cy}" r="${sky.r + 18}" fill="none" stroke="${scene.style.accent}" stroke-width="${vintage ? 4 : 5}" opacity="${scene.style.frameOpacity}" />
    <circle cx="${sky.cx}" cy="${sky.cy}" r="${sky.r - 300}" fill="none" stroke="${scene.style.foreground}" stroke-width="${vintage ? 1.8 : 1.4}" opacity="${vintage ? 0.18 : 0.08}" />
    <circle cx="${sky.cx}" cy="${sky.cy}" r="${sky.r - 660}" fill="none" stroke="${scene.style.foreground}" stroke-width="${vintage ? 1.6 : 1.2}" opacity="${vintage ? 0.12 : 0.06}" />
    <path d="M ${sky.cx - sky.r} ${sky.cy} H ${sky.cx + sky.r} M ${sky.cx} ${sky.cy - sky.r} V ${sky.cy + sky.r}" stroke="${scene.style.foreground}" stroke-width="${vintage ? 1.4 : 1}" opacity="${vintage ? 0.11 : 0.055}" />
  `;
}

function renderMilkyWay(scene: ArtworkScene) {
  return scene.skyData.milkyWay.polygons
    .map((polygon) => {
      const points = polygon.filter(inSky);
      if (points.length < 3) return "";
      return `<polygon points="${points
        .map((point) => `${posterX(scene, point.x)},${posterY(scene, point.y)}`)
        .join(" ")}" fill="${scene.style.secondaryAccent}" opacity="${scene.style.milkyWayOpacity}" />`;
    })
    .join("");
}

function renderConstellationLines(scene: ArtworkScene) {
  return scene.skyData.constellationLines
    .flatMap((constellation) =>
      constellation.segments.map((segment) => {
        const points = segment.filter(inSky);
        if (points.length < 2) return "";
        const d = points
          .map((point, index) => `${index === 0 ? "M" : "L"} ${posterX(scene, point.x)} ${posterY(scene, point.y)}`)
          .join(" ");
        return `<path d="${d}" fill="none" stroke="${scene.style.foreground}" stroke-width="${scene.style.id === "vintage-observatory" ? 1.75 : 1.25}" opacity="${scene.style.constellationOpacity}" stroke-linecap="round" />`;
      }),
    )
    .join("");
}

function renderStar(scene: ArtworkScene, star: ArtworkStar) {
  const x = posterX(scene, star.x);
  const y = posterY(scene, star.y);
  const fill = star.tier === "brightest" ? scene.style.accent : scene.style.foreground;
  const vintage = scene.style.id === "vintage-observatory";
  const halo =
    star.glowOpacity > 0
      ? `<circle cx="${x}" cy="${y}" r="${(star.radius * 3.6).toFixed(1)}" fill="${scene.style.starHalo}" opacity="${star.glowOpacity}" />`
      : "";

  if (vintage && star.tier === "brightest") {
    return `${halo}<path d="M ${x - star.radius * 1.8} ${y} H ${x + star.radius * 1.8} M ${x} ${y - star.radius * 1.8} V ${y + star.radius * 1.8}" stroke="${fill}" stroke-width="1.35" opacity="${star.opacity}" /><circle cx="${x}" cy="${y}" r="${star.radius.toFixed(1)}" fill="none" stroke="${fill}" stroke-width="1.4" opacity="${star.opacity}" />`;
  }

  return `${halo}<circle cx="${x}" cy="${y}" r="${star.radius.toFixed(1)}" fill="${fill}" opacity="${star.opacity}" />`;
}

function renderStars(scene: ArtworkScene) {
  const faint = scene.stars.filter((star) => star.tier === "faint").map((star) => renderStar(scene, star)).join("");
  const medium = scene.stars.filter((star) => star.tier === "medium").map((star) => renderStar(scene, star)).join("");
  const bright = scene.stars.filter((star) => star.tier === "brightest").map((star) => renderStar(scene, star)).join("");
  return faint + medium + bright;
}

function moonPath(scene: ArtworkScene, x: number, y: number, radius: number) {
  const phase = scene.skyData.moonPhaseDegrees;
  const illum = scene.skyData.moonIllumination;
  const waxing = phase < 180;
  const crescent = illum < 0.5;
  const offset = radius * (1 - illum * 2);
  const sweep = waxing ? 1 : 0;
  const paperMoon = scene.style.id === "vintage-observatory";

  if (illum > 0.96) {
    return `<circle cx="${x}" cy="${y}" r="${radius}" fill="${scene.style.accent}" opacity="${paperMoon ? 0.64 : 0.92}" />`;
  }

  if (illum < 0.04) {
    return `<circle cx="${x}" cy="${y}" r="${radius}" fill="none" stroke="${scene.style.accent}" stroke-width="${paperMoon ? 3 : 4}" opacity="0.76" />`;
  }

  return `
    <circle cx="${x}" cy="${y}" r="${radius}" fill="${scene.style.accent}" opacity="${paperMoon ? 0.5 : 0.9}" />
    <path d="M ${x} ${y - radius}
      A ${Math.abs(offset).toFixed(2)} ${radius} 0 0 ${crescent ? 0 : 1} ${x} ${y + radius}
      A ${radius} ${radius} 0 0 ${sweep} ${x} ${y - radius}"
      fill="${scene.style.deepTone}" opacity="${paperMoon ? 0.92 : 0.96}" />
  `;
}

function renderBodies(scene: ArtworkScene) {
  return scene.bodies
    .map((body) => {
      const x = posterX(scene, body.x);
      const y = posterY(scene, body.y);
      if (body.display === "featured-moon") {
        return `<g>
          <circle cx="${x}" cy="${y}" r="${body.radius * 2.7}" fill="${scene.style.starHalo}" opacity="${scene.style.id === "vintage-observatory" ? 0.12 : 0.2}" />
          ${moonPath(scene, x, y, body.radius)}
          <text x="${x + body.radius + 24}" y="${y + 10}" font-family="${sansFont}" font-size="27" fill="${scene.style.foreground}" opacity="${scene.style.id === "vintage-observatory" ? 0.42 : 0.5}">Moon</text>
        </g>`;
      }

      if (body.display === "featured-planet") {
        return `<g opacity="0.72">
          <circle cx="${x}" cy="${y}" r="${body.radius}" fill="${scene.style.foreground}" />
          <circle cx="${x}" cy="${y}" r="${body.radius * 2.5}" fill="none" stroke="${scene.style.foreground}" stroke-width="1" opacity="0.16" />
          <text x="${x + 24}" y="${y + 9}" font-family="${sansFont}" font-size="23" fill="${scene.style.foreground}" opacity="0.32">${escapeXml(body.label)}</text>
        </g>`;
      }

      return `<circle cx="${x}" cy="${y}" r="${body.radius}" fill="${scene.style.foreground}" opacity="0.34" />`;
    })
    .join("");
}

function renderLabels(scene: ArtworkScene) {
  return scene.labels
    .map(
      (label) =>
        `<text x="${posterX(scene, label.x)}" y="${posterY(scene, label.y)}" font-family="${sansFont}" font-size="${scene.style.id === "vintage-observatory" ? 25 : 22}" fill="${scene.style.foreground}" opacity="${scene.style.labelOpacity}" text-anchor="middle" letter-spacing="3">${escapeXml(label.id)}</text>`,
    )
    .join("");
}

function renderMajorStarLabels(scene: ArtworkScene) {
  return scene.stars
    .filter((star) => star.tier === "brightest" && star.magnitude <= 1.2)
    .slice(0, scene.style.id === "vintage-observatory" ? 10 : 5)
    .map(
      (star) =>
        `<text x="${posterX(scene, star.x) + 24}" y="${posterY(scene, star.y) - 18}" font-family="${sansFont}" font-size="22" fill="${scene.style.foreground}" opacity="${scene.style.id === "vintage-observatory" ? 0.32 : 0.24}">${escapeXml(star.name)}</text>`,
    )
    .join("");
}

function renderInfo(scene: ArtworkScene) {
  const { width, text } = scene.composition;
  const titleLines = textLines(scene.config.title, 29);
  const messageLines = textLines(scene.config.message, 54);
  const titleSize = titleLines.length > 1 ? 105 : 128;
  const messageSize = messageLines.length > 1 ? 44 : 50;

  return `
    ${titleLines
      .map(
        (line, index) =>
          `<text x="${width / 2}" y="${text.titleY + index * 112}" text-anchor="middle" font-family="${serifFont}" font-size="${titleSize}" font-weight="700" fill="${scene.style.foreground}" letter-spacing="2">${escapeXml(line)}</text>`,
      )
      .join("")}
    ${messageLines
      .map(
        (line, index) =>
          `<text x="${width / 2}" y="${text.messageY + index * 58}" text-anchor="middle" font-family="${serifFont}" font-size="${messageSize}" fill="${scene.style.textAccent}" opacity="0.94">${escapeXml(line)}</text>`,
      )
      .join("")}
    <text x="${width / 2}" y="${text.momentY}" text-anchor="middle" font-family="${sansFont}" font-size="35" fill="${scene.style.foreground}" opacity="0.68" letter-spacing="2">${escapeXml(scene.momentLine)}</text>
    <text x="${width / 2}" y="${text.detailsY}" text-anchor="middle" font-family="${sansFont}" font-size="27" fill="${scene.style.foreground}" opacity="0.42">${escapeXml(scene.coordinateLine)} · ${escapeXml(scene.moonLabel)}</text>
    <line x1="${width / 2 - 410}" x2="${width / 2 + 410}" y1="4390" y2="4390" stroke="${scene.style.accent}" stroke-width="2" opacity="0.32" />
    <text x="${width / 2}" y="${text.brandY}" text-anchor="middle" font-family="${sansFont}" font-size="30" fill="${scene.style.foreground}" opacity="0.45" letter-spacing="8">THE SKY REMEMBERS</text>
  `;
}

export function createArtworkSvg(scene: ArtworkScene) {
  const { width, height, sky } = scene.composition;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  ${renderBackground(scene)}
  <g clip-path="url(#sky-disc)">
    ${renderMilkyWay(scene)}
    ${renderConstellationLines(scene)}
    ${renderStars(scene)}
    ${renderBodies(scene)}
    ${renderLabels(scene)}
    ${renderMajorStarLabels(scene)}
    <circle cx="${sky.cx}" cy="${sky.cy}" r="${sky.r - 3}" fill="none" stroke="${scene.style.foreground}" stroke-width="1" opacity="${scene.style.id === "vintage-observatory" ? 0.18 : 0.08}" />
  </g>
  ${renderInfo(scene)}
</svg>`;
}
