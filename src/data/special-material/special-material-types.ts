import type { Ammunition } from "../ammunition/ammunition-types";
import type { Armor } from "../armor/armor-types";
import type { Weapon } from "../weapon/weapon-types";

export type SpecialMaterialPossibleComponent = Weapon | Ammunition | Armor;

export type SpecialMaterialOptionals = {
  isApplicable: (component: SpecialMaterialPossibleComponent) => boolean; // true for any component if not defined
  alteredWeight: (component: SpecialMaterialPossibleComponent) => number; // returns the component weight if not defined
  addedCost: (
    component: SpecialMaterialPossibleComponent,
    willBeMadeMagical: boolean,
  ) => number; // Returns 0 if not defined
  alreadyMasterwork: boolean;
  masterworkCostIncluded: boolean;
};

export type SpecialMaterial = {
  name: string;
  type: "special-material";
} & SpecialMaterialOptionals;
