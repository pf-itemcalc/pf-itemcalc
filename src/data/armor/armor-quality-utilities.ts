import type { ArmorQaulityBonus, ArmorQaulity } from "./armor-quality-types";
import type { Component } from "../component-types";

export const isArmorQuality = (
  component: Component,
): component is ArmorQaulity => component.type === "armor-quality";

const isBonus = (
  armorQaulity: ArmorQaulity,
): armorQaulity is ArmorQaulityBonus =>
  (armorQaulity as ArmorQaulityBonus).modifier !== undefined;

export const getArmorQaulityModifier = (armorQaulity: ArmorQaulity) => {
  if (!isBonus(armorQaulity)) {
    return 0;
  }

  return armorQaulity.modifier;
};

export const getArmorQaulityCost = (armorQuality: ArmorQaulity) => {
  if (isBonus(armorQuality)) {
    return 0;
  }

  return armorQuality.cost;
};

export const getArmorQualityUrl = (armorQuality: ArmorQaulity) =>
  `https://www.aonprd.com/MagicArmorDisplay.aspx?ItemName=${encodeURIComponent(
    armorQuality.name,
  )}`;
