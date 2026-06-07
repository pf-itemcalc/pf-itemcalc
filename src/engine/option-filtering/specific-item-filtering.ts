import { componentIsSpecificItem } from "../../data/specific-item/specific-item-utilities";
import type { ComponentFilterFunction } from "./option-filtering-types";

export const filterComponentsWhenSpecificItemIsPresent: ComponentFilterFunction =
  (selected, otherComponents) => {
    const specificItem = selected.find(componentIsSpecificItem);

    if (!specificItem) {
      return otherComponents;
    }

    // If a specific item is selected, then you cannot choose any other items
    return [];
  };
