import { specificWeaponComponents } from "./specific-weapon";

describe("specificWeaponComponents", () => {
  it("contains no duplicate names, including subtitle", () => {
    const counts = specificWeaponComponents.map((weapon) => ({
      name: weapon.name + weapon.subtitle,
      count: specificWeaponComponents.filter(
        (w) => w.name + w.subtitle === weapon.name + weapon.subtitle,
      ).length,
    }));

    const countsMoreThanOne = counts.filter((c) => c.count > 1);

    expect(countsMoreThanOne).toHaveLength(0);
  });
});
