import type { Component } from "../helpers";

export type ComponentFilterFunction = (
  selected: Component[],
  otherComponents: Component[],
) => Component[];
