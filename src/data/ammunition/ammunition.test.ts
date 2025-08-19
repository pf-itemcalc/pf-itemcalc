import { ammunition } from "./ammunition";

describe("ammunition", () => {
  it("each has either pluralised or singluar name defined", () => {
    // The ammunition names are inconsistent but we use them to generate URLs
    //  so they must be specified exactly as they are found online.
    // To get around awkward pluralisation we also define the alternate name
    //  either pluralised if the name is singular, or singular if the
    //  name is pluralised.
    // This test ensures that every name provides both plural and singular
    ammunition.forEach((item) => {
      if (item.singularName === undefined) {
        expect(item.pluralisedName).toBeDefined();
      }
      if (item.pluralisedName === undefined) {
        expect(item.singularName).toBeDefined();
      }
    });
  });

  it("contains no duplicate names", () => {
    const counts = ammunition.map((item) => ({
      name: item.name,
      count: ammunition.filter((i) => i.name === item.name).length,
    }));

    const countsMoreThanOne = counts.filter((c) => c.count > 1);

    expect(countsMoreThanOne).toHaveLength(0);
  });
});
