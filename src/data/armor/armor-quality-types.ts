type BaseArmorQaulity = {
  name: string;
  casterLevel: number;
  type: "armor-quality";
};

export type ArmorQaulityBonus = BaseArmorQaulity & {
  modifier: number;
};

export type ArmorQaulityFlatPrice = BaseArmorQaulity & {
  cost: number;
};

export type ArmorQaulity = ArmorQaulityBonus | ArmorQaulityFlatPrice;

const isBonus = (
  armorQaulity: ArmorQaulity
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

export const getUrl = (armorQuality: ArmorQaulity) =>
  `https://www.aonprd.com/MagicArmorDisplay.aspx?ItemName=${encodeURIComponent(
    armorQuality.name
  )}`;
