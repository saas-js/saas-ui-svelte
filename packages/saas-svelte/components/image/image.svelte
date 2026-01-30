<script module lang="ts">
import { tv, type VariantProps } from "tailwind-variants";

/**
 * Tailwind Variants styles for the Image component.
 */
export const image = tv({
	base: [
		"block",
		"max-w-full",
		"align-middle",
		"overflow-clip",
		"box-border",
	],
	variants: {
		/**
		 * The border radius of the image.
		 */
		rounded: {
			none: "rounded-none",
			sm: "rounded-sm",
			md: "rounded-md",
			lg: "rounded-lg",
			xl: "rounded-xl",
			"2xl": "rounded-2xl",
			"3xl": "rounded-3xl",
			full: "rounded-full",
		},
		/**
		 * The object-fit property of the image.
		 */
		fit: {
			cover: "object-cover",
			contain: "object-contain",
			fill: "object-fill",
			none: "object-none",
			"scale-down": "object-scale-down",
		},
	},
	defaultVariants: {
		rounded: "none",
		fit: "cover",
	},
});

export type ImageVariants = VariantProps<typeof image>;
</script>

<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";

interface Props extends Omit<HTMLAttributes<HTMLImageElement>, "style"> {
	/**
	 * The image source URL.
	 */
	src: string;
	/**
	 * Alternative text for the image.
	 */
	alt: string;
	/**
	 * The width of the image (CSS value or number for pixels).
	 */
	width?: string | number;
	/**
	 * The height of the image (CSS value or number for pixels).
	 */
	height?: string | number;
	/**
	 * The aspect ratio of the image (e.g., 16/9, 4/3, 1).
	 */
	aspectRatio?: number | string;
	/**
	 * The border radius of the image.
	 * @default "none"
	 */
	rounded?: ImageVariants["rounded"];
	/**
	 * The object-fit property of the image.
	 * @default "cover"
	 */
	fit?: ImageVariants["fit"];
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
	/**
	 * Inline styles to apply via the style attribute.
	 */
	style?: string;
	/**
	 * Event handler called when the image loads successfully.
	 */
	onload?: (event: Event) => void;
	/**
	 * Event handler called when the image fails to load.
	 */
	onerror?: (event: Event) => void;
}

let {
	src,
	alt,
	width,
	height,
	aspectRatio,
	rounded = "none",
	fit = "cover",
	class: className,
	style,
	onload,
	onerror,
	...rest
}: Props = $props();

/**
 * Convert a dimension value to a CSS string.
 */
function toCss(value: string | number | undefined): string | undefined {
	if (value === undefined) return undefined;
	if (typeof value === "number") return `${value}px`;
	return value;
}

const computedStyle = $derived.by(() => {
	const styles: string[] = [];

	const w = toCss(width);
	const h = toCss(height);

	if (w) styles.push(`width: ${w}`);
	if (h) styles.push(`height: ${h}`);
	if (aspectRatio) styles.push(`aspect-ratio: ${aspectRatio}`);
	if (style) styles.push(style);

	return styles.length > 0 ? styles.join("; ") : undefined;
});

const classes = $derived(image({ rounded, fit, class: className }));
</script>

<img
	src={src}
	alt={alt}
	class={classes}
	style={computedStyle}
	onload={onload}
	onerror={onerror}
	{...rest}
/>
