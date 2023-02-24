import armors from "./armors";

describe("armors", () => {
  it("contains no duplicate names", () => {
    const counts = armors.map((quality) => ({
      name: quality.name,
      count: armors.filter((w) => w.name === quality.name).length,
    }));

    const countsMoreThanOne = counts.filter((c) => c.count > 1);

    expect(countsMoreThanOne).toHaveLength(0);
  });
});
