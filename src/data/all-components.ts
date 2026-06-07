import { ammunition } from "./ammunition/ammunition";
import armorQaulities from "./armor-quality/armor-qualities";
import armors from "./armor/armors";
import enhancements from "./enhancement/enhancements";
import sizeModifiers from "./size-modifier/size-modifiers";
import specialMaterials from "./special-material/special-materials";
import { orderComponents } from "../engine/helpers";
import { iounStones } from "./ioun-stone/ioun-stone";
import { rings } from "./ring/ring";
import { rods } from "./rod/rod";
import { specialAmmoComponents } from "./special-ammo/special-ammo";
import { specialArmorComponents } from "./special-armor/special-armor";
import { specialShieldComponents } from "./special-shield/special-shield";
import { specialWeaponComponents } from "./special-weapon/special-weapon";
import { spellVessels } from "./spell-vessel/spell-vessels";
import spells from "./spell/spells";
import { staves } from "./staff/staff";
import weaponQaulities from "./weapon-quality/weapon-qualities";
import weapons from "./weapon/weapons";
import { wondrousItemComponents } from "./wondrous/wondrous";
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
  ...specialAmmoComponents,
  ...specialArmorComponents,
  ...specialShieldComponents,
  ...specialWeaponComponents,
  ...rings,
  ...rods,
  ...staves,
  ...iounStones,
]);
