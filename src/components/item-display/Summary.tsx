import React, { useCallback, useState } from "react";
import { Autocomplete, IconButton, styled, TextField } from "@mui/material";
import {
  getItemCasterLevel,
  getIdentifyMethod,
  getComponentUrl,
  getItemValue,
  getItemWeight,
  isMagic,
  getSpellCasterLevel,
  getSpellValue,
  getSpellLevel,
  getSpellList,
  getComponentDisplayName,
} from "../../engine/helpers";
import { isCount } from "../../data/generic/count-utilities";
import { componentIsSpecificItem } from "../../data/specific-item/specific-item-utilities";
import { isSpell } from "../../data/spell/spell-utilities";
import { isSpellVesselOfType } from "../../data/spell-vessel/spell-vessel-utilities";
import { isComposite } from "../../data/weapon/weapon-utilities";
import { range } from "lodash";
import type { Ammunition } from "../../data/ammunition/ammunition-types";
import ContentCopy from "@mui/icons-material/ContentCopy";
import TurndownService from "turndown";
import NumberField from "../number-field/NumberField";
import { newCountComponent } from "../../data/generic/count";
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

type ComponentDisplayProps = {
  component: Component;
  compositeRating?: number;
  plural: boolean;
};

const ComponentDisplay = ({
  component,
  compositeRating,
  plural,
}: ComponentDisplayProps) => {
  const url = getComponentUrl(component);

  const name = getComponentDisplayName(component, { compositeRating, plural });

  return url ? <NewTabLink url={url}>{name}</NewTabLink> : <>{name}</>;
};

type SetComponentsFunction = (newComponents: Component[]) => void;
type SummaryProps = {
  components: Component[];
  setComponents: SetComponentsFunction;
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
  components: Component[];
  children?: React.ReactNode;
  compositeRating?: number;
  count: number;
};

const ItemTitle = ({
  components,
  children,
  compositeRating,
  count,
}: TitleProps) => {
  const magical = isMagic(components);

  return (
    <li>
      {count > 1 ? `${count}x ` : ""}
      <Wrapper magical={magical}>
        {components
          .filter((i) => !isCount(i))
          .map((i) => (
            <React.Fragment key={i.name}>
              <ComponentDisplay
                component={i}
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

type ValueTextProps = {
  title: string;
  value: number;
  count: number;
  unit: string;
};
const ValueText = ({ title, value, count, unit }: ValueTextProps) => {
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
  components: Component[],
  setComponents: SetComponentsFunction,
): [number, (newCount: number) => void] => {
  const countComponent = components.find(isCount);
  const ammunition = components.find(isAmmunition);
  const [innerCount, setInnerCount] = useState(
    countComponent?.count ?? getInitialCount(ammunition, casterLevel),
  );

  const setCount = useCallback(
    (newCount: number) => {
      setInnerCount(newCount);
      if (countComponent) {
        setComponents([
          ...components.filter((i) => !isCount(i)),
          newCountComponent(newCount),
        ]);
      }
    },
    [components, countComponent, setInnerCount, setComponents],
  );

  return [innerCount, setCount];
};

const ItemSummary = ({
  components,
  onCopy,
  setComponents,
}: InnerSummaryProps) => {
  const casterLevel = getItemCasterLevel(components);
  const identifyMethod = getIdentifyMethod(casterLevel, components);

  const isCompositeBow = components.some(isComposite);
  const [rating, setRating] = useState(0);
  const compositeRating = isCompositeBow ? rating : undefined;

  const value = getItemValue(components, compositeRating);
  const weight = getItemWeight(components);

  const specificItem = components.find(componentIsSpecificItem);
  const slot = specificItem ? specificItem.slot.toString() : undefined;

  const [count, setCount] = useCount(casterLevel, components, setComponents);

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
        <ul id={elementToCopyIdentifier}>
          <ItemTitle
            components={components}
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
                <ValueText
                  title="Value"
                  value={value}
                  count={count}
                  unit={"gp"}
                />
              </li>
              {weight > 0 && (
                <li>
                  <ValueText
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

const SpellSummary = ({
  components,
  onCopy,
  setComponents,
}: InnerSummaryProps) => {
  const casterLevel = getSpellCasterLevel(components);
  const spellLevel = getSpellLevel(components);
  const spellList = getSpellList(components);

  const isWand = components.some((i) => isSpellVesselOfType(i, "Wand"));

  const [charges, setCharges] = useState(50);
  const [overrideCasterLevel, setOverrideCasterLevel] = useState(casterLevel);

  const identifyMethod = getIdentifyMethod(overrideCasterLevel, components);
  const value = getSpellValue(components, overrideCasterLevel);

  const [count, setCount] = useCount(casterLevel, components, setComponents);

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
        <ul id={elementToCopyIdentifier}>
          <ItemTitle components={components} count={count}>
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
                  <ValueText
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

const elementToCopyIdentifier = "ItemSummaryCopyableSection";

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

const Summary = ({ components, setComponents }: SummaryProps) => {
  const summaryForSpell = components.some((i) => isSpell(i));

  const onCopy = () => {
    const element = document.getElementById(elementToCopyIdentifier);
    if (!element) {
      return;
    }
    copyToClipboard(element);
  };

  return summaryForSpell ? (
    <SpellSummary
      components={components}
      setComponents={setComponents}
      onCopy={onCopy}
    />
  ) : (
    <ItemSummary
      components={components}
      setComponents={setComponents}
      onCopy={onCopy}
    />
  );
};

export default Summary;
