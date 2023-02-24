import Reply from "@mui/icons-material/Reply";
import Clear from "@mui/icons-material/Clear";
import { Box, Chip, IconButton } from "@mui/material";
import { isArmor, isSpell, isWeapon, Item } from "../../data/helpers";

type ItemHeaderProps = {
  items: Item[];
  setItems: (newItems: Item[]) => void;
  onBack: () => void;
  onReset: () => void;
};

const isDeletable = (item: Item) =>
  !isWeapon(item) && !isArmor(item) && !isSpell(item);

const ItemHeader = ({ items, setItems, onBack, onReset }: ItemHeaderProps) => {
  const deleteItem = (item: Item) => () =>
    setItems(items.filter((i) => i !== item));

  return (
    <>
      <Box sx={{ maxWidth: "50%" }}>
        {items.map((i) => (
          <Chip
            sx={{ margin: 1, padding: 1 }}
            label={i.name}
            onDelete={isDeletable(i) ? deleteItem(i) : undefined}
          />
        ))}
      </Box>
      <IconButton onClick={onBack} title="Continue searching...">
        <Reply />
      </IconButton>
      <IconButton onClick={onReset} title="Clear all and return...">
        <Clear />
      </IconButton>
    </>
  );
};

export default ItemHeader;
