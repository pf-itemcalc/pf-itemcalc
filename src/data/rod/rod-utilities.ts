import type { Component } from "../component-types";
import type { Rod } from "./rod-types";

export const isRod = (component: Component): component is Rod =>
  component.type === "rod";

export const getRodUrl = (rod: Rod): string => {
  const baseUrl = `https://www.aonprd.com/MagicRodsDisplay.aspx?FinalName=${encodeURIComponent(
    rod.name,
  )}`;

  if (rod.subtitle === undefined) {
    return baseUrl;
  }

  return `${baseUrl}${rod.subtitle}`;
};
