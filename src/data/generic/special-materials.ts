import { isAmmunition, isArmor, isWeapon } from "../helpers";
import { MasterworkArmorCost } from "./enhancement-types";
import {
  baseSpecialMaterial,
  valueFromArmorCategory,
  valueFromWeaponSize,
  SpecialMaterial,
  valueForAnyType,
} from "./special-material-types";

const Abysium: SpecialMaterial = { ...baseSpecialMaterial, name: "Abysium" };

const Adamantine: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Adamantine",
  isApplicable: (item) =>
    isWeapon(item) || isAmmunition(item) || item.category !== "Shield",
  addedCost: (item) => {
    if (isAmmunition(item)) {
      return 60;
    }

    if (isWeapon(item)) {
      return 3000;
    }

    return valueFromArmorCategory(item, 5000, 10000, 15000);
  },
  alreadyMasterwork: true,
  masterworkCostIncluded: true,
};

const AlchemicalSilver: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Alchemical Silver",
  isApplicable: (item) => isWeapon(item) || isAmmunition(item),
  addedCost: (item) => {
    if (isAmmunition(item)) {
      return 2;
    }

    if (isWeapon(item)) {
      return valueFromWeaponSize(item, 20, 90, 180);
    }

    return 0;
  },
};

const Angelskin: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Angelskin",
  isApplicable: (item) =>
    !isWeapon(item) && !isAmmunition(item) && item.category !== "Heavy",
  addedCost: (item) => {
    if (isWeapon(item) || isAmmunition(item)) {
      return 0;
    }

    return valueFromArmorCategory(item, 1000, 2000, 0);
  },
  alreadyMasterwork: true,
  masterworkCostIncluded: true,
};

const Aszite: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Aszite",
  isApplicable: (item) => !isWeapon(item) && !isAmmunition(item),
  addedCost: (item) => {
    if (isWeapon(item) || isAmmunition(item)) {
      return 0;
    }

    return valueFromArmorCategory(item, 750, 750, 1000);
  },
};

const Blackwood: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Blackwood",
  addedCost: (item) => {
    // 20gp per pound of item
    return item.weight * 20;
  },
  alreadyMasterwork: true,
};

const BlightQuartz: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Blight Quartz",
  addedCost: (item) => {
    if (isAmmunition(item)) {
      return 200;
    }

    // Armor cost is not listed on the page, assume costs same as weapon
    if (isWeapon(item) || isArmor(item)) {
      return 2500;
    }

    return 0;
  },
};

const Blightburn: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Blightburn",
};

const BloodCrystal: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Blood Crystal",
  isApplicable: (item) => isWeapon(item) || isAmmunition(item),
  addedCost: (item) => {
    if (isWeapon(item)) {
      return 1500;
    }

    if (isAmmunition(item)) {
      return 30;
    }
    return 0;
  },
};

const BuletteArmor: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Bulette Armor",
  // Full plate and leather armor only
  isApplicable: (item) =>
    !isWeapon(item) &&
    !isAmmunition(item) &&
    (item.category === "Heavy" || item.category === "Light"),
  addedCost: (item) => {
    if (isWeapon(item) || isAmmunition(item)) {
      return 0;
    }

    // Costs 50gp for leather armor, or 10x for a set of full plate
    return valueFromArmorCategory(item, 50 - item.cost, 0, item.cost * 9);
  },
  alteredWeight: (item) => {
    if (isWeapon(item) || isAmmunition(item)) {
      return item.weight;
    }

    // Weighs 20lbs for leather armor, or full plate + 65 lbs
    return valueFromArmorCategory(item, 20, 0, item.weight + 65);
  },
};

const Caphorite: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Caphorite",
  addedCost: (item) => (isAmmunition(item) ? 10 : 0),
};

const ColdIron: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Cold Iron",
  isApplicable: (item) => isWeapon(item) || isAmmunition(item),
  addedCost: (item, willBeMadeMagical) => {
    if (!isWeapon(item) && !isAmmunition(item)) {
      return 0;
    }

    const oneFiftiethIfAmmunition = isAmmunition(item) ? 0.02 : 1;

    // costs twice as much and an extra 2k if magical
    return item.cost + (willBeMadeMagical ? 2000 * oneFiftiethIfAmmunition : 0);
  },
};

const Cryptstone: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Cryptstone",
  isApplicable: (item) => isWeapon(item) || isAmmunition(item),
  addedCost: (item) => (isAmmunition(item) ? 10 : 500),
  alreadyMasterwork: true,
  masterworkCostIncluded: true,
};

const DarkleafCloth: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Darkleaf Cloth",
  isApplicable: (item) =>
    !isWeapon(item) && !isAmmunition(item) && item.category !== "Shield",
  addedCost: (item) => {
    if (isWeapon(item) || isAmmunition(item)) {
      return 0;
    }

    return valueFromArmorCategory(item, 750, 1500, item.weight * 375);
  },
  alteredWeight: (item) => item.weight * 0.5,
  alreadyMasterwork: true,
  masterworkCostIncluded: true,
};

const Darkwood: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Darkwood",
  addedCost: (item) => item.weight * 10,
  alteredWeight: (item) => item.weight * 0.5,
  alreadyMasterwork: true,
  masterworkCostIncluded: false,
};

const Dragonhide: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Dragonhide",
  isApplicable: (item) => !isWeapon(item) && !isAmmunition(item),
  addedCost: (item) => {
    if (isWeapon(item) || isAmmunition(item)) {
      return 0;
    }

    // costs twice the price of the armor and twice the masterwork cost
    return item.cost + MasterworkArmorCost;
  },
  alreadyMasterwork: true,
  masterworkCostIncluded: false,
};

const Druchite: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Druchite",
  addedCost: (item) => {
    if (isWeapon(item)) {
      return 1200;
    }

    if (isAmmunition(item)) {
      return 12;
    }

    return valueFromArmorCategory(item, 1000, 1500, 2000);
  },
};

const EelHide: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "EelHide",
  isApplicable: (item) =>
    !isWeapon(item) && !isAmmunition(item) && item.category !== "Heavy",
  addedCost: (item) => {
    if (isWeapon(item) || isAmmunition(item)) {
      return 0;
    }

    return valueFromArmorCategory(item, 1200, 1800, 0);
  },
  alreadyMasterwork: true,
  masterworkCostIncluded: true,
};

const ElysianBronze: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Elysian Bronze",
  addedCost: (item) => {
    if (isWeapon(item)) {
      return 1000;
    }

    if (isAmmunition(item)) {
      return 20;
    }

    return valueFromArmorCategory(item, 1000, 2000, 3000);
  },
};

const FireForgedSteel: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Fire-Forged Steel",
  isApplicable: (item) => isAmmunition(item) || item.category !== "Shield",
  addedCost: (item) => {
    if (isWeapon(item)) {
      return 600;
    }

    if (isAmmunition(item)) {
      return 15;
    }

    return valueFromArmorCategory(item, 1000, 2500, 3000);
  },
  alreadyMasterwork: true,
  masterworkCostIncluded: true,
};

const FrostForgedSteel: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Frost-Forged Steel",
  isApplicable: (item) => isAmmunition(item) || item.category !== "Shield",
  addedCost: (item) => {
    if (isWeapon(item)) {
      return 600;
    }

    if (isAmmunition(item)) {
      return 15;
    }

    return valueFromArmorCategory(item, 1000, 2500, 3000);
  },
  alreadyMasterwork: true,
  masterworkCostIncluded: true,
};

const Glaucite: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Glaucite",
  addedCost: (item) => item.cost * 2, // triple the cost
  alteredWeight: (item) => item.weight * 1.5, // half again as heavy
};

const Greenwood: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Greenwood",
  addedCost: (item) => item.weight * 50,
  alreadyMasterwork: true,
  masterworkCostIncluded: false,
};

const GriffonMane: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Griffon Mane",
  isApplicable: (item) =>
    !isWeapon(item) && !isAmmunition(item) && item.category !== "Shield",
  addedCost: (item) => {
    if (isWeapon(item) || isAmmunition(item)) {
      return 0;
    }

    return valueFromArmorCategory(
      item,
      200,
      item.weight * 50,
      item.weight * 50
    );
  },
  alreadyMasterwork: true,
  masterworkCostIncluded: false,
};

const HeatstonePlating: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Heatstone Plating",
  isApplicable: (item) =>
    !isWeapon(item) &&
    !isAmmunition(item) &&
    item.category !== "Shield" &&
    item.category !== "Heavy",
  addedCost: (item) => {
    if (isWeapon(item) || isAmmunition(item)) {
      return 0;
    }

    return valueFromArmorCategory(item, 800, 1000, 0);
  },
};

const Horacalcum: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Horacalcum",
  isApplicable: (item) => isAmmunition(item) || item.category !== "Shield",
  addedCost: (item) => {
    if (isAmmunition(item)) {
      return 0;
    }

    if (isWeapon(item)) {
      return 6000;
    }

    return valueFromArmorCategory(item, 10000, 30000, 60000);
  },
  alreadyMasterwork: true,
  masterworkCostIncluded: true,
};

const Inubrix: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Inubrix",
  isApplicable: (item) => isWeapon(item),
  addedCost: (item) => (isWeapon(item) ? 5000 : 0),
  alreadyMasterwork: true,
  masterworkCostIncluded: true,
};

const IrespanBasalt: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Irespan Basalt",
};

const Lazurite: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Lazurite",
  isApplicable: (item) =>
    !isWeapon(item) && !isAmmunition(item) && item.category !== "Shield",
  addedCost: (item) => {
    if (isWeapon(item) || isAmmunition(item)) {
      return 0;
    }

    return valueFromArmorCategory(item, 1500, 2500, 3500);
  },
};

const LiquidGlass: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Liquid Glass",
  addedCost: (item) => {
    if (isWeapon(item)) {
      return 800;
    }

    return item.weight * 250;
  },
};

const LivingSteel: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Living Steel",
  addedCost: (item) =>
    valueForAnyType(item, 10, 500, 100, 500, 1000, 1500, item.weight * 250),
};

const Mithral: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Mithral",
  addedCost: (item) =>
    valueForAnyType(
      item,
      500 * item.weight,
      500 * item.weight,
      1000,
      1000,
      4000,
      9000,
      item.weight * 500
    ),
  alteredWeight: (item) => item.weight * 0.5,
  alreadyMasterwork: true,
  masterworkCostIncluded: true,
};

const NexavaranSteel: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Nexavaran Steel",
  isApplicable: (item) => isWeapon(item),
  addedCost: (item, willBeMadeMagical) => {
    if (!isWeapon(item)) {
      return 0;
    }

    // costs 1.5x as much and an extra 3k if magical
    return item.cost * 0.5 + (willBeMadeMagical ? 3000 : 0);
  },
};

const Noqual: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Noqual",
  isApplicable: (item) => isWeapon(item),
  addedCost: (item, willBeMadeMagical) => {
    const oneFiftiethIfAmmunition = isAmmunition(item) ? 0.02 : 1;
    return (
      valueForAnyType(
        item,
        500 * oneFiftiethIfAmmunition, // Assumed "or other item +500 gp" means a bundle of 50 arrows, same as enchanting
        500,
        2000,
        4000,
        8000,
        12000
      ) + (willBeMadeMagical ? 5000 * oneFiftiethIfAmmunition : 0)
    );
  },
  alteredWeight: (item) => item.weight * 0.5,
};

const Paueliel: SpecialMaterial = {
  ...Darkwood,
  name: "Paueliel",
  addedCost: (...args) => Darkwood.addedCost(...args) * 1.5,
};

const PyreSteel: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Pyre Steel",
  isApplicable: (item) => isWeapon(item),
  addedCost: (item) => item.cost,
};

const Siccatite: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Siccatite",
  isApplicable: (item) => !isAmmunition(item) && item.category !== "Shield",
  addedCost: (item) => (isWeapon(item) ? 1000 : 6000),
};

const Silversheen: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Silversheen",
  isApplicable: (item) => isWeapon(item),
  addedCost: () => 750,
  alreadyMasterwork: true,
  masterworkCostIncluded: true,
};

const SingingSteel: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Singing Steel",
  addedCost: (item) =>
    valueForAnyType(
      item,
      item.weight * 600,
      6000,
      7000,
      750,
      9000,
      12000,
      item.weight * 600
    ),
  alreadyMasterwork: true,
  masterworkCostIncluded: true,
};

const SpireSteel: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Spire Steel",
  isApplicable: (item) => isAmmunition(item) || item.category !== "Shield",
  addedCost: (item) => valueForAnyType(item, 10, 6000, 0, 750, 9000, 12000),
  alreadyMasterwork: true,
  masterworkCostIncluded: true,
};

const Sunsilk: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Sunsilk",
  isApplicable: (item) => isArmor(item) && item.category !== "Shield",
  addedCost: () => 6000,
};

const Sunsilver: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Sunsilver",
  addedCost: (item) => item.weight * 25,
  alreadyMasterwork: true,
  masterworkCostIncluded: false,
};

const Throneglass: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Throneglass",
  isApplicable: (item) => isWeapon(item),
  addedCost: (item) => (isWeapon(item) ? 13000 : 0),
};

const Viridium: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Viridium",
  isApplicable: (item) => isWeapon(item) || isAmmunition(item),
  addedCost: (item) => (isWeapon(item) ? 200 : 20),
};

const ViridiumStrengthened: SpecialMaterial = {
  ...Viridium,
  name: "Viridium (Strengthened)",
  addedCost: (item, ...args) =>
    isWeapon(item)
      ? Viridium.addedCost(item, ...args) + 1000
      : Viridium.addedCost(item, ...args) + 20,
};

const Voidglass: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Voidglass",
  isApplicable: (item) => !isAmmunition(item),
  addedCost: (item) => valueForAnyType(item, 0, 1000, 3000, 1000, 2000, 4500),
};

const Whipwood: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Whipwood",
  isApplicable: (item) => isWeapon(item),
  addedCost: (item) => (isWeapon(item) ? 500 : 0),
};

const makeWyroot = (lifePointCount: number): SpecialMaterial => ({
  ...baseSpecialMaterial,
  name: `Wyroot (${lifePointCount})`,
  isApplicable: (item) => isWeapon(item),
  addedCost: (item) => (isWeapon(item) ? lifePointCount * 1000 : 0),
});

const specialMaterials: SpecialMaterial[] = [
  Abysium,
  Adamantine,
  AlchemicalSilver,
  Angelskin,
  Aszite,
  Blackwood,
  BlightQuartz,
  Blightburn,
  BloodCrystal,
  BuletteArmor,
  Caphorite,
  ColdIron,
  Cryptstone,
  DarkleafCloth,
  Darkwood,
  Dragonhide,
  Druchite,
  EelHide,
  ElysianBronze,
  FireForgedSteel,
  FrostForgedSteel,
  Glaucite,
  Greenwood,
  GriffonMane,
  HeatstonePlating,
  Horacalcum,
  Inubrix,
  IrespanBasalt,
  Lazurite,
  LiquidGlass,
  LivingSteel,
  Mithral,
  NexavaranSteel,
  Noqual,
  Paueliel,
  PyreSteel,
  Siccatite,
  Silversheen,
  SingingSteel,
  SpireSteel,
  Sunsilk,
  Sunsilver,
  Throneglass,
  Viridium,
  ViridiumStrengthened,
  Voidglass,
  Whipwood,
  makeWyroot(1),
  makeWyroot(2),
  makeWyroot(3),
];

export default specialMaterials;
