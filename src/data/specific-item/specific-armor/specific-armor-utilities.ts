import type { Component } from "../../component-types";
import type { SpecificArmor } from "./specific-armor-types";

export const isSpecificArmor = (
  component: Component,
): component is SpecificArmor => component.type === "specific-armor";

export const getSpecificArmorUrl = (armor: SpecificArmor): string => {
  const baseUrl = `https://www.aonprd.com/MagicArmorDisplay.aspx?ItemName=${encodeURIComponent(
    armor.name,
  )}`;

  if (armor.subtitle === undefined) {
    return baseUrl;
  }

  return `${baseUrl}${armor.subtitle}`;
};
