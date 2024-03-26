import { specialArmorItems } from "./special-armor";

describe("specialArmorItems", () => {
  it("contains no duplicate names, including subtitle", () => {
    const counts = specialArmorItems.map((item) => ({
      name: item.name + item.subtitle,
      count: specialArmorItems.filter(
        (w) => w.name + w.subtitle === item.name + item.subtitle
      ).length,
    }));

    const countsMoreThanOne = counts.filter((c) => c.count > 1);

    expect(countsMoreThanOne).toHaveLength(0);
  });
});
