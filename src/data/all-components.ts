import { ammunition } from "./ammunition/ammunition";
import armorQaulities from "./armor-quality/armor-qualities";
import armors from "./armor/armors";
import enhancements from "./enhancement/enhancements";
import sizeModifiers from "./size-modifier/size-modifiers";
import specialMaterials from "./special-material/special-materials";
import { orderComponents } from "../engine/helpers";
import { iounStones } from "./specific-item/ioun-stone/ioun-stone";
import { rings } from "./specific-item/ring/ring";
import { rods } from "./specific-item/rod/rod";
import { specificAmmoComponents } from "./specific-item/specific-ammo/specific-ammo";
import { specificArmorComponents } from "./specific-item/specific-armor/specific-armor";
import { specificShieldComponents } from "./specific-item/specific-shield/specific-shield";
import { specificWeaponComponents } from "./specific-item/specific-weapon/specific-weapon";
import { spellVessels } from "./spell-vessel/spell-vessels";
import spells from "./spell/spells";
import { staves } from "./specific-item/staff/staff";
import weaponQaulities from "./weapon-quality/weapon-qualities";
import weapons from "./weapon/weapons";
import { wondrousItemComponents } from "./specific-item/wondrous/wondrous";
import type { Component } from "./component-types";

export const allComponents: Component[] = orderComponents([
  ...enhancements,
  ...sizeModifiers,
  ...specialMaterials,
  ...weaponQaulities,
  ...weapons,
  ...ammunition,
  ...armorQaulities,
  ...armors,
  ...spellVessels,
  ...spells,
  ...wondrousItemComponents,
  ...specificAmmoComponents,
  ...specificArmorComponents,
  ...specificShieldComponents,
  ...specificWeaponComponents,
  ...rings,
  ...rods,
  ...staves,
  ...iounStones,
]);
