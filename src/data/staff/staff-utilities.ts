import type { Component } from "../component-types";
import type { Staff } from "./staff-types";

export const isStaff = (component: Component): component is Staff =>
  component.type === "staff";

export const getStaffUrl = (item: Staff): string => {
  const baseUrl = `https://aonprd.com/MagicStavesDisplay.aspx?ItemName=${encodeURIComponent(
    item.name,
  )}`;

  if (item.subtitle === undefined) {
    return baseUrl;
  }

  return `${baseUrl}${item.subtitle}`;
};
