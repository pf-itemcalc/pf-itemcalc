import type { Component } from "../../component-types";
import type { SpecificAmmo } from "./specific-ammo-types";

export const isSpecificAmmo = (
  component: Component,
): component is SpecificAmmo => component.type === "specific-ammo";

export const getSpecificAmmoUrl = (ammo: SpecificAmmo): string => {
  const baseUrl = `https://www.aonprd.com/MagicWeaponsDisplay.aspx?ItemName=${encodeURIComponent(
    ammo.name,
  )}`;

  if (ammo.subtitle === undefined) {
    return baseUrl;
  }

  return `${baseUrl}${ammo.subtitle}`;
};
