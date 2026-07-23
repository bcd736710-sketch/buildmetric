"use client";

import {
  type RefObject,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useTransition,
} from "react";
import { geoGraticule10, geoOrthographic, geoPath } from "d3-geo";
import { feature } from "topojson-client";
import landTopology from "world-atlas/land-110m.json";
import { computeSky, type SkyComputation } from "@/lib/sky/astronomy";
import { createArtworkScene } from "@/lib/sky/artwork-scene";
import { createArtworkSvg } from "@/lib/sky/artwork-svg";
import { createCosmicSignatureScene } from "@/lib/sky/cosmic-signature-scene";
import { createCosmicSignatureSvg } from "@/lib/sky/cosmic-signature-svg";
import {
  defaultMomentConfig,
  posterStyles,
  resolveMomentConfig,
  type SkyArtStyle,
  type SkyColorPalette,
  type MomentConfig,
  type SkyPosterStyle,
} from "@/lib/sky/moment";

type PlaceSearchResult = {
  placeName: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
  provider?: string;
};

type PurchaseSelection = "sky" | "bundle" | null;
type PostRevealState =
  | "sky-revealing"
  | "customizing"
  | "sky-confirmed"
  | "meteor-reveal"
  | "cosmic-signature-revealed"
  | "purchase-selection";
type CosmicRevealPhase = "moon" | "partial" | "full" | "poster";
type EditorStep = "style" | "personalize" | "complete";

const PRODUCT_PRICE = 14.99;

const paletteOptions: {
  id: SkyColorPalette;
  label: string;
  swatch: string;
  style: SkyPosterStyle;
}[] = [
  {
    id: "midnight-gold",
    label: "Midnight Gold",
    swatch: "linear-gradient(135deg, #050711, #d2aa5d)",
    style: "midnight-gold",
  },
  {
    id: "celestial-blue",
    label: "Celestial Blue",
    swatch: "linear-gradient(135deg, #314867, #d6e1ff)",
    style: "celestial-dream",
  },
  {
    id: "deep-black",
    label: "Deep Black",
    swatch: "linear-gradient(135deg, #05070c, #f7f3e8)",
    style: "midnight-gold",
  },
  {
    id: "observatory-ivory",
    label: "Observatory Ivory",
    swatch: "linear-gradient(135deg, #efe3c9, #7d512c)",
    style: "vintage-observatory",
  },
];

const artStyleOptions: {
  id: SkyArtStyle;
  label: string;
  note: string;
  preview: "classic" | "foil" | "glow" | "canvas";
  patch: Partial<MomentConfig>;
}[] = [
  {
    id: "classic",
    label: "Classic",
    note: "Black poster with a high-contrast white sky chart.",
    preview: "classic",
    patch: {
      artStyle: "classic",
      colorPalette: "deep-black",
      style: "midnight-gold",
      mapStyle: "classic",
    },
  },
  {
    id: "minimal",
    label: "Foil",
    note: "Warm gold chart treatment on deep black.",
    preview: "foil",
    patch: {
      artStyle: "minimal",
      colorPalette: "midnight-gold",
      style: "midnight-gold",
      mapStyle: "technical",
    },
  },
  {
    id: "luminous",
    label: "Glow",
    note: "Soft luminous green chart with darker print edges.",
    preview: "glow",
    patch: {
      artStyle: "luminous",
      colorPalette: "celestial-blue",
      style: "celestial-dream",
      mapStyle: "technical",
    },
  },
  {
    id: "archival",
    label: "Canvas",
    note: "Black-and-ivory chart with heavier gallery linework.",
    preview: "canvas",
    patch: {
      artStyle: "archival",
      colorPalette: "deep-black",
      style: "midnight-gold",
      mapStyle: "technical",
    },
  },
];

function svgDataUrl(svg: string) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

type CreateStep = "date" | "time" | "place" | "editor";

const createSteps: { id: Exclude<CreateStep, "editor">; label: string }[] = [
  { id: "date", label: "Date" },
  { id: "time", label: "Time" },
  { id: "place", label: "Place" },
];

const cityLights = [
  { name: "Tokyo", lat: 35.7, lon: 139.8, size: 0.62 },
  { name: "Seoul", lat: 37.6, lon: 127, size: 0.42 },
  { name: "Shanghai", lat: 31.2, lon: 121.5, size: 0.48 },
  { name: "Delhi", lat: 28.6, lon: 77.2, size: 0.44 },
  { name: "Mumbai", lat: 19.1, lon: 72.9, size: 0.38 },
  { name: "Bangkok", lat: 13.8, lon: 100.5, size: 0.34 },
  { name: "Jakarta", lat: -6.2, lon: 106.8, size: 0.32 },
  { name: "Cairo", lat: 30, lon: 31.2, size: 0.34 },
  { name: "Istanbul", lat: 41, lon: 29, size: 0.34 },
  { name: "London", lat: 51.5, lon: -0.1, size: 0.42 },
  { name: "Paris", lat: 48.9, lon: 2.3, size: 0.36 },
  { name: "Berlin", lat: 52.5, lon: 13.4, size: 0.3 },
  { name: "Lagos", lat: 6.5, lon: 3.4, size: 0.34 },
  { name: "New York", lat: 40.7, lon: -74, size: 0.58 },
  { name: "Boston", lat: 42.4, lon: -71.1, size: 0.28 },
  { name: "Washington", lat: 38.9, lon: -77, size: 0.34 },
  { name: "Chicago", lat: 41.9, lon: -87.6, size: 0.38 },
  { name: "Toronto", lat: 43.7, lon: -79.4, size: 0.34 },
  { name: "Los Angeles", lat: 34.1, lon: -118.2, size: 0.38 },
  { name: "Mexico City", lat: 19.4, lon: -99.1, size: 0.36 },
  { name: "Sao Paulo", lat: -23.5, lon: -46.6, size: 0.4 },
  { name: "Buenos Aires", lat: -34.6, lon: -58.4, size: 0.34 },
];

const worldLandTopology = landTopology as unknown as Parameters<typeof feature>[0];
const worldLandObject = (landTopology as unknown as {
  objects: { land: Parameters<typeof feature>[1] };
}).objects.land;
const realLand = feature(worldLandTopology, worldLandObject);

const graticule = geoGraticule10();

function currentStepIndex(step: CreateStep) {
  if (step === "date") return 0;
  if (step === "time") return 1;
  return 2;
}

function StepProgress({
  step,
  config,
  placeConfirmed,
  dateConfirmed,
  timeConfirmed,
  onStepSelect,
}: {
  step: CreateStep;
  config: MomentConfig;
  placeConfirmed: boolean;
  dateConfirmed: boolean;
  timeConfirmed: boolean;
  onStepSelect: (step: Exclude<CreateStep, "editor">) => void;
}) {
  const activeIndex = currentStepIndex(step);
  const values = {
    date: config.localDate,
    time: timeConfirmed ? config.localTime : "Waiting for time",
    place: placeConfirmed ? config.placeName : "Waiting for place",
  };
  const completed = {
    date: dateConfirmed,
    time: timeConfirmed,
    place: placeConfirmed,
  };

  return (
    <div className="mx-auto mt-5 w-full max-w-2xl">
      <div className="flex items-center justify-center gap-4 text-[0.68rem] font-black uppercase tracking-[0.2em] sm:gap-7">
        {createSteps.map((item, index) => {
          const active = index === activeIndex && step !== "editor";
          const complete = completed[item.id];
          return (
            <button
              className={`min-w-0 rounded-xl px-2 py-1 text-center transition duration-500 ${
                active
                  ? "text-brand"
                  : complete
                    ? "text-starlight/78 hover:text-brand"
                    : "text-starlight/44 hover:text-starlight/68"
              }`}
              key={item.id}
              onClick={() => onStepSelect(item.id)}
              type="button"
            >
              <span className="block">
                0{index + 1} {item.label} {complete ? "✓" : ""}
              </span>
              <span className="mt-1 block max-w-[8rem] truncate text-[0.68rem] font-semibold normal-case tracking-normal opacity-55">
                {active || complete ? values[item.id] : "Awaiting"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function globeProjection(centerLongitude: number, centerLatitude: number) {
  return geoOrthographic()
    .rotate([-centerLongitude, -centerLatitude])
    .translate([50, 50])
    .scale(49)
    .clipAngle(90);
}

function projectPlace(
  latitude: number,
  longitude: number,
  projection: ReturnType<typeof globeProjection>,
) {
  const point = projection([longitude, latitude]);
  if (!point) return null;
  return { x: point[0], y: point[1] };
}

function lightingForTime(localTime: string) {
  const [hour = 12, minute = 0] = localTime.split(":").map(Number);
  const decimal = hour + minute / 60;
  const dayProgress = decimal / 24;
  const sunAngle = dayProgress * Math.PI * 2 - Math.PI / 2;
  return {
    lightX: 50 + Math.cos(sunAngle) * 28,
    lightY: 50 + Math.sin(sunAngle) * 18,
    terminator: 48 + Math.cos(dayProgress * Math.PI * 2) * 18,
    nightOpacity: 0.44 + Math.max(0, Math.sin((decimal / 24) * Math.PI * 2)) * 0.16,
  };
}

function AwakeningEarth({
  sky,
  config,
  placeConfirmed,
  dateConfirmed,
  timeConfirmed,
}: {
  sky: SkyComputation;
  config: MomentConfig;
  placeConfirmed: boolean;
  dateConfirmed: boolean;
  timeConfirmed: boolean;
}) {
  const stagePower =
    0.2 + (dateConfirmed ? 0.2 : 0) + (timeConfirmed ? 0.3 : 0) + (placeConfirmed ? 0.3 : 0);
  const starCount = 240;
  const starVisibility = stagePower;
  const stars = sky.stars.slice(0, starCount);
  const targetLongitude = config.longitude;
  const targetLatitude = placeConfirmed ? clamp(config.latitude * 0.38, -22, 28) : 8;
  const [displayCenter, setDisplayCenter] = useState({
    latitude: 8,
    longitude: -30,
  });
  const displayCenterRef = useRef(displayCenter);
  const dateAwake = dateConfirmed;
  const timeAwake = timeConfirmed;
  const projection = globeProjection(displayCenter.longitude, displayCenter.latitude);
  const geoPainter = geoPath(projection);
  const landD = geoPainter(realLand) ?? "";
  const graticuleD = geoPainter(graticule) ?? "";
  const marker = projectPlace(config.latitude, config.longitude, projection);
  const lighting = lightingForTime(config.localTime);
  const landOpacity = dateAwake ? 0.42 : 0.26;
  const lightOpacity = dateAwake ? 0.26 : 0.08;

  useEffect(() => {
    if (placeConfirmed) return;

    let frame = 0;
    let previous = performance.now();

    function tick(now: number) {
      const deltaSeconds = (now - previous) / 1000;
      previous = now;
      setDisplayCenter((current) => ({
        latitude: 8,
        longitude: current.longitude + deltaSeconds * 1.8,
      }));
      frame = window.requestAnimationFrame(tick);
    }

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [placeConfirmed]);

  useEffect(() => {
    if (!placeConfirmed) return;

    let frame = 0;
    const start = performance.now();
    const from = displayCenterRef.current;
    const duration = 1900;
    const easeOutCubic = (value: number) => 1 - Math.pow(1 - value, 3);

    function tick(now: number) {
      const progress = Math.min(1, (now - start) / duration);
      const eased = easeOutCubic(progress);
      setDisplayCenter({
        latitude: from.latitude + (targetLatitude - from.latitude) * eased,
        longitude: from.longitude + (targetLongitude - from.longitude) * eased,
      });

      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    }

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [config.latitude, config.longitude, placeConfirmed, targetLatitude, targetLongitude]);

  useEffect(() => {
    displayCenterRef.current = displayCenter;
  }, [displayCenter]);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 transition duration-[1600ms]"
        style={{
          background: `radial-gradient(circle at 50% 44%, rgba(205,168,97,${0.06 + 0.08 * stagePower}), transparent 31%), radial-gradient(circle at 30% 74%, rgba(143,199,255,${0.08 * stagePower}), transparent 34%), radial-gradient(circle at 72% 22%, rgba(117,93,180,${0.08 * stagePower}), transparent 30%)`,
        }}
      />
      <svg className="absolute inset-0 h-full w-full opacity-80" viewBox="0 0 100 100">
        <path
          d="M -8 82 C 18 54, 38 61, 61 36 S 101 13, 111 -2"
          fill="none"
          opacity={0.12 * stagePower}
          stroke="#cda861"
          strokeLinecap="round"
          strokeWidth="8"
        />
      </svg>
      {stars.map((star, index) => (
        <span
          className="absolute rounded-full bg-starlight transition-all duration-[1300ms]"
          key={star.id}
          style={{
            left: `${star.x * 100}%`,
            top: `${star.y * 100}%`,
            width: Math.max(1.2, star.major ? 5.8 - star.magnitude * 0.5 : 3.2 - star.magnitude * 0.22),
            height: Math.max(1.2, star.major ? 5.8 - star.magnitude * 0.5 : 3.2 - star.magnitude * 0.22),
            opacity: star.major
              ? Math.min(0.95, 0.22 + starVisibility * 0.72)
              : index / starCount <= starVisibility
                ? Math.min(0.58, (0.08 + index / 720) * starVisibility)
                : 0,
            boxShadow: star.major
              ? `0 0 ${18 + stagePower * 30}px rgba(213, 173, 97, ${0.14 + stagePower * 0.18})`
              : undefined,
            transitionDelay: `${(index % 36) * 26}ms`,
          }}
        />
      ))}
      <div className="absolute left-1/2 top-[47%] h-[min(64vw,64vh,740px)] w-[min(64vw,64vh,740px)] -translate-x-1/2 -translate-y-1/2">
        <div
          className={`sky-earth absolute inset-0 rounded-full transition duration-[2000ms] ${
            dateAwake ? "sky-earth-awake" : "sky-earth-dormant"
          } ${placeConfirmed ? "sky-earth-arrived" : ""}`}
          style={{
            ["--earth-light-x" as string]: `${timeAwake ? lighting.lightX : 38}%`,
            ["--earth-light-y" as string]: `${timeAwake ? lighting.lightY : 34}%`,
            ["--earth-terminator" as string]: `${timeAwake ? lighting.terminator : 44}%`,
            ["--earth-night-opacity" as string]: `${timeAwake ? lighting.nightOpacity : 0.66}`,
            filter: `brightness(${0.7 + stagePower * 0.24}) saturate(${0.96 + stagePower * 0.18})`,
          }}
        >
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
            <defs>
              <clipPath id="earth-disc">
                <circle cx="50" cy="50" r="49" />
              </clipPath>
            </defs>
            <g clipPath="url(#earth-disc)">
              <path
                d={graticuleD}
                fill="none"
                opacity={dateAwake ? 0.035 : 0.018}
                stroke="#8fc7ff"
                strokeWidth="0.12"
              />
              <path
                d={landD}
                fill="#476a63"
                opacity={landOpacity}
                stroke="#9fc7c3"
                strokeOpacity={dateAwake ? 0.2 : 0.1}
                strokeWidth="0.16"
              />
              <g opacity={lightOpacity}>
                {cityLights.map((light) => {
                  const p = projectPlace(light.lat, light.lon, projection);
                  if (!p) return null;
                  return (
                    <circle
                      cx={p.x}
                      cy={p.y}
                      fill="#cda861"
                      key={light.name}
                      opacity={0.35 + stagePower * 0.38}
                      r={light.size}
                    />
                  );
                })}
              </g>
            </g>
          </svg>
          <div className="sky-earth-drift absolute inset-0 rounded-full" />
          <div className="absolute inset-[7%] rounded-full border border-aurora/5" />
          <div className="sky-earth-shade absolute inset-0 rounded-full" />
          {placeConfirmed && marker && (
            <span
              className="sky-earth-marker absolute rounded-full border border-brand bg-brand shadow-[0_0_34px_rgba(205,168,97,0.85)]"
              style={{
                height: 13,
                left: `${marker.x}%`,
                top: `${marker.y}%`,
                transform: "translate(-50%, -50%)",
                width: 13,
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function formatPrice(value: number) {
  return `$${value.toFixed(2)}`;
}

function PosterPreview({
  config,
  sky,
  className = "max-w-[25rem]",
}: {
  config: MomentConfig;
  sky: SkyComputation;
  className?: string;
}) {
  const previewUrl = useMemo(
    () => svgDataUrl(createArtworkSvg(createArtworkScene(config, sky))),
    [config, sky],
  );

  return (
    <div
      aria-label={`${config.title} personalized star map preview`}
      className={`mx-auto aspect-[3508/4961] w-full rounded-[1.35rem] border border-white/10 bg-cover bg-center shadow-soft ${className}`}
      role="img"
      style={{ backgroundImage: `url("${previewUrl}")` }}
    />
  );
}

function CosmicSignaturePreview({
  config,
  sky,
  className = "max-w-[25rem]",
}: {
  config: MomentConfig;
  sky: SkyComputation;
  className?: string;
}) {
  const previewUrl = useMemo(() => {
    const signatureConfig = resolveMomentConfig({
      ...config,
      productType: "cosmic-signature",
      title: "YOUR COSMIC SIGNATURE",
      message: "Built from your exact date, time, and location.",
    });
    return svgDataUrl(
      createCosmicSignatureSvg(createCosmicSignatureScene(signatureConfig, sky)),
    );
  }, [config, sky]);

  return (
    <div
      aria-label="Your Cosmic Signature preview"
      className={`mx-auto aspect-[3508/4961] w-full rounded-[1.2rem] border border-white/10 bg-cover bg-center shadow-soft ${className}`}
      role="img"
      style={{ backgroundImage: `url("${previewUrl}")` }}
    />
  );
}

function CosmicStructureReveal({ phase }: { phase: CosmicRevealPhase }) {
  return (
    <div className={`sky-signature-structure sky-signature-${phase}`} aria-hidden="true">
      <span className="sky-structure-moon" />
      <span className="sky-structure-ring sky-structure-ring-1" />
      <span className="sky-structure-ring sky-structure-ring-2" />
      <span className="sky-structure-ring sky-structure-ring-3" />
      <span className="sky-structure-axis sky-structure-axis-a" />
      <span className="sky-structure-axis sky-structure-axis-b" />
      <span className="sky-structure-planet sky-structure-planet-a" />
      <span className="sky-structure-planet sky-structure-planet-b" />
      <span className="sky-structure-planet sky-structure-planet-c" />
    </div>
  );
}

function PurchaseSummary({
  selection,
  summaryRef,
}: {
  selection: PurchaseSelection;
  summaryRef: RefObject<HTMLDivElement | null>;
}) {
  const includesSignature = selection === "bundle";
  const total = PRODUCT_PRICE + (includesSignature ? PRODUCT_PRICE : 0);

  return (
    <section
      className="mx-auto w-full max-w-3xl py-16 sm:py-20"
      ref={summaryRef}
    >
      <div className="rounded-[1.5rem] border border-brand/24 bg-white/[0.055] p-6 shadow-soft backdrop-blur-xl sm:p-8">
        <p className="text-xs font-black uppercase tracking-[0.26em] text-brand">
          Your Selection
        </p>
        <h2 className="mt-3 text-3xl font-black text-starlight sm:text-4xl">
          {selection ? "Choose what to keep." : "Your artwork is waiting."}
        </h2>
        <div className="mt-8 space-y-4">
          <div className="flex items-center justify-between gap-6 border-b border-white/10 pb-4">
            <div>
              <p className="font-bold text-starlight">Your Sky</p>
              <p className="mt-1 text-sm text-starlight/50">Personal celestial artwork</p>
            </div>
            <p className="font-black text-starlight">{formatPrice(PRODUCT_PRICE)}</p>
          </div>
          {includesSignature && (
            <div className="flex items-center justify-between gap-6 border-b border-white/10 pb-4">
              <div>
                <p className="font-bold text-starlight">Your Cosmic Signature</p>
                <p className="mt-1 text-sm text-starlight/50">The second artwork from this moment</p>
              </div>
              <p className="font-black text-starlight">{formatPrice(PRODUCT_PRICE)}</p>
            </div>
          )}
          <div className="flex items-center justify-between gap-6 pt-2">
            <p className="text-sm font-black uppercase tracking-[0.22em] text-brand">
              Total
            </p>
            <p className="text-3xl font-black text-starlight">
              {formatPrice(total)}
            </p>
          </div>
        </div>
        <button
          className="mt-8 inline-flex min-h-14 w-full items-center justify-center rounded-full border border-white/15 px-6 text-sm font-black uppercase tracking-[0.16em] text-starlight/70"
          disabled
        >
          Continue to Checkout
        </button>
        <p className="mt-3 text-center text-xs leading-5 text-starlight/42">
          Checkout is the next step. Your selection is saved here for the purchase flow.
        </p>
      </div>
    </section>
  );
}

function ArtStylePreview({ variant }: { variant: "classic" | "foil" | "glow" | "canvas" }) {
  const isLight = variant === "classic" || variant === "canvas";
  const isFoil = variant === "foil";
  const isGlow = variant === "glow";

  return (
    <span
      className={`relative block aspect-[4/3] overflow-hidden rounded-md border ${
        isLight ? "border-slate-300 bg-[#f4f0e8]" : "border-slate-800 bg-slate-950"
      }`}
    >
      <span
        className={`absolute left-1/2 top-1/2 h-[72%] w-[72%] -translate-x-1/2 -translate-y-1/2 rounded-full ${
          isGlow
            ? "bg-[#b9ffad]"
            : isFoil
              ? "bg-[#e3bd42]"
              : isLight
                ? "bg-[#f7f2e7]"
                : "bg-[#f6f3eb]"
        }`}
      />
      <span className="absolute left-[22%] top-1/2 w-[56%] border-t border-slate-500/35" />
      <span className="absolute left-1/2 top-[18%] h-[64%] border-l border-slate-500/30" />
      <span className="absolute inset-[24%] rounded-full border border-slate-500/40" />
      <span className="absolute inset-[33%] rounded-full border border-slate-500/25" />
      {Array.from({ length: 28 }, (_, index) => (
        <span
          className={`absolute h-0.5 w-0.5 rounded-full ${
            isFoil || isGlow ? "bg-slate-950/70" : "bg-slate-950/65"
          }`}
          key={index}
          style={{
            left: `${18 + ((index * 17) % 63)}%`,
            top: `${18 + ((index * 29) % 60)}%`,
          }}
        />
      ))}
    </span>
  );
}

function CustomizeEditor({
  config,
  sky,
  editorStep,
  setEditorStep,
  patchMoment,
  confirmSky,
}: {
  config: MomentConfig;
  sky: SkyComputation;
  editorStep: EditorStep;
  setEditorStep: (step: EditorStep) => void;
  patchMoment: (patch: Partial<MomentConfig>) => void;
  confirmSky: () => void;
}) {
  const nextLabel =
    editorStep === "style"
      ? "Continue to Personalize"
      : editorStep === "personalize"
        ? "Review My Sky"
        : "This Is My Sky";
  const nextAction =
    editorStep === "style"
      ? () => setEditorStep("personalize")
      : editorStep === "personalize"
        ? () => setEditorStep("complete")
        : confirmSky;

  return (
    <div className="fixed inset-0 z-20 grid bg-[#ececec] pt-[4.1rem] text-slate-950 lg:grid-cols-[minmax(0,1fr)_28rem]">
      <section className="flex min-h-0 items-center justify-center overflow-auto bg-[#ededed] px-8 py-8">
        <PosterPreview
          className="h-[min(84vh,58rem)] !w-auto max-w-[68vw] rounded-none border-0 shadow-[0_24px_80px_rgba(15,23,42,0.22)]"
          config={config}
          sky={sky}
        />
      </section>

      <aside className="flex min-h-0 flex-col border-l border-slate-200 bg-white shadow-[-20px_0_60px_rgba(15,23,42,0.06)]">
        <div className="border-b border-slate-200 px-6 py-5">
          <div className="flex gap-4 text-sm font-bold">
            <button className="border-b-2 border-slate-950 pb-2 text-slate-950">
              Your Sky
            </button>
            <button className="pb-2 text-slate-300" disabled>
              Cosmic Signature
            </button>
          </div>
          <div className="mt-5 grid grid-cols-3 text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">
            {(["style", "personalize", "complete"] as const).map((item, index) => (
              <button
                className={editorStep === item ? "text-slate-950" : "text-slate-400"}
                key={item}
                onClick={() => setEditorStep(item)}
              >
                {index + 1}. {item}
              </button>
            ))}
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
          <h2 className="font-serif text-3xl font-bold text-slate-950">
            Create your sky
          </h2>
          <p className="mt-2 text-sm font-semibold text-slate-600">
            Digital artwork from {formatPrice(PRODUCT_PRICE)}
          </p>

          {editorStep === "style" && (
            <div className="mt-7 space-y-7">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-slate-700">
                  Artwork Format
                </h3>
                <div className="mt-3 rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-sm">
                  <p className="text-sm font-black text-slate-950">Digital Artwork</p>
                  <p className="mt-1 text-xs font-semibold text-slate-500">
                    High-resolution PNG and PDF files.
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-slate-700">
                  Art Style
                </h3>
                <div className="mt-3 grid grid-cols-2 gap-3">
                  {artStyleOptions.map((option) => (
                    <button
                      className={`rounded-xl border bg-white p-2 text-left text-sm font-bold shadow-sm transition ${
                        config.artStyle === option.id
                          ? "border-slate-950 ring-1 ring-slate-950"
                          : "border-slate-200 text-slate-500 hover:border-slate-400"
                      }`}
                      key={option.id}
                      onClick={() => patchMoment(option.patch)}
                    >
                      <ArtStylePreview variant={option.preview} />
                      <span className="mt-3 block text-slate-950">{option.label}</span>
                      <span className="mt-1 block text-xs font-semibold leading-5 text-slate-500">
                        {option.note}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-sm font-bold uppercase tracking-[0.12em] text-slate-700">
                  Color Palette
                </h3>
                <div className="mt-3 grid grid-cols-4 gap-3 rounded-xl bg-slate-100 p-3">
                  {paletteOptions.map((option) => (
                    <button
                      className={`rounded-xl p-2 text-center text-xs font-semibold ${
                        config.colorPalette === option.id
                          ? "bg-white ring-2 ring-slate-950"
                          : "text-slate-500"
                      }`}
                      key={option.id}
                      onClick={() =>
                        patchMoment({
                          colorPalette: option.id,
                          style: option.style,
                        })
                      }
                    >
                      <span
                        className="mx-auto block h-14 w-14 rounded-full"
                        style={{ background: option.swatch }}
                      />
                      <span className="mt-2 block">{option.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {editorStep === "personalize" && (
            <div className="mt-7 space-y-5 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <label className="block text-sm font-bold uppercase tracking-[0.12em] text-slate-700">
                Poster Title
                <input
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-950 normal-case tracking-normal outline-none placeholder:text-slate-400 focus:border-slate-950"
                  onChange={(event) => patchMoment({ title: event.target.value })}
                  value={config.title}
                />
              </label>
              <label className="block text-sm font-bold uppercase tracking-[0.12em] text-slate-700">
                Message
                <input
                  className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-950 normal-case tracking-normal outline-none placeholder:text-slate-400 focus:border-slate-950"
                  onChange={(event) => patchMoment({ message: event.target.value })}
                  value={config.message}
                />
              </label>
            </div>
          )}

          {editorStep === "complete" && (
            <div className="mt-7 rounded-xl bg-slate-100 p-4 text-sm leading-6 text-slate-600">
              <p className="font-bold text-slate-950">Review your artwork.</p>
              <p className="mt-2">
                The preview on the left reflects your current palette, map style,
                visible elements, title, and message.
              </p>
            </div>
          )}
        </div>

        <div className="border-t border-slate-200 bg-white p-6">
          <button
            className="min-h-14 w-full rounded-full bg-slate-950 px-6 text-sm font-black uppercase tracking-[0.14em] text-white transition hover:bg-slate-800"
            onClick={nextAction}
          >
            {nextLabel}
          </button>
        </div>
      </aside>
    </div>
  );
}

export function SkyExperience() {
  const [step, setStep] = useState<CreateStep>("date");
  const [config, setConfig] = useState<MomentConfig>(defaultMomentConfig);
  const [placeQuery, setPlaceQuery] = useState(defaultMomentConfig.placeName);
  const [placeResults, setPlaceResults] = useState<PlaceSearchResult[]>([]);
  const [placeError, setPlaceError] = useState("");
  const [placeSearching, setPlaceSearching] = useState(false);
  const [dateConfirmed, setDateConfirmed] = useState(false);
  const [timeConfirmed, setTimeConfirmed] = useState(false);
  const [placeConfirmed, setPlaceConfirmed] = useState(false);
  const [purchaseSelection, setPurchaseSelection] = useState<PurchaseSelection>(null);
  const [postRevealState, setPostRevealState] =
    useState<PostRevealState>("sky-revealing");
  const [cosmicRevealPhase, setCosmicRevealPhase] =
    useState<CosmicRevealPhase>("moon");
  const [editorStep, setEditorStep] = useState<EditorStep>("style");
  const [isPending, startTransition] = useTransition();
  const purchaseSummaryRef = useRef<HTMLDivElement | null>(null);

  const sky = useMemo(() => computeSky(config), [config]);

  function patchMoment(patch: Partial<MomentConfig>) {
    startTransition(() => {
      setConfig((current) =>
        resolveMomentConfig({
          ...current,
          ...patch,
        }),
      );
    });
  }

  function choosePlace(place: PlaceSearchResult) {
    patchMoment(place);
    setPlaceQuery(place.placeName);
    setPlaceResults([]);
    setPlaceConfirmed(true);
  }

  function confirmDate() {
    setDateConfirmed(true);
    setStep("time");
  }

  function confirmTime() {
    setTimeConfirmed(true);
    setStep("place");
  }

  function editCreateStep(nextStep: Exclude<CreateStep, "editor">) {
    setStep(nextStep);
    setPlaceResults([]);
    setPlaceError("");
  }

  function choosePurchase(selection: Exclude<PurchaseSelection, null>) {
    setPurchaseSelection(selection);
    setPostRevealState("purchase-selection");
    window.setTimeout(() => {
      purchaseSummaryRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 80);
  }

  function confirmSky() {
    setEditorStep("style");
    setPostRevealState("sky-confirmed");
    setCosmicRevealPhase("moon");
    window.setTimeout(() => setPostRevealState("meteor-reveal"), 450);
    window.setTimeout(() => setPostRevealState("cosmic-signature-revealed"), 7400);
    window.setTimeout(() => setCosmicRevealPhase("partial"), 8400);
    window.setTimeout(() => setCosmicRevealPhase("full"), 9800);
    window.setTimeout(() => setCosmicRevealPhase("poster"), 11400);
  }

  function revealSky() {
    setPostRevealState("sky-revealing");
    setPurchaseSelection(null);
    setCosmicRevealPhase("moon");
    setEditorStep("style");
    setStep("editor");
  }

  useEffect(() => {
    if (step !== "editor") return;

    const customizeTimer = window.setTimeout(() => {
      setPostRevealState("customizing");
    }, 2200);

    return () => {
      window.clearTimeout(customizeTimer);
    };
  }, [step]);

  useEffect(() => {
    if (
      postRevealState !== "cosmic-signature-revealed" ||
      cosmicRevealPhase !== "poster"
    ) {
      return;
    }

    const section = document.getElementById("create");
    window.scrollTo({
      top: section ? section.offsetTop : 0,
      behavior: "smooth",
    });
  }, [cosmicRevealPhase, postRevealState]);

  const searchPlaces = useCallback(async (options?: { quiet?: boolean }) => {
    const query = placeQuery.trim();
    if (query.length < 3) {
      if (!options?.quiet) {
        setPlaceError("Enter at least 3 characters, then search.");
      }
      setPlaceResults([]);
      return;
    }

    setPlaceSearching(true);
    setPlaceError("");

    try {
      const response = await fetch(`/api/place-search?q=${encodeURIComponent(query)}`);
      const data = (await response.json()) as {
        results?: PlaceSearchResult[];
        error?: string;
      };
      setPlaceResults(data.results ?? []);
      setPlaceError(
        data.error ??
          (data.results?.length || options?.quiet
            ? ""
            : "No places found. Try a nearby city."),
      );
    } catch {
      if (!options?.quiet) {
        setPlaceError("Place search is temporarily unavailable.");
      }
    } finally {
      setPlaceSearching(false);
    }
  }, [placeQuery]);

  useEffect(() => {
    if (step !== "place" || placeConfirmed) return;

    const query = placeQuery.trim();
    if (query.length < 3) {
      return;
    }

    const timeout = window.setTimeout(() => {
      void searchPlaces({ quiet: true });
    }, 650);

    return () => window.clearTimeout(timeout);
  }, [placeQuery, placeConfirmed, searchPlaces, step]);

  const stepControl = (
    <div className="mx-auto mt-8 w-full max-w-xl">
      {step === "date" && (
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand">
            Date
          </p>
          <h2 className="mt-3 text-2xl font-black text-starlight sm:text-3xl">
            Choose the day this universe remembers.
          </h2>
          <input
            className="mt-6 min-h-16 w-full rounded-full border border-white/12 bg-white/[0.08] px-6 text-center text-lg font-semibold text-starlight outline-none shadow-[0_18px_60px_rgba(0,0,0,0.24)] backdrop-blur-xl transition focus:border-brand focus:bg-white/[0.12]"
            max={new Date().toISOString().slice(0, 10)}
            min="1900-01-01"
            onChange={(event) => patchMoment({ localDate: event.target.value })}
            type="date"
            value={config.localDate}
          />
          <button
            className="mt-6 inline-flex min-h-16 w-full items-center justify-center rounded-full bg-brand px-8 text-base font-black uppercase tracking-[0.14em] text-midnight shadow-[0_0_44px_rgba(205,168,97,0.24)] transition hover:bg-starlight"
            onClick={confirmDate}
          >
            Continue to Time
          </button>
        </div>
      )}

      {step === "time" && (
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand">
            Time
          </p>
          <h2 className="mt-3 text-2xl font-black text-starlight sm:text-3xl">
            Let the hour shape the sky.
          </h2>
          <input
            className="mt-6 min-h-16 w-full rounded-full border border-white/12 bg-white/[0.08] px-6 text-center text-lg font-semibold text-starlight outline-none shadow-[0_18px_60px_rgba(0,0,0,0.24)] backdrop-blur-xl transition focus:border-brand focus:bg-white/[0.12]"
            onChange={(event) =>
              patchMoment({
                localTime: event.target.value,
                timeAccuracy: "exact-time",
              })
            }
            type="time"
            value={config.localTime}
          />
          <button
            className="mt-6 inline-flex min-h-16 w-full items-center justify-center rounded-full bg-brand px-8 text-base font-black uppercase tracking-[0.14em] text-midnight shadow-[0_0_44px_rgba(205,168,97,0.24)] transition hover:bg-starlight"
            onClick={confirmTime}
          >
            Continue to Place
          </button>
        </div>
      )}

      {step === "place" && (
        <div className="text-center">
          <p className="text-sm font-bold uppercase tracking-[0.22em] text-brand">
            Place
          </p>
          <h2 className="mt-3 text-2xl font-black text-starlight sm:text-3xl">
            Anchor the moment on Earth.
          </h2>
          <input
            className="mt-6 min-h-16 w-full rounded-full border border-white/12 bg-white/[0.08] px-6 text-center text-lg font-semibold text-starlight outline-none shadow-[0_18px_60px_rgba(0,0,0,0.24)] backdrop-blur-xl transition focus:border-brand focus:bg-white/[0.12]"
            onChange={(event) => {
              setPlaceQuery(event.target.value);
              setPlaceResults([]);
              setPlaceError("");
              setPlaceConfirmed(false);
            }}
            onKeyDown={(event) => {
              if (event.key === "Enter") {
                event.preventDefault();
                void searchPlaces();
              }
            }}
            placeholder="Search a city, town, or place"
            value={placeQuery}
          />
          <div className="mt-4 min-h-[8.5rem]">
            {placeSearching && (
              <p className="text-sm text-starlight/50">Listening for this place...</p>
            )}
            {!placeConfirmed && placeResults.length > 0 && (
              <div className="mx-auto grid max-w-lg gap-2 rounded-[1.25rem] border border-white/10 bg-midnight/68 p-2 text-left shadow-soft backdrop-blur-xl">
                {placeResults.slice(0, 4).map((place) => (
                  <button
                    className="rounded-2xl px-4 py-3 text-left transition hover:bg-brand/12"
                    key={`${place.placeName}-${place.latitude}-${place.longitude}`}
                    onClick={() => choosePlace(place)}
                  >
                    <span className="block text-sm font-bold text-starlight">
                      {place.placeName}
                    </span>
                    <span className="mt-1 block text-xs text-starlight/48">
                      {place.country} - {place.timezone}
                    </span>
                  </button>
                ))}
              </div>
            )}
            {placeConfirmed && (
              <div className="sky-anchor-confirmation mx-auto max-w-lg rounded-full border border-brand/35 bg-brand/12 px-5 py-3 text-sm font-bold text-starlight">
                Your moment is anchored.
              </div>
            )}
            {placeError && <p className="mt-3 text-sm text-brand">{placeError}</p>}
          </div>
          <button
            className={`inline-flex min-h-16 w-full items-center justify-center rounded-full bg-brand px-8 text-base font-black uppercase tracking-[0.14em] text-midnight shadow-[0_0_44px_rgba(205,168,97,0.24)] transition hover:bg-starlight disabled:cursor-not-allowed disabled:opacity-45 ${
              placeConfirmed ? "sky-reveal-ready" : ""
            }`}
            disabled={!placeConfirmed}
            onClick={revealSky}
          >
            Reveal My Sky
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="bg-midnight text-starlight">
      <section
        className="relative min-h-[calc(100vh+10rem)] overflow-hidden border-b border-white/10"
        id="create"
      >
        {step !== "editor" && (
          <AwakeningEarth
            config={config}
            dateConfirmed={dateConfirmed}
            placeConfirmed={placeConfirmed}
            sky={sky}
            timeConfirmed={timeConfirmed}
          />
        )}
        <div className="relative mx-auto flex min-h-[calc(100vh+10rem)] max-w-7xl flex-col px-6 py-12 lg:px-8">
          {step !== "editor" ? (
            <div className="flex flex-1 flex-col items-center justify-between text-center">
              <div className="w-full">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-brand">
                  THE SKY REMEMBERS
                </p>
                <h1 className="mx-auto mt-5 max-w-4xl text-4xl font-black leading-[0.98] tracking-normal text-starlight sm:text-5xl lg:text-6xl">
                  What did the universe look like at your moment?
                </h1>
                <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-starlight/72 sm:text-xl">
                  Turn a real sky from a real moment into a personal piece of
                  celestial art.
                </p>
                <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-brand/90 sm:text-base">
                  Date, time, and place wake the stars before the sky settles
                  into your print.
                </p>
                <StepProgress
                  config={config}
                  dateConfirmed={dateConfirmed}
                  onStepSelect={editCreateStep}
                  placeConfirmed={placeConfirmed}
                  step={step}
                  timeConfirmed={timeConfirmed}
                />
              </div>

              <div className="h-[min(43vw,43vh,430px)] shrink-0" />

              <div className="w-full pb-3">
                {stepControl}
                {isPending && (
                  <p className="mt-4 text-center text-xs text-brand">
                    The moment is shifting...
                  </p>
                )}
              </div>
            </div>
          ) : (
            <div className="sky-post-reveal mx-auto flex min-h-[calc(100vh-6rem)] w-full max-w-6xl flex-col items-center justify-center py-10 text-center">
              {(postRevealState === "sky-revealing" ||
                postRevealState === "sky-confirmed") && (
                <div className="flex w-full flex-1 flex-col items-center justify-center">
                  <div
                    className={`sky-artwork-arrival w-full ${
                      postRevealState === "sky-revealing"
                        ? "sky-artwork-revealing"
                        : "sky-artwork-settled"
                    } ${postRevealState === "sky-confirmed" ? "sky-artwork-confirmed" : ""}`}
                  >
                    <PosterPreview
                      className="h-[min(76vh,52rem)] !w-auto max-w-[88vw] transition duration-700"
                      config={config}
                      sky={sky}
                    />
                  </div>

                  {postRevealState !== "sky-revealing" && (
                    <div className="sky-soft-enter mt-7">
                      <p className="text-xs font-black uppercase tracking-[0.28em] text-brand">
                        This is your sky.
                      </p>
                      <h2 className="mt-3 text-3xl font-black text-starlight sm:text-4xl">
                        Make it yours.
                      </h2>
                    </div>
                  )}

                </div>
              )}

              {postRevealState === "customizing" && (
                <CustomizeEditor
                  config={config}
                  confirmSky={confirmSky}
                  editorStep={editorStep}
                  patchMoment={patchMoment}
                  setEditorStep={setEditorStep}
                  sky={sky}
                />
              )}

              {postRevealState === "meteor-reveal" && (
                <div className="sky-meteor-stage relative flex min-h-[calc(100vh-8rem)] w-full items-center justify-center overflow-hidden">
                  <div className="sky-confirmed-sky absolute inset-x-0 top-8 opacity-25">
                    <PosterPreview
                      className="max-w-[min(22rem,62vw)]"
                      config={config}
                      sky={sky}
                    />
                  </div>
                  <div
                    className={`sky-meteor sky-meteor-${config.style}`}
                    aria-hidden="true"
                  />
                  <div className="sky-celestial-flash" aria-hidden="true" />
                  <div className="relative z-10 mx-auto max-w-4xl px-6">
                    <p className="sky-meteor-line sky-meteor-line-1 text-sm font-black uppercase tracking-[0.26em] text-brand">
                      We found something that belongs to this moment.
                    </p>
                    <p className="sky-meteor-line sky-meteor-line-2 mt-6 text-2xl font-black uppercase tracking-[0.08em] text-starlight sm:text-4xl">
                      Every moment leaves a celestial signature.
                    </p>
                    <p className="sky-meteor-line sky-meteor-line-3 mt-6 text-xl font-semibold text-starlight/78 sm:text-2xl">
                      This one is yours.
                    </p>
                  </div>
                </div>
              )}

              {(postRevealState === "cosmic-signature-revealed" ||
                postRevealState === "purchase-selection") && (
                <div className="sky-cosmic-reveal -mx-6 flex min-h-[calc(100vh-5rem)] w-screen flex-1 flex-col items-center justify-center bg-[#efefed] px-6 py-10 text-slate-950 lg:-mx-8">
                  {cosmicRevealPhase === "poster" && (
                    <div className="sky-soft-enter grid w-full max-w-7xl items-center gap-12 text-left lg:grid-cols-[minmax(24rem,0.9fr)_minmax(26rem,0.95fr)]">
                      <div className="order-2 max-w-xl lg:order-1">
                        <p className="text-xs font-black uppercase tracking-[0.24em] text-[#9b7628]">
                          Your Cosmic Signature
                        </p>
                        <h2 className="mt-4 font-serif text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
                          A second artwork from the same moment.
                        </h2>
                        <p className="mt-5 text-lg leading-8 text-slate-600">
                          Your Sky shows the stars above your place. Cosmic Signature
                          turns the same date, time, and location into a companion
                          chart: the moon phase, visible planets, bearings, and star
                          field arranged as a separate celestial portrait.
                        </p>
                        <div className="mt-6 space-y-3 rounded-2xl border border-slate-200 bg-white p-5 text-left text-sm font-semibold leading-6 text-slate-700 shadow-sm">
                          <p>Date and time: {config.localDate} / {config.localTime}</p>
                          <p>Location: {config.placeName}</p>
                          <p>Style follows Your Sky: {posterStyles[config.style].name}</p>
                        </div>
                        {purchaseSelection === "bundle" && (
                          <p className="mt-5 rounded-full border border-[#c8a455]/45 bg-[#ead08a]/25 px-5 py-3 text-center text-sm font-black uppercase tracking-[0.18em] text-[#806019]">
                            Cosmic Signature Added
                          </p>
                        )}
                        {purchaseSelection === "sky" && (
                          <p className="mt-5 rounded-full border border-slate-200 bg-white px-5 py-3 text-center text-sm font-bold text-slate-500">
                            Continuing with Your Sky only
                          </p>
                        )}
                        <div className="mt-6 grid gap-3 sm:grid-cols-2">
                          <button
                            className="inline-flex min-h-14 items-center justify-center rounded-full bg-slate-950 px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-white transition hover:bg-slate-800"
                            onClick={() => choosePurchase("bundle")}
                          >
                            Add Cosmic Signature - {formatPrice(PRODUCT_PRICE)}
                          </button>
                          <button
                            className="inline-flex min-h-14 items-center justify-center rounded-full border border-slate-300 bg-white px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-slate-950 transition hover:border-slate-950"
                            onClick={() => choosePurchase("sky")}
                          >
                            Continue with My Sky
                          </button>
                        </div>
                      </div>
                      <div className="order-1 flex justify-center lg:order-2">
                        <CosmicSignaturePreview
                          className="h-[min(80vh,58rem)] !w-auto max-w-[86vw] rounded-[1.1rem] border border-slate-200 shadow-[0_24px_80px_rgba(15,23,42,0.18)]"
                          config={config}
                          sky={sky}
                        />
                      </div>
                    </div>
                  )}
                  {cosmicRevealPhase !== "poster" && (
                    <div className="sky-cosmic-artwork w-full">
                      <CosmicStructureReveal phase={cosmicRevealPhase} />
                    </div>
                  )}
                  {cosmicRevealPhase === "poster" && (
                    <div className="hidden">
                      {purchaseSelection === "bundle" && (
                        <span />
                      )}
                      {purchaseSelection === "sky" && (
                        <span />
                      )}
                    </div>
                  )}
                  {postRevealState === "purchase-selection" && (
                    <PurchaseSummary
                      selection={purchaseSelection}
                      summaryRef={purchaseSummaryRef}
                    />
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
