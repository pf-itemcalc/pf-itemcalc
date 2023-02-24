import { useState } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import SearchBox from "./components/search-box/SearchBox";
import { Item } from "./data/helpers";

const App = () => {
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [workingItems, setWorkingItems] = useState<Item[] | undefined>(
    undefined
  );

  const moveFromSelectionToWorking = () => {
    setWorkingItems(selectedItems);
    setSelectedItems([]);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h1">PF Item Calc</Typography>
      <SearchBox
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        onConfirm={moveFromSelectionToWorking}
      />
    </Box>
  );
};

export default App;
