import { specialAmmoItems } from "./special-ammo";

describe("specialAmmoItems", () => {
  it("contains no duplicate names, including subtitle", () => {
    const counts = specialAmmoItems.map((item) => ({
      name: item.name + item.subtitle,
      count: specialAmmoItems.filter(
        (w) => w.name + w.subtitle === item.name + item.subtitle
      ).length,
    }));

    const countsMoreThanOne = counts.filter((c) => c.count > 1);

    expect(countsMoreThanOne).toHaveLength(0);
  });
});
