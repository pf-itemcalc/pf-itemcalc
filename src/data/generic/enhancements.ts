import { Enhancement } from "./enhancement-types";

export const Masterwork = { name: "masterwork", modifier: 0 };

const enhancements: Enhancement[] = [
  Masterwork,
  { name: "+1", modifier: 1 },
  { name: "+2", modifier: 2 },
  { name: "+3", modifier: 3 },
  { name: "+4", modifier: 4 },
  { name: "+5", modifier: 5 },
];

export default enhancements;
