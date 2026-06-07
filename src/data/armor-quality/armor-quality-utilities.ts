import type { ArmorQaulityBonus, ArmorQuality } from "./armor-quality-types";
import type { Component } from "../component-types";

export const isArmorQuality = (
  component: Component,
): component is ArmorQuality => component.type === "armor-quality";

const isBonus = (
  armorQaulity: ArmorQuality,
): armorQaulity is ArmorQaulityBonus =>
  (armorQaulity as ArmorQaulityBonus).modifier !== undefined;

export const getArmorQaulityModifier = (armorQaulity: ArmorQuality) => {
  if (!isBonus(armorQaulity)) {
    return 0;
  }

  return armorQaulity.modifier;
};

export const getArmorQaulityCost = (armorQuality: ArmorQuality) => {
  if (isBonus(armorQuality)) {
    return 0;
  }

  return armorQuality.cost;
};

export const getArmorQualityUrl = (armorQuality: ArmorQuality) =>
  `https://www.aonprd.com/MagicArmorDisplay.aspx?ItemName=${encodeURIComponent(
    armorQuality.name,
  )}`;
