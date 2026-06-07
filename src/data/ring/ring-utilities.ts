import type { Component } from "../component-types";
import type { Ring } from "./ring-types";

export const isRing = (component: Component): component is Ring =>
  component.type === "ring";

export const getRingUrl = (ring: Ring): string => {
  const baseUrl = `https://www.aonprd.com/MagicRingsDisplay.aspx?FinalName=${encodeURIComponent(
    ring.name,
  )}`;

  if (ring.subtitle === undefined) {
    return baseUrl;
  }

  return `${baseUrl}${ring.subtitle}`;
};
