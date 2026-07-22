import type {
  CosmicSignatureBody,
  CosmicSignatureScene,
} from "@/lib/sky/cosmic-signature-scene";

const serifFont = "'Cormorant Garamond', Georgia, 'Times New Roman', serif";
const sansFont = "'Inter', Arial, Helvetica, sans-serif";

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function point(scene: CosmicSignatureScene, angle: number, radius: number) {
  const radians = ((angle - 90) * Math.PI) / 180;
  return {
    x: scene.composition.cx + Math.cos(radians) * radius,
    y: scene.composition.cy + Math.sin(radians) * radius,
  };
}

function ring(scene: CosmicSignatureScene, radius: number, opacity: number, width = 1.3) {
  const { cx, cy } = scene.composition;
  return `<circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="${scene.style.fineLine}" stroke-width="${width}" opacity="${opacity}" />`;
}

function renderDefs(scene: CosmicSignatureScene) {
  const vintage = scene.style.id === "vintage-observatory";
  const dream = scene.style.id === "celestial-dream";

  return `
    <defs>
      <radialGradient id="signature-ground" cx="50%" cy="40%" r="65%">
        ${
          vintage
            ? `<stop offset="0%" stop-color="#f4e6c8" /><stop offset="58%" stop-color="#dcc08b" /><stop offset="100%" stop-color="#b68a52" />`
            : dream
              ? `<stop offset="0%" stop-color="#172254" /><stop offset="56%" stop-color="#0b1131" /><stop offset="100%" stop-color="#050615" />`
              : `<stop offset="0%" stop-color="#131622" /><stop offset="58%" stop-color="#050711" /><stop offset="100%" stop-color="#010208" />`
        }
      </radialGradient>
      <filter id="signature-grain" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="${vintage ? "0.014" : "0.02"}" numOctaves="${vintage ? "5" : "3"}" seed="${vintage ? "41" : "29"}" />
        <feColorMatrix type="saturate" values="${vintage ? "0" : "0.25"}" />
        <feComponentTransfer><feFuncA type="table" tableValues="0 ${scene.style.textureOpacity}" /></feComponentTransfer>
      </filter>
      <filter id="soft-glow" x="-40%" y="-40%" width="180%" height="180%">
        <feGaussianBlur stdDeviation="${dream ? 34 : 20}" />
      </filter>
    </defs>
  `;
}

function renderBackground(scene: CosmicSignatureScene) {
  const { width, height, cx, cy, identityRing } = scene.composition;
  const vintage = scene.style.id === "vintage-observatory";
  const dream = scene.style.id === "celestial-dream";

  return `
    ${renderDefs(scene)}
    <rect width="${width}" height="${height}" fill="${scene.style.background}" />
    <circle cx="${cx}" cy="${cy}" r="${identityRing + 370}" fill="url(#signature-ground)" />
    <rect width="${width}" height="${height}" filter="url(#signature-grain)" />
    ${
      dream
        ? `<circle cx="${cx - 180}" cy="${cy - 170}" r="1120" fill="#8d7bd0" opacity="0.095" filter="url(#soft-glow)" />`
        : ""
    }
    ${
      vintage
        ? `<path d="M 382 520 C 1000 420, 2380 430, 3124 544 M 390 4460 C 1088 4560, 2410 4560, 3120 4426" fill="none" stroke="${scene.style.ink}" stroke-width="2" opacity="0.08" />`
        : `<circle cx="${cx}" cy="${cy}" r="${identityRing + 225}" fill="${scene.style.glow}" opacity="0.72" filter="url(#soft-glow)" />`
    }
  `;
}

function renderTicks(scene: CosmicSignatureScene) {
  const { cx, cy, orientationRing } = scene.composition;
  const vintage = scene.style.id === "vintage-observatory";
  const ticks = Array.from({ length: vintage ? 144 : 96 }, (_, index) => {
    const count = vintage ? 144 : 96;
    const angle = (index / count) * 360;
    const major = index % (vintage ? 12 : 8) === 0;
    const mid = index % (vintage ? 6 : 4) === 0;
    const outer = orientationRing + (major ? 42 : mid ? 31 : 22);
    const inner = orientationRing - (major ? 38 : mid ? 24 : 12);
    const a = ((angle - 90) * Math.PI) / 180;
    const x1 = cx + Math.cos(a) * inner;
    const y1 = cy + Math.sin(a) * inner;
    const x2 = cx + Math.cos(a) * outer;
    const y2 = cy + Math.sin(a) * outer;
    return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${scene.style.fineLine}" stroke-width="${major ? 2.2 : mid ? 1.2 : 0.7}" opacity="${major ? 0.58 : mid ? 0.34 : 0.18}" />`;
  }).join("");

  return ticks;
}

function renderRings(scene: CosmicSignatureScene) {
  const { cx, cy, planetRing, orientationRing, identityRing } = scene.composition;
  const dream = scene.style.id === "celestial-dream";
  const vintage = scene.style.id === "vintage-observatory";

  const arcs = dream
    ? scene.bodies
        .map((body, index) => {
          const start = point(scene, body.angle - 17 - index * 2, planetRing - 80 + index * 24);
          const end = point(scene, body.angle + 38 + index * 3, planetRing - 80 + index * 24);
          return `<path d="M ${start.x.toFixed(1)} ${start.y.toFixed(1)} A ${(
            planetRing -
            80 +
            index * 24
          ).toFixed(1)} ${(planetRing - 80 + index * 24).toFixed(1)} 0 0 1 ${end.x.toFixed(1)} ${end.y.toFixed(1)}" fill="none" stroke="${scene.style.secondaryAccent}" stroke-width="${index % 2 === 0 ? 11 : 5}" opacity="${index % 2 === 0 ? 0.1 : 0.16}" stroke-linecap="round" />`;
        })
        .join("")
    : "";

  return `
    ${ring(scene, 420, vintage ? 0.28 : 0.16)}
    ${ring(scene, 636, vintage ? 0.34 : scene.style.ringOpacity)}
    ${ring(scene, planetRing, scene.style.ringOpacity, vintage ? 1.5 : 1.1)}
    ${ring(scene, orientationRing, vintage ? 0.62 : scene.style.ringOpacity, vintage ? 2 : 1.4)}
    ${ring(scene, identityRing, vintage ? 0.5 : 0.34, vintage ? 1.6 : 1)}
    ${renderTicks(scene)}
    ${arcs}
    <path d="M ${cx - identityRing} ${cy} H ${cx + identityRing} M ${cx} ${cy - identityRing} V ${cy + identityRing}" stroke="${scene.style.ink}" stroke-width="${vintage ? 1.15 : 0.9}" opacity="${vintage ? 0.12 : 0.07}" />
  `;
}

function moonShape(scene: CosmicSignatureScene) {
  const { cx, cy, coreRadius } = scene.composition;
  const illum = scene.moon.illumination;
  const waxing = scene.moon.phaseDegrees < 180;
  const crescent = illum < 0.5;
  const offset = coreRadius * 0.68 * (1 - illum * 2);
  const radius = coreRadius * 0.68;
  const sweep = waxing ? 1 : 0;

  if (illum > 0.96) {
    return `<circle cx="${cx}" cy="${cy}" r="${radius}" fill="${scene.style.moonLight}" opacity="0.94" />`;
  }

  if (illum < 0.04) {
    return `<circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="${scene.style.moonLight}" stroke-width="8" opacity="0.8" />`;
  }

  return `
    <circle cx="${cx}" cy="${cy}" r="${radius}" fill="${scene.style.moonLight}" opacity="0.95" />
    <path d="M ${cx} ${cy - radius}
      A ${Math.abs(offset).toFixed(2)} ${radius} 0 0 ${crescent ? 0 : 1} ${cx} ${cy + radius}
      A ${radius} ${radius} 0 0 ${sweep} ${cx} ${cy - radius}"
      fill="${scene.style.moonShadow}" opacity="${scene.style.id === "vintage-observatory" ? 0.42 : 0.96}" />
  `;
}

function renderMoon(scene: CosmicSignatureScene) {
  const { cx, cy, coreRadius } = scene.composition;
  const vintage = scene.style.id === "vintage-observatory";
  return `
    <g>
      <circle cx="${cx}" cy="${cy}" r="${coreRadius}" fill="${scene.style.glow}" opacity="${vintage ? 0.34 : 0.78}" filter="url(#soft-glow)" />
      <circle cx="${cx}" cy="${cy}" r="${coreRadius}" fill="none" stroke="${scene.style.fineLine}" stroke-width="${vintage ? 2.2 : 1.4}" opacity="${vintage ? 0.5 : 0.34}" />
      ${moonShape(scene)}
      <text x="${cx}" y="${cy + coreRadius + 108}" text-anchor="middle" font-family="${sansFont}" font-size="30" fill="${scene.style.ink}" opacity="${vintage ? 0.62 : 0.52}" letter-spacing="3">${escapeXml(scene.moon.phaseName)}</text>
    </g>
  `;
}

function renderBody(scene: CosmicSignatureScene, body: CosmicSignatureBody) {
  const p = point(scene, body.angle, body.radius);
  const vintage = scene.style.id === "vintage-observatory";
  const dream = scene.style.id === "celestial-dream";
  const markerSize = body.body === "Sun" ? 34 : body.body === "Venus" || body.body === "Jupiter" ? 25 : 20;
  const label = point(scene, body.angle, body.radius + 86);
  const anchor = label.x > scene.composition.cx + 90 ? "start" : label.x < scene.composition.cx - 90 ? "end" : "middle";

  if (vintage) {
    return `
      <g opacity="${body.prominence}">
        <line x1="${scene.composition.cx}" y1="${scene.composition.cy}" x2="${p.x.toFixed(1)}" y2="${p.y.toFixed(1)}" stroke="${scene.style.fineLine}" stroke-width="0.9" opacity="0.18" />
        <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${markerSize + 12}" fill="none" stroke="${scene.style.fineLine}" stroke-width="1.4" opacity="0.5" />
        <path d="M ${(p.x - markerSize).toFixed(1)} ${p.y.toFixed(1)} H ${(p.x + markerSize).toFixed(1)} M ${p.x.toFixed(1)} ${(p.y - markerSize).toFixed(1)} V ${(p.y + markerSize).toFixed(1)}" stroke="${scene.style.ink}" stroke-width="1.2" opacity="0.54" />
        <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${markerSize * 0.42}" fill="${scene.style.fineLine}" opacity="0.78" />
        <text x="${label.x.toFixed(1)}" y="${label.y.toFixed(1)}" text-anchor="${anchor}" font-family="${sansFont}" font-size="25" fill="${scene.style.ink}" opacity="0.58" letter-spacing="2">${escapeXml(body.glyph)}</text>
      </g>
    `;
  }

  return `
    <g opacity="${body.prominence}">
      <line x1="${scene.composition.cx}" y1="${scene.composition.cy}" x2="${p.x.toFixed(1)}" y2="${p.y.toFixed(1)}" stroke="${scene.style.fineLine}" stroke-width="1" opacity="${dream ? 0.1 : 0.16}" />
      <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${markerSize * (dream ? 2.8 : 2.2)}" fill="${scene.style.glow}" opacity="${dream ? 0.65 : 0.38}" filter="url(#soft-glow)" />
      <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${markerSize}" fill="${body.body === "Sun" ? scene.style.accent : scene.style.ink}" opacity="${body.body === "Sun" ? 0.92 : 0.74}" />
      <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${markerSize + 15}" fill="none" stroke="${scene.style.fineLine}" stroke-width="1.2" opacity="${dream ? 0.24 : 0.34}" />
      <text x="${label.x.toFixed(1)}" y="${label.y.toFixed(1)}" text-anchor="${anchor}" font-family="${sansFont}" font-size="24" fill="${scene.style.ink}" opacity="${dream ? 0.5 : 0.46}" letter-spacing="2">${escapeXml(body.glyph)}</text>
    </g>
  `;
}

function renderAxes(scene: CosmicSignatureScene) {
  return scene.axes
    .map((axis) => {
      const p1 = point(scene, axis.angle, 360);
      const p2 = point(scene, axis.angle, axis.radius);
      const label = point(scene, axis.angle, axis.radius + 58);
      return `
        <g opacity="${axis.opacity}">
          <line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" stroke="${scene.style.fineLine}" stroke-width="1" opacity="0.42" />
          <text x="${label.x.toFixed(1)}" y="${label.y.toFixed(1)}" text-anchor="middle" font-family="${sansFont}" font-size="${axis.id === "sun-bearing" ? 22 : 30}" fill="${scene.style.ink}" opacity="0.62" letter-spacing="4">${axis.label}</text>
        </g>
      `;
    })
    .join("");
}

function renderIdentity(scene: CosmicSignatureScene) {
  const { width, cx, cy, identityRing } = scene.composition;
  const vintage = scene.style.id === "vintage-observatory";
  const left = cx - identityRing + 120;
  const right = cx + identityRing - 120;

  return `
    <text x="${width / 2}" y="680" text-anchor="middle" font-family="${sansFont}" font-size="31" fill="${scene.style.ink}" opacity="${vintage ? 0.58 : 0.48}" letter-spacing="9">THE SKY REMEMBERS</text>
    <text x="${width / 2}" y="842" text-anchor="middle" font-family="${serifFont}" font-size="118" font-weight="700" fill="${scene.style.ink}" letter-spacing="2">YOUR COSMIC SIGNATURE</text>
    <text x="${width / 2}" y="952" text-anchor="middle" font-family="${serifFont}" font-size="45" fill="${scene.style.ink}" opacity="0.72">A visual portrait of the celestial arrangement connected to the moment you chose.</text>
    <text x="${width / 2}" y="1018" text-anchor="middle" font-family="${sansFont}" font-size="30" fill="${scene.style.ink}" opacity="0.52" letter-spacing="2">BUILT FROM YOUR EXACT DATE, TIME, AND LOCATION</text>
    <text x="${left}" y="${cy + identityRing + 350}" font-family="${sansFont}" font-size="34" fill="${scene.style.ink}" opacity="0.68" letter-spacing="2">${escapeXml(scene.momentLine)}</text>
    <text x="${right}" y="${cy + identityRing + 350}" text-anchor="end" font-family="${sansFont}" font-size="34" fill="${scene.style.ink}" opacity="0.68" letter-spacing="2">${escapeXml(scene.coordinateLine)}</text>
    <text x="${width / 2}" y="${cy + identityRing + 480}" text-anchor="middle" font-family="${serifFont}" font-size="68" fill="${scene.style.ink}" opacity="0.9">${escapeXml(scene.placeLine)}</text>
    <line x1="${width / 2 - 520}" x2="${width / 2 + 520}" y1="${cy + identityRing + 585}" y2="${cy + identityRing + 585}" stroke="${scene.style.fineLine}" stroke-width="${vintage ? 1.4 : 2}" opacity="${vintage ? 0.42 : 0.28}" />
    <text x="${width / 2}" y="${cy + identityRing + 690}" text-anchor="middle" font-family="${sansFont}" font-size="28" fill="${scene.style.ink}" opacity="0.42" letter-spacing="5">MOON / SUN / MERCURY / VENUS / MARS / JUPITER / SATURN</text>
  `;
}

export function createCosmicSignatureSvg(scene: CosmicSignatureScene) {
  const { width, height } = scene.composition;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  ${renderBackground(scene)}
  ${renderIdentity(scene)}
  ${renderRings(scene)}
  ${renderAxes(scene)}
  ${scene.bodies.map((body) => renderBody(scene, body)).join("")}
  ${renderMoon(scene)}
</svg>`;
}
