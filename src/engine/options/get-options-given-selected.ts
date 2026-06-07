import { allComponents } from "../../data/all-components";
import type { Component } from "../../data/component-types";
import { filterComponentsWhenAmmunitionIsPresent } from "../option-filtering/ammunition-filtering";
import { filterComponentsWhenArmorIsPresent } from "../option-filtering/armor-filtering";
import { filterComponentsWhenArmorQualityIsPresent } from "../option-filtering/armor-quality-filtering";
import { filterComponentsWhenCountIsPresent } from "../option-filtering/count-filtering";
import { filterComponentsWhenEnhancementIsPresent } from "../option-filtering/enhancement-filtering";
import type { ComponentFilterFunction } from "../option-filtering/option-filtering-types";
import { filterComponentsWhenSingularItemIsPresent } from "../option-filtering/singular-item-filtering";
import { filterComponentsWhenSizeModifierIsPresent } from "../option-filtering/size-modifier-filtering";
import { filterComponentsWhenSpecialMaterialIsPresent } from "../option-filtering/special-material-filtering";
import { filterComponentsWhenSpellIsPresent } from "../option-filtering/spell-filtering";
import { filterComponentsWhenSpellVesselIsPresent } from "../option-filtering/spell-vessel-filtering";
import { filterComponentsWhenWeaponIsPresent } from "../option-filtering/weapon-filtering";
import { filterComponentsWhenWeaponQualityIsPresent } from "../option-filtering/weapon-quality-filtering";

const componentFilters: ComponentFilterFunction[] = [
  filterComponentsWhenSingularItemIsPresent,
  filterComponentsWhenSizeModifierIsPresent,
  filterComponentsWhenEnhancementIsPresent,
  filterComponentsWhenSpecialMaterialIsPresent,
  filterComponentsWhenWeaponIsPresent,
  filterComponentsWhenWeaponQualityIsPresent,
  filterComponentsWhenAmmunitionIsPresent,
  filterComponentsWhenArmorIsPresent,
  filterComponentsWhenSpellVesselIsPresent,
  filterComponentsWhenSpellIsPresent,
  filterComponentsWhenArmorQualityIsPresent,
  filterComponentsWhenCountIsPresent,
];

export const getComponentOptionsGivenCurrentSelected = (
  selectedComponents: Component[],
) =>
  componentFilters.reduce(
    (componentsRemaining, filterFunction) =>
      filterFunction(selectedComponents, componentsRemaining),
    allComponents,
  );
