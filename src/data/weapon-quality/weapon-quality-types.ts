type BaseWeaponQaulity = {
  name: string;
  casterLevel: number;
  type: "weapon-quality";
};

export type WeaponQaulityBonus = BaseWeaponQaulity & {
  modifier: number;
};

export type WeaponQaulityFlatPrice = BaseWeaponQaulity & {
  cost: number;
};

export type WeaponQaulity = WeaponQaulityBonus | WeaponQaulityFlatPrice;
