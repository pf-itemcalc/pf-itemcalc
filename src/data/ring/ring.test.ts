import { rings } from "./ring";

describe("rings", () => {
  it("contains no duplicate names, including subtitle", () => {
    const counts = rings.map((item) => ({
      name: item.name + item.subtitle,
      count: rings.filter(
        (w) => w.name + w.subtitle === item.name + item.subtitle
      ).length,
    }));

    const countsMoreThanOne = counts.filter((c) => c.count > 1);

    expect(countsMoreThanOne).toHaveLength(0);
  });
});
