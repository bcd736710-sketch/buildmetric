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

const PRODUCT_PRICE = 14.99;

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
}: {
  step: CreateStep;
  config: MomentConfig;
  placeConfirmed: boolean;
}) {
  const activeIndex = currentStepIndex(step);
  const values = {
    date: config.localDate,
    time: config.localTime,
    place: placeConfirmed ? config.placeName : "Waiting for place",
  };

  return (
    <div className="mx-auto mt-5 w-full max-w-2xl">
      <div className="flex items-center justify-center gap-4 text-[0.68rem] font-black uppercase tracking-[0.2em] sm:gap-7">
        {createSteps.map((item, index) => {
          const active = index === activeIndex && step !== "editor";
          const complete =
            index < activeIndex || (item.id === "place" && placeConfirmed);
          return (
            <div
              className={`min-w-0 text-center transition duration-500 ${
                active
                  ? "text-brand"
                  : complete
                    ? "text-starlight/78"
                    : "text-starlight/44"
              }`}
              key={item.id}
            >
              <span className="block">
                0{index + 1} {item.label} {complete ? "✓" : ""}
              </span>
              <span className="mt-1 block max-w-[8rem] truncate text-[0.68rem] font-semibold normal-case tracking-normal opacity-55">
                {active || complete ? values[item.id] : "Awaiting"}
              </span>
            </div>
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
  stage,
  sky,
  config,
  placeConfirmed,
}: {
  stage: CreateStep;
  sky: SkyComputation;
  config: MomentConfig;
  placeConfirmed: boolean;
}) {
  const stagePower = { date: 0.18, time: 0.44, place: 0.72, editor: 1 }[stage];
  const starCount = { date: 54, time: 110, place: 180, editor: 240 }[stage];
  const stars = sky.stars.slice(0, starCount);
  const targetLongitude = placeConfirmed ? config.longitude : -18 + stagePower * 28;
  const targetLatitude = placeConfirmed ? clamp(config.latitude * 0.38, -22, 28) : 8;
  const [displayCenter, setDisplayCenter] = useState({
    latitude: targetLatitude,
    longitude: targetLongitude,
  });
  const displayCenterRef = useRef(displayCenter);
  const dateAwake = stage !== "date";
  const timeAwake = stage === "place" || stage === "editor";
  const projection = globeProjection(displayCenter.longitude, displayCenter.latitude);
  const geoPainter = geoPath(projection);
  const landD = geoPainter(realLand) ?? "";
  const graticuleD = geoPainter(graticule) ?? "";
  const marker = projectPlace(config.latitude, config.longitude, projection);
  const lighting = lightingForTime(config.localTime);
  const landOpacity = dateAwake ? 0.42 : 0.26;
  const lightOpacity = dateAwake ? 0.26 : 0.08;

  useEffect(() => {
    let frame = 0;
    const start = performance.now();
    const from = displayCenterRef.current;
    const duration = placeConfirmed ? 1900 : 900;
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
  }, [placeConfirmed, targetLatitude, targetLongitude]);

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
              ? Math.min(0.95, 0.28 + stagePower * 0.68)
              : Math.min(0.58, (0.1 + index / 640) * stagePower),
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

function StyleThumbnail({
  config,
  sky,
  styleKey,
}: {
  config: MomentConfig;
  sky: SkyComputation;
  styleKey: SkyPosterStyle;
}) {
  const previewUrl = useMemo(() => {
    const styleConfig = resolveMomentConfig({
      ...config,
      style: styleKey,
    });
    return svgDataUrl(createArtworkSvg(createArtworkScene(styleConfig, sky)));
  }, [config, sky, styleKey]);

  return (
    <span
      aria-hidden="true"
      className="block aspect-[3508/4961] w-full rounded-xl border border-white/10 bg-cover bg-center shadow-[0_18px_45px_rgba(0,0,0,0.28)]"
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

export function SkyExperience() {
  const [step, setStep] = useState<CreateStep>("date");
  const [config, setConfig] = useState<MomentConfig>(defaultMomentConfig);
  const [placeQuery, setPlaceQuery] = useState(defaultMomentConfig.placeName);
  const [placeResults, setPlaceResults] = useState<PlaceSearchResult[]>([]);
  const [placeError, setPlaceError] = useState("");
  const [placeSearching, setPlaceSearching] = useState(false);
  const [placeConfirmed, setPlaceConfirmed] = useState(false);
  const [purchaseSelection, setPurchaseSelection] = useState<PurchaseSelection>(null);
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

  function choosePurchase(selection: Exclude<PurchaseSelection, null>) {
    setPurchaseSelection(selection);
    window.setTimeout(() => {
      purchaseSummaryRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }, 80);
  }

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
            onClick={() => setStep("time")}
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
            onClick={() => setStep("place")}
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
            onClick={() => setStep("editor")}
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
        <AwakeningEarth
          config={config}
          placeConfirmed={placeConfirmed}
          sky={sky}
          stage={step}
        />
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
                  placeConfirmed={placeConfirmed}
                  step={step}
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
            <div className="mx-auto w-full max-w-7xl transition-all duration-1000">
              <section className="mx-auto flex min-h-[calc(100vh-7rem)] w-full max-w-5xl flex-col items-center justify-center py-14 text-center sm:py-20">
                <p className="text-xs font-black uppercase tracking-[0.28em] text-brand">
                  Framed from your sky
                </p>
                <h2 className="mt-4 text-4xl font-black leading-tight text-starlight sm:text-5xl">
                  Your moment is ready to become artwork.
                </h2>
                <div className="mt-10 w-full">
                  <PosterPreview
                    className="max-w-[min(28rem,82vw)]"
                    config={config}
                    sky={sky}
                  />
                </div>
              </section>

              <section className="mx-auto w-full max-w-6xl py-14 sm:py-20">
                <div className="mx-auto max-w-3xl text-center">
                  <p className="text-xs font-black uppercase tracking-[0.28em] text-brand">
                    Make it yours
                  </p>
                  <h2 className="mt-4 text-3xl font-black text-starlight sm:text-4xl">
                    Tune the words and the atmosphere.
                  </h2>
                </div>

                <div className="mt-9 rounded-[1.5rem] border border-white/10 bg-white/[0.055] p-5 shadow-soft backdrop-blur-xl sm:p-7">
                  <div className="grid gap-5 md:grid-cols-2">
                    <label className="block text-sm font-bold text-starlight/72">
                      Poster title
                      <input
                        className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 text-starlight outline-none transition focus:border-brand"
                        onChange={(event) => patchMoment({ title: event.target.value })}
                        value={config.title}
                      />
                    </label>

                    <label className="block text-sm font-bold text-starlight/72">
                      Message
                      <input
                        className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 text-starlight outline-none transition focus:border-brand"
                        onChange={(event) => patchMoment({ message: event.target.value })}
                        value={config.message}
                      />
                    </label>
                  </div>

                  <div className="mt-8">
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-starlight/60">
                      Style
                    </p>
                    <div className="mt-4 grid gap-4 md:grid-cols-3">
                      {(Object.keys(posterStyles) as SkyPosterStyle[]).map((styleKey) => (
                        <button
                          className={`group rounded-[1.25rem] border p-3 text-left transition duration-300 ${
                            config.style === styleKey
                              ? "border-brand bg-brand/12 shadow-[0_0_38px_rgba(205,168,97,0.14)]"
                              : "border-white/10 bg-white/[0.04] hover:border-brand/60 hover:bg-white/[0.07]"
                          }`}
                          key={styleKey}
                          onClick={() => patchMoment({ style: styleKey })}
                        >
                          <StyleThumbnail config={config} sky={sky} styleKey={styleKey} />
                          <span className="mt-4 block text-sm font-black uppercase tracking-[0.18em] text-starlight">
                            {posterStyles[styleKey].name}
                          </span>
                          <span className="mt-2 block text-sm leading-5 text-starlight/52">
                            {posterStyles[styleKey].description}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <details className="mt-7 rounded-2xl border border-white/10 bg-midnight/50 p-4">
                    <summary className="cursor-pointer text-sm font-bold uppercase tracking-[0.18em] text-starlight/54">
                      About this sky
                    </summary>
                    <p className="mt-4 text-sm leading-6 text-starlight/62">
                      The final file uses the same composition as this preview:
                      real star positions, restrained constellation linework,
                      moon phase, planet markers, and Milky Way geometry.
                    </p>
                    <p className="mt-3 text-xs leading-5 text-starlight/42">
                      {sky.catalog.renderedStarCount} stars arranged for {config.placeName}.
                      Technical visibility and UTC data stay in the system, not
                      as dominant poster text.
                    </p>
                    {isPending && (
                      <p className="mt-3 text-xs text-brand">Updating your sky...</p>
                    )}
                  </details>
                </div>
              </section>

              <section className="mx-auto w-full max-w-6xl py-16 text-center sm:py-24">
                <p className="text-xs font-black uppercase tracking-[0.28em] text-brand">
                  We found something that belongs to this moment.
                </p>
                <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-black leading-tight text-starlight sm:text-5xl">
                  Every moment leaves a celestial signature.
                </h2>
                <p className="mt-4 text-xl font-semibold text-starlight/78">
                  This one is yours.
                </p>

                <div className="mt-10 grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr]">
                  <CosmicSignaturePreview
                    className="max-w-[min(27rem,82vw)]"
                    config={config}
                    sky={sky}
                  />
                  <div className="text-left">
                    <p className="text-xs font-black uppercase tracking-[0.24em] text-starlight/48">
                      Your Cosmic Signature
                    </p>
                    <p className="mt-4 text-lg leading-8 text-starlight/72">
                      A visual portrait of the celestial arrangement connected to
                      the moment you chose.
                    </p>
                    <p className="mt-3 text-base leading-7 text-starlight/56">
                      Built from your exact date, time, and location.
                    </p>
                    <p className="mt-4 text-sm font-bold text-brand/80">
                      Style follows Your Sky: {posterStyles[config.style].name}
                    </p>
                    {purchaseSelection === "bundle" && (
                      <p className="mt-5 rounded-full border border-brand/28 bg-brand/12 px-5 py-3 text-center text-sm font-black uppercase tracking-[0.18em] text-brand">
                        Cosmic Signature Added
                      </p>
                    )}
                    {purchaseSelection === "sky" && (
                      <p className="mt-5 rounded-full border border-white/12 bg-white/[0.05] px-5 py-3 text-center text-sm font-bold text-starlight/60">
                        Continuing with Your Sky only
                      </p>
                    )}
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      <button
                        className="inline-flex min-h-14 items-center justify-center rounded-full bg-brand px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-midnight transition hover:bg-starlight"
                        onClick={() => choosePurchase("bundle")}
                      >
                        Add My Cosmic Signature - {formatPrice(PRODUCT_PRICE)}
                      </button>
                      <button
                        className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/15 px-5 py-3 text-sm font-black uppercase tracking-[0.12em] text-starlight transition hover:border-brand hover:bg-brand/10"
                        onClick={() => choosePurchase("sky")}
                      >
                        Continue with My Sky
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              <PurchaseSummary
                selection={purchaseSelection}
                summaryRef={purchaseSummaryRef}
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
