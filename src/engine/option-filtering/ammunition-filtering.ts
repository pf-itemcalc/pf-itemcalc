import { isAmmunition } from "../../data/ammunition/ammunition-utilities";
import { isEnhancement } from "../../data/enhancement/enhancement-utilities";
import { isSizeModifier } from "../../data/size-modifier/size-modifier-utilities";
import { isSpecialMaterial } from "../../data/special-material/special-material-utilities";
import { isWeaponQuality } from "../../data/weapon-quality/weapon-quality-utilities";
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
