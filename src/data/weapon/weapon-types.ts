export type WeaponCategory = "Simple" | "Martial" | "Exotic" | "Firearm";
export type WeaponSize = "Light" | "One-Handed" | "Two-Handed" | "Ranged";

export type Weapon = {
  name: string;
  cost: number; // in gp
  weight: number; // in lbs
  size: WeaponSize;
  category: WeaponCategory;
  type: "weapon";
};
