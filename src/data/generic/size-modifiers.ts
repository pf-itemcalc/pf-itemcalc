import { SizeModifier } from "./size-modifier-types";

const sizeModifiers: SizeModifier[] = [
  {
    name: "Tiny",
    priceMultiplier: 0.5,
    weightMultiplier: 0.1,
    type: "size-modifier",
  },
  {
    name: "Small",
    priceMultiplier: 1,
    weightMultiplier: 0.5,
    type: "size-modifier",
  },
  {
    name: "Large",
    priceMultiplier: 2,
    weightMultiplier: 2,
    type: "size-modifier",
  },
  {
    name: "Huge",
    priceMultiplier: 4,
    weightMultiplier: 5,
    type: "size-modifier",
  },
  {
    name: "Gargantuan",
    priceMultiplier: 8,
    weightMultiplier: 8,
    type: "size-modifier",
  },
  {
    name: "Colossal",
    priceMultiplier: 16,
    weightMultiplier: 12,
    type: "size-modifier",
  },
];

export default sizeModifiers;
