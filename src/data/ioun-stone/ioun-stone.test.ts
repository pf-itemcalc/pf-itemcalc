import { iounStones } from "./ioun-stone";

describe("iounStones", () => {
  it("contains no duplicate names, including subtitle", () => {
    const counts = iounStones.map((iounStone) => ({
      name: iounStone.name + iounStone.subtitle,
      count: iounStones.filter(
        (w) => w.name + w.subtitle === iounStone.name + iounStone.subtitle,
      ).length,
    }));

    const countsMoreThanOne = counts.filter((c) => c.count > 1);

    expect(countsMoreThanOne).toHaveLength(0);
  });
});
