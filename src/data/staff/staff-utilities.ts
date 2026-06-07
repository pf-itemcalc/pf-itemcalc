import type { Component } from "../component-types";
import type { Staff } from "./staff-types";

export const isStaff = (component: Component): component is Staff =>
  component.type === "staff";

export const getStaffUrl = (staff: Staff): string => {
  const baseUrl = `https://aonprd.com/MagicStavesDisplay.aspx?ItemName=${encodeURIComponent(
    staff.name,
  )}`;

  if (staff.subtitle === undefined) {
    return baseUrl;
  }

  return `${baseUrl}${staff.subtitle}`;
};
