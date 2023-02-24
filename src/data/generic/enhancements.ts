import { Enhancement } from "./enhancement-types";

export const Masterwork: Enhancement = {
  name: "masterwork",
  modifier: 0,
  type: "enhancement",
};

const enhancements: Enhancement[] = [
  Masterwork,
  { name: "+1", modifier: 1, type: "enhancement" },
  { name: "+2", modifier: 2, type: "enhancement" },
  { name: "+3", modifier: 3, type: "enhancement" },
  { name: "+4", modifier: 4, type: "enhancement" },
  { name: "+5", modifier: 5, type: "enhancement" },
];

export default enhancements;
