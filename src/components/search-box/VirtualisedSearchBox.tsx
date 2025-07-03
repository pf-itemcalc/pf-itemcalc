import * as React from "react";
import Autocomplete, {
  AutocompleteChangeDetails,
  AutocompleteChangeReason,
  AutocompleteCloseReason,
  AutocompleteRenderInputParams,
  autocompleteClasses,
} from "@mui/material/Autocomplete";
import useMediaQuery from "@mui/material/useMediaQuery";
import ListSubheader from "@mui/material/ListSubheader";
import Popper from "@mui/material/Popper";
import { useTheme, styled, SxProps, Theme } from "@mui/material/styles";
import { VariableSizeList, ListChildComponentProps } from "react-window";
import Typography from "@mui/material/Typography";
import { Item } from "../../data/helpers";

const LISTBOX_PADDING = 8; // px

const renderRow = (props: ListChildComponentProps) => {
  const { data, index, style } = props;
  const dataSet = data[index];
  const inlineStyle = {
    ...style,
    top: (style.top as number) + LISTBOX_PADDING,
  };

  if (dataSet.hasOwnProperty("group")) {
    return (
      <ListSubheader key={dataSet.key} component="div" style={inlineStyle}>
        {dataSet.group}
      </ListSubheader>
    );
  }

  const { key } = dataSet[0];

  return (
    <Typography component="li" {...dataSet[0]} noWrap style={inlineStyle}>
      {key}
    </Typography>
  );
};

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef<HTMLDivElement>((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

const useResetCache = (data: any) => {
  const ref = React.useRef<VariableSizeList>(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
};

// Adapter for react-window
const ListboxComponent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLElement>
>(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const itemData: React.ReactElement[] = [];
  (children as React.ReactElement[]).forEach(
    (item: React.ReactElement & { children?: React.ReactElement[] }) => {
      itemData.push(item);
      itemData.push(...(item.children || []));
    }
  );

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up("sm"), {
    noSsr: true,
  });
  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = (child: React.ReactElement) => {
    if (child.hasOwnProperty("group")) {
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

  const gridRef = useResetCache(itemCount);

  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width="100%"
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
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

type VirtualizeSearchBoxProps = {
  groupBy: ((option: Item) => string) | undefined;
  options: Item[];
  getOptionLabel: ((option: Item) => string) | undefined;
  open: boolean;
  onOpen: ((event: React.SyntheticEvent<Element, Event>) => void) | undefined;
  onClose:
    | ((
        event: React.SyntheticEvent<Element, Event>,
        reason: AutocompleteCloseReason
      ) => void)
    | undefined;
  renderInput: (params: AutocompleteRenderInputParams) => React.ReactNode;
  sx: SxProps<Theme> | undefined;
  value: Item[] | undefined;
  onChange:
    | ((
        event: React.SyntheticEvent<Element, Event>,
        value: Item[],
        reason: AutocompleteChangeReason,
        details?: AutocompleteChangeDetails<Item> | undefined
      ) => void)
    | undefined;
  noOptionsText?: string;
};
export const VirtualizeSearchBox = ({
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
}: VirtualizeSearchBoxProps) => {
  return (
    <Autocomplete
      sx={sx}
      multiple
      disableListWrap
      filterSelectedOptions
      PopperComponent={StyledPopper}
      ListboxComponent={ListboxComponent}
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
      renderGroup={(params) => params as any}
      onChange={onChange}
      noOptionsText={noOptionsText}
    />
  );
};
