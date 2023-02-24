import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import SearchBox from "./components/search-box/SearchBox";

const App = () => {
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
      <SearchBox />
    </Box>
  );
};

export default App;
