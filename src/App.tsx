import { useState } from "react";
import { Box, styled } from "@mui/system";
import SearchBox from "./components/search-box/SearchBox";
import type { Component } from "./data/helpers";
import { orderComponents } from "./data/helpers";
import WorkingItems from "./components/working-items/WorkingItems";
import Title from "./components/title/Title";
import { mainBreakpoint } from "./components/responsive";

const FullSizeContainer = styled(Box)({
  display: "flex",
  width: "100%",
  alignItems: "center",
  flexDirection: "column",
});

const ResponsiveAppContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  [theme.breakpoints.down(mainBreakpoint)]: theme.unstable_sx({
    width: `calc(100vw - ${theme.spacing(4)})`,
  }),
  [theme.breakpoints.up(mainBreakpoint)]: {
    width: "50vw",
    minWidth: mainBreakpoint,
  },
}));

const App = () => {
  const [selectedItems, setSelectedItems] = useState<Component[]>([]);
  const [workingItems, setWorkingItems] = useState<Component[] | undefined>(
    undefined,
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
    <FullSizeContainer>
      <Title small={!!workingItems} />
      <ResponsiveAppContainer>
        {!workingItems && (
          <SearchBox
            selectedItems={orderComponents(selectedItems)}
            setSelectedItems={setSelectedItems}
            onConfirm={moveFromSelectionToWorking}
          />
        )}
        {workingItems && (
          <WorkingItems
            items={orderComponents(workingItems)}
            setItems={setWorkingItems}
            onBack={moveBackToSearch}
            onReset={reset}
          />
        )}
      </ResponsiveAppContainer>
    </FullSizeContainer>
  );
};

export default App;
