import { useEffect } from "react";

const NAV_MAP: Array<{ match: RegExp; to: string }> = [
  { match: /explore\s+collections?/i, to: "/shop" },
  { match: /browse\s+collection/i, to: "/shop" },
  { match: /explore\s+our\s+collection/i, to: "/shop" },
  { match: /learn\s+more/i, to: "/about" },
  { match: /commission\s+custom\s+research/i, to: "/service-bureau" },
  { match: /custom\s+research/i, to: "/service-bureau" },
];

function findLegacyTarget(element: HTMLElement | null) {
  if (!element) return null;

  const text = (element.textContent || "").replace(/\s+/g, " ").trim();
  if (!text) return null;

  const hit = NAV_MAP.find(({ match }) => match.test(text));
  return hit?.to ?? null;
}

export default function LegacyLandingBridge() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      const actionable = target?.closest("button, a, [role='button']") as HTMLElement | null;
      const legacyTarget = findLegacyTarget(actionable);
      if (!legacyTarget) return;

      event.preventDefault();
      window.location.assign(legacyTarget);
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return null;
}