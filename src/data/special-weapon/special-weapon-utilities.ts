import type { Component } from "../component-types";
import type { SpecialWeapon } from "./special-weapon-types";

export const isSpecialWeapon = (
  component: Component,
): component is SpecialWeapon => component.type === "special-weapon";

export const getSpecialWeaponUrl = (weapon: SpecialWeapon): string => {
  const baseUrl = `https://www.aonprd.com/MagicWeaponsDisplay.aspx?ItemName=${encodeURIComponent(
    weapon.name,
  )}`;

  if (weapon.subtitle === undefined) {
    return baseUrl;
  }

  return `${baseUrl}${weapon.subtitle}`;
};
