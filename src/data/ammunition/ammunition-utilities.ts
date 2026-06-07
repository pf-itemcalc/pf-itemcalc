import type { Component } from "../component-types";
import type { Ammunition } from "./ammunition-types";

export const isAmmunition = (component: Component): component is Ammunition =>
  component.type === "ammunition";

export const getAmmunitionUrl = (ammunition: Ammunition) =>
  `https://aonprd.com/EquipmentWeaponsDisplay.aspx?ItemName=${encodeURIComponent(
    ammunition.name + " (" + ammunition.countInBundle + ")",
  )}`;

export const getIndividualAmmoCost = (ammunition: Ammunition): number =>
  ammunition.cost / ammunition.countInBundle;

export const getIndividualAmmoWeight = (ammunition: Ammunition): number =>
  ammunition.weight / ammunition.countInBundle;
