import { isCount } from "../../data/generic/count-utilities";
import { isSpellVesselOfType } from "../../data/spell-vessel/spell-vessel-utilities";
import type { ComponentFilterFunction } from "../option-filtering/option-filtering-types";

export const filterComponentsWhenCountIsPresent: ComponentFilterFunction = (
  selected,
  otherComponents,
) => {
  const countComponent = selected.find(isCount);
  if (!countComponent) {
    return otherComponents;
  }

  // We currently do not allow you to calculate the cost for multiple wands
  // Typically the charges is used for that (makes the text too long!)
  return otherComponents.filter((i) => !isSpellVesselOfType(i, "Wand"));
};
