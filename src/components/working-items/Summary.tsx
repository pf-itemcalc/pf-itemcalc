import React, { useState } from "react";
import { Autocomplete, IconButton, TextField } from "@mui/material";
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
  isAmmunition,
} from "../../data/helpers";
import { range } from "lodash";
import { Ammunition } from "../../data/ammunition/ammunition-types";
import ContentCopy from "@mui/icons-material/ContentCopy";
import TurndownService from "turndown";
import NumberField from "../number-field/NumberField";

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

type InnerSummaryProps = SummaryProps & {
  onCopy: () => void;
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
              plural={count > 1}
            />{" "}
          </React.Fragment>
        ))}
      </Wrapper>
      {children}
    </li>
  );
};

type CopyButtonProps = {
  onCopy: () => void;
};
const CopyButton = ({ onCopy }: CopyButtonProps) => (
  <IconButton
    title="Copy to clipboard"
    onClick={onCopy}
    sx={{ float: "right" }}
  >
    <ContentCopy fontSize="small" />
  </IconButton>
);

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

const getInitialCount = (
  ammunition: Ammunition | undefined,
  casterLevel: number | undefined,
): number => {
  if (ammunition && (casterLevel ?? 0) > 0) {
    return 50; // Enchanting magical ammo enchants 50 items in one go
  }

  if (ammunition) {
    return ammunition.countInBundle; // otherwise start with the number in the bundle selected
  }

  return 1;
};

const ItemSummary = ({ items, onCopy }: InnerSummaryProps) => {
  const casterLevel = getItemCasterLevel(items);
  const identifyMethod = getIdentifyMethod(casterLevel, items);

  const isCompositeBow = items.some(isComposite);
  const [rating, setRating] = useState(0);
  const compositeRating = isCompositeBow ? rating : undefined;

  const value = getItemValue(items, compositeRating);
  const weight = getItemWeight(items);

  const specificItem = items.find(isSpecificItem);
  const slot = specificItem ? specificItem.slot.toString() : undefined;

  const ammunition = items.find(isAmmunition);

  const [count, setCount] = useState(getInitialCount(ammunition, casterLevel));

  return (
    <>
      <NumberField
        size="small"
        sx={{ width: "50%", margin: 1 }}
        label="Count"
        inputMode="numeric"
        min={1}
        value={count}
        onValueChange={(value) => {
          setCount(Math.max(Number(value) ?? 1, 1));
        }}
      />
      {isCompositeBow && (
        <NumberField
          size="small"
          sx={{ width: "50%", margin: 1 }}
          label="Composite Rating"
          inputMode="numeric"
          min={0}
          value={rating}
          onValueChange={(value) => setRating(Number(value) ?? 0)}
        />
      )}
      <div
        style={{
          width: "50%",
          border: "1px solid black",
          margin: 1,
          padding: 1,
          fontFamily: "Calibri",
          fontSize: 15,
        }}
      >
        <CopyButton onCopy={onCopy} />
        <ul id="SummaryItemList">
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
                  <b>Slot</b>: {slot}
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
      </div>
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

const SpellSummary = ({ items, onCopy }: InnerSummaryProps) => {
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
        <NumberField
          size="small"
          sx={{ width: "50%", margin: 1 }}
          label="Count"
          inputMode="numeric"
          min={1}
          value={count}
          onValueChange={(value) => {
            setCount(Math.max(Number(value) ?? 1, 1));
          }}
        />
      )}
      <Autocomplete
        size="small"
        sx={{ width: "50%", margin: 1 }}
        options={range(1, 21)}
        renderInput={(params) => <TextField {...params} label="Caster level" />}
        value={overrideCasterLevel}
        getOptionLabel={(o) => o.toString()}
        onChange={(_, value) => setOverrideCasterLevel(value ?? casterLevel)}
      />
      {isWand && (
        <Autocomplete
          size="small"
          sx={{ width: "50%", margin: 1 }}
          options={range(1, 51)}
          renderInput={(params) => (
            <TextField {...params} label="Number of charges" />
          )}
          value={charges}
          getOptionLabel={(o) => o.toString()}
          onChange={(_, value) => setCharges(value ?? 50)}
        />
      )}

      <div
        style={{
          width: "50%",
          border: "1px solid black",
          margin: 1,
          padding: 1,
          fontFamily: "Calibri",
          fontSize: 15,
        }}
      >
        <CopyButton onCopy={onCopy} />
        <ul id="SummaryItemList">
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
      </div>
    </>
  );
};

const copyToClipboard = async (element: HTMLElement) => {
  const htmlContent = element.innerHTML;

  // Turndown is used to convert html into markdown as a
  //  fallback for when the consumer cannot use html
  const service = new TurndownService();
  const markdownContent = service.turndown(htmlContent);

  const clipboardItem = new ClipboardItem({
    ["text/plain"]: markdownContent, // Always need to supply plain text, in case the consumer cannot handle html
    ["text/html"]: htmlContent,
  });

  await navigator.clipboard.write([clipboardItem]);
  const items = await navigator.clipboard.readText();
  console.log("Copied", items);
};

const Summary = ({ items }: SummaryProps) => {
  const summaryForSpell = items.some((i) => isSpell(i));

  const onCopy = () => {
    const element = document.getElementById("SummaryItemList");
    if (!element) {
      return;
    }
    copyToClipboard(element);
  };

  return summaryForSpell ? (
    <SpellSummary items={items} onCopy={onCopy} />
  ) : (
    <ItemSummary items={items} onCopy={onCopy} />
  );
};

export default Summary;
