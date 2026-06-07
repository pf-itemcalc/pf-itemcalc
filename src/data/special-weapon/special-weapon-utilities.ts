import type { Component } from "../component-types";
import type { SpecialWeapon } from "./special-weapon-types";

export const isSpecialWeapon = (
  component: Component,
): component is SpecialWeapon => component.type === "special-weapon";

export const getSpecialWeaponUrl = (item: SpecialWeapon): string => {
  const baseUrl = `https://www.aonprd.com/MagicWeaponsDisplay.aspx?ItemName=${encodeURIComponent(
    item.name,
  )}`;

  if (item.subtitle === undefined) {
    return baseUrl;
  }

  return `${baseUrl}${item.subtitle}`;
};
