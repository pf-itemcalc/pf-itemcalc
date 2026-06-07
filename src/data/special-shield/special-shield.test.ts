import { specialShieldComponents } from "./special-shield";

describe("specialShieldComponents", () => {
  it("contains no duplicate names, including subtitle", () => {
    const counts = specialShieldComponents.map((shield) => ({
      name: shield.name + shield.subtitle,
      count: specialShieldComponents.filter(
        (w) => w.name + w.subtitle === shield.name + shield.subtitle,
      ).length,
    }));

    const countsMoreThanOne = counts.filter((c) => c.count > 1);

    expect(countsMoreThanOne).toHaveLength(0);
  });
});
