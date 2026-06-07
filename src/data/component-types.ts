import type { ArmorQuality } from "./armor-quality/armor-quality-types";
import type { Armor } from "./armor/armor-types";
import type { Enhancement } from "./enhancement/enhancement-types";
import type { SpecialMaterial } from "./special-material/special-material-types";
import type { Spell } from "./spell/spell-types";
import type { SpellVessel } from "./spell-vessel/spell-vessel-types";
import type { WeaponQaulity } from "./weapon-quality/weapon-quality-types";
import type { Weapon } from "./weapon/weapon-types";
import type { Wondrous } from "./specific-item/wondrous/wondrous-types";
import type { SpecificAmmo } from "./specific-item/specific-ammo/specific-ammo-types";
import type { SpecificArmor } from "./specific-item/specific-armor/specific-armor-types";
import type { SpecificShield } from "./specific-item/specific-shield/specific-shield-types";
import type { SpecificWeapon } from "./specific-item/specific-weapon/specific-weapon-types";
import type { Ring } from "./specific-item/ring/ring-types";
import type { Rod } from "./specific-item/rod/rod-types";
import type { Staff } from "./specific-item/staff/staff-types";
import type { IounStone } from "./specific-item/ioun-stone/ioun-stone-types";
import type { SizeModifier } from "./size-modifier/size-modifier-types";
import type { Ammunition } from "./ammunition/ammunition-types";
import type { Count } from "./generic/count-types";

export type Component =
  | Armor
  | ArmorQuality
  | Weapon
  | WeaponQaulity
  | Ammunition
  | SizeModifier
  | SpecialMaterial
  | Enhancement
  | SpellVessel
  | Spell
  | SpecificItemComponent
  | Count;

export type SpecificItemComponent =
  | Wondrous
  | SpecificAmmo
  | SpecificArmor
  | SpecificShield
  | SpecificWeapon
  | Ring
  | Rod
  | Staff
  | IounStone;
