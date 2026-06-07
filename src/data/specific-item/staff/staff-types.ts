import type { Slot } from "../../generic/slot-types";

export type Staff = {
  type: "staff";
  name: string;
  subtitle?: string;
  casterLevel: number;
  slot: Slot;
  cost: number; // in gp
  weight: number; // in lbs
};
