import type { Slot } from "../generic/slot-types";

export type SpecialShield = {
  type: "special-shield";
  name: string;
  subtitle?: string;
  casterLevel: number;
  slot: Slot;
  cost: number; // in gp
  weight: number; // in lbs
};
