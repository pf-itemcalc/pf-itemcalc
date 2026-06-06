import { Box, styled } from "@mui/material";

export const CenterBox = styled(Box)<{ flexDirection: "row" | "column" }>(
  ({ flexDirection }) => ({
    width: "100%",
    display: "flex",
    flexDirection,
    alignItems: "stretch",
    justifyContent: "center",
  }),
);
