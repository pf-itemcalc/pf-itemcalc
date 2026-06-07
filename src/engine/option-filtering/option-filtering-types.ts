import type { Component } from "../../data/component-types";

export type ComponentFilterFunction = (
  selected: Component[],
  otherComponents: Component[],
) => Component[];
