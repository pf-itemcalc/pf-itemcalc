import type { Slot } from "../generic/slot-types";

export type SpecialWeapon = {
  type: "special-weapon";
  name: string;
  subtitle?: string;
  casterLevel: number;
  slot: Slot;
  cost: number; // in gp
  weight: number; // in lbs
};
