import { specificAmmoComponents } from "./specific-ammo";

describe("specificAmmoComponents", () => {
  it("contains no duplicate names, including subtitle", () => {
    const counts = specificAmmoComponents.map((ammo) => ({
      name: ammo.name + ammo.subtitle,
      count: specificAmmoComponents.filter(
        (w) => w.name + w.subtitle === ammo.name + ammo.subtitle,
      ).length,
    }));

    const countsMoreThanOne = counts.filter((c) => c.count > 1);

    expect(countsMoreThanOne).toHaveLength(0);
  });
});
