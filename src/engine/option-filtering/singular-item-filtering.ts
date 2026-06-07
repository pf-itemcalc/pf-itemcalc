import { componentIsSpecificItem } from "../helpers";
import type { ComponentFilterFunction } from "../option-filtering/option-filtering-types";

export const filterComponentsWhenSingularItemIsPresent: ComponentFilterFunction =
  (selected, otherComponents) => {
    const specificItem = selected.find(componentIsSpecificItem);

    if (!specificItem) {
      return otherComponents;
    }

    // If a specific item is selected, then you cannot choose any other items
    return [];
  };
