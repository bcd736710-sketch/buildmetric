import { ToolIcon } from "@/components/tool-icon";
import { calculators } from "@/lib/calculators";

export function HomeVisual() {
  const featuredTools = calculators.slice(0, 4);

  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(circle_at_30%_20%,rgba(37,111,90,0.18),transparent_36%),radial-gradient(circle_at_90%_80%,rgba(20,20,20,0.08),transparent_32%)] blur-2xl" />
      <div className="relative rounded-[2rem] border border-white/70 bg-white/85 p-4 shadow-soft backdrop-blur sm:p-6">
        <div className="rounded-[1.5rem] border border-line bg-surface p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-muted">
                Backyard planning kit
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-ink">
                Ten focused planning tools
              </h2>
            </div>
            <div className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-brand">
              Free
            </div>
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {featuredTools.map((calculator) => (
              <div
                key={calculator.slug}
                className="rounded-3xl border border-line bg-white p-4"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-surface text-brand">
                  <ToolIcon slug={calculator.slug} />
                </div>
                <p className="mt-4 text-sm font-semibold text-ink">
                  {calculator.name.replace(" Calculator", "")}
                </p>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-muted">
                  {calculator.description}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-3xl bg-ink p-5 text-white">
            <p className="text-sm font-medium text-white/70">
              Planning signal
            </p>
            <p className="mt-2 text-3xl font-semibold">Tool + guide pages</p>
            <p className="mt-2 text-sm leading-6 text-white/70">
              Built for useful answers, internal links, and organic search.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
