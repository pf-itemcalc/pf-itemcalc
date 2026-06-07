import { isMagicEnhancement } from "../../data/enhancement/enhancement-utilities";
import { isSizeModifier } from "../../data/size-modifier/size-modifier-utilities";
import { isSpecialMaterial } from "../../data/special-material/special-material-utilities";
import { isArmorQuality } from "../../data/armor-quality/armor-quality-utilities";
import { isArmor } from "../../data/armor/armor-utilities";
import type { ComponentFilterFunction } from "../option-filtering/option-filtering-types";

export const filterComponentsWhenArmorQualityIsPresent: ComponentFilterFunction =
  (selected, otherComponents) => {
    if (!selected.some(isArmorQuality)) {
      return otherComponents;
    }

    // If there is an armor quality then you can only choose:
    //  size-modifiers, enhancements, armors, other armor qualities, and special materials that are applicable to any remaining armors
    const remainingComponents = otherComponents.filter(
      (i) =>
        isSizeModifier(i) ||
        isMagicEnhancement(i) ||
        isArmor(i) ||
        isArmorQuality(i) ||
        isSpecialMaterial(i),
    );
    return remainingComponents.filter(
      (i) =>
        !isSpecialMaterial(i) ||
        remainingComponents.filter(isArmor).some((a) => i.isApplicable(a)),
    );
  };
