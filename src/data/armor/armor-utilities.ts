import type { Component } from "../component-types";
import type { Armor } from "./armor-types";

export const isArmor = (component: Component): component is Armor =>
  component.type === "armor";

export const getArmorUrl = (armor: Armor) =>
  `https://aonprd.com/EquipmentArmorDisplay.aspx?ItemName=${encodeURIComponent(
    armor.name,
  )}`;
