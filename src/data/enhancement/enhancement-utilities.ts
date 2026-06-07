import type { Component } from "../component-types";
import type { Enhancement } from "./enhancement-types";

export const isEnhancement = (component: Component): component is Enhancement =>
  component.type === "enhancement";

export const isMagicEnhancement = (
  component: Component,
): component is Enhancement =>
  isEnhancement(component) && component.modifier > 0;
