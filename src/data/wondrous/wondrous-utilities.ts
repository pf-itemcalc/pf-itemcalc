import type { Component } from "../component-types";
import type { Wondrous } from "./wondrous-types";

export const isWondrous = (component: Component): component is Wondrous =>
  component.type === "wondrous";

export const getWondrousItemUrl = (item: Wondrous): string => {
  const baseUrl = `https://aonprd.com/MagicWondrousDisplay.aspx?FinalName=${encodeURIComponent(
    item.name,
  )}`;

  if (item.subtitle === undefined) {
    return baseUrl;
  }

  return `${baseUrl}${item.subtitle}`;
};
