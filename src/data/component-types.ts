import type { ArmorQaulity } from "./armor-quality/armor-quality-types";
import type { Armor } from "../data/armor/armor-types";
import type { Enhancement } from "../data/enhancement/enhancement-types";
import type { SpecialMaterial } from "../data/special-material/special-material-types";
import type { Spell } from "../data/spell/spell-types";
import type { SpellVessel } from "../data/spell-vessel/spell-vessel-types";
import type { WeaponQaulity } from "../data/weapon-quality/weapon-quality-types";
import type { Weapon } from "../data/weapon/weapon-types";
import type { Wondrous } from "../data/wondrous/wondrous-types";
import type { SpecialAmmo } from "../data/special-ammo/special-ammo-types";
import type { SpecialArmor } from "../data/special-armor/special-armor-types";
import type { SpecialShield } from "../data/special-shield/special-shield-types";
import type { SpecialWeapon } from "../data/special-weapon/special-weapon-types";
import type { Ring } from "../data/ring/ring-types";
import type { Rod } from "../data/rod/rod-types";
import type { Staff } from "../data/staff/staff-types";
import type { IounStone } from "../data/ioun-stone/ioun-stone-types";
import type { SizeModifier } from "./size-modifier/size-modifier-types";
import type { Ammunition } from "../data/ammunition/ammunition-types";
import type { Count } from "./generic/count-types";

export type Component =
  | Armor
  | ArmorQaulity
  | Weapon
  | WeaponQaulity
  | Ammunition
  | SizeModifier
  | SpecialMaterial
  | Enhancement
  | SpellVessel
  | Spell
  | SingularItemComponent
  | Count;

export type SingularItemComponent =
  | Wondrous
  | SpecialAmmo
  | SpecialArmor
  | SpecialShield
  | SpecialWeapon
  | Ring
  | Rod
  | Staff
  | IounStone;
