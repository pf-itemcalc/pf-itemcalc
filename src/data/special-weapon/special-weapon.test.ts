import { specialWeaponComponents } from "./special-weapon";

describe("specialWeaponItems", () => {
  it("contains no duplicate names, including subtitle", () => {
    const counts = specialWeaponComponents.map((item) => ({
      name: item.name + item.subtitle,
      count: specialWeaponComponents.filter(
        (w) => w.name + w.subtitle === item.name + item.subtitle,
      ).length,
    }));

    const countsMoreThanOne = counts.filter((c) => c.count > 1);

    expect(countsMoreThanOne).toHaveLength(0);
  });
});
