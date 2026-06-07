import { getArmorQaulityModifier } from "../../data/armor/armor-quality-types";
import type { Component } from "../../data/helpers";
import {
  isArmorQuality,
  isEnhancement,
  isWeaponQuality,
} from "../../data/helpers";
import { getWeaponQaulityModifier } from "../../data/weapon/weapon-quality-types";

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
