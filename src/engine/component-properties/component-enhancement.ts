import { getArmorQaulityModifier } from "../../data/armor/armor-quality-utilities";
import { isEnhancement, isWeaponQuality } from "../helpers";
import { isArmorQuality } from "../../data/armor/armor-quality-utilities";
import { getWeaponQaulityModifier } from "../../data/weapon/weapon-quality-types";
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
