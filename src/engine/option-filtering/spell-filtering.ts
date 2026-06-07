import { isSpell } from "../../data/spell/spell-utilities";
import { isSpellVessel } from "../../data/spell-vessel/spell-vessel-utilities";
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
