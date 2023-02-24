import armorQaulities from "../../data/armor/armor-qualities";
import { getArmorQaulityModifier } from "../../data/armor/armor-quality-types";
import { Armor } from "../../data/armor/armor-types";
import armors from "../../data/armor/armors";
import enhancements, { Masterwork } from "../../data/generic/enhancements";
import specialMaterials from "../../data/generic/special-materials";
import {
  isArmor,
  isArmorQuality,
  isEnhancement,
  isSpecialMaterial,
  isWeapon,
  isWeaponQuality,
  Item,
} from "../../data/helpers";
import weaponQaulities from "../../data/weapon/weapon-qualities";
import { getWeaponQaulityModifier } from "../../data/weapon/weapon-quality-types";
import { Weapon } from "../../data/weapon/weapon-types";
import weapons from "../../data/weapon/weapons";

const allItems: Item[] = [
  ...enhancements,
  ...specialMaterials,
  ...weapons,
  ...weaponQaulities,
  ...armors,
  ...armorQaulities,
];

const isNotSpecialMaterialThatDoesNotApply = (
  material: Item,
  applicableTo: Weapon | Armor
) => {
  if (!isSpecialMaterial(material) || !material.isApplicable) {
    return true;
  }

  return material.isApplicable(applicableTo);
};

// TODO: add scrolls, potions and wands
// TODO: Reduce nesting by extracting these as separate function
// TODO: Test this nightmare
export const getOptions = (selectedItems: Item[]) => {
  let items = allItems;

  // Only one enhancement can be selected
  if (selectedItems.some((s) => isEnhancement(s))) {
    items = items.filter((i) => !isEnhancement(i));
  }

  // If the enhancment is masterwork then no qualities can be selected
  if (selectedItems.some((s) => s === Masterwork)) {
    items = items.filter((i) => !isArmorQuality(i) && !isWeaponQuality(i));
  }

  // Only one special material can be selected
  //  and if so, you can only choose items that are applicable
  //  and if all applicable items are an armor or weapon then only
  //  the right qualities can then be chosen
  const specialMaterial = selectedItems.find(isSpecialMaterial);
  if (specialMaterial) {
    items = items.filter((i) => !isSpecialMaterial(i));

    if (specialMaterial.isApplicable) {
      items = items.filter(
        (i) => (!isArmor(i) && !isWeapon(i)) || specialMaterial.isApplicable(i)
      );

      if (items.every((i) => !isArmor(i))) {
        items = items.filter((i) => !isArmorQuality(i));
      }

      if (items.every((i) => !isWeapon(i))) {
        items = items.filter((i) => !isWeaponQuality(i));
      }
    }
  }

  // Only one weapon can be selected
  //  and if so, you can't choose an armor, armor quality or special material that doesn't apply
  const weapon = selectedItems.find(isWeapon);
  if (weapon) {
    items = items.filter(
      (i) =>
        !isWeapon(i) &&
        !isArmor(i) &&
        !isArmorQuality(i) &&
        isNotSpecialMaterialThatDoesNotApply(i, weapon)
    );
  }

  // If a weapon quality is selected, you can't choose masterwork, an armor or armor quality
  if (selectedItems.some((s) => isWeaponQuality(s))) {
    items = items.filter(
      (i) => !isArmor(i) && !isArmorQuality(i) && i !== Masterwork
    );
  }

  // Only one armor can be selected
  //  and if so, you can't choose a weapon, weapon quality or special material that doesn't apply
  const armor = selectedItems.find(isArmor);
  if (armor) {
    items = items.filter(
      (i) =>
        !isArmor(i) &&
        !isWeapon(i) &&
        !isWeaponQuality(i) &&
        isNotSpecialMaterialThatDoesNotApply(i, armor)
    );
  }

  // If a weapon quality is selected, you can't choose masterwork, an armor or armor quality
  if (selectedItems.find((s) => isArmorQuality(s))) {
    items = items.filter(
      (i) => !isWeapon(i) && !isWeaponQuality(i) && i !== Masterwork
    );
  }

  return items;
};

const getEnhancementModifier = (item: Item): number => {
  if (isEnhancement(item)) {
    return item.modifier;
  }

  if (isWeaponQuality(item)) {
    return getWeaponQaulityModifier(item);
  }

  if (isArmorQuality(item)) {
    return getArmorQaulityModifier(item);
  }

  return 0;
};

export const selectedItemsAreInvalid = (
  selectedItems: Item[]
): string | undefined => {
  const totalModifier = selectedItems.reduce(
    (val, item) => getEnhancementModifier(item) + val,
    0
  );

  if (totalModifier > 10) {
    return `The total modfier can be no greater than 10 (currently ${totalModifier})`;
  }

  if (selectedItems.every((i) => !isWeapon(i) && !isArmor(i))) {
    if (selectedItems.some((i) => isWeaponQuality(i))) {
      return "You must select a weapon";
    }

    if (selectedItems.some((i) => isArmorQuality(i))) {
      return "You must select an armor";
    }

    return "You must select either a weapon or an armor";
  }

  if (
    selectedItems.some((i) => isWeaponQuality(i) || isArmorQuality(i)) &&
    selectedItems.every((i) => !isEnhancement(i))
  ) {
    return "You must choose an enchancement modifier to prefix your quality";
  }

  return undefined;
};
