import { isWeapon } from "../weapon/weapon-utilities";
import { isArmor } from "../armor/armor-utilities";
import { isAmmunition } from "../ammunition/ammunition-utilities";
import { MasterworkArmorCost } from "../enhancement/enhancement-types";
import type {
  SpecialMaterial,
  SpecialMaterialOptionals,
  SpecialMaterialPossibleComponent,
} from "./special-material-types";
import type { Armor } from "../armor/armor-types";
import type { Weapon } from "../weapon/weapon-types";

export const valueFromArmorCategory = (
  armor: Armor,
  light: number,
  medium: number,
  heavy: number,
  defaultCost: number = 0,
) => {
  switch (armor.category) {
    case "Light":
      return light;
    case "Medium":
      return medium;
    case "Heavy":
      return heavy;
    default:
      return defaultCost;
  }
};

export const valueFromWeaponSize = (
  weapon: Weapon,
  light: number,
  oneHanded: number,
  twoHanded: number,
  defaultCost: number = 0,
) => {
  switch (weapon.size) {
    case "Light":
      return light;
    case "One-Handed":
      return oneHanded;
    case "Two-Handed":
      return twoHanded;
    default:
      return defaultCost;
  }
};

export const valueForAnyType = (
  component: SpecialMaterialPossibleComponent,
  ammo: number,
  weapon: number,
  shield: number,
  lightArmor: number,
  mediumArmor: number,
  heavyArmor: number,
  defaultCost: number = 0,
) => {
  if (isAmmunition(component)) {
    return ammo;
  }

  if (isWeapon(component)) {
    return weapon;
  }

  if (component.category === "Shield") {
    return shield;
  }

  return valueFromArmorCategory(
    component,
    lightArmor,
    mediumArmor,
    heavyArmor,
    defaultCost,
  );
};

export const baseSpecialMaterial: SpecialMaterialOptionals & {
  type: "special-material";
} = {
  isApplicable: () => true,
  alteredWeight: (component) => component.weight,
  addedCost: () => 0,
  alreadyMasterwork: false,
  masterworkCostIncluded: false,
  type: "special-material",
};

const Abysium: SpecialMaterial = { ...baseSpecialMaterial, name: "Abysium" };

const Adamantine: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Adamantine",
  isApplicable: (component) =>
    isWeapon(component) ||
    isAmmunition(component) ||
    component.category !== "Shield",
  addedCost: (component) => {
    if (isAmmunition(component)) {
      return 60;
    }

    if (isWeapon(component)) {
      return 3000;
    }

    return valueFromArmorCategory(component, 5000, 10000, 15000);
  },
  alreadyMasterwork: true,
  masterworkCostIncluded: true,
};

const AlchemicalSilver: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Alchemical Silver",
  isApplicable: (component) => isWeapon(component) || isAmmunition(component),
  addedCost: (component) => {
    if (isAmmunition(component)) {
      return 2;
    }

    if (isWeapon(component)) {
      return valueFromWeaponSize(component, 20, 90, 180);
    }

    return 0;
  },
};

const Angelskin: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Angelskin",
  isApplicable: (component) =>
    !isWeapon(component) &&
    !isAmmunition(component) &&
    component.category !== "Heavy",
  addedCost: (component) => {
    if (isWeapon(component) || isAmmunition(component)) {
      return 0;
    }

    return valueFromArmorCategory(component, 1000, 2000, 0);
  },
  alreadyMasterwork: true,
  masterworkCostIncluded: true,
};

const Aszite: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Aszite",
  isApplicable: (component) => !isWeapon(component) && !isAmmunition(component),
  addedCost: (component) => {
    if (isWeapon(component) || isAmmunition(component)) {
      return 0;
    }

    return valueFromArmorCategory(component, 750, 750, 1000);
  },
};

const Blackwood: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Blackwood",
  addedCost: (component) => {
    // 20gp per pound of component
    return component.weight * 20;
  },
  alreadyMasterwork: true,
};

const BlightQuartz: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Blight Quartz",
  addedCost: (component) => {
    if (isAmmunition(component)) {
      return 200;
    }

    // Armor cost is not listed on the page, assume costs same as weapon
    if (isWeapon(component) || isArmor(component)) {
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
  isApplicable: (component) => isWeapon(component) || isAmmunition(component),
  addedCost: (component) => {
    if (isWeapon(component)) {
      return 1500;
    }

    if (isAmmunition(component)) {
      return 30;
    }
    return 0;
  },
};

const BuletteArmor: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Bulette Armor",
  // Full plate and leather armor only
  isApplicable: (component) =>
    !isWeapon(component) &&
    !isAmmunition(component) &&
    (component.category === "Heavy" || component.category === "Light"),
  addedCost: (component) => {
    if (isWeapon(component) || isAmmunition(component)) {
      return 0;
    }

    // Costs 50gp for leather armor, or 10x for a set of full plate
    return valueFromArmorCategory(
      component,
      50 - component.cost,
      0,
      component.cost * 9,
    );
  },
  alteredWeight: (component) => {
    if (isWeapon(component) || isAmmunition(component)) {
      return component.weight;
    }

    // Weighs 20lbs for leather armor, or full plate + 65 lbs
    return valueFromArmorCategory(component, 20, 0, component.weight + 65);
  },
};

const Caphorite: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Caphorite",
  addedCost: (component) => (isAmmunition(component) ? 10 : 0),
};

const ColdIron: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Cold Iron",
  isApplicable: (component) => isWeapon(component) || isAmmunition(component),
  addedCost: (component, willBeMadeMagical) => {
    if (!isWeapon(component) && !isAmmunition(component)) {
      return 0;
    }

    const oneFiftiethIfAmmunition = isAmmunition(component) ? 0.02 : 1;

    // costs twice as much and an extra 2k if magical
    return (
      component.cost + (willBeMadeMagical ? 2000 * oneFiftiethIfAmmunition : 0)
    );
  },
};

const Cryptstone: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Cryptstone",
  isApplicable: (component) => isWeapon(component) || isAmmunition(component),
  addedCost: (component) => (isAmmunition(component) ? 10 : 500),
  alreadyMasterwork: true,
  masterworkCostIncluded: true,
};

const DarkleafCloth: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Darkleaf Cloth",
  isApplicable: (component) =>
    !isWeapon(component) &&
    !isAmmunition(component) &&
    component.category !== "Shield",
  addedCost: (component) => {
    if (isWeapon(component) || isAmmunition(component)) {
      return 0;
    }

    return valueFromArmorCategory(component, 750, 1500, component.weight * 375);
  },
  alteredWeight: (component) => component.weight * 0.5,
  alreadyMasterwork: true,
  masterworkCostIncluded: true,
};

const Darkwood: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Darkwood",
  addedCost: (component) => component.weight * 10,
  alteredWeight: (component) => component.weight * 0.5,
  alreadyMasterwork: true,
  masterworkCostIncluded: false,
};

const Dragonhide: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Dragonhide",
  isApplicable: (component) => !isWeapon(component) && !isAmmunition(component),
  addedCost: (component) => {
    if (isWeapon(component) || isAmmunition(component)) {
      return 0;
    }

    // costs twice the price of the armor and twice the masterwork cost
    return component.cost + MasterworkArmorCost;
  },
  alreadyMasterwork: true,
  masterworkCostIncluded: false,
};

const Druchite: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Druchite",
  addedCost: (component) => {
    if (isWeapon(component)) {
      return 1200;
    }

    if (isAmmunition(component)) {
      return 12;
    }

    return valueFromArmorCategory(component, 1000, 1500, 2000);
  },
};

const EelHide: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "EelHide",
  isApplicable: (component) =>
    !isWeapon(component) &&
    !isAmmunition(component) &&
    component.category !== "Heavy",
  addedCost: (component) => {
    if (isWeapon(component) || isAmmunition(component)) {
      return 0;
    }

    return valueFromArmorCategory(component, 1200, 1800, 0);
  },
  alreadyMasterwork: true,
  masterworkCostIncluded: true,
};

const ElysianBronze: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Elysian Bronze",
  addedCost: (component) => {
    if (isWeapon(component)) {
      return 1000;
    }

    if (isAmmunition(component)) {
      return 20;
    }

    return valueFromArmorCategory(component, 1000, 2000, 3000);
  },
};

const FireForgedSteel: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Fire-Forged Steel",
  isApplicable: (component) =>
    isAmmunition(component) || component.category !== "Shield",
  addedCost: (component) => {
    if (isWeapon(component)) {
      return 600;
    }

    if (isAmmunition(component)) {
      return 15;
    }

    return valueFromArmorCategory(component, 1000, 2500, 3000);
  },
  alreadyMasterwork: true,
  masterworkCostIncluded: true,
};

const FrostForgedSteel: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Frost-Forged Steel",
  isApplicable: (component) =>
    isAmmunition(component) || component.category !== "Shield",
  addedCost: (component) => {
    if (isWeapon(component)) {
      return 600;
    }

    if (isAmmunition(component)) {
      return 15;
    }

    return valueFromArmorCategory(component, 1000, 2500, 3000);
  },
  alreadyMasterwork: true,
  masterworkCostIncluded: true,
};

const Glaucite: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Glaucite",
  addedCost: (component) => component.cost * 2, // triple the cost
  alteredWeight: (component) => component.weight * 1.5, // half again as heavy
};

const Greenwood: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Greenwood",
  addedCost: (component) => component.weight * 50,
  alreadyMasterwork: true,
  masterworkCostIncluded: false,
};

const GriffonMane: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Griffon Mane",
  isApplicable: (component) =>
    !isWeapon(component) &&
    !isAmmunition(component) &&
    component.category !== "Shield",
  addedCost: (component) => {
    if (isWeapon(component) || isAmmunition(component)) {
      return 0;
    }

    return valueFromArmorCategory(
      component,
      200,
      component.weight * 50,
      component.weight * 50,
    );
  },
  alreadyMasterwork: true,
  masterworkCostIncluded: false,
};

const HeatstonePlating: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Heatstone Plating",
  isApplicable: (component) =>
    !isWeapon(component) &&
    !isAmmunition(component) &&
    component.category !== "Shield" &&
    component.category !== "Heavy",
  addedCost: (component) => {
    if (isWeapon(component) || isAmmunition(component)) {
      return 0;
    }

    return valueFromArmorCategory(component, 800, 1000, 0);
  },
};

const Horacalcum: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Horacalcum",
  isApplicable: (component) =>
    isAmmunition(component) || component.category !== "Shield",
  addedCost: (component) => {
    if (isAmmunition(component)) {
      return 0;
    }

    if (isWeapon(component)) {
      return 6000;
    }

    return valueFromArmorCategory(component, 10000, 30000, 60000);
  },
  alreadyMasterwork: true,
  masterworkCostIncluded: true,
};

const Inubrix: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Inubrix",
  isApplicable: (component) => isWeapon(component),
  addedCost: (component) => (isWeapon(component) ? 5000 : 0),
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
  isApplicable: (component) =>
    !isWeapon(component) &&
    !isAmmunition(component) &&
    component.category !== "Shield",
  addedCost: (component) => {
    if (isWeapon(component) || isAmmunition(component)) {
      return 0;
    }

    return valueFromArmorCategory(component, 1500, 2500, 3500);
  },
};

const LiquidGlass: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Liquid Glass",
  addedCost: (component) => {
    if (isWeapon(component)) {
      return 800;
    }

    return component.weight * 250;
  },
};

const LivingSteel: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Living Steel",
  addedCost: (component) =>
    valueForAnyType(
      component,
      10,
      500,
      100,
      500,
      1000,
      1500,
      component.weight * 250,
    ),
};

const Mithral: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Mithral",
  addedCost: (component) =>
    valueForAnyType(
      component,
      500 * component.weight,
      500 * component.weight,
      1000,
      1000,
      4000,
      9000,
      component.weight * 500,
    ),
  alteredWeight: (component) => component.weight * 0.5,
  alreadyMasterwork: true,
  masterworkCostIncluded: true,
};

const NexavaranSteel: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Nexavaran Steel",
  isApplicable: (component) => isWeapon(component),
  addedCost: (component, willBeMadeMagical) => {
    if (!isWeapon(component)) {
      return 0;
    }

    // costs 1.5x as much and an extra 3k if magical
    return component.cost * 0.5 + (willBeMadeMagical ? 3000 : 0);
  },
};

const Noqual: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Noqual",
  isApplicable: (component) => isWeapon(component),
  addedCost: (component, willBeMadeMagical) => {
    const oneFiftiethIfAmmunition = isAmmunition(component) ? 0.02 : 1;
    return (
      valueForAnyType(
        component,
        500 * oneFiftiethIfAmmunition, // Assumed "or other component +500 gp" means a bundle of 50 arrows, same as enchanting
        500,
        2000,
        4000,
        8000,
        12000,
      ) + (willBeMadeMagical ? 5000 * oneFiftiethIfAmmunition : 0)
    );
  },
  alteredWeight: (component) => component.weight * 0.5,
};

const Paueliel: SpecialMaterial = {
  ...Darkwood,
  name: "Paueliel",
  addedCost: (...args) => Darkwood.addedCost(...args) * 1.5,
};

const PyreSteel: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Pyre Steel",
  isApplicable: (component) => isWeapon(component),
  addedCost: (component) => component.cost,
};

const Siccatite: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Siccatite",
  isApplicable: (component) =>
    !isAmmunition(component) && component.category !== "Shield",
  addedCost: (component) => (isWeapon(component) ? 1000 : 6000),
};

const Silversheen: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Silversheen",
  isApplicable: (component) => isWeapon(component),
  addedCost: () => 750,
  alreadyMasterwork: true,
  masterworkCostIncluded: true,
};

const SingingSteel: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Singing Steel",
  addedCost: (component) =>
    valueForAnyType(
      component,
      component.weight * 600,
      6000,
      7000,
      750,
      9000,
      12000,
      component.weight * 600,
    ),
  alreadyMasterwork: true,
  masterworkCostIncluded: true,
};

const SpireSteel: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Spire Steel",
  isApplicable: (component) =>
    isAmmunition(component) || component.category !== "Shield",
  addedCost: (component) =>
    valueForAnyType(component, 10, 6000, 0, 750, 9000, 12000),
  alreadyMasterwork: true,
  masterworkCostIncluded: true,
};

const Sunsilk: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Sunsilk",
  isApplicable: (component) =>
    isArmor(component) && component.category !== "Shield",
  addedCost: () => 6000,
};

const Sunsilver: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Sunsilver",
  addedCost: (component) => component.weight * 25,
  alreadyMasterwork: true,
  masterworkCostIncluded: false,
};

const Throneglass: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Throneglass",
  isApplicable: (component) => isWeapon(component),
  addedCost: (component) => (isWeapon(component) ? 13000 : 0),
};

const Viridium: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Viridium",
  isApplicable: (component) => isWeapon(component) || isAmmunition(component),
  addedCost: (component) => (isWeapon(component) ? 200 : 20),
};

const ViridiumStrengthened: SpecialMaterial = {
  ...Viridium,
  name: "Viridium (Strengthened)",
  addedCost: (component, ...args) =>
    isWeapon(component)
      ? Viridium.addedCost(component, ...args) + 1000
      : Viridium.addedCost(component, ...args) + 20,
};

const Voidglass: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Voidglass",
  isApplicable: (component) => !isAmmunition(component),
  addedCost: (component) =>
    valueForAnyType(component, 0, 1000, 3000, 1000, 2000, 4500),
};

const Whipwood: SpecialMaterial = {
  ...baseSpecialMaterial,
  name: "Whipwood",
  isApplicable: (component) => isWeapon(component),
  addedCost: (component) => (isWeapon(component) ? 500 : 0),
};

const makeWyroot = (lifePointCount: number): SpecialMaterial => ({
  ...baseSpecialMaterial,
  name: `Wyroot (${lifePointCount})`,
  isApplicable: (component) => isWeapon(component),
  addedCost: (component) => (isWeapon(component) ? lifePointCount * 1000 : 0),
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
