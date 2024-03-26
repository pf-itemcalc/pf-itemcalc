import { Slot } from "../generic/slot-types";

export type Rod = {
  type: "rod";
  name: string;
  subtitle?: string;
  casterLevel: number;
  slot: Slot;
  cost: number; // in gp
  weight: number; // in lbs
};

export const getUrl = (item: Rod): string => {
  const baseUrl = `https://www.aonprd.com/MagicRodsDisplay.aspx?FinalName=${encodeURIComponent(
    item.name
  )}`;

  if (item.subtitle === undefined) {
    return baseUrl;
  }

  return `${baseUrl}${item.subtitle}`;
};
