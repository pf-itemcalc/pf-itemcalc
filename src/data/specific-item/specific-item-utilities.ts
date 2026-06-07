import type { Component, SpecificItemComponent } from "../component-types";
import { isIounStone } from "./ioun-stone/ioun-stone-utilities";
import { isRing } from "./ring/ring-utilities";
import { isRod } from "./rod/rod-utilities";
import { isSpecificAmmo } from "./specific-ammo/specific-ammo-utilities";
import { isSpecificArmor } from "./specific-armor/specific-armor-utilities";
import { isSpecificShield } from "./specific-shield/specific-shield-utilities";
import { isSpecificWeapon } from "./specific-weapon/specific-weapon-utilities";
import { isStaff } from "./staff/staff-utilities";
import { isWondrous } from "./wondrous/wondrous-utilities";

export const componentIsSpecificItem = (
  component: Component,
): component is SpecificItemComponent => {
  return (
    isWondrous(component) ||
    isSpecificAmmo(component) ||
    isSpecificArmor(component) ||
    isSpecificShield(component) ||
    isSpecificWeapon(component) ||
    isRing(component) ||
    isRod(component) ||
    isStaff(component) ||
    isIounStone(component)
  );
};
