import { rods } from "./rod";

describe("rods", () => {
  it("contains no duplicate names, including subtitle", () => {
    const counts = rods.map((item) => ({
      name: item.name + item.subtitle,
      count: rods.filter(
        (w) => w.name + w.subtitle === item.name + item.subtitle
      ).length,
    }));

    const countsMoreThanOne = counts.filter((c) => c.count > 1);

    expect(countsMoreThanOne).toHaveLength(0);
  });
});
