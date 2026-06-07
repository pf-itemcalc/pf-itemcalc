import type { Component } from "../component-types";
import type { SpecialAmmo } from "./special-ammo-types";

export const isSpecialAmmo = (component: Component): component is SpecialAmmo =>
  component.type === "special-ammo";

export const getSpecialAmmoUrl = (ammo: SpecialAmmo): string => {
  const baseUrl = `https://www.aonprd.com/MagicWeaponsDisplay.aspx?ItemName=${encodeURIComponent(
    ammo.name,
  )}`;

  if (ammo.subtitle === undefined) {
    return baseUrl;
  }

  return `${baseUrl}${ammo.subtitle}`;
};
