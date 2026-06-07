import { staves } from "./staff";

describe("staves", () => {
  it("contains no duplicate names, including subtitle", () => {
    const counts = staves.map((staff) => ({
      name: staff.name + staff.subtitle,
      count: staves.filter(
        (w) => w.name + w.subtitle === staff.name + staff.subtitle,
      ).length,
    }));

    const countsMoreThanOne = counts.filter((c) => c.count > 1);

    expect(countsMoreThanOne).toHaveLength(0);
  });
});
