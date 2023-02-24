type BaseWeaponQaulity = {
  name: string;
  casterLevel: number;
};

export type WeaponQaulityBonus = BaseWeaponQaulity & {
  modifier: number;
};

export type WeaponQaulityFlatPrice = BaseWeaponQaulity & {
  cost: number;
};

export type WeaponQaulity = WeaponQaulityBonus | WeaponQaulityFlatPrice;

const isBonus = (
  weaponQaulity: WeaponQaulity
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

export const getUrl = (weaponQuality: WeaponQaulity) =>
  `https://www.aonprd.com/MagicWeaponsDisplay.aspx?ItemName=${encodeURIComponent(
    weaponQuality.name
  )}`;
