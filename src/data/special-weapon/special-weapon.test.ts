import { specialWeaponComponents } from "./special-weapon";

describe("specialWeaponComponents", () => {
  it("contains no duplicate names, including subtitle", () => {
    const counts = specialWeaponComponents.map((weapon) => ({
      name: weapon.name + weapon.subtitle,
      count: specialWeaponComponents.filter(
        (w) => w.name + w.subtitle === weapon.name + weapon.subtitle,
      ).length,
    }));

    const countsMoreThanOne = counts.filter((c) => c.count > 1);

    expect(countsMoreThanOne).toHaveLength(0);
  });
});
