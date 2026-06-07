import { useState, useEffect } from "react";
import { Button, FormHelperText, TextField } from "@mui/material";
import type { Component } from "../../data/helpers";
import {
  getComponentDisplayName,
  getComponentTypeDisplayName,
  isCount,
  isSpellVesselOfType,
} from "../../data/helpers";
import {
  getOptions,
  selectedItemsAreInvalid,
} from "../../engine/options/get-options";
import { VirtualisedSearchBox } from "./VirtualisedSearchBox";
import { CenterBox } from "../containers/CenterBox";
import { newCountItem } from "../../data/special/count";

const getOptionsWithCount = (
  selectedItems: Component[],
  searchValue: string,
): Component[] => {
  const options = getOptions(selectedItems);
  const parsedValue = parseInt(searchValue);
  const countAlreadyUsed = selectedItems.some(isCount);
  const wandPresent = !!selectedItems.find((i) =>
    isSpellVesselOfType(i, "Wand"),
  );

  if (parsedValue > 0 && !countAlreadyUsed && !wandPresent) {
    return [...options, newCountItem(parsedValue)];
  }

  return options;
};

const hints = [
  'Try searching for and selecting "+1", "Distance", "Darkwood", "Longbow"',
  'Try searching for and selecting "+3", "Flaming", "Cold-Iron", "Longsword"',
  'Try searching for and selecting "+1", "Fortification (light)", "Adamantine", "Breastplate"',
  'Try searching for and selecting "Potion of", "Cure Light Wounds"',
  'Try searching for and selecting "+1", "Bashing", "Living Steel", "Buckler',
  'Try searching for and selecting "Cloak of quickened reflexes (+3/+4)',
  'Try searching for and selecting "Apparatus of the Crab',
];

type SearchBoxProps = {
  selectedItems: Component[];
  setSelectedItems: React.Dispatch<React.SetStateAction<Component[]>>;
  onConfirm: () => void;
};

const SearchBox = ({
  selectedItems,
  setSelectedItems,
  onConfirm,
}: SearchBoxProps) => {
  const [searchValue, setSearchValue] = useState("");
  const [hintIndex, setHintIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(
      () => setHintIndex((v) => (v + 1 === hints.length ? 0 : v + 1)),
      5000,
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

  const options = getOptionsWithCount(selectedItems, searchValue);

  const itemsInDropDownText =
    options.length === 0
      ? "Now press Go! or the Enter key"
      : `${options.length} option${options.length > 1 ? "(s)" : ""} in drop down`;
  const hintText =
    options.length === 0 ? "" : `${displayError ? error : hints[hintIndex]}`;

  return (
    <CenterBox flexDirection="column">
      <CenterBox flexDirection="row">
        <VirtualisedSearchBox
          groupBy={getComponentTypeDisplayName}
          options={options}
          getOptionLabel={getComponentDisplayName}
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search"
              onKeyDown={(event) => {
                if (event.key === "Enter" && !open) {
                  onGo();
                }
              }}
              value={searchValue}
              onChange={(e) => {
                setSearchValue(e.target.value);
              }}
            />
          )}
          sx={{ width: "100%" }}
          value={selectedItems}
          onChange={(_, values) => setSelectedItems(values)}
          noOptionsText="No more options, press Go! or the Enter key"
        />
        <Button
          sx={{
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
      </CenterBox>
      <FormHelperText
        sx={{ width: "100%", textAlign: "center" }}
        error={!!displayError}
      >
        {itemsInDropDownText}
        <br />
        {hintText}
      </FormHelperText>
    </CenterBox>
  );
};

export default SearchBox;
