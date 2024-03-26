import { capitalize } from "lodash";
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
import {
  getMinimumCasterLevel,
  getUrl as getSpellUrl,
  Spell,
} from "./spell/spell-types";
import { SpellVessel, SpellVesselType } from "./spell/spell-vessel-types";
import {
  getUrl as getWeaponQualityUrl,
  getWeaponQaulityCost,
  getWeaponQaulityModifier,
  WeaponQaulity,
} from "./weapon/weapon-quality-types";
import { getUrl as getWeaponUrl, Weapon } from "./weapon/weapon-types";
import { Wondrous, getUrl as getWondrousUrl } from "./wondrous/wondrous-types";

export type ItemType =
  | "Armor"
  | "Armor Quality"
  | "Weapon"
  | "Weapon Quality"
  | "Special Material"
  | "Enhancement"
  | "Spell Vessel"
  | "Spell"
  | "Wondrous Item";

export type Item =
  | Armor
  | ArmorQaulity
  | Weapon
  | WeaponQaulity
  | SpecialMaterial
  | Enhancement
  | SpellVessel
  | Spell
  | SpecificItem;

export type SpecificItem = Wondrous;

export const isArmor = (item: Item): item is Armor => item.type === "armor";
export const isArmorQuality = (item: Item): item is ArmorQaulity =>
  item.type === "armor-quality";

export const isWeapon = (item: Item): item is Weapon => item.type === "weapon";
export const isComposite = (item: Item): item is Weapon =>
  isWeapon(item) && item.name.toLowerCase().includes("composite");
export const isWeaponQuality = (item: Item): item is WeaponQaulity =>
  item.type === "weapon-quality";
export const isSpecialMaterial = (item: Item): item is SpecialMaterial =>
  item.type === "special-material";
export const isEnhancement = (item: Item): item is Enhancement =>
  item.type === "enhancement";
export const isSpellVessel = (item: Item): item is SpellVessel =>
  item.type === "spell-vessel";
export const isSpell = (item: Item): item is Spell => item.type === "spell";
export const isSpecificSpellVessel = (item: Item, type: SpellVesselType) =>
  isSpellVessel(item) && item.vesselType === type;
export const isWondrous = (item: Item): item is Wondrous =>
  item.type === "wondrous";

export const isSpecificItem = (item: Item): item is SpecificItem => {
  return isWondrous(item);
};

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

  if (isSpellVessel(item)) {
    return "Spell Vessel";
  }

  if (isSpell(item)) {
    return "Spell";
  }

  if (isWondrous(item)) {
    return "Wondrous Item";
  }

  return "Spell"; // Have to default to something
};

const itemTypeOrdering: ItemType[] = [
  "Enhancement",
  "Weapon Quality",
  "Armor Quality",
  "Special Material",
  "Weapon",
  "Armor",
  "Spell Vessel",
  "Spell",
  "Wondrous Item",
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
    return getSpellUrl(item);
  }

  if (isWondrous(item)) {
    return getWondrousUrl(item);
  }

  return undefined;
};

export const isMagic = (items: Item[]): boolean =>
  items.some(
    (i) =>
      (isEnhancement(i) && i !== Masterwork) ||
      isArmorQuality(i) ||
      isWeaponQuality(i) ||
      isSpellVessel(i) ||
      isSpell(i) ||
      (isWondrous(i) && i.casterLevel > 0)
  );

export const getItemCasterLevel = (items: Item[]): number | undefined => {
  const specificItem = items.find(isSpecificItem);
  if (specificItem) {
    return specificItem.casterLevel;
  }

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

export const getSpellCasterLevel = (items: Item[]): number => {
  const spell = items.find(isSpell);

  if (!spell) {
    return 0;
  }

  return getMinimumCasterLevel(spell.spellLevel, spell.spellList);
};

export const getItemValue = (
  items: Item[],
  compositeRating?: number
): number => {
  const specificItem = items.find(isSpecificItem);

  if (specificItem) {
    return specificItem.cost;
  }

  const baseItem = items.find(isWeapon) || items.find(isArmor);

  if (!baseItem) {
    return 0;
  }

  const compositeCost = baseItem.name.toLowerCase().includes("longbow")
    ? 100
    : 75;

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
  return (
    baseItem.cost +
    mwkCost +
    magicCost +
    materialExtraCost +
    (compositeRating !== undefined ? compositeCost * compositeRating : 0)
  );
};

export const getSpellValue = (items: Item[]): number => {
  const spell = items.find(isSpell);

  if (!spell) {
    return 0;
  }

  const casterLevel = getMinimumCasterLevel(spell.spellLevel, spell.spellList);

  const spellMultiplier = spell.spellLevel * casterLevel;

  if (items.some((i) => isSpecificSpellVessel(i, "Potion"))) {
    return spellMultiplier * 50 + spell.materialCost;
  }

  if (items.some((i) => isSpecificSpellVessel(i, "Wand"))) {
    return spellMultiplier * 750 + spell.materialCost;
  }

  return spellMultiplier * 25 + spell.materialCost;
};

export const getSpellLevel = (items: Item[]): number => {
  const spell = items.find(isSpell);

  if (!spell) {
    return 0;
  }

  return spell.spellLevel;
};

export const getSpellList = (items: Item[]): string => {
  const spell = items.find(isSpell);

  if (!spell) {
    return "";
  }

  return spell.spellList;
};

export const getItemWeight = (items: Item[]): number => {
  const specificItem = items.find(isSpecificItem);

  if (specificItem) {
    return specificItem.weight;
  }

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

  if (items.some((i) => isSpecificSpellVessel(i, "Potion"))) {
    return `DC ${15 + casterLevel} Perception or Spellcraft Check`;
  }

  if (items.some((i) => isSpecificSpellVessel(i, "Scroll"))) {
    return `Read Magic or DC ${15 + casterLevel} Spellcraft Check`;
  }

  return `DC ${15 + casterLevel} Spellcraft Check`;
};

const getItemDisplayNameModifiedSubtitle = (
  item: SpecificItem
): string | undefined => {
  if (!item.subtitle) {
    return undefined;
  }

  if (typeof item.subtitle === "number") {
    return `+${item.subtitle}`;
  }

  // matches: "1", "1 bonus"
  // does not match: "1/2 Will", "1st", "2nd", "3rd", "10 HD", "Type I", "3 tricks", "6th-level", "15-ft.-by-30ft."
  const matchNumberOrNumberBonus = /\d+($| bonus)/g;
  if (
    typeof item.subtitle === "number" ||
    item.subtitle.match(matchNumberOrNumberBonus)
  ) {
    return `+${item.subtitle.replace(" bonus", "")}`;
  }

  // matches: "1/2 Will"
  // does not match: "1", "1 bonus", "1st", "2nd", "3rd", "10 HD", "Type I", "3 tricks", "6th-level", "15-ft.-by-30ft."
  const matchMultiNumberBonus = /(\d+)\/(\d+).*/;
  const multiNumberBonusMatch = item.subtitle.match(matchMultiNumberBonus);
  if (multiNumberBonusMatch) {
    return `+${multiNumberBonusMatch[1]}/+${multiNumberBonusMatch[2]}`;
  }

  return capitalize(item.subtitle);
};

export const getItemDisplayName = (
  item: Item,
  compositeRating?: number
): string => {
  if (isSpecificItem(item) && item.subtitle) {
    const formattedSubtitle = getItemDisplayNameModifiedSubtitle(item);
    const subtitle = formattedSubtitle ? ` (${formattedSubtitle})` : "";
    return `${item.name}${subtitle}`;
  }

  if (isComposite(item) && compositeRating !== undefined) {
    return item.name.replace("Composite", `Composite (${compositeRating})`);
  }

  return item.name;
};
