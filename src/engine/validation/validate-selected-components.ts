import { componentIsSpecificItem } from "../../data/specific-item/specific-item-utilities";
import { isSpell } from "../../data/spell/spell-utilities";
import { isSpellVessel } from "../../data/spell-vessel/spell-vessel-utilities";
import { isMagicEnhancement } from "../../data/enhancement/enhancement-utilities";
import { isEnhancement } from "../../data/enhancement/enhancement-utilities";
import { isSizeModifier } from "../../data/size-modifier/size-modifier-utilities";
import { isSpecialMaterial } from "../../data/special-material/special-material-utilities";
import { isWeaponQuality } from "../../data/weapon-quality/weapon-quality-utilities";
import { isWeapon } from "../../data/weapon/weapon-utilities";
import { isArmorQuality } from "../../data/armor-quality/armor-quality-utilities";
import { isArmor } from "../../data/armor/armor-utilities";
import { getComponentEnhancementModifier } from "../component-properties/component-enhancement";
import type { Component } from "../../data/component-types";
import { isAmmunition } from "../../data/ammunition/ammunition-utilities";

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
        !componentIsSpecificItem(i) &&
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
    !componentIsSpecificItem(componentToRemove)) ||
  (isEnhancement(componentToRemove) &&
    components.every((c) => !isArmorQuality(c) && !isWeaponQuality(c)));
