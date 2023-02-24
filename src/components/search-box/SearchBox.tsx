import { useState, useEffect } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { getItemType, Item } from "../../data/helpers";
import { getOptions, selectedItemsAreInvalid } from "./get-options";

const hints = [
  'Try searching for "+1, Distance, Darkwood, Longbow"',
  'Try searching for "+3, Flaming, Cold-Iron, Longsword"',
  'Try searching for "+1, Fortification (light), Adamantine, Breastplate"',
  'Try searching for "Potion of, Cure Light Wounds"',
  'Try searching for "+1, Bashing, Fire-Forged Steel, Buckler',
];

const SearchBox = () => {
  const [hintIndex, setHintIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setHintIndex((v) => (v + 1 === hints.length ? 0 : v + 1)),
      5000
    );
    return () => {
      clearInterval(interval);
    };
  }, []);

  const [selectedItems, setSelectedItems] = useState<Item[]>([]);

  const error = selectedItemsAreInvalid(selectedItems);

  return (
    <Autocomplete
      multiple
      groupBy={getItemType}
      options={getOptions(selectedItems)}
      getOptionLabel={(item) => item.name}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField
          {...params}
          label="Search"
          helperText={error ?? hints[hintIndex]}
          FormHelperTextProps={{ sx: { color: error ? "red" : "inherit" } }}
        />
      )}
      sx={{ width: "50%" }}
      value={selectedItems}
      onChange={(e, values) => setSelectedItems(values)}
    />
  );
};

export default SearchBox;
