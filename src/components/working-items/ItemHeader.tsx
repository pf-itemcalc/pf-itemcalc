import Reply from "@mui/icons-material/Reply";
import Clear from "@mui/icons-material/Clear";
import { Button, Chip } from "@mui/material";
import type { Item } from "../../data/helpers";
import {
  getItemDisplayName,
  isAmmunition,
  isArmor,
  isArmorQuality,
  isEnhancement,
  isSpecificItem,
  isSpell,
  isSpellVessel,
  isWeapon,
  isWeaponQuality,
} from "../../data/helpers";
import { CenterBox } from "../containers/CenterBox";

type ItemHeaderProps = {
  items: Item[];
  setItems: (newItems: Item[]) => void;
  onBack: () => void;
  onReset: () => void;
};

const isDeletable = (item: Item, items: Item[]) =>
  (!isWeapon(item) &&
    !isAmmunition(item) &&
    !isArmor(item) &&
    !isSpellVessel(item) &&
    !isSpell(item) &&
    !isEnhancement(item) &&
    !isSpecificItem(item)) ||
  (isEnhancement(item) &&
    items.every((i) => !isArmorQuality(i) && !isWeaponQuality(i)));

const ItemHeader = ({ items, setItems, onBack, onReset }: ItemHeaderProps) => {
  const deleteItem = (item: Item) => () =>
    setItems(items.filter((i) => i !== item));

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
        {items.map((i) => (
          <Chip
            key={i.name}
            label={getItemDisplayName(i)}
            onDelete={isDeletable(i, items) ? deleteItem(i) : undefined}
          />
        ))}
      </CenterBox>
    </CenterBox>
  );
};

export default ItemHeader;
