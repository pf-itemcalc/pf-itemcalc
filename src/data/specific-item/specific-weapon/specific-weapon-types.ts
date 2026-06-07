import type { Slot } from "../../generic/slot-types";

export type SpecificWeapon = {
  type: "specific-weapon";
  name: string;
  subtitle?: string;
  casterLevel: number;
  slot: Slot;
  cost: number; // in gp
  weight: number; // in lbs
};
