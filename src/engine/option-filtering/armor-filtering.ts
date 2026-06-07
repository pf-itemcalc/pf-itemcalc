import {
  isArmor,
  isArmorQuality,
  isEnhancement,
  isSizeModifier,
  isSpecialMaterial,
} from "../helpers";
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
