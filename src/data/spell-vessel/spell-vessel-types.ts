export type SpellVesselType = "Scroll" | "Wand" | "Potion" | "Oil";

export type SpellVessel = {
  name: string;
  vesselType: SpellVesselType;
  maxSpellLevel: number;
  type: "spell-vessel";
};
