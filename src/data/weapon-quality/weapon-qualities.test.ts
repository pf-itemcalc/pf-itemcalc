import weaponQaulities from "./weapon-qualities";

describe("weapon-qualities", () => {
  it("contains no duplicate names", () => {
    const counts = weaponQaulities.map((quality) => ({
      name: quality.name,
      count: weaponQaulities.filter((w) => w.name === quality.name).length,
    }));

    const countsMoreThanOne = counts.filter((c) => c.count > 1);

    expect(countsMoreThanOne).toHaveLength(0);
  });
});
