export function getNumberParam(
  name: string,
  fallback: number,
  min: number,
  max: number,
) {
  if (typeof window === "undefined") {
    return fallback;
  }

  const rawValue = new URLSearchParams(window.location.search).get(name);
  const parsedValue = Number(rawValue);

  if (!Number.isFinite(parsedValue)) {
    return fallback;
  }

  return Math.min(max, Math.max(min, parsedValue));
}

export function getStringParam<T extends string>(
  name: string,
  allowedValues: readonly T[],
  fallback: T,
) {
  if (typeof window === "undefined") {
    return fallback;
  }

  const rawValue = new URLSearchParams(window.location.search).get(name);

  if (rawValue && allowedValues.includes(rawValue as T)) {
    return rawValue as T;
  }

  return fallback;
}

export function buildCalculatorUrl(
  params: Record<string, string | number>,
) {
  if (typeof window === "undefined") {
    return "";
  }

  const url = new URL(window.location.href);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });

  return url.toString();
}
