import { Slot } from "../generic/slot-types";

export type SpecialAmmo = {
  type: "special-ammo";
  name: string;
  subtitle?: string;
  casterLevel: number;
  slot: Slot;
  cost: number; // in gp
  weight: number; // in lbs
};

export const getUrl = (ammo: SpecialAmmo): string =>
  `https://www.aonprd.com/MagicWeaponsDisplay.aspx?ItemName=${encodeURIComponent(
    ammo.name
  )}`;
