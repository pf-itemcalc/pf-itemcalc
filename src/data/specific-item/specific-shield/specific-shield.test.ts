import { specificShieldComponents } from "./specific-shield";

describe("specificShieldComponents", () => {
  it("contains no duplicate names, including subtitle", () => {
    const counts = specificShieldComponents.map((shield) => ({
      name: shield.name + shield.subtitle,
      count: specificShieldComponents.filter(
        (w) => w.name + w.subtitle === shield.name + shield.subtitle,
      ).length,
    }));

    const countsMoreThanOne = counts.filter((c) => c.count > 1);

    expect(countsMoreThanOne).toHaveLength(0);
  });
});
