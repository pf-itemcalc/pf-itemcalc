import type { Component } from "../component-types";
import type { Spell, SpellList } from "./spell-types";

export const isSpell = (component: Component): component is Spell =>
  component.type === "spell";

export const getSpellUrl = (spell: Spell) =>
  `https://aonprd.com/SpellDisplay.aspx?ItemName=${encodeURIComponent(
    spell.name,
  )}`;

export const getSpellMinimumCasterLevel = (
  spellLevel: number,
  spellList: SpellList,
) => {
  switch (spellList) {
    // Full caster (2nd level spells at 3rd level)
    case "Cleric":
    case "Druid":
    case "Wizard":
    case "Witch":
    case "Shaman":
    case "Arcanist":
      return Math.max(spellLevel * 2 - 1, 1);
    // Full caster (2nd level spells at 4th level)
    case "Sorcerer":
    case "Oracle":
    case "Psychic":
      return spellLevel === 1 ? 1 : Math.max(spellLevel * 2, 1);
    // 4th level casters that have CL at HD
    case "Bloodrager":
    case "Medium":
      return Math.max(3 + spellLevel * 3 - 2, 1);
    // 5th level casters
    case "Adept":
      return Math.max((spellLevel - 1) * 4, 1);
    // 6th level casters and 4th level casters that have CL at HD-4
    case "Bard":
    case "Ranger":
    case "Paladin":
    case "Alchemist":
    case "Summoner":
    case "Inquisitor":
    case "Antipaladin":
    case "Magus":
    case "Spiritualist":
    case "Occultist":
    case "Hunter":
    case "Investigator":
    case "Mesmerist":
    case "Skald":
    case "Warpriest":
      return Math.max(spellLevel * 3 - 2, 1);

    default:
      return 1;
  }
};
