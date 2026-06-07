import { getArmorQaulityModifier } from "../../data/armor/armor-quality-utilities";
import { isEnhancement } from "../../data/generic/enhancement-utilities";
import { isWeaponQuality } from "../../data/weapon/weapon-quaility-utilities";
import { isArmorQuality } from "../../data/armor/armor-quality-utilities";
import { getWeaponQaulityModifier } from "../../data/weapon/weapon-quaility-utilities";
import type { Component } from "../../data/component-types";

export const getComponentEnhancementModifier = (
  component: Component,
): number => {
  if (isEnhancement(component)) {
    return component.modifier;
  }

  if (isWeaponQuality(component)) {
    return getWeaponQaulityModifier(component);
  }

  if (isArmorQuality(component)) {
    return getArmorQaulityModifier(component);
  }

  return 0;
};
