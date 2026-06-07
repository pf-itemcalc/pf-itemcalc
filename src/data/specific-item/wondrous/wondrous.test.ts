import { wondrousItemComponents } from "./wondrous";

describe("wondrousItemComponents", () => {
  it("contains no duplicate names, including subtitle", () => {
    const counts = wondrousItemComponents.map((wondrousItem) => ({
      name: wondrousItem.name + wondrousItem.subtitle,
      count: wondrousItemComponents.filter(
        (w) =>
          w.name + w.subtitle === wondrousItem.name + wondrousItem.subtitle,
      ).length,
    }));

    const countsMoreThanOne = counts.filter((c) => c.count > 1);

    expect(countsMoreThanOne).toHaveLength(0);
  });
});
