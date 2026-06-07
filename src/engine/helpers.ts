import { capitalize } from "lodash";
import type { Component, SpecificItemComponent } from "../data/component-types";
import {
  getWondrousItemUrl,
  isWondrous,
} from "../data/specific-item/wondrous/wondrous-utilities";
import {
  getSpecificAmmoUrl,
  isSpecificAmmo,
} from "../data/specific-item/specific-ammo/specific-ammo-utilities";
import {
  getSpecificArmorUrl,
  isSpecificArmor,
} from "../data/specific-item/specific-armor/specific-armor-utilities";
import {
  getSpecificShieldUrl,
  isSpecificShield,
} from "../data/specific-item/specific-shield/specific-shield-utilities";
import {
  getSpecificWeaponUrl,
  isSpecificWeapon,
} from "../data/specific-item/specific-weapon/specific-weapon-utilities";
import { getRingUrl, isRing } from "../data/specific-item/ring/ring-utilities";
import { getRodUrl, isRod } from "../data/specific-item/rod/rod-utilities";
import {
  getStaffUrl,
  isStaff,
} from "../data/specific-item/staff/staff-utilities";
import {
  getIounStoneUrl,
  isIounStone,
} from "../data/specific-item/ioun-stone/ioun-stone-utilities";
import { getArmorUrl, isArmor } from "../data/armor/armor-utilities";
import {
  getArmorQaulityCost,
  getArmorQaulityModifier,
  getArmorQualityUrl,
  isArmorQuality,
} from "../data/armor-quality/armor-quality-utilities";
import {
  getWeaponUrl,
  isComposite,
  isWeapon,
} from "../data/weapon/weapon-utilities";
import {
  getAmmunitionUrl,
  getIndividualAmmoCost,
  getIndividualAmmoWeight,
  isAmmunition,
} from "../data/ammunition/ammunition-utilities";
import {
  getWeaponQaulityCost,
  getWeaponQaulityModifier,
  getWeaponQualityUrl,
  isWeaponQuality,
} from "../data/weapon-quality/weapon-quality-utilities";
import {
  getSpecialMaterialUrl,
  isSpecialMaterial,
} from "../data/special-material/special-material-utilities";
import {
  getSpellMinimumCasterLevel,
  getSpellUrl,
  isSpell,
} from "../data/spell/spell-utilities";
import { isEnhancement } from "../data/enhancement/enhancement-utilities";
import { Masterwork } from "../data/enhancement/enhancements";
import { isSizeModifier } from "../data/size-modifier/size-modifier-utilities";
import { isSpellVesselOfType } from "../data/spell-vessel/spell-vessel-utilities";
import { componentIsSpecificItem } from "../data/specific-item/specific-item-utilities";

type ComponentType = Component["type"];

const componentTypeDisplayNames: { [key in ComponentType]: string } = {
  armor: "Armor / Shield",
  "armor-quality": "Armor / Shield Quality",
  weapon: "Weapon",
  "weapon-quality": "Weapon Quality",
  ammunition: "Ammunition",
  "size-modifier": "Size Modifier",
  "special-material": "Special Material",
  enhancement: "Enhancement",
  "spell-vessel": "Spell Vessel",
  spell: "Spell",
  wondrous: "Wondrous Item",
  "specific-ammo": "Specific Ammo",
  "specific-armor": "Specific Armor",
  "specific-shield": "Specific Shield",
  "specific-weapon": "Specific Weapon",
  ring: "Ring",
  rod: "Rod",
  staff: "Staff",
  "ioun-stone": "Ioun Stone",
  count: "Count",
};

export const getComponentTypeDisplayName = (component: Component): string =>
  componentTypeDisplayNames[component.type];

const componentTypeOrderingDictionary: { [key in ComponentType]: number } = {
  count: -1,
  enhancement: 0,
  "size-modifier": 1,
  "weapon-quality": 2,
  "armor-quality": 3,
  "special-material": 4,
  weapon: 5,
  armor: 6,
  ammunition: 7,
  "spell-vessel": 8,
  spell: 9,
  wondrous: 10,
  "specific-armor": 11,
  "specific-shield": 12,
  "specific-weapon": 13,
  "specific-ammo": 14,
  ring: 15,
  rod: 16,
  staff: 17,
  "ioun-stone": 18,
};

const componentComparater = (component1: Component, component2: Component) => {
  if (component1.type === component2.type) {
    return getComponentDisplayName(component1).localeCompare(
      getComponentDisplayName(component2),
    );
  }

  return (
    componentTypeOrderingDictionary[component1.type] -
    componentTypeOrderingDictionary[component2.type]
  );
};

export const orderComponents = (components: Component[]): Component[] =>
  components.sort(componentComparater);

const urlGiven = <ComponentType extends Component>(
  component: Component,
  isComponent: (component: Component) => component is ComponentType,
  getUrl: (component: ComponentType) => string,
) => {
  if (!isComponent(component)) {
    return undefined;
  }

  return getUrl(component);
};

const componentTypeUrlMap: {
  [key in ComponentType]: (component: Component) => string | undefined;
} = {
  enhancement: () => undefined,
  armor: (component) => urlGiven(component, isArmor, getArmorUrl),
  "armor-quality": (component) =>
    urlGiven(component, isArmorQuality, getArmorQualityUrl),
  weapon: (component) => urlGiven(component, isWeapon, getWeaponUrl),
  ammunition: (component) =>
    urlGiven(component, isAmmunition, getAmmunitionUrl),
  "size-modifier": () => undefined,
  "weapon-quality": (component) =>
    urlGiven(component, isWeaponQuality, getWeaponQualityUrl),
  "special-material": (component) =>
    urlGiven(component, isSpecialMaterial, getSpecialMaterialUrl),
  spell: (component) => urlGiven(component, isSpell, getSpellUrl),
  "spell-vessel": () => undefined,
  wondrous: (component) => urlGiven(component, isWondrous, getWondrousItemUrl),
  "specific-ammo": (component) =>
    urlGiven(component, isSpecificAmmo, getSpecificAmmoUrl),
  "specific-armor": (component) =>
    urlGiven(component, isSpecificArmor, getSpecificArmorUrl),
  "specific-shield": (component) =>
    urlGiven(component, isSpecificShield, getSpecificShieldUrl),
  "specific-weapon": (component) =>
    urlGiven(component, isSpecificWeapon, getSpecificWeaponUrl),
  ring: (component) => urlGiven(component, isRing, getRingUrl),
  rod: (component) => urlGiven(component, isRod, getRodUrl),
  staff: (component) => urlGiven(component, isStaff, getStaffUrl),
  "ioun-stone": (component) =>
    urlGiven(component, isIounStone, getIounStoneUrl),
  count: () => undefined,
};
export const getComponentUrl = (component: Component) =>
  componentTypeUrlMap[component.type](component);

const notMagic = () => false;
const magic = () => true;
const magicIfHasCasterLevel = (component: Component) =>
  componentIsSpecificItem(component) && component.casterLevel > 0;
const componentTypeIsMagicMap: {
  [key in ComponentType]: (component: Component) => boolean;
} = {
  enhancement: (component) => component !== Masterwork,
  armor: notMagic,
  "armor-quality": magic,
  weapon: notMagic,
  ammunition: notMagic,
  "size-modifier": notMagic,
  "weapon-quality": magic,
  "special-material": notMagic,
  spell: magic,
  "spell-vessel": magic,
  wondrous: magicIfHasCasterLevel,
  "specific-ammo": magicIfHasCasterLevel,
  "specific-armor": magicIfHasCasterLevel,
  "specific-shield": magicIfHasCasterLevel,
  "specific-weapon": magicIfHasCasterLevel,
  ring: magic,
  rod: magic,
  staff: magic,
  "ioun-stone": magic,
  count: notMagic,
};
export const isMagic = (components: Component[]): boolean =>
  components.some((component) =>
    componentTypeIsMagicMap[component.type](component),
  );

export const getItemCasterLevel = (
  components: Component[],
): number | undefined => {
  const specificItem = components.find(componentIsSpecificItem);
  if (specificItem && specificItem.casterLevel > 0) {
    return specificItem.casterLevel;
  }

  const enhancement = components.find(isEnhancement);
  const qualities = [
    ...components.filter(isArmorQuality),
    ...components.filter(isWeaponQuality),
  ];

  if (!enhancement || enhancement === Masterwork) {
    return undefined;
  }

  return Math.max(
    enhancement.modifier * 3,
    Math.max(...qualities.map((q) => q.casterLevel)),
  );
};

export const getSpellCasterLevel = (components: Component[]): number => {
  const spell = components.find(isSpell);

  if (!spell) {
    return 0;
  }

  return getSpellMinimumCasterLevel(spell.spellLevel, spell.spellList);
};

export const getItemValue = (
  components: Component[],
  compositeRating?: number,
): number => {
  const specificItem = components.find(componentIsSpecificItem);

  if (specificItem) {
    return specificItem.cost;
  }

  const baseComponent =
    components.find(isWeapon) ||
    components.find(isArmor) ||
    components.find(isAmmunition);

  if (!baseComponent) {
    return 0;
  }

  const baseCost = isAmmunition(baseComponent)
    ? getIndividualAmmoCost(baseComponent)
    : baseComponent.cost;

  const compositeCost = baseComponent.name.toLowerCase().includes("longbow")
    ? 100
    : 75;

  const sizeModifier = components.find(isSizeModifier);
  const sizeCostMultiplier = sizeModifier?.priceMultiplier ?? 1;

  const totalModifier = [
    ...components.filter(isEnhancement).map((component) => component.modifier),
    ...components
      .filter(isArmorQuality)
      .map((component) => getArmorQaulityModifier(component)),
    ...components
      .filter(isWeaponQuality)
      .map((component) => getWeaponQaulityModifier(component)),
  ].reduce((current, val) => current + val, 0);

  const totalAddedCost = [
    ...components
      .filter(isArmorQuality)
      .map((component) => getArmorQaulityCost(component)),
    ...components
      .filter(isWeaponQuality)
      .map((component) => getWeaponQaulityCost(component)),
  ].reduce((current, val) => current + val, 0);

  const specialMaterial = components.find(isSpecialMaterial);

  const isMasterwork =
    components.some(isEnhancement) || !!specialMaterial?.alreadyMasterwork;
  const masterworkCostIncluded = !!specialMaterial?.masterworkCostIncluded;

  const halfIfArmor = isArmor(baseComponent) ? 0.5 : 1;
  const oneFiftiethIfAmmunition = isAmmunition(baseComponent) ? 0.02 : 1;
  const masterworkCost =
    (isMasterwork && !masterworkCostIncluded ? 300 : 0) *
    halfIfArmor *
    oneFiftiethIfAmmunition;
  const magicCost =
    Math.pow(totalModifier, 2) * 2000 * halfIfArmor * oneFiftiethIfAmmunition +
    totalAddedCost * oneFiftiethIfAmmunition;
  const materialExtraCost = specialMaterial
    ? specialMaterial.addedCost(baseComponent, isMagic(components))
    : 0;
  return (
    (baseCost + materialExtraCost) * sizeCostMultiplier +
    masterworkCost +
    magicCost +
    (compositeRating !== undefined ? compositeCost * compositeRating : 0)
  );
};

export const getSpellValue = (
  components: Component[],
  casterLevel: number,
): number => {
  const spell = components.find(isSpell);

  if (!spell) {
    return 0;
  }

  const spellMultiplier = Math.max(0.5, spell.spellLevel) * casterLevel;

  if (components.some((i) => isSpellVesselOfType(i, "Potion", "Oil"))) {
    return spellMultiplier * 50 + spell.materialCost;
  }

  if (components.some((i) => isSpellVesselOfType(i, "Wand"))) {
    return spellMultiplier * 750 + spell.materialCost;
  }

  return spellMultiplier * 25 + spell.materialCost;
};

export const getSpellLevel = (components: Component[]): number => {
  const spell = components.find(isSpell);

  if (!spell) {
    return 0;
  }

  return spell.spellLevel;
};

export const getSpellList = (components: Component[]): string => {
  const spell = components.find(isSpell);

  if (!spell) {
    return "";
  }

  return spell.spellList;
};

export const getItemWeight = (components: Component[]): number => {
  const specificItem = components.find(componentIsSpecificItem);

  if (specificItem) {
    return specificItem.weight;
  }

  const baseComponent =
    components.find(isWeapon) ||
    components.find(isArmor) ||
    components.find(isAmmunition);

  if (!baseComponent) {
    return 0;
  }

  const baseWeight = isAmmunition(baseComponent)
    ? getIndividualAmmoWeight(baseComponent)
    : baseComponent.weight;

  const sizeModifier = components.find(isSizeModifier);
  const sizeWeightMultiplier = sizeModifier?.weightMultiplier ?? 1;

  const specialMaterial = components.find(isSpecialMaterial);

  return (
    (!isAmmunition(baseComponent) && specialMaterial
      ? specialMaterial.alteredWeight(baseComponent)
      : baseWeight) * sizeWeightMultiplier
  );
};

export const getIdentifyMethod = (
  casterLevel: number | undefined,
  components: Component[],
): string | undefined => {
  if (!casterLevel) {
    return undefined;
  }

  if (components.some((i) => isSpellVesselOfType(i, "Potion", "Oil"))) {
    return `DC ${15 + casterLevel} Perception or Spellcraft Check`;
  }

  if (components.some((i) => isSpellVesselOfType(i, "Scroll"))) {
    return `Read Magic or DC ${15 + casterLevel} Spellcraft Check`;
  }

  return `DC ${15 + casterLevel} Spellcraft Check`;
};

const getItemDisplayNameModifiedSubtitle = (
  specificItemComponent: SpecificItemComponent,
): string | undefined => {
  if (!specificItemComponent.subtitle) {
    return undefined;
  }

  if (typeof specificItemComponent.subtitle === "number") {
    return `+${specificItemComponent.subtitle}`;
  }

  // matches: "1", "1 bonus"
  // does not match: "1/2 Will", "1st", "2nd", "3rd", "10 HD", "Type I", "3 tricks", "6th-level", "15-ft.-by-30ft."
  const matchNumberOrNumberBonus = /\d+($| bonus)/g;
  if (
    typeof specificItemComponent.subtitle === "number" ||
    specificItemComponent.subtitle.match(matchNumberOrNumberBonus)
  ) {
    return `+${specificItemComponent.subtitle.replace(" bonus", "")}`;
  }

  // matches: "1/2 Will"
  // does not match: "1", "1 bonus", "1st", "2nd", "3rd", "10 HD", "Type I", "3 tricks", "6th-level", "15-ft.-by-30ft."
  const matchMultiNumberBonus = /(\d+)\/(\d+).*/;
  const multiNumberBonusMatch = specificItemComponent.subtitle.match(
    matchMultiNumberBonus,
  );
  if (multiNumberBonusMatch) {
    return `+${multiNumberBonusMatch[1]}/+${multiNumberBonusMatch[2]}`;
  }

  return capitalize(specificItemComponent.subtitle);
};

export const getComponentName = (
  component: Component,
  plural: boolean,
): string => {
  if (isAmmunition(component)) {
    return (
      (plural ? component.pluralisedName : component.singularName) ??
      component.name
    );
  }

  if (isArmor(component) && component.suffix !== undefined) {
    return `${component.name} ${component.suffix}`;
  }

  return component.name;
};

type ComponentDisplayNameOptions = {
  compositeRating?: number;
  plural?: boolean;
};

export const getComponentDisplayName = (
  component: Component,
  options: ComponentDisplayNameOptions = {},
): string => {
  if (componentIsSpecificItem(component) && component.subtitle) {
    const formattedSubtitle = getItemDisplayNameModifiedSubtitle(component);
    const subtitle = formattedSubtitle ? ` (${formattedSubtitle})` : "";
    return `${component.name}${subtitle}`;
  }

  if (isComposite(component) && options.compositeRating !== undefined) {
    return component.name.replace(
      "Composite",
      `Composite (${options.compositeRating})`,
    );
  }

  return getComponentName(component, options.plural ?? false);
};

// TODO: The intention of this was to allow for unique IDs in the URL so we can
//  share links to items...
// TODO: Probably don't want to use component display name here though, some better way to generate
//  a unique identifier
const componentIdDelimiter = "::";
export const getUniqueComponentIdentifier = (component: Component): string =>
  window.btoa(
    getComponentDisplayName(component) + componentIdDelimiter + component.type,
  );
