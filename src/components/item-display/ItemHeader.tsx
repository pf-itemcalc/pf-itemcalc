import Reply from "@mui/icons-material/Reply";
import Clear from "@mui/icons-material/Clear";
import { Button, Chip } from "@mui/material";
import type { Component } from "../../data/helpers";
import { getComponentDisplayName } from "../../data/helpers";
import { CenterBox } from "../containers/CenterBox";
import { canRemoveComponentAndRemainValid } from "../../engine/validation/selected-components-valid";

type ItemHeaderProps = {
  components: Component[];
  setComponents: (newComponents: Component[]) => void;
  onBack: () => void;
  onReset: () => void;
};

const ItemHeader = ({
  components,
  setComponents,
  onBack,
  onReset,
}: ItemHeaderProps) => {
  const removeSelectedComponent = (component: Component) => () =>
    setComponents(components.filter((c) => c !== component));

  return (
    <CenterBox flexDirection="column">
      <CenterBox flexDirection="row" sx={{ gap: 1 }}>
        <Button
          size="small"
          endIcon={<Reply />}
          onClick={onBack}
          title="Go back to search box with current selection."
        >
          Go back
        </Button>
        <Button
          size="small"
          endIcon={<Clear />}
          onClick={onReset}
          title="Clear current selection and go back to search box."
        >
          Clear search
        </Button>
      </CenterBox>
      <CenterBox flexDirection="row" sx={{ flexWrap: "wrap", gap: 0.5 }}>
        {components.map((component) => (
          <Chip
            key={component.name}
            label={getComponentDisplayName(component)}
            onDelete={
              canRemoveComponentAndRemainValid(component, components)
                ? removeSelectedComponent(component)
                : undefined
            }
          />
        ))}
      </CenterBox>
    </CenterBox>
  );
};

export default ItemHeader;
