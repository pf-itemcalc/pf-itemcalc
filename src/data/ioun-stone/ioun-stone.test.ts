import { iounStones } from "./ioun-stone";

describe("iounStones", () => {
  it("contains no duplicate names, including subtitle", () => {
    const counts = iounStones.map((item) => ({
      name: item.name + item.subtitle,
      count: iounStones.filter(
        (w) => w.name + w.subtitle === item.name + item.subtitle
      ).length,
    }));

    const countsMoreThanOne = counts.filter((c) => c.count > 1);

    expect(countsMoreThanOne).toHaveLength(0);
  });
});
