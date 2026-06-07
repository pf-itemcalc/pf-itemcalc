import { isAmmunition } from "../../data/ammunition/ammunition-utilities";
import { isMagicEnhancement } from "../../data/enhancement/enhancement-utilities";
import { isSizeModifier } from "../../data/size-modifier/size-modifier-utilities";
import { isSpecialMaterial } from "../../data/special-material/special-material-utilities";
import { isWeaponQuality } from "../../data/weapon-quality/weapon-quality-utilities";
import { isWeapon } from "../../data/weapon/weapon-utilities";
import type { ComponentFilterFunction } from "../option-filtering/option-filtering-types";

export const filterComponentsWhenWeaponQualityIsPresent: ComponentFilterFunction =
  (selected, otherComponents) => {
    if (!selected.some(isWeaponQuality)) {
      return otherComponents;
    }

    // If there is a weapon quality then you can only choose:
    //  size-modifiers, enhancements, weapons, other weapon qualities, ammunition, and special materials that are applicable to any remaining weapons
    const remainingComponents = otherComponents.filter(
      (i) =>
        isSizeModifier(i) ||
        isMagicEnhancement(i) ||
        isWeapon(i) ||
        isWeaponQuality(i) ||
        isSpecialMaterial(i) ||
        isAmmunition(i),
    );

    const remainingWeapons = remainingComponents.filter(isWeapon);

    return remainingComponents.filter(
      (i) =>
        !isSpecialMaterial(i) ||
        remainingWeapons.length === 0 ||
        remainingWeapons.some((w) => i.isApplicable(w)),
    );
  };
