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

const masterworkFilter = (items: Item[]): Item[] => {
  // If the enhancment is masterwork then no qualities can be selected
  if (items.some((s) => s === Masterwork)) {
    return items.filter((i) => !isArmorQuality(i) && !isWeaponQuality(i));
  }

  return items;
};

const enchancementFilter = (items: Item[]): Item[] => {
  // Only one enhancement can be selected
  if (items.some((s) => isEnhancement(s))) {
    return items.filter((i) => !isEnhancement(i));
  }

  return items;
};

const specialMaterialFilter = (items: Item[]): Item[] => {
  //  the right qualities can then be chosen
  const specialMaterial = items.find(isSpecialMaterial);
  if (!specialMaterial) {
    return items;
  }

  // Only one special material can be selected
  items = items.filter((i) => !isSpecialMaterial(i));

  if (!specialMaterial.isApplicable) {
    return items;
  }

  //  and if so, you can only choose items that are applicable
  items = items.filter(
    (i) => (!isArmor(i) && !isWeapon(i)) || specialMaterial.isApplicable(i)
  );

  //  and if all applicable items are an armor then only return armor qualities
  //  or if all applicable items are a weapo then only return weapon qualities
  if (items.every((i) => !isArmor(i))) {
    return items.filter((i) => !isArmorQuality(i));
  } else if (items.every((i) => !isWeapon(i))) {
    return items.filter((i) => !isWeaponQuality(i));
  }

  return items;
};

const weaponFilter = (items: Item[]): Item[] => {
  const weapon = items.find(isWeapon);
  if (!weapon) {
    return items;
  }

  // Only one weapon can be selected
  //  and if so, you can't choose an armor, armor quality or special material that doesn't apply
  return items.filter(
    (i) =>
      !isWeapon(i) &&
      !isArmor(i) &&
      !isArmorQuality(i) &&
      isNotSpecialMaterialThatDoesNotApply(i, weapon)
  );
};

const weaponQuailityFilter = (items: Item[]): Item[] => {
  // If a weapon quality is selected, you can't choose masterwork, an armor or armor quality
  if (items.some((s) => isWeaponQuality(s))) {
    return items.filter(
      (i) => !isArmor(i) && !isArmorQuality(i) && i !== Masterwork
    );
  }

  return items;
};

const armorFilter = (items: Item[]): Item[] => {
  // Only one armor can be selected
  //  and if so, you can't choose a weapon, weapon quality or special material that doesn't apply
  const armor = items.find(isArmor);
  if (!armor) {
    return items;
  }
  return items.filter(
    (i) =>
      !isArmor(i) &&
      !isWeapon(i) &&
      !isWeaponQuality(i) &&
      isNotSpecialMaterialThatDoesNotApply(i, armor)
  );
};

const armorQualityFilter = (items: Item[]): Item[] => {
  // If a weapon quality is selected, you can't choose masterwork, an armor or armor quality
  if (items.find((s) => isArmorQuality(s))) {
    return items.filter(
      (i) => !isWeapon(i) && !isWeaponQuality(i) && i !== Masterwork
    );
  }

  return items;
};

// TODO: add scrolls, potions and wands
// TODO: Test this nightmare
export const getOptions = (selectedItems: Item[]) => {
  let items = masterworkFilter(allItems);
  items = enchancementFilter(items);
  items = specialMaterialFilter(items);
  items = weaponFilter(items);
  items = weaponQuailityFilter(items);
  items = armorFilter(items);
  return armorQualityFilter(items);
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
