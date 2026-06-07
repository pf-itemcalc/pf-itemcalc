import type { Component } from "../component-types";
import type { SizeModifier } from "./size-modifier-types";

export const isSizeModifier = (
  component: Component,
): component is SizeModifier => component.type === "size-modifier";
