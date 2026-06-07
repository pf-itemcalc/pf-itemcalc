import { isAmmunition } from "../../data/ammunition/ammunition-utilities";
import { isEnhancement } from "../../data/enhancement/enhancement-utilities";
import { isSizeModifier } from "../../data/size-modifier/size-modifier-utilities";
import { isSpecialMaterial } from "../../data/special-material/special-material-utilities";
import { isWeaponQuality } from "../../data/weapon-quality/weapon-quality-utilities";
import { isWeapon } from "../../data/weapon/weapon-utilities";
import { isArmorQuality } from "../../data/armor-quality/armor-quality-utilities";
import { isArmor } from "../../data/armor/armor-utilities";
import type { ComponentFilterFunction } from "../option-filtering/option-filtering-types";

export const filterComponentsWhenSpecialMaterialIsPresent: ComponentFilterFunction =
  (selected, otherComponents) => {
    const specialMaterial = selected.find(isSpecialMaterial);
    if (!specialMaterial) {
      return otherComponents;
    }

    // If the special material is specific then you can only choose:
    //  size-modifiers, enhancements, applicable armors, armor qualities, applicable weapons, weapon qualities and applicable ammunition
    if (specialMaterial.isApplicable) {
      const applicableItems = otherComponents.filter(
        (i) =>
          isSizeModifier(i) ||
          isEnhancement(i) ||
          ((isArmor(i) || isWeapon(i) || isAmmunition(i)) &&
            specialMaterial.isApplicable(i)) ||
          isArmorQuality(i) ||
          isWeaponQuality(i),
      );

      // Furthermore if the applicable items only contains enhancements or armors
      //  and qualities then weapons and weapon qualities cannot be chosen
      if (applicableItems.every((i) => !isArmor(i))) {
        return applicableItems.filter((i) => !isArmorQuality(i));
      }
      if (applicableItems.every((i) => !isWeapon(i) && !isAmmunition(i))) {
        return applicableItems.filter((i) => !isWeaponQuality(i));
      }
    }

    // If there is a special material (that is not specific) then you can only choose:
    //  size modifiers, enhancements, armors, armor qualities, weapons, weapon qualities and ammunition
    return otherComponents.filter(
      (i) =>
        isSizeModifier(i) ||
        isEnhancement(i) ||
        isArmor(i) ||
        isArmorQuality(i) ||
        isWeapon(i) ||
        isWeaponQuality(i) ||
        isAmmunition(i),
    );
  };
