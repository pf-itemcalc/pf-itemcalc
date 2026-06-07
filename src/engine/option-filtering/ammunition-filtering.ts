import { isAmmunition } from "../../data/ammunition/ammunition-utilities";
import {
  isEnhancement,
  isSizeModifier,
  isSpecialMaterial,
  isWeaponQuality,
} from "../helpers";
import type { ComponentFilterFunction } from "../option-filtering/option-filtering-types";

export const filterComponentsWhenAmmunitionIsPresent: ComponentFilterFunction =
  (selected, otherComponents) => {
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
