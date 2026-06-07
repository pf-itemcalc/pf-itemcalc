import { isEnhancement } from "../../data/enhancement/enhancement-utilities";
import { isSizeModifier } from "../../data/size-modifier/size-modifier-utilities";
import { isSpecialMaterial } from "../../data/special-material/special-material-utilities";
import { isArmorQuality } from "../../data/armor-quality/armor-quality-utilities";
import { isArmor } from "../../data/armor/armor-utilities";
import type { ComponentFilterFunction } from "../option-filtering/option-filtering-types";

export const filterComponentsWhenArmorIsPresent: ComponentFilterFunction = (
  selected,
  otherComponents,
) => {
  const armor = selected.find(isArmor);
  if (!armor) {
    return otherComponents;
  }

  // If there is an armor then you can only choose:
  //  size-modifiers, enhancements, armor qualities and special materials that are applicable
  return otherComponents.filter(
    (i) =>
      isSizeModifier(i) ||
      isEnhancement(i) ||
      isArmorQuality(i) ||
      (isSpecialMaterial(i) && i.isApplicable(armor)),
  );
};
