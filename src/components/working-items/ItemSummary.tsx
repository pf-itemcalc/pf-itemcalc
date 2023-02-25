import React, { Children } from "react";
import { Typography } from "@mui/material";
import {
  getCasterLevel,
  getIdentifyMethod,
  getItemUrl,
  getValue,
  getWeight,
  isMagic,
  Item,
} from "../../data/helpers";
type NtlProps = {
  url: string;
  children: React.ReactNode;
};
const Ntl = ({ url, children }: NtlProps) => {
  return (
    <a
      href={url}
      target="_blank"
      referrerPolicy="no-referrer"
      style={{ color: "blue" }} // Prevents visited links showing differently
    >
      {children}
    </a>
  );
};

const ItemDisplay = ({ item }: { item: Item }) => {
  const url = getItemUrl(item);

  return url ? <Ntl url={url}>{item.name}</Ntl> : <>{item.name}</>;
};

type ItemSummaryProps = {
  items: Item[];
  children?: React.ReactNode;
};

const ItemTitle = ({ items, children }: ItemSummaryProps) => {
  const magical = isMagic(items);

  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    magical ? <i>{children}</i> : <>{children}</>;

  return (
    <li>
      <Wrapper>
        {items.map((i) => (
          <React.Fragment key={i.name}>
            <ItemDisplay item={i} />{" "}
          </React.Fragment>
        ))}
      </Wrapper>
      {children}
    </li>
  );
};

const casterLevelDisplay = (casterLevel: number) => {
  if (casterLevel > 3 && casterLevel < 21) {
    return `${casterLevel}th`;
  }

  switch (casterLevel % 10) {
    case 1:
      return `${casterLevel}st`;
    case 2:
      return `${casterLevel}nd`;
    case 3:
      return `${casterLevel}rd`;
    default:
      return `${casterLevel}th`;
  }
};

const ItemSummary = ({ items }: ItemSummaryProps) => {
  const casterLevel = getCasterLevel(items);
  const identifyMethod = getIdentifyMethod(casterLevel, items);
  const value = getValue(items);
  const weight = getWeight(items);

  return (
    <Typography
      sx={{ width: "50%", border: "1px solid black", margin: 1, padding: 1 }}
      fontFamily="Calibri"
      fontSize={15}
    >
      <ul>
        <ItemTitle items={items}>
          <ul>
            {casterLevel && (
              <>
                <li>
                  <b>CL</b>: {casterLevelDisplay(casterLevel)}
                </li>
                <li>
                  <b>Identify Method</b>: {identifyMethod}
                </li>
              </>
            )}
            <li>
              <b>Value</b>: {value.toLocaleString()}gp
            </li>
            <li>
              <b>Weight</b>: {weight.toLocaleString()}lbs
            </li>
          </ul>
        </ItemTitle>
      </ul>
    </Typography>
  );
};

export default ItemSummary;
