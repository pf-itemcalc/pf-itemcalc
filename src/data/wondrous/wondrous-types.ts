import type { Slot } from "../generic/slot-types";

export type Wondrous = {
  type: "wondrous";
  name: string;
  subtitle?: number | string;
  casterLevel: number;
  slot: Slot;
  cost: number; // in gp
  weight: number; // in lbs
};
