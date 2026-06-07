import { isAmmunition } from "../../data/ammunition/ammunition-utilities";
import { Masterwork } from "../../data/generic/enhancements";
import { isEnhancement } from "../../data/generic/enhancement-utilities";
import { isSizeModifier } from "../../data/generic/size-modifier-utilities";
import { isSpecialMaterial } from "../../data/generic/special-material-utilities";
import { isWeaponQuality } from "../../data/weapon/weapon-quaility-utilities";
import { isWeapon } from "../../data/weapon/weapon-utilities";
import { isArmorQuality } from "../../data/armor/armor-quality-utilities";
import { isArmor } from "../../data/armor/armor-utilities";
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
