type BrandMarkProps = {
  className?: string;
};

export function BrandMark({ className = "h-9 w-9" }: BrandMarkProps) {
  return (
    <span
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-2xl bg-ink text-white ${className}`}
      aria-hidden="true"
    >
      <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.28),transparent_34%)]" />
      <svg
        className="relative h-2/3 w-2/3"
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M10 34V14l14-8 14 8v20"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16 34V22h16v12"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 38h24"
          stroke="currentColor"
          strokeWidth="4"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
