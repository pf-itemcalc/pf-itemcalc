import type { Component } from "../component-types";
import type { Rod } from "./rod-types";

export const isRod = (component: Component): component is Rod =>
  component.type === "rod";
export const getRodUrl = (item: Rod): string => {
  const baseUrl = `https://www.aonprd.com/MagicRodsDisplay.aspx?FinalName=${encodeURIComponent(
    item.name,
  )}`;

  if (item.subtitle === undefined) {
    return baseUrl;
  }

  return `${baseUrl}${item.subtitle}`;
};
