import Reply from "@mui/icons-material/Reply";
import Clear from "@mui/icons-material/Clear";
import { Box, Chip, IconButton } from "@mui/material";
import {
  isArmor,
  isArmorQuality,
  isEnhancement,
  isSpecificItem,
  isSpell,
  isSpellVessel,
  isWeapon,
  isWeaponQuality,
  Item,
} from "../../data/helpers";

type ItemHeaderProps = {
  items: Item[];
  setItems: (newItems: Item[]) => void;
  onBack: () => void;
  onReset: () => void;
};

const isDeletable = (item: Item, items: Item[]) =>
  (!isWeapon(item) &&
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
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box sx={{ maxWidth: "50%" }}>
        {items.map((i) => (
          <Chip
            sx={{ margin: 1, padding: 1 }}
            label={i.name}
            onDelete={isDeletable(i, items) ? deleteItem(i) : undefined}
          />
        ))}
      </Box>
      <IconButton onClick={onBack} title="Continue searching...">
        <Reply />
      </IconButton>
      <IconButton onClick={onReset} title="Clear all and return...">
        <Clear />
      </IconButton>
    </Box>
  );
};

export default ItemHeader;
