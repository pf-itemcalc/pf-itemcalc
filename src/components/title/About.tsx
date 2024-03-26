import Typography from "@mui/material/Typography";

const About = () => {
  return (
    <>
      <Typography sx={{ paddingBottom: 1 }}>
        <b>Welcome to my Pathfinder 1st edition item calculator.</b>
      </Typography>
      <Typography sx={{ paddingBottom: 1 }}>
        <b>The purpose of this tool</b> is to quickly find an item, calculate
        its cost, weight and caster level, and display this information in a
        copy-and-pasteable format (compatible with OneNote).
      </Typography>
      <Typography sx={{ paddingBottom: 1 }}>
        <b>This tool is best used</b> when you already know exactly what item
        you want to search for. For example you want to know about a +1 flaming
        cold iron longsword, or a potion of fly. If you don't know off the top
        of your head what the value, weight and CL of this item is, then this is
        the place for you!
      </Typography>
      <Typography sx={{ paddingBottom: 1 }}>
        <b>This tool does not</b> intelligently suggest what item qualities and
        special materials go together. It does its best to narrow down options
        in some cases. However, it will not tell you, for example, that you
        cannot apply the <i>Distance</i> quality to a longsword, or that you
        cannot make a Potion of <i>Shield</i>
      </Typography>
      <Typography sx={{ paddingBottom: 1 }}>
        <b>Regarding spells</b>: This tool has estimated the likely spell list
        for any spell selected in order to get the spell level and caster level.
        This is done first for core classes (cleric, wizard, druid, sorcerer,
        bard, paladin, ranger), then base classes (witch, oracle, alchemist,
        magus, inquisitor, summoner, antipaladin), then hybrid classes
        (bloodrager, shaman), then occult classes (psychic, spiritualist,
        occultist) and finally NPC classes (adept)
      </Typography>
      <Typography>
        <b>This tool currently cannot:</b>
        <ul>
          <li>Customise spell list and caster level (TODO)</li>
          <li>Calculate ammunition</li>
          <li>Calculate double-headed weapons (treated only single headed)</li>
          <li>Allow you to apply any metamagic feats to spells</li>
        </ul>
      </Typography>
    </>
  );
};

export default About;
