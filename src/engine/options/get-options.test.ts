import { getUniqueComponentIdentifier } from "../../data/helpers";
import { allItems } from "../../engine/options/get-options";

describe("all items", () => {
  it("contains no duplicate unique IDs", () => {
    const countsDictonary = allItems.reduce<{ [id: string]: number }>(
      (dictionary, item) => {
        const id = getUniqueComponentIdentifier(item);
        if (id in dictionary) {
          dictionary[id] = dictionary[id] + 1;
        } else {
          dictionary[id] = 1;
        }
        return dictionary;
      },
      {},
    );

    Object.entries(countsDictonary).forEach(([id, count]) => {
      if (count <= 1) {
        return;
      }

      const duplicates = allItems.filter(
        (item) => getUniqueComponentIdentifier(item) === id,
      );
      expect(duplicates).toHaveLength(0);
    });
  });
});
