// Ammunition cannot have special materials applied to it, yet...
export type Ammunition = {
  name: string;
  pluralisedName?: string; // If undefined, name is already plural
  singularName?: string; // if undefined, name is already singular
  cost: number; // in gp for the entire bundle
  countInBundle: number; // the number of this item found in a 'bundle' that you can buy, e.g. 20 for Arrows (20)
  weight: number; // in lbs for the entire bundle
  type: "ammunition";
};
