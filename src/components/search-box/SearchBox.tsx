import { useState, useEffect } from "react";
import { Autocomplete, Button, TextField } from "@mui/material";
import { getItemType, Item } from "../../data/helpers";
import { getOptions, selectedItemsAreInvalid } from "./get-options";
import { Box } from "@mui/system";

const hints = [
  'Try searching for "+1, Distance, Darkwood, Longbow"',
  'Try searching for "+3, Flaming, Cold-Iron, Longsword"',
  'Try searching for "+1, Fortification (light), Adamantine, Breastplate"',
  'Try searching for "Potion of, Cure Light Wounds"',
  'Try searching for "+1, Bashing, Fire-Forged Steel, Buckler',
];

type SearchBoxProps = {
  selectedItems: Item[];
  setSelectedItems: React.Dispatch<React.SetStateAction<Item[]>>;
  onConfirm: () => void;
};

const SearchBox = ({
  selectedItems,
  setSelectedItems,
  onConfirm,
}: SearchBoxProps) => {
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

  const error = selectedItemsAreInvalid(selectedItems);

  const [open, setOpen] = useState(false);

  const onGo = () => {
    if (!error) {
      onConfirm();
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Autocomplete
        multiple
        groupBy={getItemType}
        options={getOptions(selectedItems)}
        getOptionLabel={(item) => item.name}
        filterSelectedOptions
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search"
            helperText={error ?? hints[hintIndex]}
            FormHelperTextProps={{ sx: { color: error ? "red" : "inherit" } }}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !open) {
                onGo();
              }
            }}
          />
        )}
        sx={{ width: "50%" }}
        value={selectedItems}
        onChange={(e, values) => setSelectedItems(values)}
      />
      <Button
        sx={{ marginBottom: 3, marginLeft: 1 }}
        variant="outlined"
        disabled={!!error}
        onClick={onGo}
      >
        Go!
      </Button>
    </Box>
  );
};

export default SearchBox;
