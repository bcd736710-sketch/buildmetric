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
        <feTurbulence type="fractalNoise" baseFrequency="0.016" numOctaves="5" seed="23" />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer>
          <feFuncA type="table" tableValues="0 0.24" />
        </feComponentTransfer>
      </filter>
      <rect width="${width}" height="${height}" filter="url(#paper-grain)" opacity="${scene.style.paperOpacity}" />
      <path d="M 334 346 C 906 268, 2452 268, 3174 356" fill="none" stroke="${scene.style.foreground}" stroke-width="2" opacity="0.1" />
      <path d="M 334 4579 C 906 4660, 2452 4660, 3174 4572" fill="none" stroke="${scene.style.foreground}" stroke-width="2" opacity="0.1" />
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

function renderVintageTicks(scene: ArtworkScene) {
  if (scene.style.id !== "vintage-observatory") return "";

  const { sky } = scene.composition;
  const ticks = Array.from({ length: 72 }, (_, index) => {
    const angle = (index / 72) * Math.PI * 2 - Math.PI / 2;
    const major = index % 6 === 0;
    const medium = index % 3 === 0;
    const outer = sky.r + (major ? 44 : 34);
    const inner = sky.r + (major ? 16 : medium ? 22 : 27);
    const x1 = sky.cx + Math.cos(angle) * inner;
    const y1 = sky.cy + Math.sin(angle) * inner;
    const x2 = sky.cx + Math.cos(angle) * outer;
    const y2 = sky.cy + Math.sin(angle) * outer;
    return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${scene.style.accent}" stroke-width="${major ? 2.2 : medium ? 1.4 : 0.8}" opacity="${major ? 0.52 : medium ? 0.34 : 0.22}" />`;
  }).join("");

  return `
    <g>
      <circle cx="${sky.cx}" cy="${sky.cy}" r="${sky.r + 50}" fill="none" stroke="${scene.style.accent}" stroke-width="2.2" opacity="0.48" />
      <circle cx="${sky.cx}" cy="${sky.cy}" r="${sky.r + 75}" fill="none" stroke="${scene.style.foreground}" stroke-width="1.1" opacity="0.2" />
      ${ticks}
      <path d="M ${sky.cx - sky.r - 110} ${sky.cy} H ${sky.cx + sky.r + 110} M ${sky.cx} ${sky.cy - sky.r - 110} V ${sky.cy + sky.r + 110}" stroke="${scene.style.foreground}" stroke-width="1" opacity="0.09" stroke-dasharray="10 20" />
    </g>
  `;
}

function renderFrame(scene: ArtworkScene) {
  const { sky } = scene.composition;

  if (scene.style.id === "vintage-observatory") {
    return `
      ${renderVintageTicks(scene)}
      <circle cx="${sky.cx}" cy="${sky.cy}" r="${sky.r + 18}" fill="none" stroke="${scene.style.accent}" stroke-width="3.2" opacity="${scene.style.frameOpacity}" />
      <circle cx="${sky.cx}" cy="${sky.cy}" r="${sky.r - 6}" fill="none" stroke="${scene.style.foreground}" stroke-width="1.4" opacity="0.25" />
    `;
  }

  if (scene.style.id === "celestial-dream") {
    return `
      <circle cx="${sky.cx}" cy="${sky.cy}" r="${sky.r + 24}" fill="none" stroke="${scene.style.accent}" stroke-width="3" opacity="${scene.style.frameOpacity}" />
      <circle cx="${sky.cx}" cy="${sky.cy}" r="${sky.r + 62}" fill="none" stroke="${scene.style.secondaryAccent}" stroke-width="18" opacity="0.035" />
    `;
  }

  return `
    <circle cx="${sky.cx}" cy="${sky.cy}" r="${sky.r + 22}" fill="none" stroke="#e6c887" stroke-width="2.4" opacity="0.62" />
    <circle cx="${sky.cx}" cy="${sky.cy}" r="${sky.r + 38}" fill="none" stroke="#8f6a32" stroke-width="1" opacity="0.28" />
    <circle cx="${sky.cx}" cy="${sky.cy}" r="${sky.r - 4}" fill="none" stroke="#f0dcad" stroke-width="0.8" opacity="0.16" />
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
        <stop offset="0%" stop-color="#f0dfbd" />
        <stop offset="58%" stop-color="#d7bd88" />
        <stop offset="100%" stop-color="#ad8a56" />
      </radialGradient>
    `
    : dream
      ? `
      <radialGradient id="sky-ground" cx="50%" cy="35%" r="62%">
        <stop offset="0%" stop-color="#1b2a66" />
        <stop offset="46%" stop-color="#111947" />
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
        <stop offset="0%" stop-color="#171723" />
        <stop offset="58%" stop-color="#070913" />
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
      <filter id="milky-soft" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="${vintage ? 18 : dream ? 42 : 36}" />
      </filter>
      <filter id="milky-wide" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="${vintage ? 34 : dream ? 72 : 64}" />
      </filter>
    </defs>
    <rect width="${width}" height="${height}" fill="${scene.style.background}" />
    ${renderTexture(scene)}
    <circle cx="${sky.cx}" cy="${sky.cy}" r="${sky.r}" fill="url(#sky-ground)" />
    ${!vintage ? `<circle cx="${sky.cx}" cy="${sky.cy}" r="${sky.r}" fill="url(#haze)" opacity="${gold ? 0.88 : 1}" />` : ""}
    ${renderFrame(scene)}
    <circle cx="${sky.cx}" cy="${sky.cy}" r="${sky.r - 300}" fill="none" stroke="${scene.style.foreground}" stroke-width="${vintage ? 1.6 : 1.25}" opacity="${vintage ? 0.2 : dream ? 0.055 : 0.075}" />
    <circle cx="${sky.cx}" cy="${sky.cy}" r="${sky.r - 660}" fill="none" stroke="${scene.style.foreground}" stroke-width="${vintage ? 1.2 : 1}" opacity="${vintage ? 0.13 : dream ? 0.04 : 0.055}" />
    <path d="M ${sky.cx - sky.r} ${sky.cy} H ${sky.cx + sky.r} M ${sky.cx} ${sky.cy - sky.r} V ${sky.cy + sky.r}" stroke="${scene.style.foreground}" stroke-width="${vintage ? 1.4 : 1}" opacity="${vintage ? 0.11 : 0.055}" />
  `;
}

function renderMilkyWay(scene: ArtworkScene) {
  const hazeColor = scene.style.id === "vintage-observatory" ? "#80552f" : scene.style.secondaryAccent;
  const coreOpacity = scene.style.id === "vintage-observatory" ? 0.07 : scene.style.milkyWayOpacity;
  const wideOpacity = scene.style.id === "celestial-dream" ? 0.11 : scene.style.id === "midnight-gold" ? 0.08 : 0.045;
  const polygonMarkup = scene.skyData.milkyWay.polygons
    .map((polygon, index) => {
      const points = polygon.filter(inSky);
      if (points.length < 3) return "";
      const pointList = points
        .map((point) => `${posterX(scene, point.x)},${posterY(scene, point.y)}`)
        .join(" ");
      return `<polygon points="${pointList}" fill="${hazeColor}" opacity="${index % 2 === 0 ? 1 : 0.72}" />`;
    })
    .join("");

  return `
    <g opacity="${wideOpacity}" filter="url(#milky-wide)">${polygonMarkup}</g>
    <g opacity="${coreOpacity}" filter="url(#milky-soft)">${polygonMarkup}</g>
  `;
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
  const fill =
    star.tier === "brightest" && scene.style.id === "midnight-gold"
      ? "#e8d09a"
      : star.tier === "brightest"
        ? scene.style.accent
        : scene.style.foreground;
  const vintage = scene.style.id === "vintage-observatory";
  const gold = scene.style.id === "midnight-gold";
  const halo =
    star.glowOpacity > 0
      ? `<circle cx="${x}" cy="${y}" r="${(star.radius * (gold ? 3 : 3.4)).toFixed(1)}" fill="${scene.style.starHalo}" opacity="${star.glowOpacity}" />`
      : "";

  if (vintage && star.tier === "brightest") {
    return `${halo}<path d="M ${x - star.radius * 1.9} ${y} H ${x + star.radius * 1.9} M ${x} ${y - star.radius * 1.9} V ${y + star.radius * 1.9}" stroke="${scene.style.accent}" stroke-width="1.25" opacity="${star.opacity}" /><circle cx="${x}" cy="${y}" r="${star.radius.toFixed(1)}" fill="none" stroke="${scene.style.foreground}" stroke-width="1.15" opacity="${star.opacity * 0.9}" />`;
  }

  if (gold && star.tier === "brightest") {
    return `${halo}<circle cx="${x}" cy="${y}" r="${(star.radius * 0.62).toFixed(1)}" fill="#fff6d9" opacity="${Math.min(1, star.opacity + 0.02)}" /><circle cx="${x}" cy="${y}" r="${star.radius.toFixed(1)}" fill="none" stroke="#c7a66a" stroke-width="1.1" opacity="0.48" />`;
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
  const goldMoon = scene.style.id === "midnight-gold";
  const moonFill = paperMoon ? "#f0dfbd" : goldMoon ? "#f1d88c" : "#dce6ff";
  const shadowFill = paperMoon ? "#8f6a45" : scene.style.deepTone;
  const stroke = paperMoon ? scene.style.accent : goldMoon ? "#ead08e" : "#c9d8ff";

  if (illum > 0.96) {
    return `<circle cx="${x}" cy="${y}" r="${radius}" fill="${moonFill}" stroke="${stroke}" stroke-width="${paperMoon ? 2.2 : 1.6}" opacity="${paperMoon ? 0.74 : 0.92}" />`;
  }

  if (illum < 0.04) {
    return `<circle cx="${x}" cy="${y}" r="${radius}" fill="none" stroke="${stroke}" stroke-width="${paperMoon ? 2.2 : 2.8}" opacity="0.78" />`;
  }

  return `
    <circle cx="${x}" cy="${y}" r="${radius}" fill="${moonFill}" stroke="${stroke}" stroke-width="${paperMoon ? 2.2 : 1.4}" opacity="${paperMoon ? 0.72 : 0.92}" />
    <path d="M ${x} ${y - radius}
      A ${Math.abs(offset).toFixed(2)} ${radius} 0 0 ${crescent ? 0 : 1} ${x} ${y + radius}
      A ${radius} ${radius} 0 0 ${sweep} ${x} ${y - radius}"
      fill="${shadowFill}" opacity="${paperMoon ? 0.38 : 0.96}" />
  `;
}

function renderBodies(scene: ArtworkScene) {
  return scene.bodies
    .map((body) => {
      const x = posterX(scene, body.x);
      const y = posterY(scene, body.y);
      if (body.display === "featured-moon") {
        const haloOpacity =
          scene.style.id === "vintage-observatory"
            ? 0.05
            : scene.style.id === "midnight-gold"
              ? 0.13
              : 0.17;
        return `<g>
          <circle cx="${x}" cy="${y}" r="${body.radius * 2.05}" fill="${scene.style.starHalo}" opacity="${haloOpacity}" />
          ${moonPath(scene, x, y, body.radius)}
          <text x="${x + body.radius + 20}" y="${y + 8}" font-family="${sansFont}" font-size="${scene.style.id === "vintage-observatory" ? 20 : 23}" fill="${scene.style.foreground}" opacity="${scene.style.id === "vintage-observatory" ? 0.38 : 0.44}">Moon</text>
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
  const titleSize = titleLines.length > 1 ? 110 : 134;
  const messageSize = messageLines.length > 1 ? 47 : 54;
  const vintage = scene.style.id === "vintage-observatory";

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
    <text x="${width / 2}" y="${text.momentY}" text-anchor="middle" font-family="${sansFont}" font-size="42" fill="${scene.style.foreground}" opacity="${vintage ? 0.74 : 0.72}" letter-spacing="1.6">${escapeXml(scene.momentLine)}</text>
    <text x="${width / 2}" y="${text.detailsY}" text-anchor="middle" font-family="${sansFont}" font-size="32" fill="${scene.style.foreground}" opacity="${vintage ? 0.54 : 0.5}">${escapeXml(scene.coordinateLine)} · ${escapeXml(scene.moonLabel)}</text>
    <line x1="${width / 2 - 410}" x2="${width / 2 + 410}" y1="4390" y2="4390" stroke="${scene.style.accent}" stroke-width="${vintage ? 1.4 : 2}" opacity="${vintage ? 0.42 : 0.32}" />
    <text x="${width / 2}" y="${text.brandY}" text-anchor="middle" font-family="${sansFont}" font-size="30" fill="${scene.style.foreground}" opacity="${vintage ? 0.5 : 0.45}" letter-spacing="8">THE SKY REMEMBERS</text>
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

