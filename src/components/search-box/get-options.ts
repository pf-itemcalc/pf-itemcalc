import armorQaulities from "../../data/armor/armor-qualities";
import { getArmorQaulityModifier } from "../../data/armor/armor-quality-types";
import armors from "../../data/armor/armors";
import enhancements, { Masterwork } from "../../data/generic/enhancements";
import specialMaterials from "../../data/generic/special-materials";
import {
  isArmor,
  isArmorQuality,
  isEnhancement,
  isSpecialMaterial,
  isSpecificItem,
  isSpell,
  isSpellVessel,
  isWeapon,
  isWeaponQuality,
  Item,
  orderItems,
} from "../../data/helpers";
import { iounStones } from "../../data/ioun-stone/ioun-stone";
import { rings } from "../../data/ring/ring";
import { rods } from "../../data/rod/rod";
import { specialAmmoItems } from "../../data/special-ammo/special-ammo";
import { specialArmorItems } from "../../data/special-armor/special-armor";
import { specialShieldItems } from "../../data/special-shield/special-shield";
import { specialWeaponItems } from "../../data/special-weapon/special-weapon";
import { spellVessels } from "../../data/spell/spell-vessels";
import spells from "../../data/spell/spells";
import { staves } from "../../data/staff/staff";
import weaponQaulities from "../../data/weapon/weapon-qualities";
import { getWeaponQaulityModifier } from "../../data/weapon/weapon-quality-types";
import weapons from "../../data/weapon/weapons";
import { wondrousItems } from "../../data/wondrous/wondrous";

const allItems: Item[] = orderItems([
  ...enhancements,
  ...specialMaterials,
  ...weaponQaulities,
  ...weapons,
  ...armorQaulities,
  ...armors,
  ...spellVessels,
  ...spells,
  ...wondrousItems,
  ...specialAmmoItems,
  ...specialArmorItems,
  ...specialShieldItems,
  ...specialWeaponItems,
  ...rings,
  ...rods,
  ...staves,
  ...iounStones,
]);

const enchancementFilter = (selected: Item[], items: Item[]): Item[] => {
  const enhancement = selected.find(isEnhancement);

  if (!enhancement) {
    return items;
  }

  if (enhancement === Masterwork) {
    // If the enhancement is masterwork you can then only choose:
    //  materials, armor or weapons
    return items.filter(
      (i) => isSpecialMaterial(i) || isArmor(i) || isWeapon(i)
    );
  }

  // If there is an enhancement then you can only choose:
  //  materials, armor, armor qualities, weapons or weapon quailities
  return items.filter(
    (i) =>
      isSpecialMaterial(i) ||
      isArmor(i) ||
      isArmorQuality(i) ||
      isWeapon(i) ||
      isWeaponQuality(i)
  );
};

const specialMaterialFilter = (selected: Item[], items: Item[]): Item[] => {
  const specialMaterial = selected.find(isSpecialMaterial);
  if (!specialMaterial) {
    return items;
  }

  // If the special material is specific then you can only choose:
  //  enhancements, applicable armors, armor qualities, applicable weapons and weapon qualities
  if (!!specialMaterial.isApplicable) {
    const applicableItems = items.filter(
      (i) =>
        isEnhancement(i) ||
        ((isArmor(i) || isWeapon(i)) && specialMaterial.isApplicable(i)) ||
        isArmorQuality(i) ||
        isWeaponQuality(i)
    );

    // Furthermore if the applicable items only contains enhancements or armors
    //  and qualities then weapons and weapon qualities cannot be chosen
    if (applicableItems.every((i) => !isArmor(i))) {
      return applicableItems.filter((i) => !isArmorQuality(i));
    }
    if (applicableItems.every((i) => !isWeapon(i))) {
      return applicableItems.filter((i) => !isWeaponQuality(i));
    }
  }

  // If there is a special material (that is not specific) then you can only choose:
  //  enhancements, armors, armor qualities, weapons and weapon qualities
  return items.filter(
    (i) =>
      isEnhancement(i) ||
      isArmor(i) ||
      isArmorQuality(i) ||
      isWeapon(i) ||
      isWeaponQuality(i)
  );
};

const weaponFilter = (selected: Item[], items: Item[]): Item[] => {
  const weapon = selected.find(isWeapon);
  if (!weapon) {
    return items;
  }

  // If there is a weapon then you can only choose:
  //  enhancements, weapon qualities and special materials that are applicable
  return items.filter(
    (i) =>
      isEnhancement(i) ||
      isWeaponQuality(i) ||
      (isSpecialMaterial(i) && i.isApplicable(weapon))
  );
};

const weaponQuailityFilter = (selected: Item[], items: Item[]): Item[] => {
  if (!selected.some(isWeaponQuality)) {
    return items;
  }

  // If there is a weapon quality then you can only choose:
  //  enhancements, weapons and special materials that are applicable to any remaining weapons
  const remainingItems = items.filter(
    (i) => isEnhancement(i) || isWeapon(i) || isSpecialMaterial(i)
  );
  return remainingItems.filter(
    (i) =>
      !isSpecialMaterial(i) ||
      remainingItems.filter(isWeapon).some((w) => i.isApplicable(w))
  );
};

const armorFilter = (selected: Item[], items: Item[]): Item[] => {
  const armor = selected.find(isArmor);
  if (!armor) {
    return items;
  }

  // If there is an armor then you can only choose:
  //  enhancements, armor qualities and special materials that are applicable
  return items.filter(
    (i) =>
      isEnhancement(i) ||
      isArmorQuality(i) ||
      (isSpecialMaterial(i) && i.isApplicable(armor))
  );
};

const armorQualityFilter = (selected: Item[], items: Item[]): Item[] => {
  if (!selected.some(isArmorQuality)) {
    return items;
  }

  // If there is an armor quality then you can only choose:
  //  enhancements, armors and special materials that are applicable to any remaining armors
  const remainingItems = items.filter(
    (i) => isEnhancement(i) || isArmor(i) || isSpecialMaterial(i)
  );
  return remainingItems.filter(
    (i) =>
      !isSpecialMaterial(i) ||
      remainingItems.filter(isArmor).some((a) => i.isApplicable(a))
  );
};

const spellFilter = (selected: Item[], items: Item[]): Item[] => {
  const spell = selected.find(isSpell);
  if (!spell) {
    return items;
  }

  // If a spell is selected, you can only choose a spell vessel that is applicable
  return items.filter(
    (i) => isSpellVessel(i) && i.maxSpellLevel >= spell.spellLevel
  );
};

const spellVesselFilter = (selected: Item[], items: Item[]): Item[] => {
  const spellVessel = selected.find(isSpellVessel);
  if (!spellVessel) {
    return items;
  }

  // If a spell vessel is selected, you can only choose a spell that is applicable
  return items.filter(
    (i) => isSpell(i) && spellVessel.maxSpellLevel >= i.spellLevel
  );
};

const specificItemFilter = (selected: Item[], items: Item[]): Item[] => {
  const specificItem = selected.find(isSpecificItem);

  if (!specificItem) {
    return items;
  }

  // If a specific item is selected, then you cannot choose any other items
  return [];
};

export const getOptions = (selectedItems: Item[]) => {
  let items = specificItemFilter(selectedItems, allItems);
  items = enchancementFilter(selectedItems, items);
  items = specialMaterialFilter(selectedItems, items);
  items = weaponFilter(selectedItems, items);
  items = weaponQuailityFilter(selectedItems, items);
  items = armorFilter(selectedItems, items);
  items = spellVesselFilter(selectedItems, items);
  items = spellFilter(selectedItems, items);
  return armorQualityFilter(selectedItems, items);
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

  if (
    selectedItems.every(
      (i) => !isSpecificItem(i) && !isWeapon(i) && !isArmor(i) && !isSpell(i)
    )
  ) {
    if (selectedItems.some((i) => isWeaponQuality(i))) {
      return "You must select a weapon";
    }

    if (selectedItems.some((i) => isArmorQuality(i))) {
      return "You must select an armor";
    }

    if (selectedItems.some((i) => isSpellVessel(i))) {
      return "You must select a spell";
    }

    if (selectedItems.some((i) => isSpecialMaterial(i))) {
      return "You must select either a weapon or an armor";
    }

    return "You must select either a weapon, armor, spell or specific item";
  }

  if (
    selectedItems.some((i) => isSpell(i)) &&
    selectedItems.every((i) => !isSpellVessel(i))
  ) {
    return "You must select a potion, wand or scroll (i.e. a spell vessel)";
  }

  if (
    selectedItems.some((i) => isWeaponQuality(i) || isArmorQuality(i)) &&
    selectedItems.every((i) => !isEnhancement(i))
  ) {
    return "You must choose an enchancement modifier to prefix your quality";
  }

  return undefined;
};
