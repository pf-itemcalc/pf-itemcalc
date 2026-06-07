import type { Component } from "../component-types";
import type { Wondrous } from "./wondrous-types";

export const isWondrous = (component: Component): component is Wondrous =>
  component.type === "wondrous";

export const getWondrousItemUrl = (wondrousItem: Wondrous): string => {
  const baseUrl = `https://aonprd.com/MagicWondrousDisplay.aspx?FinalName=${encodeURIComponent(
    wondrousItem.name,
  )}`;

  if (wondrousItem.subtitle === undefined) {
    return baseUrl;
  }

  return `${baseUrl}${wondrousItem.subtitle}`;
};
