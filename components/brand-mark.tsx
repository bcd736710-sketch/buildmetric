type BrandMarkProps = {
  className?: string;
};

export function BrandMark({ className = "h-9 w-9" }: BrandMarkProps) {
  return (
    <span
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full bg-midnight text-starlight ring-1 ring-brand/30 ${className}`}
      aria-hidden="true"
    >
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_32%_24%,rgba(205,168,97,0.42),transparent_30%)]" />
      <svg
        className="relative h-2/3 w-2/3"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="24" cy="24" r="15" stroke="currentColor" strokeWidth="2.4" />
        <path d="M24 8v32M8 24h32" stroke="currentColor" strokeWidth="1.7" opacity="0.55" />
        <path d="M14 34c5-9 15-16 24-19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="17" cy="18" r="2.3" fill="currentColor" />
        <circle cx="29" cy="14" r="1.9" fill="currentColor" />
        <circle cx="33" cy="29" r="2.5" fill="currentColor" />
      </svg>
    </span>
  );
}
