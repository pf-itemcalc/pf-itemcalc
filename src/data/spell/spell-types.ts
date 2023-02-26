export type SpellList =
  | "Sorcerer"
  | "Wizard"
  | "Cleric"
  | "Druid"
  | "Ranger"
  | "Bard"
  | "Paladin"
  | "Alchemist"
  | "Summoner"
  | "Witch"
  | "Inquisitor"
  | "Oracle"
  | "Antipaladin"
  | "Magus"
  | "Bloodrager"
  | "Adept"
  | "Psychic"
  | "Spiritualist"
  | "Shaman"
  | "Occultist"
  | "Arcanist"
  | "Hunter"
  | "Investigator"
  | "Medium"
  | "Mesmerist"
  | "Skald"
  | "Warpriest";

export type Spell = {
  name: string;
  // Picks core classes first, then base, then hybrid, then occult
  spellLevel: number;
  spellList: SpellList;
  materialCost: number; // in gp
  type: "spell";
};

export const getMinimumCasterLevel = (
  spellLevel: number,
  spellList: SpellList
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

export const getUrl = (spell: Spell) =>
  `https://aonprd.com/SpellDisplay.aspx?ItemName=${encodeURIComponent(
    spell.name
  )}`;
