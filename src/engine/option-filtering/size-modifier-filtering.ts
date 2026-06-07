import { isAmmunition } from "../../data/ammunition/ammunition-utilities";
import {
  isEnhancement,
  isSizeModifier,
  isSpecialMaterial,
  isWeapon,
  isWeaponQuality,
} from "../helpers";
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
