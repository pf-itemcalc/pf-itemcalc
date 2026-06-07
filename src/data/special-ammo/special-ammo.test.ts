import { specialAmmoComponents } from "./special-ammo";

describe("specialAmmoComponents", () => {
  it("contains no duplicate names, including subtitle", () => {
    const counts = specialAmmoComponents.map((ammo) => ({
      name: ammo.name + ammo.subtitle,
      count: specialAmmoComponents.filter(
        (w) => w.name + w.subtitle === ammo.name + ammo.subtitle,
      ).length,
    }));

    const countsMoreThanOne = counts.filter((c) => c.count > 1);

    expect(countsMoreThanOne).toHaveLength(0);
  });
});
