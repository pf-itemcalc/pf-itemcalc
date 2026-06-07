import {
  isEnhancement,
  isSizeModifier,
  isSpecialMaterial,
  isWeapon,
  isWeaponQuality,
} from "../../data/helpers";
import type { ComponentFilterFunction } from "../option-filtering/option-filtering-types";

export const filterComponentsWhenWeaponIsPresent: ComponentFilterFunction = (
  selected,
  otherComponents,
) => {
  const weapon = selected.find(isWeapon);
  if (!weapon) {
    return otherComponents;
  }

  // If there is a weapon then you can only choose:
  //  size-modifiers, enhancements, weapon qualities and special materials that are applicable
  return otherComponents.filter(
    (i) =>
      isSizeModifier(i) ||
      isEnhancement(i) ||
      isWeaponQuality(i) ||
      (isSpecialMaterial(i) && i.isApplicable(weapon)),
  );
};
