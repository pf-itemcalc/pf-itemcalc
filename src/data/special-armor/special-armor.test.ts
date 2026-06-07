import { specialArmorComponents } from "./special-armor";

describe("specialArmorComponents", () => {
  it("contains no duplicate names, including subtitle", () => {
    const counts = specialArmorComponents.map((armor) => ({
      name: armor.name + armor.subtitle,
      count: specialArmorComponents.filter(
        (w) => w.name + w.subtitle === armor.name + armor.subtitle,
      ).length,
    }));

    const countsMoreThanOne = counts.filter((c) => c.count > 1);

    expect(countsMoreThanOne).toHaveLength(0);
  });
});
