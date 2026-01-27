<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

	export const icon = tv({
		base: ["shrink-0", "inline-block", "antialiased"],
		variants: {
			size: {
				xs: "w-3 h-3",
				sm: "w-4 h-4",
				md: "w-5 h-5",
				lg: "w-6 h-6",
				xl: "w-7 h-7",
				"2xl": "w-8 h-8",
				"3xl": "w-9 h-9",
				"4xl": "w-10 h-10",
			},
		},
		defaultVariants: {
			size: "md",
		},
	});

	export type IconVariants = VariantProps<typeof icon>;
</script>

<script lang="ts">
	import type { Component, Snippet } from "svelte";
	import type { SVGAttributes } from "svelte/elements";
	import { type ColourName } from "$saas/utils/colours";
	import tailwindColors from "tailwindcss/colors";

	interface Props extends SVGAttributes<SVGElement> {
		/**
		 * The icon component to render (e.g., a Phosphor icon).
		 */
		as?: Component<any>;
		/**
		 * The size of the icon.
		 * @default "md"
		 */
		size?: IconVariants["size"];
		/**
		 * The colour palette of the icon.
		 */
		colour?: ColourName;
		/**
		 * The weight/style of the icon (for Phosphor icons).
		 * @default "regular"
		 */
		weight?: "thin" | "light" | "regular" | "bold" | "fill" | "duotone";
		/**
		 * Whether to mirror the icon horizontally.
		 * @default false
		 */
		mirrored?: boolean;
		/**
		 * Custom SVG content to render when not using the `as` prop.
		 */
		children?: Snippet;
	}

	let {
		as: IconComponent,
		size = "md",
		colour,
		weight = "regular",
		mirrored = false,
		class: className,
		style,
		children,
		...rest
	}: Props = $props();

	function getColourHex(colourName: string, shade: string = "600"): string {
		const allColours = (tailwindColors as any).default || tailwindColors;
		const palette = allColours[colourName];
		if (!palette || typeof palette !== "object") return "";
		return palette[shade] || "";
	}

	const sizeMap = {
		xs: 12,
		sm: 16,
		md: 20,
		lg: 24,
		xl: 28,
		"2xl": 32,
		"3xl": 36,
		"4xl": 40,
	} as const;

	const sizeInPixels = $derived(sizeMap[size ?? "md"]);
	const strokeColour = $derived(colour ? getColourHex(colour) : undefined);
	const finalStyle = $derived(
		[strokeColour ? `color: ${strokeColour}` : undefined, style]
			.filter(Boolean)
			.join("; "),
	);
	const computedClasses = $derived(
		icon({ size, class: className as string }),
	);
</script>

{#if IconComponent}
	<IconComponent
		size={sizeInPixels}
		color={strokeColour || "currentColor"}
		{weight}
		{mirrored}
		class={computedClasses}
		aria-hidden="true"
		focusable="false"
		{...rest}
	/>
{:else}
	<svg
		width={sizeInPixels}
		height={sizeInPixels}
		class={computedClasses}
		style={finalStyle}
		stroke="currentColor"
		fill="none"
		focusable="false"
		aria-hidden="true"
		viewBox={rest.viewBox || "0 0 24 24"}
		{...rest}
	>
		{#if children}
			{@render children()}
		{/if}
	</svg>
{/if}
