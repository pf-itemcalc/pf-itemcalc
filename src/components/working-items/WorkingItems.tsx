import { IconButton } from "@mui/material";
import { Item } from "../../data/helpers";

type WorkingItemsProps = {
  items: Item[];
  onBack: () => void;
  onReset: () => void;
};

const WorkingItems = ({ onBack, onReset }: WorkingItemsProps) => {
  return (
    <>
      <IconButton onClick={onBack}>Back</IconButton>
      <IconButton onClick={onReset}>Reset</IconButton>
    </>
  );
};

export default WorkingItems;
