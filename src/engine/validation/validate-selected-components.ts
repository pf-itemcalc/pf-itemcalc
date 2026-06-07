import type { Component } from "../helpers";
import {
  isAmmunition,
  isArmor,
  isArmorQuality,
  isMagicEnhancement,
  isSizeModifier,
  isSpecialMaterial,
  componentIsSingularItem,
  isSpell,
  isSpellVessel,
  isWeapon,
  isWeaponQuality,
  isEnhancement,
} from "../helpers";
import { getComponentEnhancementModifier } from "../component-properties/component-enhancement";

export const selectedComponentsAreInvalid = (
  selectedComponents: Component[],
): string | undefined => {
  const totalModifier = selectedComponents.reduce(
    (val, component) => getComponentEnhancementModifier(component) + val,
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

export const canRemoveComponentAndRemainValid = (
  componentToRemove: Component,
  components: Component[],
) =>
  (!isWeapon(componentToRemove) &&
    !isAmmunition(componentToRemove) &&
    !isArmor(componentToRemove) &&
    !isSpellVessel(componentToRemove) &&
    !isSpell(componentToRemove) &&
    !isEnhancement(componentToRemove) &&
    !componentIsSingularItem(componentToRemove)) ||
  (isEnhancement(componentToRemove) &&
    components.every((c) => !isArmorQuality(c) && !isWeaponQuality(c)));
