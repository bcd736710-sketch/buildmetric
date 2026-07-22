"use client";

import { useMemo, useState, useTransition } from "react";
import { computeSky, type SkyComputation } from "@/lib/sky/astronomy";
import { createArtworkScene } from "@/lib/sky/artwork-scene";
import { createArtworkSvg } from "@/lib/sky/artwork-svg";
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
  provider?: string;
};

function svgDataUrl(svg: string) {
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

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
  const stagePower = { date: 0.16, time: 0.42, place: 0.78, editor: 1 }[stage];
  const starCount = { date: 46, time: 120, place: 260, editor: 340 }[stage];
  const stars = sky.stars.slice(0, starCount);
  const moon = sky.bodies.find((body) => body.body === "Moon" && body.aboveHorizon);
  const milkyWayOpacity = { date: 0.02, time: 0.045, place: 0.09, editor: 0.12 }[stage];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div
        className="absolute inset-0 transition duration-[1600ms]"
        style={{
          background: `radial-gradient(circle at 50% 34%, rgba(205,168,97,${0.09 * stagePower}), transparent 27%), radial-gradient(circle at 26% 76%, rgba(143,199,255,${0.16 * stagePower}), transparent 34%), radial-gradient(circle at 78% 62%, rgba(117,93,180,${0.12 * stagePower}), transparent 30%)`,
        }}
      />
      <svg className="absolute inset-0 h-full w-full opacity-80" viewBox="0 0 100 100">
        {sky.milkyWay.polygons.slice(0, 5).map((polygon, index) => {
          const points = polygon
            .filter((point) => point.aboveHorizon)
            .slice(0, 140)
            .map((point) => `${point.x * 100},${point.y * 100}`)
            .join(" ");

          return points ? (
            <polygon
              fill="#d9c18a"
              key={index}
              opacity={milkyWayOpacity}
              points={points}
            />
          ) : null;
        })}
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
      {moon && (
        <span
          className="absolute rounded-full bg-brand shadow-[0_0_70px_rgba(205,168,97,0.28)] transition duration-[1600ms]"
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
  const previewUrl = useMemo(
    () => svgDataUrl(createArtworkSvg(createArtworkScene(config, sky))),
    [config, sky],
  );

  return (
    <div
      aria-label={`${config.title} personalized star map preview`}
      className="mx-auto aspect-[3508/4961] w-full max-w-[25rem] rounded-[1.35rem] border border-white/10 bg-cover bg-center shadow-soft"
      role="img"
      style={{ backgroundImage: `url("${previewUrl}")` }}
    />
  );
}

export function SkyExperience() {
  const [step, setStep] = useState<"date" | "time" | "place" | "editor">("date");
  const [config, setConfig] = useState<MomentConfig>(defaultMomentConfig);
  const [placeQuery, setPlaceQuery] = useState(defaultMomentConfig.placeName);
  const [placeResults, setPlaceResults] = useState<PlaceSearchResult[]>([]);
  const [placeError, setPlaceError] = useState("");
  const [placeSearching, setPlaceSearching] = useState(false);
  const [isPending, startTransition] = useTransition();

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

  async function searchPlaces() {
    const query = placeQuery.trim();
    if (query.length < 3) {
      setPlaceError("Enter at least 3 characters, then search.");
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
      setPlaceError(data.error ?? (data.results?.length ? "" : "No places found. Try a nearby city."));
    } catch {
      setPlaceError("Place search is temporarily unavailable.");
    } finally {
      setPlaceSearching(false);
    }
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
              Turn a real sky from a real moment into a personal piece of celestial art.
            </p>
            <p className="mt-5 max-w-xl text-base leading-7 text-brand/90">
              Date, time, and place wake the stars before the sky settles into your print.
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

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.06] p-4 shadow-soft backdrop-blur-xl transition-all duration-1000 sm:p-6">
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
                      The sky finds the exact hour.
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
                      The whole world lights this moment.
                    </h2>
                    <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                      <input
                        className="min-h-14 flex-1 rounded-2xl border border-white/10 bg-white/[0.08] px-5 py-4 text-lg text-starlight outline-none focus:border-brand"
                        onChange={(event) => {
                          setPlaceQuery(event.target.value);
                          setPlaceResults([]);
                          setPlaceError("");
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
                      <button
                        className="inline-flex min-h-14 items-center justify-center rounded-2xl bg-starlight px-6 py-3 text-sm font-bold text-midnight transition hover:bg-brand disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={placeSearching}
                        onClick={() => void searchPlaces()}
                      >
                        {placeSearching ? "Searching..." : "Search"}
                      </button>
                    </div>
                    <p className="mt-3 text-xs leading-5 text-starlight/46">
                      Search runs only when you ask, so the public geocoding
                      service is not used as high-frequency autocomplete.
                    </p>
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
                    Framed from your sky
                  </p>
                  <h2 className="mt-3 text-3xl font-black">
                    Your moment is ready to become artwork.
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
                          <span className="flex items-center gap-3 font-bold">
                            <span
                              className="h-5 w-5 rounded-full border border-white/20"
                              style={{
                                background: `linear-gradient(135deg, ${posterStyles[styleKey].background}, ${posterStyles[styleKey].accent})`,
                              }}
                            />
                            {posterStyles[styleKey].name}
                          </span>
                          <span className="mt-1 block text-sm leading-6 text-starlight/56">
                            {posterStyles[styleKey].description}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mt-7 rounded-2xl border border-brand/30 bg-brand/10 p-4">
                    <p className="text-sm leading-6 text-starlight/70">
                      The final file uses the same composition as this preview:
                      real star positions, restrained constellation linework,
                      moon phase, planet markers, and Milky Way geometry.
                    </p>
                    <p className="mt-3 text-xs leading-5 text-starlight/46">
                      {sky.catalog.renderedStarCount} stars arranged for {config.placeName}.
                      Technical visibility and UTC data stay in the system, not
                      as dominant poster text.
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
