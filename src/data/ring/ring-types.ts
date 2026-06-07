import type { Slot } from "../generic/slot-types";

export type Ring = {
  type: "ring";
  name: string;
  subtitle?: string | number;
  casterLevel: number;
  slot: Slot;
  cost: number; // in gp
  weight: number; // in lbs
};
