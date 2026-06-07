import type { Component } from "../../data/helpers";
import ItemHeader from "./ItemHeader";
import Summary from "./Summary";

type ItemDisplayProps = {
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
}: ItemDisplayProps) => {
  return (
    <>
      <ItemHeader
        components={components}
        setComponents={setComponents}
        onBack={onBack}
        onReset={onReset}
      />
      <Summary items={components} setItems={setComponents} />
    </>
  );
};

export default ItemDisplay;
