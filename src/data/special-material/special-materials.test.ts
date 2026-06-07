import specialMaterials from "./special-materials";

describe("special-materials", () => {
  it("contains no duplicate names", () => {
    const counts = specialMaterials.map((quality) => ({
      name: quality.name,
      count: specialMaterials.filter((w) => w.name === quality.name).length,
    }));

    const countsMoreThanOne = counts.filter((c) => c.count > 1);

    expect(countsMoreThanOne).toHaveLength(0);
  });
});
