import * as React from "react";
import type { AutocompleteProps } from "@mui/material/Autocomplete";
import Autocomplete, { autocompleteClasses } from "@mui/material/Autocomplete";
import useMediaQuery from "@mui/material/useMediaQuery";
import ListSubheader from "@mui/material/ListSubheader";
import Popper from "@mui/material/Popper";
import { useTheme, styled } from "@mui/material/styles";
import type { ListImperativeAPI, RowComponentProps } from "react-window";
import { List } from "react-window";
import Typography from "@mui/material/Typography";
import type { Item } from "../../data/helpers";

const LISTBOX_PADDING = 8; // px

type ItemData = Array<
  | {
      key: number;
      group: string;
      children: React.ReactNode;
    }
  | [React.ReactElement, string, number]
>;

function RowComponent({
  index,
  itemData,
  style,
}: RowComponentProps & {
  itemData: ItemData;
}) {
  const dataSet = itemData[index];
  const inlineStyle = {
    ...style,
    top: ((style.top as number) ?? 0) + LISTBOX_PADDING,
  };

  if ("group" in dataSet) {
    return (
      <ListSubheader key={dataSet.key} component="div" style={inlineStyle}>
        {dataSet.group}
      </ListSubheader>
    );
  }

  const { key, ...optionProps } = dataSet[0];

  return (
    <Typography
      key={key}
      component="li"
      {...optionProps}
      noWrap
      style={inlineStyle}
    >
      {key}
    </Typography>
  );
}

// Adapter for react-window v2
const ListboxComponent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLElement> & {
    internalListRef: React.Ref<ListImperativeAPI>;
    onItemsBuilt: (optionIndexMap: Map<string, number>) => void;
  }
>(function ListboxComponent(props, ref) {
  const { children, internalListRef, onItemsBuilt, ...other } = props;
  const itemData: ItemData = [];
  const optionIndexMap = React.useMemo(() => new Map<string, number>(), []);

  (children as ItemData).forEach((item) => {
    itemData.push(item);
    if ("children" in item && Array.isArray(item.children)) {
      itemData.push(...item.children);
    }
  });

  // Map option values to their indices in the flattened array
  itemData.forEach((item, index) => {
    if (Array.isArray(item) && item[1]) {
      // eslint-disable-next-line react-hooks/immutability
      optionIndexMap.set(item[1], index);
    }
  });

  React.useEffect(() => {
    if (onItemsBuilt) {
      onItemsBuilt(optionIndexMap);
    }
  }, [onItemsBuilt, optionIndexMap]);

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"), {
    noSsr: true,
  });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = (child: ItemData[number]) => {
    if (Object.prototype.hasOwnProperty.call(child, "group")) {
      return 48;
    }
    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  // Separate className for List, other props for wrapper div (ARIA, handlers)
  const { className, style: _, ...otherProps } = other;

  return (
    <div ref={ref} {...otherProps}>
      <List
        className={className}
        listRef={internalListRef}
        key={itemCount}
        rowCount={itemCount}
        rowHeight={(index) => getChildSize(itemData[index])}
        rowComponent={RowComponent}
        rowProps={{ itemData }}
        style={{
          height: getHeight() + 2 * LISTBOX_PADDING,
          width: "100%",
        }}
        overscanCount={5}
        tagName="ul"
      />
    </div>
  );
});

const StyledPopper = styled(Popper)({
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: "border-box",
    "& ul": {
      padding: 0,
      margin: 0,
    },
  },
});

type VirtualisedSearchBoxProps = AutocompleteProps<
  Item, // Value type
  true, // Multiple
  false, // Disable-Clearable
  false // Free-Solo
>;

export const VirtualisedSearchBox = ({
  groupBy,
  options,
  getOptionLabel,
  open,
  onOpen,
  onClose,
  renderInput,
  sx,
  value,
  onChange,
  noOptionsText,
}: VirtualisedSearchBoxProps) => {
  return (
    <Autocomplete
      sx={sx}
      multiple
      disableListWrap
      filterSelectedOptions
      slots={{
        popper: StyledPopper,
      }}
      slotProps={{
        listbox: {
          component: ListboxComponent,
        },
      }}
      options={options}
      groupBy={groupBy}
      getOptionLabel={getOptionLabel}
      open={open}
      onOpen={onOpen}
      onClose={onClose}
      renderInput={renderInput}
      value={value}
      renderOption={(props, option, state) =>
        [props, option, state.index] as React.ReactNode
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      renderGroup={(params) => params as any}
      onChange={onChange}
      noOptionsText={noOptionsText}
    />
  );
};
