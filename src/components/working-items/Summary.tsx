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
} from "../../data/helpers";
import { range } from "lodash";

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

type SummaryProps = {
  items: Item[];
  children?: React.ReactNode;
};

const ItemTitle = ({ items, children }: SummaryProps) => {
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

const ItemSummary = ({ items }: SummaryProps) => {
  const casterLevel = getItemCasterLevel(items);
  const identifyMethod = getIdentifyMethod(casterLevel, items);
  const value = getItemValue(items);
  const weight = getItemWeight(items);

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
              <b>Weight</b>: {weight.toLocaleString()}lb
              {weight === 1 ? "" : "s"}
            </li>
          </ul>
        </ItemTitle>
      </ul>
    </Typography>
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
