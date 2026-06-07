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
