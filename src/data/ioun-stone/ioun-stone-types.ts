import type { Slot } from "../generic/slot-types";

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
