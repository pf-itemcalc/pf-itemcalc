import { isSpell, isSpellVessel } from "../../data/helpers";
import type { ComponentFilterFunction } from "../option-filtering/option-filtering-types";

export const filterComponentsWhenSpellVesselIsPresent: ComponentFilterFunction =
  (selected, otherComponents) => {
    const spellVessel = selected.find(isSpellVessel);
    if (!spellVessel) {
      return otherComponents;
    }

    // If a spell vessel is selected, you can only choose a spell that is applicable
    return otherComponents.filter(
      (i) => isSpell(i) && spellVessel.maxSpellLevel >= i.spellLevel,
    );
  };
