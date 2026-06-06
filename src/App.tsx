import { useState } from "react";
import { Box, styled } from "@mui/system";
import SearchBox from "./components/search-box/SearchBox";
import type { Item } from "./data/helpers";
import { orderItems } from "./data/helpers";
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
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [workingItems, setWorkingItems] = useState<Item[] | undefined>(
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
      </ResponsiveAppContainer>
    </FullSizeContainer>
  );
};

export default App;
