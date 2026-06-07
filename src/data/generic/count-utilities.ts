import type { Component } from "../component-types";
import type { Count } from "./count-types";

export const isCount = (component: Component): component is Count =>
  component.type === "count";
