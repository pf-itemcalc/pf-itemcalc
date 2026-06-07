import type { Component } from "../component-types";
import type { SpecialMaterial } from "./special-material-types";

export const isSpecialMaterial = (
  component: Component,
): component is SpecialMaterial => component.type === "special-material";

// Uses the 'scroll to text fragment' feature to locate in page since
//  they don't have individual pages
export const getSpecialMaterialUrl = (specialMaterial: SpecialMaterial) =>
  `https://www.aonprd.com/SpecialMaterials.aspx#:~:text=${encodeURIComponent(
    specialMaterial.name,
  ).replaceAll("-", "%2D")},-Source`;
