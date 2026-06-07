import type { Component } from "../../data/helpers";
import ItemHeader from "./ItemHeader";
import Summary from "./Summary";

type WorkingItemsProps = {
  components: Component[];
  setComponents: (newComponents: Component[]) => void;
  onBack: () => void;
  onReset: () => void;
};

const ItemDisplay = ({
  components,
  setComponents,
  onBack,
  onReset,
}: WorkingItemsProps) => {
  return (
    <>
      <ItemHeader
        items={components}
        setItems={setComponents}
        onBack={onBack}
        onReset={onReset}
      />
      <Summary items={components} setItems={setComponents} />
    </>
  );
};

export default ItemDisplay;
