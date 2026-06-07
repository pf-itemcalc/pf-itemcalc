import { specificArmorComponents } from "./specific-armor";

describe("specificArmorComponents", () => {
  it("contains no duplicate names, including subtitle", () => {
    const counts = specificArmorComponents.map((armor) => ({
      name: armor.name + armor.subtitle,
      count: specificArmorComponents.filter(
        (w) => w.name + w.subtitle === armor.name + armor.subtitle,
      ).length,
    }));

    const countsMoreThanOne = counts.filter((c) => c.count > 1);

    expect(countsMoreThanOne).toHaveLength(0);
  });
});
