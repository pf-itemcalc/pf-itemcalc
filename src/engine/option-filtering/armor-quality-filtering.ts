import { isMagicEnhancement } from "../../data/generic/enhancement-utilities";
import { isSizeModifier } from "../../data/generic/size-modifier-utilities";
import { isSpecialMaterial } from "../../data/generic/special-material-utilities";
import { isArmorQuality } from "../../data/armor/armor-quality-utilities";
import { isArmor } from "../../data/armor/armor-utilities";
import type { ComponentFilterFunction } from "../option-filtering/option-filtering-types";

export const filterComponentsWhenArmorQualityIsPresent: ComponentFilterFunction =
  (selected, otherComponents) => {
    if (!selected.some(isArmorQuality)) {
      return otherComponents;
    }

    // If there is an armor quality then you can only choose:
    //  size-modifiers, enhancements, armors, other armor qualities, and special materials that are applicable to any remaining armors
    const remainingItems = otherComponents.filter(
      (i) =>
        isSizeModifier(i) ||
        isMagicEnhancement(i) ||
        isArmor(i) ||
        isArmorQuality(i) ||
        isSpecialMaterial(i),
    );
    return remainingItems.filter(
      (i) =>
        !isSpecialMaterial(i) ||
        remainingItems.filter(isArmor).some((a) => i.isApplicable(a)),
    );
  };
