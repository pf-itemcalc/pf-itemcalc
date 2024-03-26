import { specialWeaponItems } from "./special-weapon";

describe("specialWeaponItems", () => {
  it("contains no duplicate names, including subtitle", () => {
    const counts = specialWeaponItems.map((item) => ({
      name: item.name + item.subtitle,
      count: specialWeaponItems.filter(
        (w) => w.name + w.subtitle === item.name + item.subtitle
      ).length,
    }));

    const countsMoreThanOne = counts.filter((c) => c.count > 1);

    expect(countsMoreThanOne).toHaveLength(0);
  });
});
