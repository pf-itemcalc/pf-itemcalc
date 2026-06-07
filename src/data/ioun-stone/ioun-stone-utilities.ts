import type { Component } from "../component-types";
import type { IounStone } from "./ioun-stone-types";

export const isIounStone = (component: Component): component is IounStone =>
  component.type === "ioun-stone";
export const getIounStoneUrl = (item: IounStone): string =>
  `https://aonprd.com/MagicWondrousDisplay.aspx?FinalName=${encodeURIComponent(
    item.linkName,
  )}`;
