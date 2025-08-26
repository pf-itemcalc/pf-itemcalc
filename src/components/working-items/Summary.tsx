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
  plural: boolean;
};

const ItemDisplay = ({ item, compositeRating, plural }: ItemProps) => {
  const url = getItemUrl(item);

  const name = getItemDisplayName(item, { compositeRating, plural });

  return url ? <NewTabLink url={url}>{name}</NewTabLink> : <>{name}</>;
};

type SummaryProps = {
  items: Item[];
};

type TitleProps = SummaryProps & {
  children?: React.ReactNode;
  compositeRating?: number;
  count: number;
};

const ItemTitle = ({ items, children, compositeRating, count }: TitleProps) => {
  const magical = isMagic(items);

  const Wrapper = ({ children }: { children: React.ReactNode }) =>
    magical ? <i>{children}</i> : <>{children}</>;

  return (
    <li>
      {count > 1 ? `${count}x ` : ""}
      <Wrapper>
        {items.map((i) => (
          <React.Fragment key={i.name}>
            <ItemDisplay
              item={i}
              compositeRating={compositeRating}
              plural={count === 0 || count > 1}
            />{" "}
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

type ItemValueTextProps = {
  title: string;
  value: number;
  count: number;
  unit: string;
};
const ItemValueText = ({ title, value, count, unit }: ItemValueTextProps) => {
  if (count <= 1) {
    return (
      <>
        <b>{title}</b>: {value.toLocaleString()}
        {unit}
      </>
    );
  }

  return (
    <>
      <b>{title}</b>: {value.toLocaleString()}
      {unit} each ({value * count}
      {unit} total)
    </>
  );
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

  const [count, setCount] = useState(1);

  return (
    <>
      <TextField
        sx={{ width: "50%", margin: 1 }}
        label="Count"
        type="number"
        inputMode="numeric"
        inputProps={{ min: 1 }}
        value={count}
        onChange={(e) => {
          setCount(Math.max(Number(e.target.value) ?? 1, 1));
        }}
      />
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
          <ItemTitle
            items={items}
            compositeRating={compositeRating}
            count={count}
          >
            <ul>
              {casterLevel !== undefined && (
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
                <ItemValueText
                  title="Value"
                  value={value}
                  count={count}
                  unit={"gp"}
                />
              </li>
              {weight > 0 && (
                <li>
                  <ItemValueText
                    title="Weight"
                    value={weight}
                    count={count}
                    unit={weight === 1 ? "lb" : "lbs"}
                  />
                </li>
              )}
            </ul>
          </ItemTitle>
        </ul>
      </Typography>
    </>
  );
};

type WandValueTextProps = {
  value: number;
  charges: number;
};
const WandValueText = ({ value, charges }: WandValueTextProps) => {
  const valuePerCharge = value / 50;
  const valueForAllCharges = valuePerCharge * charges;

  return (
    <>
      <b>Value</b>:{" "}
      {`${valueForAllCharges.toLocaleString()}gp total (${valuePerCharge.toLocaleString()}gp per charge)`}
    </>
  );
};

const SpellSummary = ({ items }: SummaryProps) => {
  const casterLevel = getSpellCasterLevel(items);
  const spellLevel = getSpellLevel(items);
  const spellList = getSpellList(items);

  const isWand = items.some((i) => isSpecificSpellVessel(i, "Wand"));

  const [charges, setCharges] = useState(50);
  const [overrideCasterLevel, setOverrideCasterLevel] = useState(casterLevel);

  const identifyMethod = getIdentifyMethod(overrideCasterLevel, items);
  const value = getSpellValue(items, overrideCasterLevel);

  const [count, setCount] = useState(1);

  return (
    <>
      {!isWand && (
        <TextField
          sx={{ width: "50%", margin: 1 }}
          label="Count"
          type="number"
          inputMode="numeric"
          inputProps={{ min: 1 }}
          value={count}
          onChange={(e) => {
            setCount(Math.max(Number(e.target.value) ?? 1, 1));
          }}
        />
      )}
      <Autocomplete
        sx={{ width: "50%", margin: 1 }}
        options={range(1, 21)}
        renderInput={(params) => <TextField {...params} label="Caster level" />}
        value={overrideCasterLevel}
        getOptionLabel={(o) => o.toString()}
        onChange={(e, value) => setOverrideCasterLevel(value ?? casterLevel)}
      />
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
          <ItemTitle items={items} count={count}>
            <ul>
              {overrideCasterLevel && (
                <>
                  <li>
                    <b>SL</b>: {casterLevelDisplay(spellLevel)} ({spellList})
                  </li>
                  <li>
                    <b>CL</b>: {casterLevelDisplay(overrideCasterLevel)}
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
                {isWand ? (
                  <WandValueText value={value} charges={charges} />
                ) : (
                  <ItemValueText
                    title="Value"
                    value={value}
                    count={count}
                    unit="gp"
                  />
                )}
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
