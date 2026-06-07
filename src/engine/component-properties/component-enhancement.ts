import { getArmorQaulityModifier } from "../../data/armor-quality/armor-quality-utilities";
import { isEnhancement } from "../../data/enhancement/enhancement-utilities";
import { isWeaponQuality } from "../../data/weapon-quality/weapon-quality-utilities";
import { isArmorQuality } from "../../data/armor-quality/armor-quality-utilities";
import { getWeaponQaulityModifier } from "../../data/weapon-quality/weapon-quality-utilities";
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
