import { ammunition } from "./ammunition/ammunition";
import armorQaulities from "./armor/armor-qualities";
import armors from "./armor/armors";
import enhancements from "./generic/enhancements";
import sizeModifiers from "./generic/size-modifiers";
import specialMaterials from "./generic/special-materials";
import type { Component } from "./helpers";
import { orderComponents } from "./helpers";
import { iounStones } from "./ioun-stone/ioun-stone";
import { rings } from "./ring/ring";
import { rods } from "./rod/rod";
import { specialAmmoComponents } from "./special-ammo/special-ammo";
import { specialArmorComponents } from "./special-armor/special-armor";
import { specialShieldComponents } from "./special-shield/special-shield";
import { specialWeaponComponents } from "./special-weapon/special-weapon";
import { spellVessels } from "./spell/spell-vessels";
import spells from "./spell/spells";
import { staves } from "./staff/staff";
import weaponQaulities from "./weapon/weapon-qualities";
import weapons from "./weapon/weapons";
import { wondrousItemComponents } from "./wondrous/wondrous";

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
