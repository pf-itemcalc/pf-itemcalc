import { Slot } from "../generic/slot-types";

export type SpecialShield = {
  type: "special-shield";
  name: string;
  subtitle?: string;
  casterLevel: number;
  slot: Slot;
  cost: number; // in gp
  weight: number; // in lbs
};

export const getUrl = (item: SpecialShield): string => {
  const baseUrl = `https://www.aonprd.com/MagicArmorDisplay.aspx?ItemName=${encodeURIComponent(
    item.name
  )}`;

  if (item.subtitle === undefined) {
    return baseUrl;
  }

  return `${baseUrl}${item.subtitle}`;
};
