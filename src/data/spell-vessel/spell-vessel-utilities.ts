import type { Component } from "../component-types";
import type { SpellVessel, SpellVesselType } from "./spell-vessel-types";

export const isSpellVessel = (component: Component): component is SpellVessel =>
  component.type === "spell-vessel";

export const isSpellVesselOfType = (
  component: Component,
  ...types: SpellVesselType[]
) => isSpellVessel(component) && types.includes(component.vesselType);
