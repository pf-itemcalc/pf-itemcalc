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
  const [selectedComponents, setSelectedComponents] = useState<Component[]>([]);
  const [workingComponents, setWorkingComponents] = useState<
    Component[] | undefined
  >(undefined);

  const moveFromSelectionToWorking = () => {
    setWorkingComponents(selectedComponents);
    setSelectedComponents([]);
  };

  const moveBackToSearch = () => {
    setSelectedComponents(workingComponents ?? []);
    setWorkingComponents(undefined);
  };

  const reset = () => {
    setSelectedComponents([]);
    setWorkingComponents(undefined);
  };

  return (
    <FullSizeContainer>
      <Title small={!!workingComponents} />
      <ResponsiveAppContainer>
        {!workingComponents && (
          <SearchBox
            selectedComponents={orderComponents(selectedComponents)}
            setSelectedComponents={setSelectedComponents}
            onConfirm={moveFromSelectionToWorking}
          />
        )}
        {workingComponents && (
          <WorkingItems
            items={orderComponents(workingComponents)}
            setItems={setWorkingComponents}
            onBack={moveBackToSearch}
            onReset={reset}
          />
        )}
      </ResponsiveAppContainer>
    </FullSizeContainer>
  );
};

export default App;
