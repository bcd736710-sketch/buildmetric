import Link from "next/link";
import { ToolIcon } from "@/components/tool-icon";

export function HomeVisual() {
  const projectEntrances = [
    {
      label: "Fence",
      href: "/tools/fence-cost-calculator",
      icon: "fence-cost-calculator",
      description: "Estimate length, gates, and material cost.",
    },
    {
      label: "Garden Bed",
      href: "/tools/raised-garden-bed-soil-calculator",
      icon: "raised-garden-bed-soil-calculator",
      description: "Calculate soil volume and bag count.",
    },
    {
      label: "Chicken Coop",
      href: "/tools/chicken-coop-size-calculator",
      icon: "chicken-coop-size-calculator",
      description: "Plan coop and run space for your flock.",
    },
  ];

  return (
    <div className="relative">
      <div className="absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(circle_at_30%_20%,rgba(37,111,90,0.18),transparent_36%),radial-gradient(circle_at_90%_80%,rgba(20,20,20,0.08),transparent_32%)] blur-2xl" />
      <div className="relative rounded-[2rem] border border-white/70 bg-white/85 p-4 shadow-soft backdrop-blur sm:p-6">
        <div className="rounded-[1.5rem] border border-line bg-surface p-5 sm:p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-muted">
                Start your first project
              </p>
              <h2 className="mt-3 text-2xl font-semibold text-ink">
                Choose:
              </h2>
            </div>
            <div className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-brand">
              Free
            </div>
          </div>

          <div className="mt-6 grid gap-3">
            {projectEntrances.map((project) => (
              <Link
                key={project.href}
                href={project.href}
                className="group flex gap-4 rounded-3xl border border-line bg-white p-4 transition hover:border-ink hover:shadow-sm focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-brand/20"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-surface text-brand">
                  <ToolIcon slug={project.icon} />
                </div>
                <div>
                  <p className="text-lg font-semibold text-ink">
                    {project.label}
                  </p>
                  <p className="mt-1 text-sm leading-6 text-muted">
                    {project.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-4 rounded-3xl bg-ink p-5 text-white">
            <p className="text-sm font-medium text-white/70">
              Next step
            </p>
            <p className="mt-2 text-3xl font-semibold">Estimate materials</p>
            <p className="mt-2 text-sm leading-6 text-white/70">
              Pick one project, enter the dimensions, and turn the result into
              a practical shopping plan.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
