import spells from "./spells";

describe("spells", () => {
  it("contains no duplicate names", () => {
    const counts = spells.map((quality) => ({
      name: quality.name,
      count: spells.filter((w) => w.name === quality.name).length,
    }));

    const countsMoreThanOne = counts.filter((c) => c.count > 1);

    expect(countsMoreThanOne).toHaveLength(0);
  });
});
