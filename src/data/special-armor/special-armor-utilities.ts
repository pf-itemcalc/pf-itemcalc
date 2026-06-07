import type { Component } from "../component-types";
import type { SpecialArmor } from "./special-armor-types";

export const isSpecialArmor = (
  component: Component,
): component is SpecialArmor => component.type === "special-armor";
export const getSpecialArmorUrl = (item: SpecialArmor): string => {
  const baseUrl = `https://www.aonprd.com/MagicArmorDisplay.aspx?ItemName=${encodeURIComponent(
    item.name,
  )}`;

  if (item.subtitle === undefined) {
    return baseUrl;
  }

  return `${baseUrl}${item.subtitle}`;
};
