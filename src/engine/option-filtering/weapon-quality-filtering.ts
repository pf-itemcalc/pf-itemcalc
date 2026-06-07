import {
  isAmmunition,
  isMagicEnhancement,
  isSizeModifier,
  isSpecialMaterial,
  isWeapon,
  isWeaponQuality,
} from "../helpers";
import type { ComponentFilterFunction } from "../option-filtering/option-filtering-types";

export const filterComponentsWhenWeaponQualityIsPresent: ComponentFilterFunction =
  (selected, otherComponents) => {
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
