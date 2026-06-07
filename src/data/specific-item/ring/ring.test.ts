import { rings } from "./ring";

describe("rings", () => {
  it("contains no duplicate names, including subtitle", () => {
    const counts = rings.map((ring) => ({
      name: ring.name + ring.subtitle,
      count: rings.filter(
        (w) => w.name + w.subtitle === ring.name + ring.subtitle,
      ).length,
    }));

    const countsMoreThanOne = counts.filter((c) => c.count > 1);

    expect(countsMoreThanOne).toHaveLength(0);
  });
});
