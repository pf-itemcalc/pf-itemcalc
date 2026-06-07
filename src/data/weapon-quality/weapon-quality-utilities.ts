import type { Component } from "../component-types";
import type { WeaponQaulity, WeaponQaulityBonus } from "./weapon-quality-types";

export const isWeaponQuality = (
  component: Component,
): component is WeaponQaulity => component.type === "weapon-quality";

const isBonus = (
  weaponQaulity: WeaponQaulity,
): weaponQaulity is WeaponQaulityBonus =>
  (weaponQaulity as WeaponQaulityBonus).modifier !== undefined;

export const getWeaponQaulityModifier = (weaponQaulity: WeaponQaulity) => {
  if (!isBonus(weaponQaulity)) {
    return 0;
  }

  return weaponQaulity.modifier;
};

export const getWeaponQaulityCost = (weaponQuality: WeaponQaulity) => {
  if (isBonus(weaponQuality)) {
    return 0;
  }

  return weaponQuality.cost;
};

export const getWeaponQualityUrl = (weaponQuality: WeaponQaulity) =>
  `https://www.aonprd.com/MagicWeaponsDisplay.aspx?ItemName=${encodeURIComponent(
    weaponQuality.name,
  )}`;
