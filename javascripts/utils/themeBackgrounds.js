/* ==========================================================================
   themeBackgrounds.js — Fuente única de los temas de fondo (degradados).

   Portado de `fortunista/frontend/src/theme/theme.ts` y de
   `components/SettingsContent.tsx`. Centraliza:
     - los temas de fondo disponibles (default + 8 colores + multicolor),
     - las direcciones del degradado,
     - las velocidades del modo multicolor,
     - las escalas de fuente,
     - el constructor de estilos CSS que consume fnBackgroundTheme.js.

   Los colores se expresan como variables CSS del sistema (root.css), de modo
   que el degradado se adapta solo al modo claro/oscuro.
   ========================================================================== */

export const BACKGROUND_THEMES = [
  { key: 'default', labelKey: 'themeDefault' },
  { key: 'blue', labelKey: 'colorBlue' },
  { key: 'red', labelKey: 'colorRed' },
  { key: 'green', labelKey: 'colorGreen' },
  { key: 'amber', labelKey: 'colorAmber' },
  { key: 'cyan', labelKey: 'colorCyan' },
  { key: 'pink', labelKey: 'colorPink' },
  { key: 'violet', labelKey: 'colorViolet' },
  { key: 'orange', labelKey: 'colorOrange' },
  { key: 'multicolor', labelKey: 'themeMulticolor' }
];

/* Iconos inline (viewBox 0 0 24 24). Usan `currentColor`, por lo que el
   botón controla el color mediante la propiedad `color`. */
const DIRECTION_ICONS = {
  topToBottom: '<path d="M11 3v12H7l5 6 5-6h-4V3z"/>',
  bottomToTop: '<path d="M11 21V9H7l5-6 5 6h-4v12z"/>',
  leftToRight: '<path d="M3 11h12V7l6 5-6 5v-4H3z"/>',
  rightToLeft: '<path d="M21 11H9V7l-6 5 6 5v-4h12z"/>',
  inside: '<circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="3"/>',
  outside: '<circle cx="12" cy="12" r="8"/>',
  solid: '<rect x="4" y="4" width="16" height="16" rx="2"/>'
};

export const GRADIENT_DIRECTIONS = [
  { key: 'topToBottom', labelKey: 'directionTopToBottom' },
  { key: 'bottomToTop', labelKey: 'directionBottomToTop' },
  { key: 'leftToRight', labelKey: 'directionLeftToRight' },
  { key: 'rightToLeft', labelKey: 'directionRightToLeft' },
  { key: 'inside', labelKey: 'directionInside' },
  { key: 'outside', labelKey: 'directionOutside' },
  { key: 'solid', labelKey: 'directionSolid' }
];

export const PSYCHEDELIC_SPEEDS = [
  { key: 'lento', labelKey: 'speedSlow', duration: '180s' },
  { key: 'normal', labelKey: 'speedNormal', duration: '30s' },
  { key: 'rapido', labelKey: 'speedFast', duration: '10s' }
];

export const FONT_SCALE_OPTIONS = [
  { value: 0.85, labelKey: 'sizeSmall', size: 12 },
  { value: 1, labelKey: 'sizeNormal', size: 16 },
  { value: 1.15, labelKey: 'sizeLarge', size: 20 }
];

export const DEFAULT_BACKGROUND_THEME = 'default';
export const DEFAULT_GRADIENT_DIRECTION = 'topToBottom';
export const DEFAULT_PSYCHEDELIC_SPEED = 'normal';
export const DEFAULT_FONT_SCALE = 1;

const THEME_KEYS = BACKGROUND_THEMES.map((theme) => theme.key);
const DIRECTION_KEYS = GRADIENT_DIRECTIONS.map((direction) => direction.key);
const SPEED_KEYS = PSYCHEDELIC_SPEEDS.map((speed) => speed.key);

/* Gradiente arcoíris del modo multicolor. Empieza y termina en el mismo color
   para que el bucle de la animación sea continuo. */
const RAINBOW_GRADIENT =
  'linear-gradient(90deg, var(--red-normal), var(--amber-normal), ' +
  'var(--green-normal), var(--cyan-normal), var(--blue-normal), ' +
  'var(--violet-normal), var(--pink-normal), var(--red-normal))';

export function isBackgroundTheme(value) {
  return THEME_KEYS.includes(value);
}

export function isGradientDirection(value) {
  return DIRECTION_KEYS.includes(value);
}

export function isPsychedelicSpeed(value) {
  return SPEED_KEYS.includes(value);
}

export function isFontScale(value) {
  return FONT_SCALE_OPTIONS.some((option) => option.value === value);
}

export function getDirectionIcon(key) {
  return DIRECTION_ICONS[key] ?? DIRECTION_ICONS.topToBottom;
}

/* Muestra circular del selector de temas: un pequeño degradado que anticipa
   el aspecto del fondo. */
export function themeSwatch(key) {
  if (key === 'default') {
    return 'var(--color-background)';
  }

  if (key === 'multicolor') {
    return 'linear-gradient(135deg, var(--red-normal), var(--amber-normal), ' +
      'var(--green-normal), var(--cyan-normal), var(--blue-normal), ' +
      'var(--violet-normal), var(--pink-normal), var(--red-normal))';
  }

  return `linear-gradient(135deg, var(--${key}-oscuro), var(--${key}-normal))`;
}

/* Construye el `background-image` según la dirección elegida. Devuelve null
   cuando el tema debe mostrarse como color sólido. */
function buildGradient(themeKey, direction) {
  const start = `var(--${themeKey}-oscuro)`;
  const end = 'var(--neutral-background-soft)';

  switch (direction) {
    case 'bottomToTop':
      return `linear-gradient(0deg, ${start}, ${end})`;
    case 'leftToRight':
      return `linear-gradient(90deg, ${start}, ${end})`;
    case 'rightToLeft':
      return `linear-gradient(270deg, ${start}, ${end})`;
    case 'inside':
      /* El neutro queda en el centro y el color del tema en el borde. */
      return `radial-gradient(circle at center, ${end}, ${start})`;
    case 'outside':
      /* El color del tema queda en el centro y el neutro en el borde. */
      return `radial-gradient(circle at center, ${start}, ${end})`;
    case 'solid':
      return null;
    case 'topToBottom':
    default:
      return `linear-gradient(180deg, ${start}, ${end})`;
  }
}

/* Estilos que fnBackgroundTheme.js vuelca en variables CSS sobre <html>.
   Devuelve valores neutros y seguros ante datos inválidos en localStorage. */
export function getPageThemeStyles(themeKey, direction, speed) {
  const theme = isBackgroundTheme(themeKey) ? themeKey : DEFAULT_BACKGROUND_THEME;
  const gradientDirection = isGradientDirection(direction) ? direction : DEFAULT_GRADIENT_DIRECTION;
  const psychedelicSpeed = isPsychedelicSpeed(speed) ? speed : DEFAULT_PSYCHEDELIC_SPEED;

  if (theme === 'default') {
    return {
      background: 'var(--color-background)',
      gradient: null,
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat',
      animation: 'none'
    };
  }

  if (theme === 'multicolor') {
    const speedDef = PSYCHEDELIC_SPEEDS.find((item) => item.key === psychedelicSpeed);
    const duration = speedDef?.duration ?? '30s';

    return {
      background: 'var(--dn100)',
      gradient: RAINBOW_GRADIENT,
      backgroundSize: '400% 100%',
      backgroundRepeat: 'repeat-x',
      animation: `page-rainbow ${duration} linear infinite`
    };
  }

  return {
    background: `var(--bg-theme-${theme})`,
    gradient: buildGradient(theme, gradientDirection),
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    animation: 'none'
  };
}
