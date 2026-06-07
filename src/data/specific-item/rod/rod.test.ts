import { rods } from "./rod";

describe("rods", () => {
  it("contains no duplicate names, including subtitle", () => {
    const counts = rods.map((rod) => ({
      name: rod.name + rod.subtitle,
      count: rods.filter((w) => w.name + w.subtitle === rod.name + rod.subtitle)
        .length,
    }));

    const countsMoreThanOne = counts.filter((c) => c.count > 1);

    expect(countsMoreThanOne).toHaveLength(0);
  });
});
