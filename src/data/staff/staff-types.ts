import { Slot } from "../generic/slot-types";

export type Staff = {
  type: "staff";
  name: string;
  subtitle?: string;
  casterLevel: number;
  slot: Slot;
  cost: number; // in gp
  weight: number; // in lbs
};

export const getUrl = (item: Staff): string => {
  const baseUrl = `https://aonprd.com/MagicStavesDisplay.aspx?ItemName=${encodeURIComponent(
    item.name
  )}`;

  if (item.subtitle === undefined) {
    return baseUrl;
  }

  return `${baseUrl}${item.subtitle}`;
};
