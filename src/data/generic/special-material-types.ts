import { Armor } from "./armor-types";
import { Enhancement } from "./enhancement-types";
import { Weapon } from "./weapon-types";

type Item = Weapon | Armor;

export type SpecialMaterialOptionals = {
  isApplicable: (item: Item) => boolean; // true for any item if not defined
  alteredWeight: (item: Item) => number; // returns the item weight if not defined
  addedCost: (item: Item, willBeMadeMagical: boolean) => number; // Returns 0 if not defined
  alreadyMasterwork: boolean;
  masterworkCostIncluded: boolean;
};

export type SpecialMaterial = {
  name: string;
} & SpecialMaterialOptionals;

export const baseSpecialMaterial: SpecialMaterialOptionals = {
  isApplicable: () => true,
  alteredWeight: (item) => item.weight,
  addedCost: () => 0,
  alreadyMasterwork: false,
  masterworkCostIncluded: false,
};

// Uses the 'scroll to text fragment' feature to locate in page since
//  they don't have individual pages
export const getUrl = (specialMaterial: SpecialMaterial) =>
  `https://www.aonprd.com/SpecialMaterials.aspx#:~:text=${encodeURIComponent(
    specialMaterial.name
  )}`;

export const isWeapon = (item: Item): item is Weapon =>
  (item as Weapon).size !== undefined;

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
  weapon: number,
  shield: number,
  lightArmor: number,
  mediumArmor: number,
  heavyArmor: number,
  defaultCost: number = 0
) => {
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
