import { specialShieldComponents } from "./special-shield";

describe("specialShieldItems", () => {
  it("contains no duplicate names, including subtitle", () => {
    const counts = specialShieldComponents.map((item) => ({
      name: item.name + item.subtitle,
      count: specialShieldComponents.filter(
        (w) => w.name + w.subtitle === item.name + item.subtitle,
      ).length,
    }));

    const countsMoreThanOne = counts.filter((c) => c.count > 1);

    expect(countsMoreThanOne).toHaveLength(0);
  });
});
