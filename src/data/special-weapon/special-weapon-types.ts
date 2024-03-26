import { Slot } from "../generic/slot-types";

export type SpecialWeapon = {
  type: "special-weapon";
  name: string;
  subtitle?: string;
  casterLevel: number;
  slot: Slot;
  cost: number; // in gp
  weight: number; // in lbs
};

export const getUrl = (item: SpecialWeapon): string => {
  const baseUrl = `https://www.aonprd.com/MagicWeaponsDisplay.aspx?ItemName=${encodeURIComponent(
    item.name
  )}`;

  if (item.subtitle === undefined) {
    return baseUrl;
  }

  return `${baseUrl}${item.subtitle}`;
};
