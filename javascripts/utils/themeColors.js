const THEME_COLORS = [
  {
    color: "blue",
    labelKey: "colorBlue",
    swatch: "hsl(210 75% 45%)",
    value: "hsl(210 75% 28%)",
    soft: "hsl(210 75% 70%)"
  },
  {
    color: "green",
    labelKey: "colorGreen",
    swatch: "hsl(141 75% 45%)",
    value: "hsl(141 75% 28%)",
    soft: "hsl(141 75% 70%)"
  },
  {
    color: "orange",
    labelKey: "colorOrange",
    swatch: "hsl(20 75% 45%)",
    value: "hsl(20 75% 28%)",
    soft: "hsl(20 75% 70%)"
  },
  {
    color: "red",
    labelKey: "colorRed",
    swatch: "hsl(354 75% 45%)",
    value: "hsl(354 75% 28%)",
    soft: "hsl(354 75% 70%)"
  },
  {
    color: "purple",
    labelKey: "colorPurple",
    swatch: "hsl(241 75% 45%)",
    value: "hsl(241 75% 28%)",
    soft: "hsl(241 75% 70%)"
  },
  {
    color: "pink",
    labelKey: "colorPink",
    swatch: "hsl(330 75% 45%)",
    value: "hsl(330 75% 28%)",
    soft: "hsl(330 75% 70%)"
  }
];

const DEFAULT_THEME_COLOR = "blue";

function getThemeColorDef(color) {
  return THEME_COLORS.find((item) => item.color === color) ?? THEME_COLORS[0];
}

export { THEME_COLORS, DEFAULT_THEME_COLOR, getThemeColorDef };
