import { allComponents } from "../../data/all-components";
import { getArmorQaulityModifier } from "../../data/armor/armor-quality-types";
import type { Component } from "../../data/helpers";
import {
  isAmmunition,
  isArmor,
  isArmorQuality,
  isEnhancement,
  isMagicEnhancement,
  isSizeModifier,
  isSpecialMaterial,
  componentIsSingularItem,
  isSpell,
  isSpellVessel,
  isWeapon,
  isWeaponQuality,
} from "../../data/helpers";
import { getWeaponQaulityModifier } from "../../data/weapon/weapon-quality-types";
import { filterComponentsWhenAmmunitionIsPresent } from "../option-filtering/ammunition-filtering";
import { filterComponentsWhenArmorIsPresent } from "../option-filtering/armor-filtering";
import { filterComponentsWhenArmorQualityIsPresent } from "../option-filtering/armor-quality-filtering";
import { filterComponentsWhenCountIsPresent } from "../option-filtering/count-filtering";
import { filterComponentsWhenEnhancementIsPresent } from "../option-filtering/enhancement-filtering";
import type { ComponentFilterFunction } from "../option-filtering/option-filtering-types";
import { filterComponentsWhenSingularItemIsPresent } from "../option-filtering/singular-item-filtering";
import { filterComponentsWhenSizeModifierIsPresent } from "../option-filtering/size-modifier-filtering";
import { filterComponentsWhenSpecialMaterialIsPresent } from "../option-filtering/special-material-filtering";
import { filterComponentsWhenSpellIsPresent } from "../option-filtering/spell-filtering";
import { filterComponentsWhenSpellVesselIsPresent } from "../option-filtering/spell-vessel-filtering";
import { filterComponentsWhenWeaponIsPresent } from "../option-filtering/weapon-filtering";
import { filterComponentsWhenWeaponQualityIsPresent } from "../option-filtering/weapon-quality-filtering";

const componentFilters: ComponentFilterFunction[] = [
  filterComponentsWhenSingularItemIsPresent,
  filterComponentsWhenSizeModifierIsPresent,
  filterComponentsWhenEnhancementIsPresent,
  filterComponentsWhenSpecialMaterialIsPresent,
  filterComponentsWhenWeaponIsPresent,
  filterComponentsWhenWeaponQualityIsPresent,
  filterComponentsWhenAmmunitionIsPresent,
  filterComponentsWhenArmorIsPresent,
  filterComponentsWhenSpellVesselIsPresent,
  filterComponentsWhenSpellIsPresent,
  filterComponentsWhenArmorQualityIsPresent,
  filterComponentsWhenCountIsPresent,
];

export const getComponentOptionsGivenCurrentSelected = (
  selectedComponents: Component[],
) =>
  componentFilters.reduce(
    (componentsRemaining, filterFunction) =>
      filterFunction(selectedComponents, componentsRemaining),
    allComponents,
  );

const getEnhancementModifier = (component: Component): number => {
  if (isEnhancement(component)) {
    return component.modifier;
  }

  if (isWeaponQuality(component)) {
    return getWeaponQaulityModifier(component);
  }

  if (isArmorQuality(component)) {
    return getArmorQaulityModifier(component);
  }

  return 0;
};

export const selectedComponentsAreInvalid = (
  selectedComponents: Component[],
): string | undefined => {
  const totalModifier = selectedComponents.reduce(
    (val, component) => getEnhancementModifier(component) + val,
    0,
  );

  if (totalModifier > 10) {
    return `The total modfier can be no greater than 10 (currently ${totalModifier})`;
  }

  if (
    selectedComponents.every(
      (i) =>
        !componentIsSingularItem(i) &&
        !isWeapon(i) &&
        !isArmor(i) &&
        !isSpell(i) &&
        !isAmmunition(i),
    )
  ) {
    if (selectedComponents.some((i) => isSizeModifier(i))) {
      return "You must select a weapon, armour or ammunition";
    }

    if (selectedComponents.some((i) => isWeaponQuality(i))) {
      return "You must select a weapon or ammunition";
    }

    if (selectedComponents.some((i) => isArmorQuality(i))) {
      return "You must select an armor";
    }

    if (selectedComponents.some((i) => isSpellVessel(i))) {
      return "You must select a spell";
    }

    if (selectedComponents.some((i) => isSpecialMaterial(i))) {
      return "You must select either a weapon or an armor";
    }

    return "You must select either a weapon, armor, spell, ammunition or a specific item";
  }

  if (
    selectedComponents.some((i) => isSpell(i)) &&
    selectedComponents.every((i) => !isSpellVessel(i))
  ) {
    return "You must select a potion, wand or scroll (i.e. a spell vessel)";
  }

  if (
    selectedComponents.some((i) => isWeaponQuality(i) || isArmorQuality(i)) &&
    selectedComponents.every((i) => !isMagicEnhancement(i))
  ) {
    return "You must choose an enchancement modifier to prefix your quality";
  }

  return undefined;
};
