import {
  ArmorQaulity,
  getArmorQaulityCost,
  getArmorQaulityModifier,
  getUrl as getArmorQualityUrl,
} from "./armor/armor-quality-types";
import { Armor, getUrl as getArmorUrl } from "./armor/armor-types";
import { Enhancement } from "./generic/enhancement-types";
import { Masterwork } from "./generic/enhancements";
import {
  getUrl as getMaterialUrl,
  SpecialMaterial,
} from "./generic/special-material-types";
import { getUrl, Spell } from "./spell/spell-types";
import {
  getUrl as getWeaponQualityUrl,
  getWeaponQaulityCost,
  getWeaponQaulityModifier,
  WeaponQaulity,
} from "./weapon/weapon-quality-types";
import { getUrl as getWeaponUrl, Weapon } from "./weapon/weapon-types";

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

const itemTypeOrdering: ItemType[] = [
  "Enhancement",
  "Weapon Quality",
  "Armor Quality",
  "Special Material",
  "Weapon",
  "Armor",
  "Spell",
];

const itemComparater = (item1: Item, item2: Item) => {
  const type1 = getItemType(item1);
  const type2 = getItemType(item2);

  if (type1 === type2) {
    return item1.name.localeCompare(item2.name);
  }

  return itemTypeOrdering.indexOf(type1) - itemTypeOrdering.indexOf(type2);
};

export const orderItems = (items: Item[]): Item[] => items.sort(itemComparater);

export const getItemUrl = (item: Item) => {
  if (isArmor(item)) {
    return getArmorUrl(item);
  }

  if (isArmorQuality(item)) {
    return getArmorQualityUrl(item);
  }

  if (isWeapon(item)) {
    return getWeaponUrl(item);
  }

  if (isWeaponQuality(item)) {
    return getWeaponQualityUrl(item);
  }

  if (isSpecialMaterial(item)) {
    return getMaterialUrl(item);
  }

  if (isSpell(item)) {
    return getUrl(item);
  }

  return undefined;
};

export const isMagic = (items: Item[]): boolean =>
  items.some(
    (i) =>
      (isEnhancement(i) && i !== Masterwork) ||
      isArmorQuality(i) ||
      isWeaponQuality(i) ||
      isSpell(i)
  );

export const getCasterLevel = (items: Item[]): number | undefined => {
  const enhancement = items.find(isEnhancement);
  const qualities = [
    ...items.filter(isArmorQuality),
    ...items.filter(isWeaponQuality),
  ];

  if (!enhancement || enhancement === Masterwork) {
    return undefined;
  }

  return Math.max(
    enhancement.modifier * 3,
    Math.max(...qualities.map((q) => q.casterLevel))
  );
};

export const getValue = (items: Item[]): number => {
  const baseItem = items.find(isWeapon) || items.find(isArmor);

  if (!baseItem) {
    return 0;
  }

  const totalModifier = [
    ...items.filter(isEnhancement).map((i) => i.modifier),
    ...items.filter(isArmorQuality).map((i) => getArmorQaulityModifier(i)),
    ...items.filter(isWeaponQuality).map((i) => getWeaponQaulityModifier(i)),
  ].reduce((current, val) => current + val, 0);

  const totalAddedCost = [
    ...items.filter(isArmorQuality).map((i) => getArmorQaulityCost(i)),
    ...items.filter(isWeaponQuality).map((i) => getWeaponQaulityCost(i)),
  ].reduce((current, val) => current + val, 0);

  const specialMaterial = items.find(isSpecialMaterial);

  const isMwk =
    items.some(isEnhancement) || !!specialMaterial?.alreadyMasterwork;
  const mwkCostIncluded = !!specialMaterial?.masterworkCostIncluded;

  const halfIfArmor = isArmor(baseItem) ? 0.5 : 1;
  const mwkCost = (isMwk && !mwkCostIncluded ? 300 : 0) * halfIfArmor;
  const magicCost =
    Math.pow(totalModifier, 2) * 2000 * halfIfArmor + totalAddedCost;
  const materialExtraCost =
    specialMaterial?.addedCost(baseItem, isMagic(items)) ?? 0;
  return baseItem.cost + mwkCost + magicCost + materialExtraCost;
};

export const getWeight = (items: Item[]): number => {
  const baseItem = items.find(isWeapon) || items.find(isArmor);

  if (!baseItem) {
    return 0;
  }

  const specialMaterial = items.find(isSpecialMaterial);

  return specialMaterial?.alteredWeight(baseItem) || baseItem.weight;
};

export const getIdentifyMethod = (
  casterLevel: number | undefined,
  items: Item[]
): string | undefined => {
  if (!casterLevel) {
    return undefined;
  }

  // TODO: scrolls and potions
  return `DC ${15 + casterLevel} Spellcraft Check`;
};
