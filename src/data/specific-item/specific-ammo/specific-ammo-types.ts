import type { Slot } from "../../generic/slot-types";

export type SpecificAmmo = {
  type: "specific-ammo";
  name: string;
  subtitle?: string;
  casterLevel: number;
  slot: Slot;
  cost: number; // in gp
  weight: number; // in lbs
};
