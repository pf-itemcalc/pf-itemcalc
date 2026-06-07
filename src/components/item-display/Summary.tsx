import React, { useCallback, useState } from "react";
import { Autocomplete, IconButton, styled, TextField } from "@mui/material";
import {
  getItemCasterLevel,
  getIdentifyMethod,
  getComponentUrl,
  getItemValue,
  getItemWeight,
  isMagic,
  isSpell,
  getSpellCasterLevel,
  getSpellValue,
  isSpellVesselOfType,
  getSpellLevel,
  getSpellList,
  isComposite,
  getComponentDisplayName,
  componentIsSingularItem,
  isCount,
} from "../../engine/helpers";
import { range } from "lodash";
import type { Ammunition } from "../../data/ammunition/ammunition-types";
import ContentCopy from "@mui/icons-material/ContentCopy";
import TurndownService from "turndown";
import NumberField from "../number-field/NumberField";
import { newCountComponent } from "../../data/special/count";
import type { Component } from "../../data/component-types";
import { isAmmunition } from "../../data/ammunition/ammunition-utilities";

const SurroundingBox = styled("div")({
  width: "100%",
  border: "1px solid black",
  margin: 1,
  padding: 1,
  fontFamily: "Calibri",
  fontSize: 15,
});

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
  item: Component;
  compositeRating?: number;
  plural: boolean;
};

const ItemDisplay = ({ item, compositeRating, plural }: ItemProps) => {
  const url = getComponentUrl(item);

  const name = getComponentDisplayName(item, { compositeRating, plural });

  return url ? <NewTabLink url={url}>{name}</NewTabLink> : <>{name}</>;
};

type SetItemsFunction = (newItems: Component[]) => void;
type SummaryProps = {
  items: Component[];
  setItems: SetItemsFunction;
};

type InnerSummaryProps = SummaryProps & {
  onCopy: () => void;
};

const Wrapper = ({
  children,
  magical,
}: {
  children: React.ReactNode;
  magical: boolean;
}) => (magical ? <i>{children}</i> : <>{children}</>);

type TitleProps = {
  items: Component[];
  children?: React.ReactNode;
  compositeRating?: number;
  count: number;
};

const ItemTitle = ({ items, children, compositeRating, count }: TitleProps) => {
  const magical = isMagic(items);

  return (
    <li>
      {count > 1 ? `${count}x ` : ""}
      <Wrapper magical={magical}>
        {items
          .filter((i) => !isCount(i))
          .map((i) => (
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

const useCount = (
  casterLevel: number | undefined,
  items: Component[],
  setItems: SetItemsFunction,
): [number, (newCount: number) => void] => {
  const countItem = items.find(isCount);
  const ammunition = items.find(isAmmunition);
  const [innerCount, setInnerCount] = useState(
    countItem?.count ?? getInitialCount(ammunition, casterLevel),
  );

  const setCount = useCallback(
    (newCount: number) => {
      setInnerCount(newCount);
      if (countItem) {
        setItems([
          ...items.filter((i) => !isCount(i)),
          newCountComponent(newCount),
        ]);
      }
    },
    [items, countItem, setInnerCount, setItems],
  );

  return [innerCount, setCount];
};

const ItemSummary = ({ items, onCopy, setItems }: InnerSummaryProps) => {
  const casterLevel = getItemCasterLevel(items);
  const identifyMethod = getIdentifyMethod(casterLevel, items);

  const isCompositeBow = items.some(isComposite);
  const [rating, setRating] = useState(0);
  const compositeRating = isCompositeBow ? rating : undefined;

  const value = getItemValue(items, compositeRating);
  const weight = getItemWeight(items);

  const specificItem = items.find(componentIsSingularItem);
  const slot = specificItem ? specificItem.slot.toString() : undefined;

  const [count, setCount] = useCount(casterLevel, items, setItems);

  return (
    <>
      <NumberField
        size="small"
        sx={{ width: "100%", margin: 1 }}
        label="Count"
        inputMode="numeric"
        min={1}
        value={count}
        onValueChange={(value) => {
          setCount(Math.max(value ?? 1, 1));
        }}
      />
      {isCompositeBow && (
        <NumberField
          size="small"
          sx={{ width: "100%", margin: 1 }}
          label="Composite Rating"
          inputMode="numeric"
          min={0}
          value={rating}
          onValueChange={(value) => setRating(value ?? 0)}
        />
      )}
      <SurroundingBox>
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
      </SurroundingBox>
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

const SpellSummary = ({ items, onCopy, setItems }: InnerSummaryProps) => {
  const casterLevel = getSpellCasterLevel(items);
  const spellLevel = getSpellLevel(items);
  const spellList = getSpellList(items);

  const isWand = items.some((i) => isSpellVesselOfType(i, "Wand"));

  const [charges, setCharges] = useState(50);
  const [overrideCasterLevel, setOverrideCasterLevel] = useState(casterLevel);

  const identifyMethod = getIdentifyMethod(overrideCasterLevel, items);
  const value = getSpellValue(items, overrideCasterLevel);

  const [count, setCount] = useCount(casterLevel, items, setItems);

  return (
    <>
      {!isWand && (
        <NumberField
          size="small"
          sx={{ width: "100%", margin: 1 }}
          label="Count"
          inputMode="numeric"
          min={1}
          value={count}
          onValueChange={(value) => {
            setCount(Math.max(value ?? 1, 1));
          }}
        />
      )}
      <Autocomplete
        size="small"
        sx={{ width: "100%", margin: 1 }}
        options={range(1, 21)}
        renderInput={(params) => <TextField {...params} label="Caster level" />}
        value={overrideCasterLevel}
        getOptionLabel={(o) => o.toString()}
        onChange={(_, value) => setOverrideCasterLevel(value ?? casterLevel)}
      />
      {isWand && (
        <Autocomplete
          size="small"
          sx={{ width: "100%", margin: 1 }}
          options={range(1, 51)}
          renderInput={(params) => (
            <TextField {...params} label="Number of charges" />
          )}
          value={charges}
          getOptionLabel={(o) => o.toString()}
          onChange={(_, value) => setCharges(value ?? 50)}
        />
      )}

      <SurroundingBox>
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
      </SurroundingBox>
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
};

const Summary = ({ items, setItems }: SummaryProps) => {
  const summaryForSpell = items.some((i) => isSpell(i));

  const onCopy = () => {
    const element = document.getElementById("SummaryItemList");
    if (!element) {
      return;
    }
    copyToClipboard(element);
  };

  return summaryForSpell ? (
    <SpellSummary items={items} setItems={setItems} onCopy={onCopy} />
  ) : (
    <ItemSummary items={items} setItems={setItems} onCopy={onCopy} />
  );
};

export default Summary;
