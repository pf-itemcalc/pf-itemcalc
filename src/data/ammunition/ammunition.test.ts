import { ammunition } from "./ammunition";

describe("ammunition", () => {
  it("each has either pluralised or singluar name defined", () => {
    // The ammunition names are inconsistent but we use them to generate URLs
    //  so they must be specified exactly as they are found online.
    // To get around awkward pluralisation we also define the alternate name
    //  either pluralised if the name is singular, or singular if the
    //  name is pluralised.
    // This test ensures that every name provides both plural and singular
    ammunition.forEach((ammo) => {
      if (ammo.singularName === undefined) {
        expect(ammo.pluralisedName).toBeDefined();
      }
      if (ammo.pluralisedName === undefined) {
        expect(ammo.singularName).toBeDefined();
      }
    });
  });

  it("contains no duplicate names", () => {
    const counts = ammunition.map((ammo) => ({
      name: ammo.name,
      count: ammunition.filter((i) => i.name === ammo.name).length,
    }));

    const countsMoreThanOne = counts.filter((c) => c.count > 1);

    expect(countsMoreThanOne).toHaveLength(0);
  });
});
