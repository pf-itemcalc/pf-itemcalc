import type { Slot } from "../../generic/slot-types";

export type SpecificArmor = {
  type: "specific-armor";
  name: string;
  subtitle?: string;
  casterLevel: number;
  slot: Slot;
  cost: number; // in gp
  weight: number; // in lbs
};
