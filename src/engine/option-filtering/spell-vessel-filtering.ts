import { isSpell } from "../../data/spell/spell-utilities";
import { isSpellVessel } from "../../data/spell-vessel/spell-vessel-utilities";
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
