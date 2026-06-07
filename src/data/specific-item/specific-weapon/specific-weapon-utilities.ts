import type { Component } from "../../component-types";
import type { SpecificWeapon } from "./specific-weapon-types";

export const isSpecificWeapon = (
  component: Component,
): component is SpecificWeapon => component.type === "specific-weapon";

export const getSpecificWeaponUrl = (weapon: SpecificWeapon): string => {
  const baseUrl = `https://www.aonprd.com/MagicWeaponsDisplay.aspx?ItemName=${encodeURIComponent(
    weapon.name,
  )}`;

  if (weapon.subtitle === undefined) {
    return baseUrl;
  }

  return `${baseUrl}${weapon.subtitle}`;
};
