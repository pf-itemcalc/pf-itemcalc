import {
  Badge,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
  type DialogProps,
} from "@mui/material";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import { useState } from "react";
import About from "./About";
import { mainBreakpoint } from "../responsive";

type TitleProps = {
  small: boolean;
};

const ResponsiveBadgeButton = styled(IconButton)<TitleProps>(
  ({ small, theme }) => ({
    [theme.breakpoints.down(mainBreakpoint)]: {
      marginTop: theme.spacing(small ? 1 : 2),
    },
    [theme.breakpoints.up(mainBreakpoint)]: {
      marginTop: theme.spacing(small ? 1 : 3),
    },
  }),
);

const ResponsiveHelpIcon = styled(HelpOutlineOutlinedIcon)<TitleProps>(
  ({ small, theme }) => ({
    [theme.breakpoints.down(mainBreakpoint)]: {
      fontSize: small ? 16 : 20,
    },
    [theme.breakpoints.up(mainBreakpoint)]: {
      fontSize: small ? 20 : 32,
    },
  }),
);

const ResponsiveTitleText = styled(Typography)<TitleProps>(
  ({ small, theme }) => ({
    [theme.breakpoints.down(mainBreakpoint)]: theme.unstable_sx({
      typography: small ? "h5" : "h3",
    }),
    [theme.breakpoints.up(mainBreakpoint)]: theme.unstable_sx({
      typography: small ? "h3" : "h1",
    }),
  }),
);

const ResponsiveDialog = (props: Omit<DialogProps, "fullScreen">) => {
  const theme = useTheme();
  const screenIsSmall = useMediaQuery(theme.breakpoints.down(mainBreakpoint));
  return <Dialog {...props} fullScreen={screenIsSmall} />;
};

const Title = ({ small }: TitleProps) => {
  const [helpOpen, setHelpOpen] = useState(false);
  return (
    <Box>
      <Badge
        badgeContent={
          <ResponsiveBadgeButton
            title="About this app..."
            size="small"
            small={small}
            onClick={() => setHelpOpen(true)}
          >
            <ResponsiveHelpIcon small={small} />
          </ResponsiveBadgeButton>
        }
      >
        <ResponsiveTitleText small={small}>PF 1e Item Calc</ResponsiveTitleText>
      </Badge>
      <ResponsiveDialog open={helpOpen} onClose={() => setHelpOpen(false)}>
        <DialogTitle>
          <ResponsiveTitleText small={true} sx={{ textAlign: "center" }}>
            <b>Pathfinder 1e Item Calculator</b>
          </ResponsiveTitleText>
        </DialogTitle>
        <DialogContent>
          <About />
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center" }}>
          <Button onClick={() => setHelpOpen(false)}>Ok</Button>
        </DialogActions>
      </ResponsiveDialog>
    </Box>
  );
};

export default Title;
