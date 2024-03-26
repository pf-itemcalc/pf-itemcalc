import { useState, useEffect } from "react";
import { Autocomplete, Button, TextField } from "@mui/material";
import {
  getItemDisplayName,
  getItemTypeDisplayName,
  Item,
} from "../../data/helpers";
import { getOptions, selectedItemsAreInvalid } from "./get-options";
import { Box } from "@mui/system";

const hints = [
  'Try searching for "+1, Distance, Darkwood, Longbow"',
  'Try searching for "+3, Flaming, Cold-Iron, Longsword"',
  'Try searching for "+1, Fortification (light), Adamantine, Breastplate"',
  'Try searching for "Potion of, Cure Light Wounds"',
  'Try searching for "+1, Bashing, Living Steel, Buckler',
  'Try searching for "Cloak of quickened reflexes (+3/+4)',
  'Try searching for "Apparatus of the Crab',
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
  const displayError = selectedItems.length > 0 && error;

  const [open, setOpen] = useState(false);

  const onGo = () => {
    if (!error) {
      onConfirm();
    }
  };

  const options = getOptions(selectedItems);

  const hintText =
    options.length === 0
      ? "Now press Go! or the Enter key"
      : `${options.length} option(s) in drop down -- ${
          displayError ? error : hints[hintIndex]
        }`;

  // TODO ADD VIRTUALIZATON! https://mui.com/material-ui/react-autocomplete/#virtualization
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
        groupBy={getItemTypeDisplayName}
        options={options}
        getOptionLabel={(item) => getItemDisplayName(item)}
        filterSelectedOptions
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Search"
            helperText={hintText}
            FormHelperTextProps={{
              sx: { color: displayError ? "red" : "inherit" },
            }}
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
        sx={{
          marginBottom: 3,
          marginLeft: 1,
          paddingTop: 1.9,
          paddingBottom: 1.9,
        }}
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
