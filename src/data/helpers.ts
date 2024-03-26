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
import {
  SpecialAmmo,
  getUrl as getSpecialAmmoUrl,
} from "./special-ammo/special-ammo-types";
import {
  SpecialArmor,
  getUrl as getSpecialArmorUrl,
} from "./special-armor/special-armor-types";
import {
  SpecialShield,
  getUrl as getSpecialShieldUrl,
} from "./special-shield/special-shield-types";
import {
  SpecialWeapon,
  getUrl as getSpecialWeaponUrl,
} from "./special-weapon/special-weapon-types";
import { Ring, getUrl as getRingUrl } from "./ring/ring-types";
import { Rod, getUrl as getRodUrl } from "./rod/rod-types";
import { Staff, getUrl as getStaffUrl } from "./staff/staff-types";
import {
  IounStone,
  getUrl as getIounStoneUrl,
} from "./ioun-stone/ioun-stone-types";

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

export type SpecificItem =
  | Wondrous
  | SpecialAmmo
  | SpecialArmor
  | SpecialShield
  | SpecialWeapon
  | Ring
  | Rod
  | Staff
  | IounStone;

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
export const isSpecialAmmo = (item: Item): item is SpecialAmmo =>
  item.type === "special-ammo";
export const isSpecialArmor = (item: Item): item is SpecialArmor =>
  item.type === "special-armor";
export const isSpecialShield = (item: Item): item is SpecialShield =>
  item.type === "special-shield";
export const isSpecialWeapon = (item: Item): item is SpecialWeapon =>
  item.type === "special-weapon";
export const isRing = (item: Item): item is Ring => item.type === "ring";
export const isRod = (item: Item): item is Rod => item.type === "rod";
export const isStaff = (item: Item): item is Staff => item.type === "staff";
export const isIounStone = (item: Item): item is IounStone =>
  item.type === "ioun-stone";

export const isSpecificItem = (item: Item): item is SpecificItem => {
  return (
    isWondrous(item) ||
    isSpecialAmmo(item) ||
    isSpecialArmor(item) ||
    isSpecialShield(item) ||
    isSpecialWeapon(item) ||
    isRing(item) ||
    isRod(item) ||
    isStaff(item) ||
    isIounStone(item)
  );
};

type ItemType = Item["type"];

const itemTypeDisplayNames: { [key in ItemType]: string } = {
  armor: "Armor / Shield",
  "armor-quality": "Armor / Shield Quality",
  weapon: "Weapon",
  "weapon-quality": "Weapon Quality",
  "special-material": "Special Material",
  enhancement: "Enhancement",
  "spell-vessel": "Spell Vessel",
  spell: "Spell",
  wondrous: "Wondrous Item",
  "special-ammo": "Special Ammo",
  "special-armor": "Special Armor",
  "special-shield": "Special Shield",
  "special-weapon": "Special Weapon",
  ring: "Ring",
  rod: "Rod",
  staff: "Staff",
  "ioun-stone": "Ioun Stone",
};

export const getItemTypeDisplayName = (item: Item): string =>
  itemTypeDisplayNames[item.type];

const itemTypeOrderingDictionary: { [key in ItemType]: number } = {
  enhancement: 0,
  "weapon-quality": 1,
  "armor-quality": 2,
  "special-material": 3,
  weapon: 4,
  armor: 5,
  "spell-vessel": 6,
  spell: 7,
  wondrous: 8,
  "special-armor": 9,
  "special-shield": 10,
  "special-weapon": 11,
  "special-ammo": 12,
  ring: 13,
  rod: 14,
  staff: 15,
  "ioun-stone": 16,
};

const itemComparater = (item1: Item, item2: Item) => {
  if (item1.type === item2.type) {
    return getItemDisplayName(item1).localeCompare(getItemDisplayName(item2));
  }

  return (
    itemTypeOrderingDictionary[item1.type] -
    itemTypeOrderingDictionary[item2.type]
  );
};

export const orderItems = (items: Item[]): Item[] => items.sort(itemComparater);

const itemTypeUrlMap: {
  [key in ItemType]: (item: Item) => string | undefined;
} = {
  enhancement: () => undefined,
  armor: (item) => getArmorUrl(item as Armor),
  "armor-quality": (item) => getArmorQualityUrl(item as ArmorQaulity),
  weapon: (item) => getWeaponUrl(item as Weapon),
  "weapon-quality": (item) => getWeaponQualityUrl(item as WeaponQaulity),
  "special-material": (item) => getMaterialUrl(item as SpecialMaterial),
  spell: (item) => getSpellUrl(item as Spell),
  "spell-vessel": () => undefined,
  wondrous: (item) => getWondrousUrl(item as Wondrous),
  "special-ammo": (item) => getSpecialAmmoUrl(item as SpecialAmmo),
  "special-armor": (item) => getSpecialArmorUrl(item as SpecialArmor),
  "special-shield": (item) => getSpecialShieldUrl(item as SpecialShield),
  "special-weapon": (item) => getSpecialWeaponUrl(item as SpecialWeapon),
  ring: (item) => getRingUrl(item as Ring),
  rod: (item) => getRodUrl(item as Rod),
  staff: (item) => getStaffUrl(item as Staff),
  "ioun-stone": (item) => getIounStoneUrl(item as IounStone),
};
export const getItemUrl = (item: Item) => itemTypeUrlMap[item.type](item);

const notMagic = () => false;
const magic = () => true;
const magicIfHasCasterLevel = (item: Item) =>
  isSpecificItem(item) && item.casterLevel > 0;
const itemTypeIsMagicMap: {
  [key in ItemType]: (item: Item) => boolean;
} = {
  enhancement: (item) => item !== Masterwork,
  armor: notMagic,
  "armor-quality": magic,
  weapon: notMagic,
  "weapon-quality": magic,
  "special-material": notMagic,
  spell: magic,
  "spell-vessel": magic,
  wondrous: magicIfHasCasterLevel,
  "special-ammo": magicIfHasCasterLevel,
  "special-armor": magicIfHasCasterLevel,
  "special-shield": magicIfHasCasterLevel,
  "special-weapon": magicIfHasCasterLevel,
  ring: magic,
  rod: magic,
  staff: magic,
  "ioun-stone": magic,
};
export const isMagic = (items: Item[]): boolean =>
  items.some((i) => itemTypeIsMagicMap[i.type](i));

export const getItemCasterLevel = (items: Item[]): number | undefined => {
  const specificItem = items.find(isSpecificItem);
  if (specificItem && specificItem.casterLevel > 0) {
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
