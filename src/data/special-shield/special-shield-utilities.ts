import type { Component } from "../component-types";
import type { SpecialShield } from "./special-shield-types";

export const isSpecialShield = (
  component: Component,
): component is SpecialShield => component.type === "special-shield";

export const getSpecialShieldUrl = (shield: SpecialShield): string => {
  const baseUrl = `https://www.aonprd.com/MagicArmorDisplay.aspx?ItemName=${encodeURIComponent(
    shield.name,
  )}`;

  if (shield.subtitle === undefined) {
    return baseUrl;
  }

  return `${baseUrl}${shield.subtitle}`;
};
