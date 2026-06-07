import type { Component } from "../component-types";
import type { SpecialArmor } from "./special-armor-types";

export const isSpecialArmor = (
  component: Component,
): component is SpecialArmor => component.type === "special-armor";

export const getSpecialArmorUrl = (armor: SpecialArmor): string => {
  const baseUrl = `https://www.aonprd.com/MagicArmorDisplay.aspx?ItemName=${encodeURIComponent(
    armor.name,
  )}`;

  if (armor.subtitle === undefined) {
    return baseUrl;
  }

  return `${baseUrl}${armor.subtitle}`;
};
