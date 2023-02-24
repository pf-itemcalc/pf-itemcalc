export type ArmorCategory = "Light" | "Medium" | "Heavy" | "Shield";

export type Armor = {
  name: string;
  cost: number; // in gp
  weight: number; // in lbs
  category: ArmorCategory;
};

export const getUrl = (armor: Armor) =>
  `https://aonprd.com/EquipmentArmorDisplay.aspx?ItemName=${encodeURIComponent(
    armor.name
  )}`;
