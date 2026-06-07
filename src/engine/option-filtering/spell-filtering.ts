import { isSpell, isSpellVessel } from "../../data/helpers";
import type { ComponentFilterFunction } from "../option-filtering/option-filtering-types";

export const filterComponentsWhenSpellIsPresent: ComponentFilterFunction = (
  selected,
  otherComponents,
) => {
  const spell = selected.find(isSpell);
  if (!spell) {
    return otherComponents;
  }

  // If a spell is selected, you can only choose a spell vessel that is applicable
  return otherComponents.filter(
    (i) => isSpellVessel(i) && i.maxSpellLevel >= spell.spellLevel,
  );
};
