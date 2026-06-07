import type { Slot } from "../generic/slot-types";

export type SpecialAmmo = {
  type: "special-ammo";
  name: string;
  subtitle?: string;
  casterLevel: number;
  slot: Slot;
  cost: number; // in gp
  weight: number; // in lbs
};
