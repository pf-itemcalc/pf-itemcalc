import { Slot } from "../generic/slot-types";

export type Ring = {
  type: "ring";
  name: string;
  subtitle?: string | number;
  casterLevel: number;
  slot: Slot;
  cost: number; // in gp
  weight: number; // in lbs
};

export const getUrl = (item: Ring): string => {
  const baseUrl = `https://www.aonprd.com/MagicRingsDisplay.aspx?FinalName=${encodeURIComponent(
    item.name
  )}`;

  if (item.subtitle === undefined) {
    return baseUrl;
  }

  return `${baseUrl}${item.subtitle}`;
};
