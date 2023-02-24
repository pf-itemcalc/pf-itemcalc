import { Box } from "@mui/material";
import { Item } from "../../data/helpers";
import ItemHeader from "./ItemHeader";

type WorkingItemsProps = {
  items: Item[];
  setItems: (newItems: Item[]) => void;
  onBack: () => void;
  onReset: () => void;
};

const WorkingItems = ({
  items,
  setItems,
  onBack,
  onReset,
}: WorkingItemsProps) => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <ItemHeader
        items={items}
        setItems={setItems}
        onBack={onBack}
        onReset={onReset}
      />
    </Box>
  );
};

export default WorkingItems;
