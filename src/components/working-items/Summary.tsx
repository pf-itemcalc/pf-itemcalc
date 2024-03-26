import React, { useState } from "react";
import { Autocomplete, TextField, Typography } from "@mui/material";
import {
  getItemCasterLevel,
  getIdentifyMethod,
  getItemUrl,
  getItemValue,
  getItemWeight,
  isMagic,
  Item,
  isSpell,
  getSpellCasterLevel,
  getSpellValue,
  isSpecificSpellVessel,
  getSpellLevel,
  getSpellList,
  isComposite,
  getItemDisplayName,
  isSpecificItem,
} from "../../data/helpers";
import { range } from "lodash";

type NewTabLinkProps = {
  url: string;
  children: React.ReactNode;
};
const NewTabLink = ({ url, children }: NewTabLinkProps) => {
  return (
    <a
      href={url}
      target="_blank"
      referrerPolicy="no-referrer"
      rel="noreferrer"
      style={{ color: "blue" }} // Prevents visited links showing differently
    >
      {children}
    </a>
  );
};

type ItemProps = {
  item: Item;
  compositeRating?: number;
};

const ItemDisplay = ({ item, compositeRating }: ItemProps) => {
  const url = getItemUrl(item);

  const name = getItemDisplayName(item, compositeRating);

  return url ? <NewTabLink url={url}>{name}</NewTabLink> : <>{name}</>;
};

type SummaryProps = {
  items: Item[];
};

type TitleProps = SummaryProps & {
  children?: React.ReactNode;
  compositeRating?: number;
};

const ItemTitle = ({ items, children, compositeRating }: TitleProps) => {
  const magical = isMagic(items);

  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    magical ? <i>{children}</i> : <>{children}</>;

  return (
    <li>
      <Wrapper>
        {items.map((i) => (
          <React.Fragment key={i.name}>
            <ItemDisplay item={i} compositeRating={compositeRating} />{" "}
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

const ItemSummary = ({ items }: SummaryProps) => {
  const casterLevel = getItemCasterLevel(items);
  const identifyMethod = getIdentifyMethod(casterLevel, items);

  const isCompositeBow = items.some(isComposite);
  const [rating, setRating] = useState(0);
  const compositeRating = isCompositeBow ? rating : undefined;

  const value = getItemValue(items, compositeRating);
  const weight = getItemWeight(items);

  const specificItem = items.find(isSpecificItem);
  const slot = specificItem ? specificItem.slot : undefined;

  return (
    <>
      {isCompositeBow && (
        <TextField
          sx={{ width: "50%", margin: 1 }}
          label="Composite Rating"
          type="number"
          inputMode="numeric"
          inputProps={{ min: 0 }}
          value={rating}
          onChange={(e) => setRating(Number(e.target.value) ?? 0)}
        />
      )}
      <Typography
        sx={{ width: "50%", border: "1px solid black", margin: 1, padding: 1 }}
        fontFamily="Calibri"
        fontSize={15}
      >
        <ul>
          <ItemTitle items={items} compositeRating={compositeRating}>
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
              {compositeRating !== undefined && (
                <li>
                  <b>Composite Rating</b>: {compositeRating.toLocaleString()}
                </li>
              )}
              {slot !== undefined && (
                <li>
                  <b>Slot</b>: {slot.toLocaleString()}
                </li>
              )}
              <li>
                <b>Value</b>: {value.toLocaleString()}gp
              </li>
              {weight > 0 && (
                <li>
                  <b>Weight</b>: {weight.toLocaleString()}lb
                  {weight === 1 ? "" : "s"}
                </li>
              )}
            </ul>
          </ItemTitle>
        </ul>
      </Typography>
    </>
  );
};

const SpellSummary = ({ items }: SummaryProps) => {
  const casterLevel = getSpellCasterLevel(items);
  const spellLevel = getSpellLevel(items);
  const spellList = getSpellList(items);
  const identifyMethod = getIdentifyMethod(casterLevel, items);
  const value = getSpellValue(items);

  const isWand = items.some((i) => isSpecificSpellVessel(i, "Wand"));

  const [charges, setCharges] = useState(50);

  return (
    <>
      {isWand && (
        <Autocomplete
          sx={{ width: "50%", margin: 1 }}
          options={range(1, 51)}
          renderInput={(params) => (
            <TextField {...params} label="Number of charges" />
          )}
          value={charges}
          getOptionLabel={(o) => o.toString()}
          onChange={(e, value) => setCharges(value ?? 50)}
        />
      )}
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
                    <b>SL</b>: {casterLevelDisplay(spellLevel)} ({spellList})
                  </li>
                  <li>
                    <b>CL</b>: {casterLevelDisplay(casterLevel)}
                  </li>
                  <li>
                    <b>Identify Method</b>: {identifyMethod}
                  </li>
                </>
              )}
              {isWand && (
                <li>
                  <b>Charges</b>: {charges}
                </li>
              )}
              <li>
                <b>Value</b>:{" "}
                {isWand
                  ? `${((value * charges) / 50).toLocaleString()}gp total (${(
                      value / 50
                    ).toLocaleString()}gp per charge)`
                  : `${value.toLocaleString()}gp`}
              </li>
            </ul>
          </ItemTitle>
        </ul>
      </Typography>
    </>
  );
};

const Summary = ({ items }: SummaryProps) => {
  const summaryForSpell = items.some((i) => isSpell(i));

  return summaryForSpell ? (
    <SpellSummary items={items} />
  ) : (
    <ItemSummary items={items} />
  );
};

export default Summary;
