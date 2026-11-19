import { useEffect, useState } from "react";

const PUBLIC_MODELS_CACHE_KEY = "niu:public-models-available";
const PUBLIC_MODELS_CACHE_TTL_MS = 5_000;

let inFlightProbe: Promise<boolean> | null = null;

function readCachedAvailability(): boolean | null {
  if (typeof sessionStorage === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(PUBLIC_MODELS_CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { available?: unknown; expiresAt?: unknown };
    if (
      typeof parsed.available === "boolean" &&
      typeof parsed.expiresAt === "number" &&
      Date.now() < parsed.expiresAt
    ) {
      return parsed.available;
    }
  } catch {
    // Ignore storage access errors cleanly.
  }
  return null;
}

async function fetchPublicModelsAvailability(): Promise<boolean> {
  if (typeof fetch === "undefined") return false;
  if (!inFlightProbe) {
    inFlightProbe = (async () => {
      try {
        const response = await fetch("/catalog/v1/models", {
          headers: { accept: "application/json" },
          cache: "no-store",
        });
        if (!response.ok) return false;
        const payload = (await response.json()) as { data?: unknown };
        return Array.isArray(payload?.data) && payload.data.length > 0;
      } catch {
        return false;
      }
    })();
  }
  const available = await inFlightProbe;
  inFlightProbe = null;
  if (typeof sessionStorage !== "undefined") {
    try {
      sessionStorage.setItem(
        PUBLIC_MODELS_CACHE_KEY,
        JSON.stringify({ available, expiresAt: Date.now() + PUBLIC_MODELS_CACHE_TTL_MS }),
      );
    } catch {
      // Ignore storage access errors cleanly.
    }
  }
  return available;
}

/**
 * Probes `/catalog/v1/models` with a short session cache so `Models` appears only
 * when public catalog entries exist on the active Niu host.
 */
export function usePublicModelsAvailable(): boolean {
  const [available, setAvailable] = useState(false);

  useEffect(() => {
    let active = true;
    const cached = readCachedAvailability();
    if (cached !== null) {
      setAvailable(cached);
      return () => {
        active = false;
      };
    }
    void fetchPublicModelsAvailability().then((result) => {
      if (active) setAvailable(result);
    });
    return () => {
      active = false;
    };
  }, []);

  return available;
}
