import armorQaulities from "./armor-qualities";

describe("armor-qualities", () => {
  it("contains no duplicate names", () => {
    const counts = armorQaulities.map((quality) => ({
      name: quality.name,
      count: armorQaulities.filter((w) => w.name === quality.name).length,
    }));

    const countsMoreThanOne = counts.filter((c) => c.count > 1);

    expect(countsMoreThanOne).toHaveLength(0);
  });
});
