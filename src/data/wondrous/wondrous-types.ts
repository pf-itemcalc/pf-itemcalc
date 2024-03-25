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

export const getUrl = (spell: Wondrous): string => {
  const baseUrl = `https://aonprd.com/MagicWondrousDisplay.aspx?FinalName=${encodeURIComponent(
    spell.name
  )}`;

  if (spell.subtitle === undefined) {
    return baseUrl;
  }

  return `${baseUrl}${spell.subtitle}`;
};
