import { allComponents } from "./all-components";
import { getUniqueComponentIdentifier } from "../engine/helpers";

describe("all components", () => {
  it("contains no duplicate unique IDs", () => {
    const countsDictonary = allComponents.reduce<{ [id: string]: number }>(
      (dictionary, component) => {
        const id = getUniqueComponentIdentifier(component);
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

      const duplicates = allComponents.filter(
        (component) => getUniqueComponentIdentifier(component) === id,
      );
      expect(duplicates).toHaveLength(0);
    });
  });
});
