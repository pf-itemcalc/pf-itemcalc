import { getMinimumCasterLevel, SpellList } from "./spell-types";

type CasterLevelTestCase = [SpellList, number, number];

const generateClassCases = (
  spellList: SpellList,
  ...expectedMinCasterLevels: number[]
) => expectedMinCasterLevels.map((cl, i) => [spellList, i + 1, cl]);

describe(getMinimumCasterLevel.name, () => {
  it.each([
    ...generateClassCases("Cleric", 1, 3, 5, 7, 9, 11, 13, 15, 17),
    ...generateClassCases("Druid", 1, 3, 5, 7, 9, 11, 13, 15, 17),
    ...generateClassCases("Wizard", 1, 3, 5, 7, 9, 11, 13, 15, 17),
    ...generateClassCases("Witch", 1, 3, 5, 7, 9, 11, 13, 15, 17),
    ...generateClassCases("Shaman", 1, 3, 5, 7, 9, 11, 13, 15, 17),
    ...generateClassCases("Arcanist", 1, 3, 5, 7, 9, 11, 13, 15, 17),

    ...generateClassCases("Sorcerer", 1, 4, 6, 8, 10, 12, 14, 16, 18),
    ...generateClassCases("Oracle", 1, 4, 6, 8, 10, 12, 14, 16, 18),
    ...generateClassCases("Psychic", 1, 4, 6, 8, 10, 12, 14, 16, 18),

    ...generateClassCases("Bloodrager", 4, 7, 10, 13),
    ...generateClassCases("Medium", 4, 7, 10, 13),

    ...generateClassCases("Adept", 1, 4, 8, 12, 16),

    ...generateClassCases("Bard", 1, 4, 7, 10, 13, 16),
    ...generateClassCases("Alchemist", 1, 4, 7, 10, 13, 16),
    ...generateClassCases("Summoner", 1, 4, 7, 10, 13, 16),
    ...generateClassCases("Inquisitor", 1, 4, 7, 10, 13, 16),
    ...generateClassCases("Magus", 1, 4, 7, 10, 13, 16),
    ...generateClassCases("Spiritualist", 1, 4, 7, 10, 13, 16),
    ...generateClassCases("Occultist", 1, 4, 7, 10, 13, 16),
    ...generateClassCases("Hunter", 1, 4, 7, 10, 13, 16),
    ...generateClassCases("Investigator", 1, 4, 7, 10, 13, 16),
    ...generateClassCases("Mesmerist", 1, 4, 7, 10, 13, 16),
    ...generateClassCases("Skald", 1, 4, 7, 10, 13, 16),
    ...generateClassCases("Warpriest", 1, 4, 7, 10, 13, 16),

    ...generateClassCases("Ranger", 1, 4, 7, 10),
    ...generateClassCases("Paladin", 1, 4, 7, 10),
    ...generateClassCases("Antipaladin", 1, 4, 7, 10),
  ] as CasterLevelTestCase[])(
    "given spell list %s and spell level %s returns minimum caster level %s",
    (spellList, spellLevel, expectedCasterLevel) =>
      expect(getMinimumCasterLevel(spellLevel, spellList)).toBe(
        expectedCasterLevel
      )
  );
});
