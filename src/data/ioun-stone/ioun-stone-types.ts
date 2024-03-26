import { Slot } from "../generic/slot-types";

export type IounStone = {
  type: "ioun-stone";
  name: string;
  subtitle?: string;
  linkName: string;
  casterLevel: number;
  slot: Slot;
  cost: number; // in gp
  weight: number; // in lbs
};

export const getUrl = (item: IounStone): string =>
  `https://aonprd.com/MagicWondrousDisplay.aspx?FinalName=${encodeURIComponent(
    item.linkName
  )}`;
