import type { Component } from "../../data/helpers";

export type ComponentFilterFunction = (
  selected: Component[],
  otherComponents: Component[],
) => Component[];
