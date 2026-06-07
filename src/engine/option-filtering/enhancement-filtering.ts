import { Masterwork } from "../../data/generic/enhancements";
import {
  isAmmunition,
  isArmor,
  isArmorQuality,
  isEnhancement,
  isSizeModifier,
  isSpecialMaterial,
  isWeapon,
  isWeaponQuality,
} from "../../data/helpers";
import type { ComponentFilterFunction } from "./option-filtering-types";

export const filterComponentsWhenEnhancementIsPresent: ComponentFilterFunction =
  (selected, otherComponents) => {
    const enhancement = selected.find(isEnhancement);

    if (!enhancement) {
      return otherComponents;
    }

    if (
      enhancement.modifier === Masterwork.modifier &&
      enhancement.name === Masterwork.name
    ) {
      // If the enhancement is masterwork you can then only choose:
      //  size-modifiers, materials, armor, weapons or ammo
      return otherComponents.filter(
        (i) =>
          isSizeModifier(i) ||
          isSpecialMaterial(i) ||
          isArmor(i) ||
          isWeapon(i) ||
          isAmmunition(i),
      );
    }

    // If there is an enhancement then you can only choose:
    //  size-modifiers, materials, armor, armor qualities, weapons, weapon quailities or ammo
    return otherComponents.filter(
      (i) =>
        isSizeModifier(i) ||
        isSpecialMaterial(i) ||
        isArmor(i) ||
        isArmorQuality(i) ||
        isWeapon(i) ||
        isWeaponQuality(i) ||
        isAmmunition(i),
    );
  };
