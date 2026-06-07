import { allComponents } from "../../data/all-components";
import { getArmorQaulityModifier } from "../../data/armor/armor-quality-types";
import type { Component } from "../../data/helpers";
import {
  isAmmunition,
  isArmor,
  isArmorQuality,
  isCount,
  isEnhancement,
  isMagicEnhancement,
  isSizeModifier,
  isSpecialMaterial,
  componentIsSingularItem,
  isSpellVesselOfType,
  isSpell,
  isSpellVessel,
  isWeapon,
  isWeaponQuality,
} from "../../data/helpers";
import { getWeaponQaulityModifier } from "../../data/weapon/weapon-quality-types";
import { filterComponentsWhenEnhancementIsPresent } from "../option-filtering/enhancement-filtering";
import type { ComponentFilterFunction } from "../option-filtering/option-filtering-types";

const filterComponentsWhenSpecialMaterialIsPresent: ComponentFilterFunction = (
  selected,
  otherComponents,
) => {
  const specialMaterial = selected.find(isSpecialMaterial);
  if (!specialMaterial) {
    return otherComponents;
  }

  // If the special material is specific then you can only choose:
  //  size-modifiers, enhancements, applicable armors, armor qualities, applicable weapons, weapon qualities and applicable ammunition
  if (specialMaterial.isApplicable) {
    const applicableItems = otherComponents.filter(
      (i) =>
        isSizeModifier(i) ||
        isEnhancement(i) ||
        ((isArmor(i) || isWeapon(i) || isAmmunition(i)) &&
          specialMaterial.isApplicable(i)) ||
        isArmorQuality(i) ||
        isWeaponQuality(i),
    );

    // Furthermore if the applicable items only contains enhancements or armors
    //  and qualities then weapons and weapon qualities cannot be chosen
    if (applicableItems.every((i) => !isArmor(i))) {
      return applicableItems.filter((i) => !isArmorQuality(i));
    }
    if (applicableItems.every((i) => !isWeapon(i) && !isAmmunition(i))) {
      return applicableItems.filter((i) => !isWeaponQuality(i));
    }
  }

  // If there is a special material (that is not specific) then you can only choose:
  //  size modifiers, enhancements, armors, armor qualities, weapons, weapon qualities and ammunition
  return otherComponents.filter(
    (i) =>
      isSizeModifier(i) ||
      isEnhancement(i) ||
      isArmor(i) ||
      isArmorQuality(i) ||
      isWeapon(i) ||
      isWeaponQuality(i) ||
      isAmmunition(i),
  );
};

const filterComponentsWhenWeaponIsPresent: ComponentFilterFunction = (
  selected,
  otherComponents,
) => {
  const weapon = selected.find(isWeapon);
  if (!weapon) {
    return otherComponents;
  }

  // If there is a weapon then you can only choose:
  //  size-modifiers, enhancements, weapon qualities and special materials that are applicable
  return otherComponents.filter(
    (i) =>
      isSizeModifier(i) ||
      isEnhancement(i) ||
      isWeaponQuality(i) ||
      (isSpecialMaterial(i) && i.isApplicable(weapon)),
  );
};

const filterComponentsWhenWeaponQualityIsPresent: ComponentFilterFunction = (
  selected,
  otherComponents,
) => {
  if (!selected.some(isWeaponQuality)) {
    return otherComponents;
  }

  // If there is a weapon quality then you can only choose:
  //  size-modifiers, enhancements, weapons, other weapon qualities, ammunition, and special materials that are applicable to any remaining weapons
  const remainingItems = otherComponents.filter(
    (i) =>
      isSizeModifier(i) ||
      isMagicEnhancement(i) ||
      isWeapon(i) ||
      isWeaponQuality(i) ||
      isSpecialMaterial(i) ||
      isAmmunition(i),
  );

  const remainingWeapons = remainingItems.filter(isWeapon);

  return remainingItems.filter(
    (i) =>
      !isSpecialMaterial(i) ||
      remainingWeapons.length === 0 ||
      remainingWeapons.some((w) => i.isApplicable(w)),
  );
};

const filterComponentsWhenAmmunitionIsPresent: ComponentFilterFunction = (
  selected,
  otherComponents,
) => {
  const ammo = selected.find(isAmmunition);
  if (!ammo) {
    return otherComponents;
  }

  // If there is an ammunition then you can only choose:
  //  size-modifiers, enhancements, weapon qualities and special materials that are applicable
  return otherComponents.filter(
    (i) =>
      isSizeModifier(i) ||
      isEnhancement(i) ||
      isWeaponQuality(i) ||
      (isSpecialMaterial(i) && i.isApplicable(ammo)),
  );
};

const filterComponentsWhenArmorIsPresent: ComponentFilterFunction = (
  selected,
  otherComponents,
) => {
  const armor = selected.find(isArmor);
  if (!armor) {
    return otherComponents;
  }

  // If there is an armor then you can only choose:
  //  size-modifiers, enhancements, armor qualities and special materials that are applicable
  return otherComponents.filter(
    (i) =>
      isSizeModifier(i) ||
      isEnhancement(i) ||
      isArmorQuality(i) ||
      (isSpecialMaterial(i) && i.isApplicable(armor)),
  );
};

const filterComponentsWhenArmorQualityIsPresent: ComponentFilterFunction = (
  selected,
  otherComponents,
) => {
  if (!selected.some(isArmorQuality)) {
    return otherComponents;
  }

  // If there is an armor quality then you can only choose:
  //  size-modifiers, enhancements, armors, other armor qualities, and special materials that are applicable to any remaining armors
  const remainingItems = otherComponents.filter(
    (i) =>
      isSizeModifier(i) ||
      isMagicEnhancement(i) ||
      isArmor(i) ||
      isArmorQuality(i) ||
      isSpecialMaterial(i),
  );
  return remainingItems.filter(
    (i) =>
      !isSpecialMaterial(i) ||
      remainingItems.filter(isArmor).some((a) => i.isApplicable(a)),
  );
};

const filterComponentsWhenSpellIsPresent: ComponentFilterFunction = (
  selected,
  otherComponents,
) => {
  const spell = selected.find(isSpell);
  if (!spell) {
    return otherComponents;
  }

  // If a spell is selected, you can only choose a spell vessel that is applicable
  return otherComponents.filter(
    (i) => isSpellVessel(i) && i.maxSpellLevel >= spell.spellLevel,
  );
};

const filterComponentsWhenSpellVesselIsPresent: ComponentFilterFunction = (
  selected,
  otherComponents,
) => {
  const spellVessel = selected.find(isSpellVessel);
  if (!spellVessel) {
    return otherComponents;
  }

  // If a spell vessel is selected, you can only choose a spell that is applicable
  return otherComponents.filter(
    (i) => isSpell(i) && spellVessel.maxSpellLevel >= i.spellLevel,
  );
};

const filterComponentsWhenSingularItemIsPresent: ComponentFilterFunction = (
  selected,
  otherComponents,
) => {
  const specificItem = selected.find(componentIsSingularItem);

  if (!specificItem) {
    return otherComponents;
  }

  // If a specific item is selected, then you cannot choose any other items
  return [];
};

const filterComponentsWhenSizeModifierIsPresent: ComponentFilterFunction = (
  selected,
  otherComponents,
) => {
  const sizeModifier = selected.find(isSizeModifier);
  if (!sizeModifier) {
    return otherComponents;
  }

  // If a size modifier is specified then you can only choose:
  //  special materials, enhancements, armors, armor qualities, weapons and weapon qualities
  return otherComponents.filter(
    (i) =>
      isSpecialMaterial(i) ||
      isEnhancement(i) ||
      isArmor(i) ||
      isArmorQuality(i) ||
      isWeapon(i) ||
      isWeaponQuality(i) ||
      isAmmunition(i),
  );
};

const filterComponentsWhenCountIsPresent: ComponentFilterFunction = (
  selected,
  otherComponents,
) => {
  const countItem = selected.find(isCount);
  if (!countItem) {
    return otherComponents;
  }

  // We currently do not allow you to calculate the cost for multiple wands
  // Typically the charges is used for that (makes the text too long!)
  return otherComponents.filter((i) => !isSpellVesselOfType(i, "Wand"));
};

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
