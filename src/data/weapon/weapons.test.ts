import weapons from "./weapons";

describe("weapons", () => {
  it("contains no duplicate names", () => {
    const counts = weapons.map((weapon) => ({
      name: weapon.name,
      count: weapons.filter((w) => w.name === weapon.name).length,
    }));

    const countsMoreThanOne = counts.filter((c) => c.count > 1);

    expect(countsMoreThanOne).toHaveLength(0);
  });
});
