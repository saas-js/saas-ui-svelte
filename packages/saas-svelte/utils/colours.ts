/**
 * Colours available in the Saas UI Tailwind preset.
 * All standard Tailwind colors with OKLCH colour space.
 * These map to --colors-{name}-{shade} CSS variables.
 */
export const availableColours = [
    // Semantic
    "accent",
    // Grays
    "gray",
    "zinc",
    "neutral",
    "stone",
    "slate",
    // Colours
    "red",
    "orange",
    "amber",
    "yellow",
    "lime",
    "green",
    "emerald",
    "teal",
    "cyan",
    "sky",
    "blue",
    "indigo",
    "violet",
    "purple",
    "fuchsia",
    "pink",
    "rose",
] as const;

export type ColourName = (typeof availableColours)[number] | (string & {});

// Pre-computed cache for colour style strings
const colourStyleCache = new Map<string, string>();

export function getColourStyle(colourName: string): string {
    if (!colourName) return "";

    // Check cache first
    const cached = colourStyleCache.get(colourName);
    if (cached) return cached;

    // Build the style string
    const style = `--c-contrast: var(--colors-${colourName}-contrast); --c-fg: var(--colors-${colourName}-fg); --c-muted: var(--colors-${colourName}-muted); --c-subtle: var(--colors-${colourName}-subtle); --c-emphasized: var(--colors-${colourName}-emphasized); --c-solid: var(--colors-${colourName}-solid); --c-focus-ring: var(--colors-${colourName}-focus-ring); --c-border: var(--colors-${colourName}-border)`;

    // Cache for future use
    colourStyleCache.set(colourName, style);

    return style;
}

// Pre-populate cache for common colours
availableColours.forEach(getColourStyle);
