import type {
  CosmicSignatureBody,
  CosmicSignatureScene,
} from "@/lib/sky/cosmic-signature-scene";

/* eslint-disable @typescript-eslint/no-unused-vars */

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

function arcPath(
  scene: CosmicSignatureScene,
  radius: number,
  startAngle: number,
  endAngle: number,
) {
  const start = point(scene, startAngle, radius);
  const end = point(scene, endAngle, radius);
  const large = Math.abs(endAngle - startAngle) > 180 ? 1 : 0;
  return `M ${start.x.toFixed(1)} ${start.y.toFixed(1)} A ${radius} ${radius} 0 ${large} 1 ${end.x.toFixed(1)} ${end.y.toFixed(1)}`;
}

function ring(
  scene: CosmicSignatureScene,
  radius: number,
  opacity: number,
  width = 1.2,
  dash = "",
) {
  const { cx, cy } = scene.composition;
  return `<circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="${scene.style.fineLine}" stroke-width="${width}" opacity="${opacity}"${dash ? ` stroke-dasharray="${dash}"` : ""} />`;
}

function chartPalette(scene: CosmicSignatureScene) {
  if (scene.style.id === "vintage-observatory") {
    return {
      disc: "#f4e3bd",
      ink: "#221b14",
      fine: "#6f5234",
      muted: "#8c6f4e",
      accent: "#9f7335",
    };
  }

  if (scene.style.id === "celestial-dream") {
    return {
      disc: "#edf3ff",
      ink: "#11182b",
      fine: "#51617d",
      muted: "#7d8aa4",
      accent: "#6f86c2",
    };
  }

  return {
    disc: "#eee8dc",
    ink: "#0b1018",
    fine: "#283343",
    muted: "#6d7480",
    accent: "#ad842e",
  };
}

function chartPoint(scene: CosmicSignatureScene, x: number, y: number, radius: number) {
  return {
    x: scene.composition.cx + (x - 0.5) * 2 * radius,
    y: scene.composition.cy + (y - 0.5) * 2 * radius,
  };
}

function renderDefs(scene: CosmicSignatureScene) {
  const vintage = scene.style.id === "vintage-observatory";
  const dream = scene.style.id === "celestial-dream";
  const chartRadius = scene.composition.identityRing - 285;

  return `
    <defs>
      <radialGradient id="signature-ground" cx="50%" cy="42%" r="70%">
        ${
          vintage
            ? `<stop offset="0%" stop-color="#efe0bc" /><stop offset="70%" stop-color="#ddc391" /><stop offset="100%" stop-color="#c8a06c" />`
            : dream
              ? `<stop offset="0%" stop-color="#1d2a5f" /><stop offset="52%" stop-color="#10163b" /><stop offset="100%" stop-color="#050716" />`
              : `<stop offset="0%" stop-color="#111521" /><stop offset="58%" stop-color="#050711" /><stop offset="100%" stop-color="#010208" />`
        }
      </radialGradient>
      <radialGradient id="moon-light" cx="38%" cy="32%" r="70%">
        <stop offset="0%" stop-color="${scene.style.moonLight}" stop-opacity="1" />
        <stop offset="62%" stop-color="${scene.style.moonLight}" stop-opacity="0.82" />
        <stop offset="100%" stop-color="${scene.style.fineLine}" stop-opacity="${vintage ? "0.34" : "0.55"}" />
      </radialGradient>
      <filter id="signature-grain" x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency="${vintage ? "0.018" : "0.026"}" numOctaves="${vintage ? "5" : "3"}" seed="${vintage ? "61" : "29"}" />
        <feColorMatrix type="saturate" values="${vintage ? "0" : "0.2"}" />
        <feComponentTransfer><feFuncA type="table" tableValues="0 ${scene.style.textureOpacity}" /></feComponentTransfer>
      </filter>
      <filter id="soft-glow" x="-45%" y="-45%" width="190%" height="190%">
        <feGaussianBlur stdDeviation="${dream ? 42 : 22}" />
      </filter>
      <clipPath id="moon-clip">
        <circle cx="${scene.composition.cx}" cy="${scene.composition.cy}" r="${scene.composition.coreRadius * 0.68}" />
      </clipPath>
      <clipPath id="signature-chart-clip">
        <circle cx="${scene.composition.cx}" cy="${scene.composition.cy}" r="${chartRadius}" />
      </clipPath>
    </defs>
  `;
}

function renderBackground(scene: CosmicSignatureScene) {
  const { width, height, cx, cy, identityRing } = scene.composition;
  const vintage = scene.style.id === "vintage-observatory";
  const dream = scene.style.id === "celestial-dream";
  const gold = scene.style.id === "midnight-gold";

  if (vintage) {
    return `
      ${renderDefs(scene)}
      <rect width="${width}" height="${height}" fill="#e8d5ad" />
      <rect x="176" y="188" width="${width - 352}" height="${height - 376}" fill="url(#signature-ground)" opacity="0.78" />
      <rect width="${width}" height="${height}" filter="url(#signature-grain)" />
      <rect x="214" y="226" width="${width - 428}" height="${height - 452}" fill="none" stroke="${scene.style.ink}" stroke-width="2.2" opacity="0.18" />
      <rect x="276" y="288" width="${width - 552}" height="${height - 576}" fill="none" stroke="${scene.style.fineLine}" stroke-width="1.2" opacity="0.22" />
      <path d="M 410 520 C 970 454, 2530 454, 3098 520 M 410 4440 C 970 4510, 2530 4510, 3098 4440" fill="none" stroke="${scene.style.ink}" stroke-width="1" opacity="0.12" />
    `;
  }

  return `
    ${renderDefs(scene)}
    <rect width="${width}" height="${height}" fill="${scene.style.background}" />
    <circle cx="${cx}" cy="${cy}" r="${identityRing + 190}" fill="url(#signature-ground)" opacity="${dream ? 0.9 : 0.55}" />
    ${
      dream
        ? `<path d="${arcPath(scene, identityRing + 150, 214, 28)}" fill="none" stroke="#8b7bd0" stroke-width="190" opacity="0.055" filter="url(#soft-glow)" />`
        : ""
    }
    ${
      gold
        ? `<circle cx="${cx}" cy="${cy}" r="${identityRing + 26}" fill="none" stroke="#5b421f" stroke-width="76" opacity="0.075" />`
        : ""
    }
    <rect width="${width}" height="${height}" filter="url(#signature-grain)" />
  `;
}

function renderGoldDial(scene: CosmicSignatureScene) {
  const { planetRing, orientationRing, identityRing } = scene.composition;
  const importantAngles = scene.bodies
    .map((body) => body.angle)
    .concat(scene.axes.filter((axis) => axis.id === "sun-bearing" || axis.id === "moon-bearing").map((axis) => axis.angle));

  return `
    ${ring(scene, 442, 0.08)}
    ${ring(scene, 646, 0.16)}
    ${ring(scene, planetRing, 0.42, 1.6)}
    ${ring(scene, orientationRing, 0.3, 1)}
    ${ring(scene, identityRing, 0.22, 1)}
    ${ring(scene, identityRing - 90, 0.12, 0.8, "10 18")}
    ${importantAngles
      .map((angle, index) => {
        const inner = index < scene.bodies.length ? 560 : 900;
        const outer = index < scene.bodies.length ? identityRing - 120 : identityRing - 40;
        const p1 = point(scene, angle, inner);
        const p2 = point(scene, angle, outer);
        return `<line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" stroke="${scene.style.fineLine}" stroke-width="${index < scene.bodies.length ? 1.15 : 0.8}" opacity="${index < scene.bodies.length ? 0.16 : 0.1}" />`;
      })
      .join("")}
    ${renderTicks(scene, 96, 0.56, 0.24)}
  `;
}

function renderDreamEcho(scene: CosmicSignatureScene) {
  const { planetRing, orientationRing, identityRing } = scene.composition;
  const arcs = scene.bodies
    .map((body, index) => {
      const radius = body.radius + 42 + index * 18;
      const spread = 28 + Math.abs(body.altitude) * 0.22;
      return `
        <path d="${arcPath(scene, radius, body.angle - spread * 0.75, body.angle + spread)}" fill="none" stroke="${index % 2 ? scene.style.fineLine : scene.style.secondaryAccent}" stroke-width="${index % 2 ? 8 : 15}" opacity="${index % 2 ? 0.12 : 0.1}" stroke-linecap="round" filter="url(#soft-glow)" />
        <path d="${arcPath(scene, radius + 34, body.angle - spread * 0.3, body.angle + spread * 1.5)}" fill="none" stroke="${scene.style.fineLine}" stroke-width="2" opacity="0.18" stroke-linecap="round" />
      `;
    })
    .join("");
  const particles = scene.bodies
    .map((body, index) => {
      const p = point(scene, body.angle + 11 + index * 7, body.radius + 145);
      return `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${index % 2 ? 4.5 : 3}" fill="${scene.style.ink}" opacity="${0.1 + index * 0.018}" />`;
    })
    .join("");

  return `
    ${ring(scene, 470, 0.08)}
    ${ring(scene, planetRing, 0.12, 1, "24 34")}
    ${ring(scene, orientationRing, 0.1, 1, "7 28")}
    <path d="${arcPath(scene, identityRing - 10, 205, 332)}" fill="none" stroke="${scene.style.fineLine}" stroke-width="2" opacity="0.18" stroke-linecap="round" />
    <path d="${arcPath(scene, identityRing - 88, 28, 142)}" fill="none" stroke="${scene.style.secondaryAccent}" stroke-width="6" opacity="0.09" stroke-linecap="round" filter="url(#soft-glow)" />
    ${arcs}
    ${particles}
  `;
}

function renderVintagePlate(scene: CosmicSignatureScene) {
  const { cx, cy, planetRing, orientationRing, identityRing } = scene.composition;
  const numbers = Array.from({ length: 12 }, (_, index) => {
    const angle = index * 30;
    const p = point(scene, angle, orientationRing + 84);
    return `<text x="${p.x.toFixed(1)}" y="${p.y.toFixed(1)}" text-anchor="middle" font-family="${serifFont}" font-size="24" fill="${scene.style.ink}" opacity="0.42">${index * 30}</text>`;
  }).join("");
  const hatching = Array.from({ length: 28 }, (_, index) => {
    const y = cy - 1280 + index * 92;
    const x1 = cx - 1180 + (index % 4) * 24;
    const x2 = x1 + 132;
    return `<line x1="${x1}" y1="${y}" x2="${x2}" y2="${y - 54}" stroke="${scene.style.ink}" stroke-width="0.7" opacity="0.055" />`;
  }).join("");

  return `
    ${hatching}
    <ellipse cx="${cx}" cy="${cy}" rx="${identityRing + 80}" ry="${identityRing * 0.94}" fill="none" stroke="${scene.style.ink}" stroke-width="2.2" opacity="0.24" />
    <ellipse cx="${cx}" cy="${cy}" rx="${orientationRing + 28}" ry="${orientationRing * 0.92}" fill="none" stroke="${scene.style.fineLine}" stroke-width="1.4" opacity="0.38" />
    <ellipse cx="${cx}" cy="${cy}" rx="${planetRing + 28}" ry="${planetRing * 0.9}" fill="none" stroke="${scene.style.ink}" stroke-width="1" opacity="0.26" stroke-dasharray="12 10" />
    ${ring(scene, 450, 0.24, 1)}
    ${ring(scene, 646, 0.18, 0.8)}
    ${renderTicks(scene, 180, 0.48, 0.2)}
    ${numbers}
    <path d="M ${cx - identityRing - 90} ${cy} H ${cx + identityRing + 90} M ${cx} ${cy - identityRing - 40} V ${cy + identityRing + 40}" stroke="${scene.style.ink}" stroke-width="0.9" opacity="0.13" />
  `;
}

function renderTicks(
  scene: CosmicSignatureScene,
  count: number,
  majorOpacity: number,
  minorOpacity: number,
) {
  const { orientationRing } = scene.composition;
  const vintage = scene.style.id === "vintage-observatory";
  return Array.from({ length: count }, (_, index) => {
    const angle = (index / count) * 360;
    const major = index % (count / 12) === 0;
    const mid = index % (count / 24) === 0;
    const outer = orientationRing + (major ? 54 : mid ? 38 : 24);
    const inner = orientationRing - (major ? 48 : mid ? 28 : 13);
    const p1 = point(scene, angle, inner);
    const p2 = point(scene, angle, outer);
    return `<line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" stroke="${scene.style.fineLine}" stroke-width="${major ? (vintage ? 1.8 : 1.5) : mid ? 0.9 : 0.55}" opacity="${major ? majorOpacity : minorOpacity}" />`;
  }).join("");
}

function renderInstrument(scene: CosmicSignatureScene) {
  if (scene.style.id === "celestial-dream") return renderDreamEcho(scene);
  if (scene.style.id === "vintage-observatory") return renderVintagePlate(scene);
  return renderGoldDial(scene);
}

function renderReferenceSkyChart(scene: CosmicSignatureScene) {
  const { cx, cy, identityRing } = scene.composition;
  const palette = chartPalette(scene);
  const chartRadius = identityRing - 285;
  const innerRadius = chartRadius - 100;
  const starRadius = chartRadius - 165;
  const stars = scene.skyData.stars
    .slice()
    .sort((a, b) => a.magnitude - b.magnitude)
    .slice(0, 1500)
    .map((star, index) => {
      const p = chartPoint(scene, star.x, star.y, starRadius);
      const dx = p.x - cx;
      const dy = p.y - cy;
      const distance = Math.sqrt(dx * dx + dy * dy);
      if (distance > starRadius) return "";
      const bright = star.magnitude < 1.5;
      const medium = star.magnitude < 3;
      const size = bright ? 10.8 : medium ? 6.8 : 4.2;
      const opacity = bright ? 1 : medium ? 0.94 : 0.76;
      const label =
        bright && index < 26
          ? `<text x="${(p.x + 13).toFixed(1)}" y="${(p.y - 9).toFixed(1)}" font-family="${sansFont}" font-size="13" fill="${palette.ink}" opacity="0.32" letter-spacing="1.4">${escapeXml(star.name)}</text>`
          : "";
      return `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${size}" fill="${palette.ink}" opacity="${opacity}" />${label}`;
    })
    .join("");
  const constellationLines = scene.skyData.constellationLines
    .flatMap((line) =>
      line.segments.map((segment) =>
        segment
          .map((segmentPoint) => chartPoint(scene, segmentPoint.x, segmentPoint.y, starRadius))
          .filter((segmentPoint) => Math.hypot(segmentPoint.x - cx, segmentPoint.y - cy) <= starRadius)
          .map(
            (segmentPoint, index) =>
              `${index === 0 ? "M" : "L"} ${segmentPoint.x.toFixed(1)} ${segmentPoint.y.toFixed(1)}`,
          )
          .join(" "),
      ),
    )
    .filter((path) => path.includes("L"))
    .map((path) => `<path d="${path}" fill="none" stroke="${palette.fine}" stroke-width="1.55" opacity="0.58" />`)
    .join("");
  const altitudeRings = [0.22, 0.38, 0.54, 0.7, 0.86]
    .map(
      (scale, index) =>
        `<circle cx="${cx}" cy="${cy}" r="${(starRadius * scale).toFixed(1)}" fill="none" stroke="${palette.fine}" stroke-width="${index === 4 ? 1.9 : 1.25}" opacity="${index === 4 ? 0.66 : 0.48}" />`,
    )
    .join("");
  const curvedGrid = Array.from({ length: 9 }, (_, index) => {
    const offset = (index - 4) * 0.2;
    const rx = starRadius * Math.sqrt(Math.max(0.1, 1 - offset * offset * 0.74));
    const y = cy + offset * starRadius;
    return `<ellipse cx="${cx}" cy="${y.toFixed(1)}" rx="${rx.toFixed(1)}" ry="${(starRadius * 0.08).toFixed(1)}" fill="none" stroke="${palette.fine}" stroke-width="1" opacity="0.38" />`;
  }).join("");
  const spokes = Array.from({ length: 36 }, (_, index) => {
    const angle = index * 10;
    const p1 = point(scene, angle, 165);
    const p2 = point(scene, angle, starRadius);
    return `<line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" stroke="${palette.fine}" stroke-width="${index % 9 === 0 ? 1.25 : index % 3 === 0 ? 0.9 : 0.58}" opacity="${index % 9 === 0 ? 0.48 : index % 3 === 0 ? 0.34 : 0.24}" />`;
  }).join("");
  const outerTicks = Array.from({ length: 180 }, (_, index) => {
    const angle = index * 2;
    const major = index % 15 === 0;
    const mid = index % 5 === 0;
    const p1 = point(scene, angle, innerRadius + (major ? 18 : mid ? 32 : 45));
    const p2 = point(scene, angle, innerRadius + 68);
    return `<line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" stroke="${palette.ink}" stroke-width="${major ? 1.8 : mid ? 1 : 0.55}" opacity="${major ? 0.46 : mid ? 0.32 : 0.18}" />`;
  }).join("");
  const degreeLabels = Array.from({ length: 12 }, (_, index) => {
    const angle = index * 30;
    const p = point(scene, angle, innerRadius + 96);
    return `<text x="${p.x.toFixed(1)}" y="${p.y.toFixed(1)}" text-anchor="middle" dominant-baseline="middle" font-family="${serifFont}" font-size="24" fill="${palette.ink}" opacity="0.48">${angle}</text>`;
  }).join("");
  const cardinalLabels = [
    ["N", 0],
    ["E", 90],
    ["S", 180],
    ["W", 270],
  ]
    .map(([label, angle]) => {
      const p = point(scene, Number(angle), innerRadius + 158);
      return `<text x="${p.x.toFixed(1)}" y="${p.y.toFixed(1)}" text-anchor="middle" dominant-baseline="middle" font-family="${sansFont}" font-size="28" font-weight="700" fill="${palette.ink}" opacity="0.62" letter-spacing="5">${label}</text>`;
    })
    .join("");
  const bodyMarks = scene.bodies
    .map((body) => {
      const p = point(scene, body.angle, Math.min(starRadius - 54, body.radius - 190));
      return `
        <g opacity="${body.prominence}">
          <line x1="${cx}" y1="${cy}" x2="${p.x.toFixed(1)}" y2="${p.y.toFixed(1)}" stroke="${palette.accent}" stroke-width="1.1" opacity="0.24" />
          <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${body.body === "Sun" ? 18 : 12}" fill="${body.body === "Sun" ? palette.accent : "none"}" stroke="${palette.ink}" stroke-width="2.2" opacity="0.82" />
          <text x="${p.x.toFixed(1)}" y="${(p.y + 38).toFixed(1)}" text-anchor="middle" font-family="${sansFont}" font-size="20" fill="${palette.ink}" opacity="0.58" letter-spacing="2">${body.glyph}</text>
        </g>
      `;
    })
    .join("");

  return `
    <g>
      <circle cx="${cx}" cy="${cy}" r="${chartRadius + 62}" fill="none" stroke="${palette.accent}" stroke-width="10" opacity="0.16" />
      <circle cx="${cx}" cy="${cy}" r="${chartRadius}" fill="${palette.disc}" opacity="0.96" />
      <circle cx="${cx}" cy="${cy}" r="${chartRadius}" fill="none" stroke="${palette.ink}" stroke-width="3.6" opacity="0.62" />
      <circle cx="${cx}" cy="${cy}" r="${chartRadius - 34}" fill="none" stroke="${palette.ink}" stroke-width="1.4" opacity="0.38" />
      <g clip-path="url(#signature-chart-clip)">
        <rect x="${cx - chartRadius}" y="${cy - chartRadius}" width="${chartRadius * 2}" height="${chartRadius * 2}" fill="${palette.disc}" />
        ${altitudeRings}
        ${curvedGrid}
        ${spokes}
        ${constellationLines}
        ${stars}
        ${bodyMarks}
        <circle cx="${cx}" cy="${cy}" r="24" fill="none" stroke="${palette.accent}" stroke-width="4" opacity="0.62" />
        <circle cx="${cx}" cy="${cy}" r="${starRadius}" fill="none" stroke="${palette.ink}" stroke-width="2.2" opacity="0.64" />
      </g>
      <circle cx="${cx}" cy="${cy}" r="${innerRadius + 70}" fill="none" stroke="${palette.ink}" stroke-width="8" opacity="0.14" />
      <circle cx="${cx}" cy="${cy}" r="${innerRadius + 98}" fill="none" stroke="${palette.ink}" stroke-width="1.2" opacity="0.36" />
      ${outerTicks}
      ${degreeLabels}
      ${cardinalLabels}
    </g>
  `;
}

function renderPrecisionCodex(scene: CosmicSignatureScene) {
  const { cx, cy, identityRing, orientationRing, planetRing } = scene.composition;
  const vintage = scene.style.id === "vintage-observatory";
  const fine = scene.style.fineLine;
  const ink = scene.style.ink;
  const calibrationRings = Array.from({ length: 10 }, (_, index) => {
    const radius = 520 + index * 86;
    const opacity = vintage ? 0.09 + index * 0.012 : 0.045 + index * 0.008;
    const dash = index % 3 === 0 ? "12 18" : index % 3 === 1 ? "3 18" : "";
    return ring(scene, radius, opacity, index % 4 === 0 ? 1.1 : 0.7, dash);
  }).join("");
  const radialFine = Array.from({ length: 72 }, (_, index) => {
    const angle = index * 5;
    const major = index % 6 === 0;
    const inner = major ? 430 : 610;
    const outer = major ? identityRing + 36 : orientationRing + 44;
    const p1 = point(scene, angle, inner);
    const p2 = point(scene, angle, outer);
    return `<line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" stroke="${fine}" stroke-width="${major ? 0.8 : 0.45}" opacity="${major ? 0.12 : 0.055}" />`;
  }).join("");
  const coordinateCurves = scene.bodies
    .map((body, index) => {
      const spread = 22 + Math.abs(body.altitude) * 0.18;
      return `<path d="${arcPath(scene, body.radius + 70 + index * 10, body.angle - spread, body.angle + spread * 1.4)}" fill="none" stroke="${index % 2 ? ink : fine}" stroke-width="${index % 2 ? 0.9 : 1.2}" opacity="${body.prominence * (vintage ? 0.18 : 0.12)}" />`;
    })
    .join("");
  const relationshipLines = scene.bodies
    .flatMap((body, index) =>
      scene.bodies.slice(index + 1).map((other, pairIndex) => {
        const p1 = point(scene, body.angle, body.radius);
        const p2 = point(scene, other.angle, other.radius);
        const strong = body.body === "Sun" || other.body === "Sun" || pairIndex % 3 === 0;
        return `<line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" stroke="${strong ? fine : ink}" stroke-width="${strong ? 0.8 : 0.45}" opacity="${strong ? 0.13 : 0.055}" />`;
      }),
    )
    .join("");
  const microMarks = Array.from({ length: 144 }, (_, index) => {
    const angle = index * 2.5;
    const radius = planetRing - 88 + (index % 6) * 28;
    const p = point(scene, angle, radius);
    return `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${index % 12 === 0 ? 2.4 : 1.2}" fill="${ink}" opacity="${index % 12 === 0 ? 0.18 : 0.075}" />`;
  }).join("");

  return `
    <g>
      <circle cx="${cx}" cy="${cy}" r="${identityRing + 120}" fill="none" stroke="${fine}" stroke-width="1" opacity="${vintage ? 0.16 : 0.1}" />
      ${calibrationRings}
      ${radialFine}
      ${coordinateCurves}
      ${relationshipLines}
      ${microMarks}
    </g>
  `;
}

function moonPhaseOverlay(scene: CosmicSignatureScene) {
  const { cx, cy, coreRadius } = scene.composition;
  const illum = scene.moon.illumination;
  const waxing = scene.moon.phaseDegrees < 180;
  const crescent = illum < 0.5;
  const radius = coreRadius * 0.68;
  const offset = radius * (1 - illum * 2);
  const sweep = waxing ? 1 : 0;

  if (illum > 0.96) {
    return `<circle cx="${cx}" cy="${cy}" r="${radius}" fill="url(#moon-light)" opacity="0.98" />`;
  }

  if (illum < 0.04) {
    return `<circle cx="${cx}" cy="${cy}" r="${radius}" fill="none" stroke="${scene.style.moonLight}" stroke-width="${scene.style.id === "vintage-observatory" ? 5 : 8}" opacity="0.86" />`;
  }

  return `
    <circle cx="${cx}" cy="${cy}" r="${radius}" fill="url(#moon-light)" opacity="0.98" />
    <path d="M ${cx} ${cy - radius}
      A ${Math.abs(offset).toFixed(2)} ${radius} 0 0 ${crescent ? 0 : 1} ${cx} ${cy + radius}
      A ${radius} ${radius} 0 0 ${sweep} ${cx} ${cy - radius}"
      fill="${scene.style.moonShadow}" opacity="${scene.style.id === "vintage-observatory" ? 0.38 : 0.94}" />
  `;
}

function renderMoonTexture(scene: CosmicSignatureScene) {
  const { cx, cy, coreRadius } = scene.composition;
  const radius = coreRadius * 0.68;
  const vintage = scene.style.id === "vintage-observatory";
  const dream = scene.style.id === "celestial-dream";
  const craters = [
    [-54, -62, 18],
    [48, -36, 13],
    [-22, 42, 11],
    [72, 58, 8],
    [-88, 34, 7],
  ]
    .map(
      ([dx, dy, r]) =>
        `<circle cx="${cx + dx}" cy="${cy + dy}" r="${r}" fill="none" stroke="${vintage ? scene.style.ink : scene.style.fineLine}" stroke-width="${vintage ? 1.2 : 0.9}" opacity="${vintage ? 0.18 : dream ? 0.12 : 0.1}" />`,
    )
    .join("");
  const engraved = vintage
    ? Array.from({ length: 18 }, (_, index) => {
        const y = cy - radius + 20 + index * 20;
        return `<path d="M ${cx - radius + 28} ${y} C ${cx - 60} ${y - 20}, ${cx + 54} ${y + 20}, ${cx + radius - 30} ${y - 8}" fill="none" stroke="${scene.style.ink}" stroke-width="0.55" opacity="0.08" />`;
      }).join("")
    : "";

  return `<g clip-path="url(#moon-clip)">${engraved}${craters}</g>`;
}

function renderMoon(scene: CosmicSignatureScene) {
  const { cx, cy, coreRadius } = scene.composition;
  const vintage = scene.style.id === "vintage-observatory";
  const dream = scene.style.id === "celestial-dream";

  return `
    <g>
      ${
        dream
          ? `<circle cx="${cx}" cy="${cy}" r="${coreRadius * 1.28}" fill="${scene.style.glow}" opacity="0.7" filter="url(#soft-glow)" />`
          : `<circle cx="${cx}" cy="${cy}" r="${coreRadius * 1.04}" fill="none" stroke="${scene.style.fineLine}" stroke-width="${vintage ? 1.4 : 2}" opacity="${vintage ? 0.32 : 0.28}" />`
      }
      ${moonPhaseOverlay(scene)}
      ${renderMoonTexture(scene)}
      ${
        vintage
          ? `<circle cx="${cx}" cy="${cy}" r="${coreRadius * 0.68}" fill="none" stroke="${scene.style.ink}" stroke-width="1.4" opacity="0.42" /><circle cx="${cx}" cy="${cy}" r="${coreRadius * 0.78}" fill="none" stroke="${scene.style.ink}" stroke-width="0.8" opacity="0.18" />`
          : `<circle cx="${cx}" cy="${cy}" r="${coreRadius * 0.68}" fill="none" stroke="${scene.style.fineLine}" stroke-width="1.4" opacity="0.38" />`
      }
      <text x="${cx}" y="${cy + coreRadius + 108}" text-anchor="middle" font-family="${sansFont}" font-size="${vintage ? 28 : 30}" fill="${scene.style.ink}" opacity="${vintage ? 0.66 : 0.54}" letter-spacing="3">${escapeXml(scene.moon.phaseName)}</text>
    </g>
  `;
}

function renderSymbol(scene: CosmicSignatureScene, body: CosmicSignatureBody, x: number, y: number, size: number) {
  const stroke = scene.style.id === "vintage-observatory" ? scene.style.ink : scene.style.fineLine;
  const fill = body.body === "Sun" ? scene.style.accent : scene.style.ink;
  const common = `stroke="${stroke}" stroke-width="${Math.max(1.2, size * 0.07).toFixed(1)}" stroke-linecap="round" stroke-linejoin="round"`;

  if (body.body === "Sun") {
    return `<circle cx="${x}" cy="${y}" r="${size * 0.42}" fill="${fill}" opacity="0.78" /><circle cx="${x}" cy="${y}" r="${size * 0.66}" fill="none" ${common} opacity="0.52" />`;
  }

  if (body.body === "Mercury") {
    return `<circle cx="${x}" cy="${y - size * 0.08}" r="${size * 0.34}" fill="none" ${common} opacity="0.78" /><path d="M ${x} ${y + size * 0.26} V ${y + size * 0.72} M ${x - size * 0.24} ${y + size * 0.5} H ${x + size * 0.24} M ${x - size * 0.22} ${y - size * 0.52} C ${x - size * 0.08} ${y - size * 0.72}, ${x + size * 0.08} ${y - size * 0.72}, ${x + size * 0.22} ${y - size * 0.52}" fill="none" ${common} opacity="0.72" />`;
  }

  if (body.body === "Venus") {
    return `<circle cx="${x}" cy="${y - size * 0.08}" r="${size * 0.38}" fill="none" ${common} opacity="0.82" /><path d="M ${x} ${y + size * 0.3} V ${y + size * 0.78} M ${x - size * 0.27} ${y + size * 0.56} H ${x + size * 0.27}" fill="none" ${common} opacity="0.72" />`;
  }

  if (body.body === "Mars") {
    return `<circle cx="${x - size * 0.1}" cy="${y + size * 0.08}" r="${size * 0.34}" fill="none" ${common} opacity="0.82" /><path d="M ${x + size * 0.16} ${y - size * 0.18} L ${x + size * 0.58} ${y - size * 0.6} M ${x + size * 0.58} ${y - size * 0.6} H ${x + size * 0.22} M ${x + size * 0.58} ${y - size * 0.6} V ${y - size * 0.24}" fill="none" ${common} opacity="0.72" />`;
  }

  if (body.body === "Jupiter") {
    return `<path d="M ${x - size * 0.45} ${y - size * 0.16} C ${x - size * 0.12} ${y - size * 0.46}, ${x + size * 0.28} ${y - size * 0.34}, ${x + size * 0.1} ${y + size * 0.1} C ${x} ${y + size * 0.36}, ${x - size * 0.28} ${y + size * 0.3}, ${x - size * 0.42} ${y + size * 0.2} H ${x + size * 0.5} M ${x + size * 0.2} ${y - size * 0.52} V ${y + size * 0.62}" fill="none" ${common} opacity="0.78" />`;
  }

  return `<path d="M ${x - size * 0.44} ${y - size * 0.18} C ${x - size * 0.18} ${y - size * 0.52}, ${x + size * 0.34} ${y - size * 0.42}, ${x + size * 0.28} ${y - size * 0.04} C ${x + size * 0.22} ${y + size * 0.34}, ${x - size * 0.36} ${y + size * 0.32}, ${x - size * 0.3} ${y - size * 0.02} H ${x + size * 0.45} M ${x + size * 0.14} ${y - size * 0.52} V ${y + size * 0.66}" fill="none" ${common} opacity="0.78" />`;
}

function renderBody(scene: CosmicSignatureScene, body: CosmicSignatureBody) {
  const p = point(scene, body.angle, body.radius);
  const vintage = scene.style.id === "vintage-observatory";
  const dream = scene.style.id === "celestial-dream";
  const size = body.body === "Sun" ? 72 : body.body === "Venus" || body.body === "Jupiter" ? 60 : 54;
  const label = point(scene, body.angle, body.radius + (vintage ? 96 : 104));
  const anchor = label.x > scene.composition.cx + 90 ? "start" : label.x < scene.composition.cx - 90 ? "end" : "middle";
  const below = body.altitude < 0;
  const guideDash = below ? " stroke-dasharray=\"10 12\"" : "";

  if (vintage) {
    return `
      <g opacity="${body.prominence}">
        <line x1="${scene.composition.cx}" y1="${scene.composition.cy}" x2="${p.x.toFixed(1)}" y2="${p.y.toFixed(1)}" stroke="${scene.style.ink}" stroke-width="0.75" opacity="${below ? 0.08 : 0.14}"${guideDash} />
        <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${size * 0.78}" fill="none" stroke="${scene.style.ink}" stroke-width="0.9" opacity="${below ? 0.22 : 0.38}"${below ? " stroke-dasharray=\"7 8\"" : ""} />
        ${renderSymbol(scene, body, p.x, p.y, size)}
        <text x="${label.x.toFixed(1)}" y="${label.y.toFixed(1)}" text-anchor="${anchor}" font-family="${serifFont}" font-size="28" fill="${scene.style.ink}" opacity="${below ? 0.36 : 0.58}" letter-spacing="1.2">${escapeXml(body.label)}</text>
      </g>
    `;
  }

  return `
    <g opacity="${body.prominence}">
      <line x1="${scene.composition.cx}" y1="${scene.composition.cy}" x2="${p.x.toFixed(1)}" y2="${p.y.toFixed(1)}" stroke="${scene.style.fineLine}" stroke-width="${dream ? 0.8 : 1}" opacity="${below ? 0.07 : dream ? 0.1 : 0.14}"${guideDash} />
      <circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="${size * (dream ? 1.3 : 1.05)}" fill="${scene.style.glow}" opacity="${dream ? 0.5 : 0.16}" filter="url(#soft-glow)" />
      ${renderSymbol(scene, body, p.x, p.y, size)}
      <text x="${label.x.toFixed(1)}" y="${label.y.toFixed(1)}" text-anchor="${anchor}" font-family="${sansFont}" font-size="${dream ? 25 : 24}" fill="${scene.style.ink}" opacity="${below ? 0.28 : dream ? 0.5 : 0.48}" letter-spacing="2">${escapeXml(body.label.toUpperCase())}</text>
    </g>
  `;
}

function renderAxes(scene: CosmicSignatureScene) {
  return scene.axes
    .map((axis) => {
      const inner = axis.id === "sun-bearing" || axis.id === "moon-bearing" ? 760 : 340;
      const p1 = point(scene, axis.angle, inner);
      const p2 = point(scene, axis.angle, axis.radius);
      const label = point(scene, axis.angle, axis.radius + 58);
      const subtle = axis.id === "sun-bearing" || axis.id === "moon-bearing";
      return `
        <g opacity="${axis.opacity}">
          <line x1="${p1.x.toFixed(1)}" y1="${p1.y.toFixed(1)}" x2="${p2.x.toFixed(1)}" y2="${p2.y.toFixed(1)}" stroke="${scene.style.fineLine}" stroke-width="${subtle ? 0.8 : 1}" opacity="${subtle ? 0.2 : 0.34}"${subtle ? " stroke-dasharray=\"8 14\"" : ""} />
          <text x="${label.x.toFixed(1)}" y="${label.y.toFixed(1)}" text-anchor="middle" font-family="${sansFont}" font-size="${subtle ? 21 : 29}" fill="${scene.style.ink}" opacity="${subtle ? 0.52 : 0.62}" letter-spacing="${subtle ? 3 : 4}">${axis.label}</text>
        </g>
      `;
    })
    .join("");
}

function renderIdentity(scene: CosmicSignatureScene) {
  const { width, cx, cy, identityRing } = scene.composition;
  const vintage = scene.style.id === "vintage-observatory";
  const dream = scene.style.id === "celestial-dream";
  const topY = vintage ? 590 : 610;
  const left = cx - identityRing + 120;
  const right = cx + identityRing - 120;

  if (vintage) {
    return `
      <text x="${width / 2}" y="${topY}" text-anchor="middle" font-family="${serifFont}" font-size="44" fill="${scene.style.ink}" opacity="0.62" letter-spacing="4">THE SKY REMEMBERS OBSERVATORY PLATE</text>
      <line x1="${width / 2 - 760}" x2="${width / 2 + 760}" y1="${topY + 44}" y2="${topY + 44}" stroke="${scene.style.ink}" stroke-width="1" opacity="0.22" />
      <text x="${width / 2}" y="${topY + 170}" text-anchor="middle" font-family="${serifFont}" font-size="112" font-weight="700" fill="${scene.style.ink}" letter-spacing="1.4">YOUR COSMIC SIGNATURE</text>
      <text x="${width / 2}" y="${topY + 258}" text-anchor="middle" font-family="${serifFont}" font-size="40" fill="${scene.style.ink}" opacity="0.58">A celestial arrangement calculated for one date, hour, and place.</text>
      <text x="${left}" y="${cy + identityRing + 360}" font-family="${serifFont}" font-size="36" fill="${scene.style.ink}" opacity="0.7">${escapeXml(scene.momentLine)}</text>
      <text x="${right}" y="${cy + identityRing + 360}" text-anchor="end" font-family="${serifFont}" font-size="36" fill="${scene.style.ink}" opacity="0.7">${escapeXml(scene.coordinateLine)}</text>
      <text x="${width / 2}" y="${cy + identityRing + 500}" text-anchor="middle" font-family="${serifFont}" font-size="72" fill="${scene.style.ink}" opacity="0.9">${escapeXml(scene.placeLine)}</text>
      <text x="${width / 2}" y="${cy + identityRing + 642}" text-anchor="middle" font-family="${sansFont}" font-size="24" fill="${scene.style.ink}" opacity="0.44" letter-spacing="5">SUN MERCURY VENUS MARS JUPITER SATURN / MOON PHASE CENTERED</text>
    `;
  }

  return `
    <text x="${width / 2}" y="${topY}" text-anchor="middle" font-family="${sansFont}" font-size="28" fill="${scene.style.ink}" opacity="${dream ? 0.44 : 0.5}" letter-spacing="9">THE SKY REMEMBERS</text>
    <text x="${width / 2}" y="${topY + 156}" text-anchor="middle" font-family="${serifFont}" font-size="${dream ? 112 : 116}" font-weight="700" fill="${scene.style.ink}" letter-spacing="2">YOUR COSMIC SIGNATURE</text>
    <path d="${arcPath(scene, identityRing - 58, 292, 68)}" fill="none" stroke="${scene.style.fineLine}" stroke-width="${dream ? 2 : 1.4}" opacity="${dream ? 0.16 : 0.22}" />
    <text x="${width / 2}" y="${topY + 250}" text-anchor="middle" font-family="${serifFont}" font-size="42" fill="${scene.style.ink}" opacity="${dream ? 0.62 : 0.68}">A visual portrait of the celestial arrangement connected to the moment you chose.</text>
    <text x="${left}" y="${cy + identityRing + 350}" font-family="${sansFont}" font-size="33" fill="${scene.style.ink}" opacity="0.64" letter-spacing="2">${escapeXml(scene.momentLine)}</text>
    <text x="${right}" y="${cy + identityRing + 350}" text-anchor="end" font-family="${sansFont}" font-size="33" fill="${scene.style.ink}" opacity="0.64" letter-spacing="2">${escapeXml(scene.coordinateLine)}</text>
    <text x="${width / 2}" y="${cy + identityRing + 486}" text-anchor="middle" font-family="${serifFont}" font-size="70" fill="${scene.style.ink}" opacity="0.9">${escapeXml(scene.placeLine)}</text>
    <line x1="${width / 2 - 540}" x2="${width / 2 + 540}" y1="${cy + identityRing + 594}" y2="${cy + identityRing + 594}" stroke="${scene.style.fineLine}" stroke-width="${dream ? 1 : 1.8}" opacity="${dream ? 0.18 : 0.26}" />
    <text x="${width / 2}" y="${cy + identityRing + 698}" text-anchor="middle" font-family="${sansFont}" font-size="25" fill="${scene.style.ink}" opacity="0.38" letter-spacing="5">BUILT FROM YOUR EXACT DATE, TIME, AND LOCATION</text>
  `;
}

export function createCosmicSignatureSvg(scene: CosmicSignatureScene) {
  const { width, height } = scene.composition;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  ${renderBackground(scene)}
  ${renderIdentity(scene)}
  ${renderReferenceSkyChart(scene)}
</svg>`;
}
