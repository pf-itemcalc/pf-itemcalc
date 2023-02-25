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
          <Typography sx={{ paddingBottom: 1 }}>
            <b>Welcome to my Pathfinder 1st edition item calculator.</b>
          </Typography>
          <Typography sx={{ paddingBottom: 1 }}>
            <b>The purpose of this tool</b> is to quickly find an item,
            calculate its cost, weight and caster level, and display this
            information in a copy-and-pasteable format (compatible with
            OneNote).
          </Typography>
          <Typography sx={{ paddingBottom: 1 }}>
            <b>This tool is best used</b> when you already know exactly what
            item you want to search for. For example you want to know about a +1
            flaming cold iron longsword, or a potion of fly. If you don't know
            off the top of your head what the value, weight and CL of this item
            is, then this is the place for you!
          </Typography>
          <Typography sx={{ paddingBottom: 1 }}>
            <b>This tool does not</b> intelligently suggest what item qualities
            and special materials go together. It does its best to narrow down
            options in some cases. However, it will not tell you, for example,
            that you cannot apply the <i>Distance</i> quality to a longsword.
          </Typography>
          <Typography>
            <b>This tool currently cannot:</b>
            <ul>
              <li>Calculate scrolls, potions or wands (TODO)</li>
              <li>Calculate extra composite bow costs (TODO)</li>
              <li>Calculate ammunition</li>
              <li>
                Calculate double-headed weapons (treated only single headed)
              </li>
              <li>List all wonderous items (just go search for them!)</li>
              <li>
                List all specific magical armor and weapons (just go search for
                them!)
              </li>
            </ul>
          </Typography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button onClick={() => setHelpOpen(false)}>Ok</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Title;
