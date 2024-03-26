import { wondrousItems } from "./wondrous";

describe("wondrousItems", () => {
  it("contains no duplicate names, including subtitle", () => {
    const counts = wondrousItems.map((item) => ({
      name: item.name + item.subtitle,
      count: wondrousItems.filter(
        (w) => w.name + w.subtitle === item.name + item.subtitle
      ).length,
    }));

    const countsMoreThanOne = counts.filter((c) => c.count > 1);

    expect(countsMoreThanOne).toHaveLength(0);
  });
});
