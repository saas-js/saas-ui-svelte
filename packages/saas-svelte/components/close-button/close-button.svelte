<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

	export const closeButton = tv({
		base: [
			"appearance-none",
			"select-none",
			"whitespace-nowrap",
			"align-middle",
			"cursor-pointer",
			"isolate",
			"antialiased",
			"outline-0",
			"shrink-0",
			"justify-center",
			"items-center",
			"font-medium",
			"inline-flex",
			"relative",
			"rounded",
			"focus-visible:outline-offset-2",
			"focus-visible:outline-1",
			"focus-visible:outline-solid",
			"focus-visible:outline-fg-muted",
			"disabled:opacity-50",
			"disabled:cursor-not-allowed",
		],
		variants: {
			variant: {
				// GLASS: Contrast text with gradient overlay and glossy effect
				glass: [
					"overflow-x-clip overflow-y-clip",
					"text-(--c-contrast) bg-(--c-solid)",
					"shadow-inner",
					"[text-shadow:0_1px_2px_#0000004d]",
					"after:content-[''] after:absolute after:inset-0 after:opacity-20 after:pointer-events-none",
					"after:bg-[linear-gradient(#fff_40%,#0003)]",
					"after:transition-opacity after:duration-200",
					"hover:after:bg-[linear-gradient(#fffc_40%,#0009)]",
					"transition-colors duration-200",
				],

				// SOLID: Contrast text with solid background
				solid: [
					"shadow text-(--c-contrast) bg-(--c-solid)",
					"hover:bg-(--c-solid)/90",
					"transition-colors duration-200",
				],

				// SUBTLE: Accent text with subtle background
				subtle: [
					"text-(--c-fg) bg-(--c-muted)",
					"hover:bg-(--c-subtle)",
					"transition-colors duration-200",
				],

				// OUTLINE: Accent text with thin border
				outline: [
					"border-[0.5px] text-(--c-fg) border-(--c-border)",
					"hover:bg-(--c-muted)",
				],

				// GHOST: Accent text, background on hover
				ghost: [
					"text-(--c-fg)",
					"hover:bg-(--c-subtle)",
					"transition-colors duration-200",
				],
			},
			size: {
				"2xs": "min-w-5 h-5 gap-y-0.5 gap-x-0.5 text-xs leading-4",
				xs: "min-w-6 h-6 gap-y-1 gap-x-1 text-xs leading-4",
				sm: "min-w-7 h-7 gap-y-2 gap-x-2 text-sm leading-5",
				md: "min-w-8 h-8 gap-y-2 gap-x-2 text-sm leading-5",
				lg: "min-w-10 h-10 gap-y-3 gap-x-3 text-sm leading-5 rounded-md",
				xl: "min-w-12 h-12 gap-y-3 gap-x-3 text-base leading-6 rounded-md",
			},
		},
		defaultVariants: {
			variant: "ghost",
			size: "md",
		},
	});

	export type CloseButtonVariants = VariantProps<typeof closeButton>;
</script>

<script lang="ts">
	import type { HTMLButtonAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";
	import { getColourStyle, type ColourName } from "$saas/utils/colours";
	import X from "phosphor-svelte/lib/X";

	interface Props extends HTMLButtonAttributes {
		/**
		 * The visual style of the close button.
		 * @default "ghost"
		 */
		variant?: CloseButtonVariants["variant"];
		/**
		 * The size of the close button.
		 * @default "md"
		 */
		size?: CloseButtonVariants["size"];
		/**
		 * The colour palette of the close button.
		 * @default "gray"
		 */
		colour?: ColourName;
		/**
		 * Custom icon or content for the close button.
		 */
		children?: Snippet;
		/**
		 * Accessible label for the close button.
		 * @default "Close"
		 */
		"aria-label"?: string;
	}

	let {
		variant = "ghost",
		size = "md",
		colour = "gray",
		class: className,
		children,
		style,
		"aria-label": ariaLabel = "Close",
		...restProps
	}: Props = $props();

	const colourStyle = $derived(getColourStyle(colour));
	const finalStyle = $derived(
		[colourStyle, style].filter(Boolean).join("; "),
	);

	const finalClass = $derived(
		closeButton({
			variant,
			size,
			class: `${className || ""}${variant === "glass" ? " group" : ""}`,
		}),
	);

	const iconSizeClass = {
		"2xs": "w-3 h-3",
		xs: "w-3.5 h-3.5",
		sm: "w-4 h-4",
		md: "w-4 h-4",
		lg: "w-4 h-4",
		xl: "w-5 h-5",
	} as const;

	const iconClass = $derived(
		`text-current inline-block shrink-0 ${iconSizeClass[size || "md"]}`,
	);
</script>

<button
	type="button"
	class={finalClass}
	style={finalStyle}
	aria-label={ariaLabel}
	{...restProps}
>
	{#if children}
		{@render children()}
	{:else}
		<X class={iconClass} weight="bold" aria-hidden="true" />
	{/if}
</button>
