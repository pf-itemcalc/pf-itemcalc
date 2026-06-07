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

export type ArmorQuality = ArmorQaulityBonus | ArmorQaulityFlatPrice;
