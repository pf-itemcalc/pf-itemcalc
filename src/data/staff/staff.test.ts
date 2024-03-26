import { staves } from "./staff";

describe("staves", () => {
  it("contains no duplicate names, including subtitle", () => {
    const counts = staves.map((item) => ({
      name: item.name + item.subtitle,
      count: staves.filter(
        (w) => w.name + w.subtitle === item.name + item.subtitle
      ).length,
    }));

    const countsMoreThanOne = counts.filter((c) => c.count > 1);

    expect(countsMoreThanOne).toHaveLength(0);
  });
});
