import { capitalize } from "lodash";
import type { ArmorQaulity } from "../data/armor/armor-quality-types";
import {
  getArmorQualityUrl,
  getArmorQaulityCost,
  getArmorQaulityModifier,
} from "../data/armor/armor-quality-utilities";
import type { Armor } from "../data/armor/armor-types";
import { Masterwork } from "../data/generic/enhancements";
import type { SpecialMaterial } from "../data/generic/special-material-types";
import { getSpecialMaterialUrl } from "../data/generic/special-material-utilities";
import type { Spell } from "../data/spell/spell-types";
import {
  getSpellMinimumCasterLevel,
  getSpellUrl,
} from "../data/spell/spell-utilities";
import type { WeaponQaulity } from "../data/weapon/weapon-quality-types";
import {
  getWeaponQualityUrl,
  getWeaponQaulityCost,
  getWeaponQaulityModifier,
} from "../data/weapon/weapon-quaility-utilities";
import type { Weapon } from "../data/weapon/weapon-types";
import { getWeaponUrl, isComposite } from "../data/weapon/weapon-utilities";
import type { Wondrous } from "../data/wondrous/wondrous-types";
import { getWondrousItemUrl } from "../data/wondrous/wondrous-utilities";
import type { SpecialAmmo } from "../data/special-ammo/special-ammo-types";
import { getSpecialAmmoUrl } from "../data/special-ammo/special-ammo-utilities";
import type { SpecialArmor } from "../data/special-armor/special-armor-types";
import { getSpecialArmorUrl } from "../data/special-armor/special-armor-utilities";
import type { SpecialShield } from "../data/special-shield/special-shield-types";
import { getSpecialShieldUrl } from "../data/special-shield/special-shield-utilities";
import type { SpecialWeapon } from "../data/special-weapon/special-weapon-types";
import { getSpecialWeaponUrl } from "../data/special-weapon/special-weapon-utilities";
import type { Ring } from "../data/ring/ring-types";
import { getRingUrl } from "../data/ring/ring-utilities";
import type { Rod } from "../data/rod/rod-types";
import { getRodUrl } from "../data/rod/rod-utilities";
import type { Staff } from "../data/staff/staff-types";
import { getStaffUrl } from "../data/staff/staff-utilities";
import type { IounStone } from "../data/ioun-stone/ioun-stone-types";
import { getIounStoneUrl } from "../data/ioun-stone/ioun-stone-utilities";
import type { Ammunition } from "../data/ammunition/ammunition-types";
import type { Count } from "../data/special/count-types";
import type { Component, SingularItemComponent } from "../data/component-types";
import {
  getAmmunitionUrl,
  getIndividualAmmoCost,
  getIndividualAmmoWeight,
  isAmmunition,
} from "../data/ammunition/ammunition-utilities";
import { getArmorUrl, isArmor } from "../data/armor/armor-utilities";
import { isArmorQuality } from "../data/armor/armor-quality-utilities";
import { isSpecialArmor } from "../data/special-armor/special-armor-utilities";
import { isSpecialShield } from "../data/special-shield/special-shield-utilities";
import { isWeapon } from "../data/weapon/weapon-utilities";
import { isWeaponQuality } from "../data/weapon/weapon-quaility-utilities";
import { isSpecialWeapon } from "../data/special-weapon/special-weapon-utilities";
import { isSpecialAmmo } from "../data/special-ammo/special-ammo-utilities";
import { isSpecialMaterial } from "../data/generic/special-material-utilities";
import { isSizeModifier } from "../data/generic/size-modifier-utilities";
import { isEnhancement } from "../data/generic/enhancement-utilities";
import { isSpellVesselOfType } from "../data/spell/spell-vessel-utilities";
import { isSpell } from "../data/spell/spell-utilities";
import { isWondrous } from "../data/wondrous/wondrous-utilities";
import { isRing } from "../data/ring/ring-utilities";
import { isRod } from "../data/rod/rod-utilities";
import { isStaff } from "../data/staff/staff-utilities";
import { isIounStone } from "../data/ioun-stone/ioun-stone-utilities";

export const componentIsSingularItem = (
  component: Component,
): component is SingularItemComponent => {
  return (
    isWondrous(component) ||
    isSpecialAmmo(component) ||
    isSpecialArmor(component) ||
    isSpecialShield(component) ||
    isSpecialWeapon(component) ||
    isRing(component) ||
    isRod(component) ||
    isStaff(component) ||
    isIounStone(component)
  );
};

export const isCount = (component: Component): component is Count =>
  component.type === "count";

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
  "special-ammo": "Special Ammo",
  "special-armor": "Special Armor",
  "special-shield": "Special Shield",
  "special-weapon": "Special Weapon",
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
  "special-armor": 11,
  "special-shield": 12,
  "special-weapon": 13,
  "special-ammo": 14,
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

const componentTypeUrlMap: {
  [key in ComponentType]: (component: Component) => string | undefined;
} = {
  enhancement: () => undefined,
  armor: (component) => getArmorUrl(component as Armor),
  "armor-quality": (component) => getArmorQualityUrl(component as ArmorQaulity),
  weapon: (component) => getWeaponUrl(component as Weapon),
  ammunition: (component) => getAmmunitionUrl(component as Ammunition),
  "size-modifier": () => undefined,
  "weapon-quality": (component) =>
    getWeaponQualityUrl(component as WeaponQaulity),
  "special-material": (component) =>
    getSpecialMaterialUrl(component as SpecialMaterial),
  spell: (component) => getSpellUrl(component as Spell),
  "spell-vessel": () => undefined,
  wondrous: (component) => getWondrousItemUrl(component as Wondrous),
  "special-ammo": (component) => getSpecialAmmoUrl(component as SpecialAmmo),
  "special-armor": (component) => getSpecialArmorUrl(component as SpecialArmor),
  "special-shield": (component) =>
    getSpecialShieldUrl(component as SpecialShield),
  "special-weapon": (component) =>
    getSpecialWeaponUrl(component as SpecialWeapon),
  ring: (component) => getRingUrl(component as Ring),
  rod: (component) => getRodUrl(component as Rod),
  staff: (component) => getStaffUrl(component as Staff),
  "ioun-stone": (component) => getIounStoneUrl(component as IounStone),
  count: () => undefined,
};
export const getComponentUrl = (component: Component) =>
  componentTypeUrlMap[component.type](component);

const notMagic = () => false;
const magic = () => true;
const magicIfHasCasterLevel = (component: Component) =>
  componentIsSingularItem(component) && component.casterLevel > 0;
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
  "special-ammo": magicIfHasCasterLevel,
  "special-armor": magicIfHasCasterLevel,
  "special-shield": magicIfHasCasterLevel,
  "special-weapon": magicIfHasCasterLevel,
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
  const singularItem = components.find(componentIsSingularItem);
  if (singularItem && singularItem.casterLevel > 0) {
    return singularItem.casterLevel;
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
  const singularItem = components.find(componentIsSingularItem);

  if (singularItem) {
    return singularItem.cost;
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
  const singularItem = components.find(componentIsSingularItem);

  if (singularItem) {
    return singularItem.weight;
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
  singularItem: SingularItemComponent,
): string | undefined => {
  if (!singularItem.subtitle) {
    return undefined;
  }

  if (typeof singularItem.subtitle === "number") {
    return `+${singularItem.subtitle}`;
  }

  // matches: "1", "1 bonus"
  // does not match: "1/2 Will", "1st", "2nd", "3rd", "10 HD", "Type I", "3 tricks", "6th-level", "15-ft.-by-30ft."
  const matchNumberOrNumberBonus = /\d+($| bonus)/g;
  if (
    typeof singularItem.subtitle === "number" ||
    singularItem.subtitle.match(matchNumberOrNumberBonus)
  ) {
    return `+${singularItem.subtitle.replace(" bonus", "")}`;
  }

  // matches: "1/2 Will"
  // does not match: "1", "1 bonus", "1st", "2nd", "3rd", "10 HD", "Type I", "3 tricks", "6th-level", "15-ft.-by-30ft."
  const matchMultiNumberBonus = /(\d+)\/(\d+).*/;
  const multiNumberBonusMatch = singularItem.subtitle.match(
    matchMultiNumberBonus,
  );
  if (multiNumberBonusMatch) {
    return `+${multiNumberBonusMatch[1]}/+${multiNumberBonusMatch[2]}`;
  }

  return capitalize(singularItem.subtitle);
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
  if (componentIsSingularItem(component) && component.subtitle) {
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
