export type ArmorCategory = "Light" | "Medium" | "Heavy" | "Shield";

export type Armor = {
  name: string;
  cost: number; // in gp
  weight: number; // in lbs
  category: ArmorCategory;
  suffix?: string; // used to add a suffix, most useful for shields; e.g. "Light Steel" becomes "Light Steel Shield"
  type: "armor";
};
