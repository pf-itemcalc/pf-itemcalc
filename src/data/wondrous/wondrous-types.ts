import { Slot } from "../generic/slot-types";

export type Wondrous = {
  type: "wondrous";
  name: string;
  subtitle?: number | string;
  casterLevel: number;
  slot: Slot;
  cost: number; // in gp
  weight: number; // in lbs
};

export const getUrl = (item: Wondrous): string => {
  const baseUrl = `https://aonprd.com/MagicWondrousDisplay.aspx?FinalName=${encodeURIComponent(
    item.name
  )}`;

  if (item.subtitle === undefined) {
    return baseUrl;
  }

  return `${baseUrl}${item.subtitle}`;
};
