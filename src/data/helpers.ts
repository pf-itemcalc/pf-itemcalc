import { ArmorQaulity } from "./armor/armor-quality-types";
import { Armor } from "./armor/armor-types";
import { Enhancement } from "./generic/enhancement-types";
import { SpecialMaterial } from "./generic/special-material-types";
import { Spell } from "./spell/spell-types";
import { WeaponQaulity } from "./weapon/weapon-quality-types";
import { Weapon } from "./weapon/weapon-types";

export type ItemType =
  | "Armor"
  | "Armor Quality"
  | "Weapon"
  | "Weapon Quality"
  | "Special Material"
  | "Enhancement"
  | "Spell";

export type Item =
  | Armor
  | ArmorQaulity
  | Weapon
  | WeaponQaulity
  | SpecialMaterial
  | Enhancement
  | Spell;

export const isArmor = (item: Item): item is Armor => item.type === "armor";
export const isArmorQuality = (item: Item): item is ArmorQaulity =>
  item.type === "armor-quality";

export const isWeapon = (item: Item): item is Weapon => item.type === "weapon";
export const isWeaponQuality = (item: Item): item is WeaponQaulity =>
  item.type === "weapon-quality";
export const isSpecialMaterial = (item: Item): item is SpecialMaterial =>
  item.type === "special-material";
export const isEnhancement = (item: Item): item is Enhancement =>
  item.type === "enhancement";
export const isSpell = (item: Item): item is Spell => item.type === "spell";

export const getItemType = (item: Item): ItemType => {
  if (isArmor(item)) {
    return "Armor";
  }

  if (isArmorQuality(item)) {
    return "Armor Quality";
  }

  if (isWeapon(item)) {
    return "Weapon";
  }

  if (isWeaponQuality(item)) {
    return "Weapon Quality";
  }

  if (isSpecialMaterial(item)) {
    return "Special Material";
  }

  if (isEnhancement(item)) {
    return "Enhancement";
  }

  return "Spell";
};
