import type { Component } from "../../component-types";
import type { SpecificShield } from "./specific-shield-types";

export const isSpecificShield = (
  component: Component,
): component is SpecificShield => component.type === "specific-shield";

export const getSpecificShieldUrl = (shield: SpecificShield): string => {
  const baseUrl = `https://www.aonprd.com/MagicArmorDisplay.aspx?ItemName=${encodeURIComponent(
    shield.name,
  )}`;

  if (shield.subtitle === undefined) {
    return baseUrl;
  }

  return `${baseUrl}${shield.subtitle}`;
};
