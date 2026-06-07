import type { Component } from "../component-types";
import type { Ring } from "./ring-types";

export const isRing = (component: Component): component is Ring =>
  component.type === "ring";
export const getRingUrl = (item: Ring): string => {
  const baseUrl = `https://www.aonprd.com/MagicRingsDisplay.aspx?FinalName=${encodeURIComponent(
    item.name,
  )}`;

  if (item.subtitle === undefined) {
    return baseUrl;
  }

  return `${baseUrl}${item.subtitle}`;
};
