import { Ammunition } from "../ammunition/ammunition-types";
import { Armor } from "../armor/armor-types";
import { isAmmunition, isWeapon } from "../helpers";
import { Weapon } from "../weapon/weapon-types";

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

export const baseSpecialMaterial: SpecialMaterialOptionals & {
  type: "special-material";
} = {
  isApplicable: () => true,
  alteredWeight: (item) => item.weight,
  addedCost: () => 0,
  alreadyMasterwork: false,
  masterworkCostIncluded: false,
  type: "special-material",
};

// Uses the 'scroll to text fragment' feature to locate in page since
//  they don't have individual pages
export const getUrl = (specialMaterial: SpecialMaterial) =>
  `https://www.aonprd.com/SpecialMaterials.aspx#:~:text=${encodeURIComponent(
    specialMaterial.name
  ).replaceAll("-", "%2D")},-Source`;

export const valueFromArmorCategory = (
  armor: Armor,
  light: number,
  medium: number,
  heavy: number,
  defaultCost: number = 0
) => {
  switch (armor.category) {
    case "Light":
      return light;
    case "Medium":
      return medium;
    case "Heavy":
      return heavy;
    default:
      return defaultCost;
  }
};

export const valueFromWeaponSize = (
  weapon: Weapon,
  light: number,
  oneHanded: number,
  twoHanded: number,
  defaultCost: number = 0
) => {
  switch (weapon.size) {
    case "Light":
      return light;
    case "One-Handed":
      return oneHanded;
    case "Two-Handed":
      return twoHanded;
    default:
      return defaultCost;
  }
};

export const valueForAnyType = (
  item: Item,
  ammo: number,
  weapon: number,
  shield: number,
  lightArmor: number,
  mediumArmor: number,
  heavyArmor: number,
  defaultCost: number = 0
) => {
  if (isAmmunition(item)) {
    return ammo;
  }

  if (isWeapon(item)) {
    return weapon;
  }

  if (item.category === "Shield") {
    return shield;
  }

  return valueFromArmorCategory(
    item,
    lightArmor,
    mediumArmor,
    heavyArmor,
    defaultCost
  );
};
