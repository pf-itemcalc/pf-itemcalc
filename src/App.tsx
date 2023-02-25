import { useState } from "react";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import SearchBox from "./components/search-box/SearchBox";
import { Item, orderItems } from "./data/helpers";
import WorkingItems from "./components/working-items/WorkingItems";

const App = () => {
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [workingItems, setWorkingItems] = useState<Item[] | undefined>(
    undefined
  );

  const moveFromSelectionToWorking = () => {
    setWorkingItems(selectedItems);
    setSelectedItems([]);
  };

  const moveBackToSearch = () => {
    setSelectedItems(workingItems ?? []);
    setWorkingItems(undefined);
  };

  const reset = () => {
    setSelectedItems([]);
    setWorkingItems(undefined);
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant={workingItems ? "h3" : "h1"}>PF Item Calc</Typography>
      {!workingItems && (
        <SearchBox
          selectedItems={orderItems(selectedItems)}
          setSelectedItems={setSelectedItems}
          onConfirm={moveFromSelectionToWorking}
        />
      )}
      {workingItems && (
        <WorkingItems
          items={orderItems(workingItems)}
          setItems={setWorkingItems}
          onBack={moveBackToSearch}
          onReset={reset}
        />
      )}
    </Box>
  );
};

export default App;
