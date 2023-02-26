import {
  Badge,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Typography,
} from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { useState } from "react";
import About from "./About";

type TitleProps = {
  small: boolean;
};

const Title = ({ small }: TitleProps) => {
  const [helpOpen, setHelpOpen] = useState(false);
  return (
    <Box>
      <Badge
        badgeContent={
          <IconButton
            sx={{ marginTop: small ? 2 : 3 }}
            size="small"
            onClick={() => setHelpOpen(true)}
          >
            <HelpOutlineIcon fontSize={small ? "small" : "large"} />
          </IconButton>
        }
      >
        <Typography variant={small ? "h3" : "h1"}>PF 1e Item Calc</Typography>
      </Badge>
      <Dialog open={helpOpen} onClose={() => setHelpOpen(false)}>
        <DialogTitle>
          <Typography variant="h4">Pathfinder 1e Item Calculator</Typography>
        </DialogTitle>
        <DialogContent>
          <About />
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button onClick={() => setHelpOpen(false)}>Ok</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Title;
