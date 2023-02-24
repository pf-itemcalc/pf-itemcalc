import armorQaulities from "../../data/armor/armor-qualities";
import { getArmorQaulityModifier } from "../../data/armor/armor-quality-types";
import armors from "../../data/armor/armors";
import enhancements from "../../data/generic/enhancements";
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
import weapons from "../../data/weapon/weapons";

const allItems: Item[] = [
  ...weapons,
  ...weaponQaulities,
  ...armors,
  ...armorQaulities,
  ...specialMaterials,
  ...enhancements,
];

// TODO: add scrolls, potions and wands
export const getOptions = (selectedItems: Item[]) => {
  let items = allItems;

  // Only one enhancement can be selected
  if (selectedItems.some((s) => isEnhancement(s))) {
    items = items.filter((i) => !isEnhancement(i));
  }

  // Only one weapon can be selected
  //  and if so, you can't choose an armor or armor quality
  if (selectedItems.some((s) => isWeapon(s))) {
    items = items.filter(
      (i) => !isWeapon(i) && !isArmor(i) && !isArmorQuality(i)
    );
  }

  // If a weapon quality is selected, you can't choose an armor or armor quality
  if (selectedItems.some((s) => isWeaponQuality(s))) {
    items = items.filter((i) => !isArmor(i) && !isArmorQuality(i));
  }

  // Only one special material can be selected
  if (selectedItems.some((s) => isSpecialMaterial(s))) {
    items = items.filter((i) => !isSpecialMaterial(i));
  }

  // Only one armor can be selected
  //  and if so, you can't choose a weapon or weapon quality
  if (selectedItems.some((s) => isArmor(s))) {
    items = items.filter(
      (i) => !isArmor(i) && !isWeapon(i) && !isWeaponQuality(i)
    );
  }

  // If a weapon quality is selected, you can't choose an armor or armor quality
  if (selectedItems.some((s) => isArmorQuality(s))) {
    items = items.filter((i) => !isWeapon(i) && !isWeaponQuality(i));
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

  return undefined;
};
