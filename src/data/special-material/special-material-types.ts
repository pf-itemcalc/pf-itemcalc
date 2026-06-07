import type { Ammunition } from "../ammunition/ammunition-types";
import type { Armor } from "../armor/armor-types";
import type { Weapon } from "../weapon/weapon-types";

type Item = Weapon | Ammunition | Armor;

export type SpecialMaterialOptionals = {
  isApplicable: (item: Item) => boolean; // true for any item if not defined
  alteredWeight: (item: Item) => number; // returns the item weight if not defined
  addedCost: (item: Item, willBeMadeMagical: boolean) => number; // Returns 0 if not defined
  alreadyMasterwork: boolean;
  masterworkCostIncluded: boolean;
};

export type SpecialMaterial = {
  name: string;
  type: "special-material";
} & SpecialMaterialOptionals;
