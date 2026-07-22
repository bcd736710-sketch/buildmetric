"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import { computeSky, type SkyComputation } from "@/lib/sky/astronomy";
import {
  defaultMomentConfig,
  posterStyles,
  resolveMomentConfig,
  timeAccuracyOptions,
  type MomentConfig,
  type SkyPosterStyle,
  type TimeAccuracy,
} from "@/lib/sky/moment";

type PlaceSearchResult = {
  placeName: string;
  country: string;
  latitude: number;
  longitude: number;
  timezone: string;
};

function StepSignal({
  active,
  complete,
  label,
  value,
}: {
  active: boolean;
  complete: boolean;
  label: string;
  value: string;
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border px-4 py-3 transition duration-700 ${
        active || complete
          ? "border-brand/70 bg-brand/12 text-starlight"
          : "border-white/10 bg-white/[0.045] text-starlight/52"
      }`}
    >
      <span
        className={`absolute inset-y-0 left-0 w-1 bg-brand transition ${
          active ? "opacity-100" : "opacity-30"
        }`}
      />
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand/82">
        {label}
      </p>
      <p className="mt-1 truncate text-sm font-semibold">{value}</p>
    </div>
  );
}

function AwakeningSky({
  stage,
  sky,
}: {
  stage: "date" | "time" | "place" | "editor";
  sky: SkyComputation;
}) {
  const stagePower = { date: 0.25, time: 0.48, place: 0.72, editor: 1 }[stage];
  const stars = sky.stars.slice(0, Math.round(140 * stagePower));
  const moon = sky.bodies.find((body) => body.body === "Moon" && body.aboveHorizon);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 transition duration-1000"
        style={{
          background: `radial-gradient(circle at 50% 36%, rgba(205,168,97,${0.1 * stagePower}), transparent 28%), radial-gradient(circle at 30% 72%, rgba(143,199,255,${0.12 * stagePower}), transparent 32%)`,
        }}
      />
      {stars.map((star, index) => (
        <span
          className="absolute rounded-full bg-starlight transition-all duration-700"
          key={star.id}
          style={{
            left: `${star.x * 100}%`,
            top: `${star.y * 100}%`,
            width: Math.max(1.4, 4.8 - star.magnitude * 0.45),
            height: Math.max(1.4, 4.8 - star.magnitude * 0.45),
            opacity: Math.min(0.9, (0.18 + index / 260) * stagePower),
            transitionDelay: `${(index % 28) * 24}ms`,
          }}
        />
      ))}
      {moon && (
        <span
          className="absolute rounded-full bg-brand shadow-[0_0_60px_rgba(205,168,97,0.35)] transition duration-1000"
          style={{
            left: `${moon.x * 100}%`,
            top: `${moon.y * 100}%`,
            width: 20 + 22 * stagePower,
            height: 20 + 22 * stagePower,
            opacity: 0.18 + stagePower * 0.6,
          }}
        />
      )}
    </div>
  );
}

function PosterPreview({ config, sky }: { config: MomentConfig; sky: SkyComputation }) {
  const style = posterStyles[config.style];
  const bodyMarks = sky.bodies.filter((body) => body.body !== "Sun" && body.aboveHorizon);
  const lineSegments = sky.constellationLines
    .flatMap((constellation) => constellation.segments)
    .slice(0, 82);

  return (
    <div
      className="relative mx-auto aspect-[3508/4961] w-full max-w-[25rem] overflow-hidden rounded-[2rem] border border-white/10 shadow-soft"
      style={{ background: style.background, color: style.foreground }}
    >
      <div
        className="absolute left-1/2 top-[37%] h-[60%] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: style.skyGlow }}
      />
      <div
        className="absolute left-1/2 top-[37%] h-[60%] w-[86%] -translate-x-1/2 -translate-y-1/2 rounded-full border"
        style={{ borderColor: style.accent, opacity: 0.7 }}
      />
      <div className="absolute left-1/2 top-[37%] h-[45%] w-[64%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-current opacity-15" />

      <svg className="absolute inset-x-[8%] top-[13%] h-[52%] w-[84%]" viewBox="0 0 100 100">
        {sky.milkyWay.polygons.slice(0, 4).map((polygon, index) => {
          const points = polygon
            .filter((point) => point.aboveHorizon)
            .slice(0, 120)
            .map((point) => `${point.x * 100},${point.y * 100}`)
            .join(" ");
          return points ? (
            <polygon
              fill={style.secondaryAccent}
              key={index}
              opacity="0.07"
              points={points}
            />
          ) : null;
        })}
        {lineSegments.map((segment, index) => {
          const points = segment
            .filter((point) => point.aboveHorizon)
            .map((point) => `${point.x * 100},${point.y * 100}`)
            .join(" ");
          return points ? (
            <polyline
              fill="none"
              key={index}
              opacity="0.18"
              points={points}
              stroke={style.foreground}
              strokeLinecap="round"
              strokeWidth="0.22"
            />
          ) : null;
        })}
      </svg>

      {sky.stars.slice(0, 520).map((star) => (
        <span
          className="absolute rounded-full"
          key={star.id}
          style={{
            left: `${8 + star.x * 84}%`,
            top: `${13 + star.y * 52}%`,
            width: Math.max(1.1, 5.2 - star.magnitude * 0.54),
            height: Math.max(1.1, 5.2 - star.magnitude * 0.54),
            background: star.major ? style.accent : style.foreground,
            opacity: star.major ? 0.9 : Math.max(0.28, 0.74 - star.magnitude * 0.06),
          }}
        />
      ))}

      {bodyMarks.map((body) => (
        <span
          className="absolute rounded-full"
          key={body.body}
          title={body.body}
          style={{
            left: `${8 + body.x * 84}%`,
            top: `${13 + body.y * 52}%`,
            width: body.body === "Moon" ? 18 : 8,
            height: body.body === "Moon" ? 18 : 8,
            background: body.body === "Moon" ? style.accent : style.foreground,
            opacity: 0.88,
          }}
        />
      ))}

      {sky.constellationLabels
        .filter((label) => label.aboveHorizon && label.rank <= 2)
        .slice(0, 8)
        .map((label) => (
          <span
            className="absolute -translate-x-1/2 text-[9px] uppercase tracking-[0.16em] opacity-25"
            key={label.id}
            style={{ left: `${8 + label.x * 84}%`, top: `${13 + label.y * 52}%` }}
          >
            {label.id}
          </span>
        ))}

      <div className="absolute inset-x-8 bottom-10 text-center">
        <p className="font-serif text-3xl font-bold">{config.title}</p>
        <p className="mt-3 text-xs uppercase tracking-[0.22em] opacity-70">
          {config.placeName}, {config.country}
        </p>
        <p className="mt-2 text-xs opacity-60">
          {config.localDate} - {config.localTime} - {config.timezone}
        </p>
        <p className="mt-2 text-[10px] opacity-45">
          {config.latitude.toFixed(4)}, {config.longitude.toFixed(4)}
        </p>
        <p className="mt-5 font-serif text-lg" style={{ color: style.accent }}>
          {config.message}
        </p>
      </div>
    </div>
  );
}

export function SkyExperience() {
  const [step, setStep] = useState<"date" | "time" | "place" | "editor">("date");
  const [config, setConfig] = useState<MomentConfig>(defaultMomentConfig);
  const [placeQuery, setPlaceQuery] = useState(defaultMomentConfig.placeName);
  const [placeResults, setPlaceResults] = useState<PlaceSearchResult[]>([]);
  const [placeError, setPlaceError] = useState("");
  const [isPending, startTransition] = useTransition();

  const sky = useMemo(() => computeSky(config), [config]);

  useEffect(() => {
    if (placeQuery.trim().length < 3 || step !== "place") {
      return;
    }

    const controller = new AbortController();
    const timeout = window.setTimeout(() => {
      fetch(`/api/place-search?q=${encodeURIComponent(placeQuery)}`, {
        signal: controller.signal,
      })
        .then((response) => response.json())
        .then((data: { results?: PlaceSearchResult[]; error?: string }) => {
          setPlaceError(data.error ?? "");
          setPlaceResults(data.results ?? []);
        })
        .catch((error: unknown) => {
          if ((error as Error).name !== "AbortError") {
            setPlaceError("Place search is temporarily unavailable.");
          }
        });
    }, 320);

    return () => {
      controller.abort();
      window.clearTimeout(timeout);
    };
  }, [placeQuery, step]);

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

  function chooseAccuracy(timeAccuracy: TimeAccuracy) {
    patchMoment({
      timeAccuracy,
      localTime:
        timeAccuracy === "exact-time"
          ? config.localTime
          : timeAccuracyOptions[timeAccuracy].defaultTime,
    });
  }

  function choosePlace(place: PlaceSearchResult) {
    patchMoment(place);
    setPlaceQuery(place.placeName);
    setPlaceResults([]);
    setStep("editor");
  }

  return (
    <div className="bg-midnight text-starlight">
      <section
        className="relative min-h-[calc(100vh-4rem)] overflow-hidden border-b border-white/10"
        id="create"
      >
        <AwakeningSky sky={sky} stage={step} />
        <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-10 px-6 py-16 lg:grid-cols-[0.84fr_1.16fr] lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.26em] text-brand">
              THE SKY REMEMBERS
            </p>
            <h1 className="mt-6 max-w-3xl text-5xl font-black leading-[0.96] tracking-normal text-starlight sm:text-6xl lg:text-7xl">
              What did the universe look like at your moment?
            </h1>
            <p className="mt-6 max-w-2xl text-xl leading-8 text-starlight/72">
              Reconstruct the celestial arrangement of your moment.
            </p>
            <p className="mt-5 max-w-xl text-base leading-7 text-brand/90">
              Some moments hold more than a beautiful sky.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              <StepSignal
                active={step === "date"}
                complete={step !== "date"}
                label="Date"
                value={config.localDate}
              />
              <StepSignal
                active={step === "time"}
                complete={step === "place" || step === "editor"}
                label="Time"
                value={timeAccuracyOptions[config.timeAccuracy].label}
              />
              <StepSignal
                active={step === "place" || step === "editor"}
                complete={step === "editor"}
                label="Place"
                value={config.placeName}
              />
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 shadow-soft backdrop-blur-xl sm:p-6">
            {step !== "editor" ? (
              <div className="min-h-[460px] rounded-[1.5rem] border border-white/10 bg-midnight/70 p-6">
                {step === "date" && (
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">
                      Date
                    </p>
                    <h2 className="mt-4 text-3xl font-black">
                      The first stars wake with the day.
                    </h2>
                    <input
                      className="mt-8 w-full rounded-2xl border border-white/10 bg-white/[0.08] px-5 py-4 text-lg text-starlight outline-none focus:border-brand"
                      max={new Date().toISOString().slice(0, 10)}
                      min="1900-01-01"
                      onChange={(event) => patchMoment({ localDate: event.target.value })}
                      type="date"
                      value={config.localDate}
                    />
                    <button
                      className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-starlight px-6 py-3 text-sm font-bold text-midnight transition hover:bg-brand"
                      onClick={() => setStep("time")}
                    >
                      Continue to time
                    </button>
                  </div>
                )}

                {step === "time" && (
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">
                      Time
                    </p>
                    <h2 className="mt-4 text-3xl font-black">
                      The sky slowly calibrates.
                    </h2>
                    <div className="mt-7 grid gap-3 sm:grid-cols-2">
                      {(Object.keys(timeAccuracyOptions) as TimeAccuracy[]).map((key) => (
                        <button
                          className={`rounded-2xl border p-4 text-left transition ${
                            config.timeAccuracy === key
                              ? "border-brand bg-brand/12"
                              : "border-white/10 bg-white/[0.06] hover:border-brand/70"
                          }`}
                          key={key}
                          onClick={() => chooseAccuracy(key)}
                        >
                          <span className="font-bold">{timeAccuracyOptions[key].label}</span>
                          <span className="mt-1 block text-sm leading-6 text-starlight/54">
                            {timeAccuracyOptions[key].note}
                          </span>
                        </button>
                      ))}
                    </div>
                    {config.timeAccuracy === "exact-time" && (
                      <input
                        className="mt-5 w-full rounded-2xl border border-white/10 bg-white/[0.08] px-5 py-4 text-lg text-starlight outline-none focus:border-brand"
                        onChange={(event) => patchMoment({ localTime: event.target.value })}
                        type="time"
                        value={config.localTime}
                      />
                    )}
                    <button
                      className="mt-6 inline-flex min-h-12 items-center justify-center rounded-full bg-starlight px-6 py-3 text-sm font-bold text-midnight transition hover:bg-brand"
                      onClick={() => setStep("place")}
                    >
                      Continue to place
                    </button>
                  </div>
                )}

                {step === "place" && (
                  <div>
                    <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">
                      Place
                    </p>
                    <h2 className="mt-4 text-3xl font-black">
                      The world begins to light up.
                    </h2>
                    <input
                      className="mt-8 w-full rounded-2xl border border-white/10 bg-white/[0.08] px-5 py-4 text-lg text-starlight outline-none focus:border-brand"
                      onChange={(event) => {
                        setPlaceQuery(event.target.value);
                        if (event.target.value.trim().length < 3) {
                          setPlaceResults([]);
                        }
                      }}
                      placeholder="Search a city, town, or place"
                      value={placeQuery}
                    />
                    <div className="mt-4 grid gap-3">
                      {placeResults.map((place) => (
                        <button
                          className="rounded-2xl border border-white/10 bg-white/[0.08] px-5 py-4 text-left transition hover:border-brand hover:bg-brand/10"
                          key={`${place.placeName}-${place.latitude}-${place.longitude}`}
                          onClick={() => choosePlace(place)}
                        >
                          <span className="block font-bold">{place.placeName}</span>
                          <span className="mt-1 block text-sm text-starlight/55">
                            {place.country} - {place.timezone} - {place.latitude.toFixed(3)}, {place.longitude.toFixed(3)}
                          </span>
                        </button>
                      ))}
                    </div>
                    {placeError && <p className="mt-4 text-sm text-brand">{placeError}</p>}
                    <p className="mt-5 text-sm leading-6 text-starlight/52">
                      The selected IANA timezone is saved with the moment so
                      historical daylight saving rules can be applied.
                    </p>
                  </div>
                )}
              </div>
            ) : (
              <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                <PosterPreview config={config} sky={sky} />
                <div className="rounded-[1.5rem] border border-white/10 bg-midnight/70 p-5">
                  <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand">
                    We found your horizon
                  </p>
                  <h2 className="mt-3 text-3xl font-black">
                    Your moment has been found.
                  </h2>

                  <label className="mt-6 block text-sm font-bold text-starlight/72">
                    Poster title
                    <input
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 text-starlight outline-none focus:border-brand"
                      onChange={(event) => patchMoment({ title: event.target.value })}
                      value={config.title}
                    />
                  </label>

                  <label className="mt-4 block text-sm font-bold text-starlight/72">
                    Message
                    <input
                      className="mt-2 w-full rounded-2xl border border-white/10 bg-white/[0.08] px-4 py-3 text-starlight outline-none focus:border-brand"
                      onChange={(event) => patchMoment({ message: event.target.value })}
                      value={config.message}
                    />
                  </label>

                  <div className="mt-6">
                    <p className="text-sm font-bold text-starlight/72">Style</p>
                    <div className="mt-3 grid gap-3">
                      {(Object.keys(posterStyles) as SkyPosterStyle[]).map((styleKey) => (
                        <button
                          className={`rounded-2xl border p-4 text-left transition ${
                            config.style === styleKey
                              ? "border-brand bg-brand/12"
                              : "border-white/10 bg-white/[0.06] hover:border-brand/70"
                          }`}
                          key={styleKey}
                          onClick={() => patchMoment({ style: styleKey })}
                        >
                          <span className="font-bold">{posterStyles[styleKey].name}</span>
                          <span className="mt-1 block text-sm leading-6 text-starlight/56">
                            {posterStyles[styleKey].description}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-7 rounded-2xl border border-brand/30 bg-brand/10 p-4">
                    <p className="text-sm leading-6 text-starlight/70">
                      {sky.visibility.statement}
                    </p>
                    <p className="mt-3 text-xs leading-5 text-starlight/46">
                      UTC instant: {config.utcInstant}. Catalog: {sky.catalog.renderedStarCount} rendered stars from {sky.catalog.starCount} catalog stars.
                    </p>
                    {isPending && (
                      <p className="mt-3 text-xs text-brand">Updating your sky...</p>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
