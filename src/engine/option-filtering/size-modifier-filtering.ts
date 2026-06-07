import { isAmmunition } from "../../data/ammunition/ammunition-utilities";
import { isEnhancement } from "../../data/generic/enhancement-utilities";
import { isSizeModifier } from "../../data/generic/size-modifier-utilities";
import { isSpecialMaterial } from "../../data/generic/special-material-utilities";
import { isWeaponQuality } from "../../data/weapon/weapon-quaility-utilities";
import { isWeapon } from "../../data/weapon/weapon-utilities";
import { isArmorQuality } from "../../data/armor/armor-quality-utilities";
import { isArmor } from "../../data/armor/armor-utilities";
import type { ComponentFilterFunction } from "../option-filtering/option-filtering-types";

export const filterComponentsWhenSizeModifierIsPresent: ComponentFilterFunction =
  (selected, otherComponents) => {
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
