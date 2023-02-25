import { Box } from "@mui/material";
import { Item } from "../../data/helpers";
import ItemHeader from "./ItemHeader";
import ItemSummary from "./ItemSummary";

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
    <>
      <ItemHeader
        items={items}
        setItems={setItems}
        onBack={onBack}
        onReset={onReset}
      />
      <ItemSummary items={items} />
    </>
  );
};

export default WorkingItems;
