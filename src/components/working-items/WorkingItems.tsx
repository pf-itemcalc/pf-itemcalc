import type { Component } from "../../data/helpers";
import ItemHeader from "./ItemHeader";
import Summary from "./Summary";

type WorkingItemsProps = {
  items: Component[];
  setItems: (newItems: Component[]) => void;
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
      <Summary items={items} setItems={setItems} />
    </>
  );
};

export default WorkingItems;
