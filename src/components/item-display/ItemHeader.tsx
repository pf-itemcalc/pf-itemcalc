import Reply from "@mui/icons-material/Reply";
import Clear from "@mui/icons-material/Clear";
import { Button, Chip } from "@mui/material";
import type { Component } from "../../data/helpers";
import {
  getComponentDisplayName,
  isAmmunition,
  isArmor,
  isArmorQuality,
  isEnhancement,
  componentIsSingularItem,
  isSpell,
  isSpellVessel,
  isWeapon,
  isWeaponQuality,
} from "../../data/helpers";
import { CenterBox } from "../containers/CenterBox";

type ItemHeaderProps = {
  components: Component[];
  setComponents: (newComponents: Component[]) => void;
  onBack: () => void;
  onReset: () => void;
};

const isDeletable = (component: Component, components: Component[]) =>
  (!isWeapon(component) &&
    !isAmmunition(component) &&
    !isArmor(component) &&
    !isSpellVessel(component) &&
    !isSpell(component) &&
    !isEnhancement(component) &&
    !componentIsSingularItem(component)) ||
  (isEnhancement(component) &&
    components.every((c) => !isArmorQuality(c) && !isWeaponQuality(c)));

const ItemHeader = ({
  components,
  setComponents,
  onBack,
  onReset,
}: ItemHeaderProps) => {
  const deleteComponent = (component: Component) => () =>
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
        {components.map((i) => (
          <Chip
            key={i.name}
            label={getComponentDisplayName(i)}
            onDelete={
              isDeletable(i, components) ? deleteComponent(i) : undefined
            }
          />
        ))}
      </CenterBox>
    </CenterBox>
  );
};

export default ItemHeader;
