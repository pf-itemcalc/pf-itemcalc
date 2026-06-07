import type { Component } from "../component-types";
import type { Weapon } from "./weapon-types";

export const isWeapon = (component: Component): component is Weapon =>
  component.type === "weapon";

export const getWeaponUrl = (weapon: Weapon) =>
  `https://aonprd.com/EquipmentWeaponsDisplay.aspx?ItemName=${encodeURIComponent(
    weapon.name,
  )}`;

export const isComposite = (component: Component): component is Weapon =>
  isWeapon(component) && component.name.toLowerCase().includes("composite");
