<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { ColourName } from "$saas/utils/colours";

	export const code = tv({
		base: [
			// Core Layout
			"saas-code",
			"inline-flex items-center antialiased",
			"rounded",
			"font-mono",
			"[word-wrap:break-word]",
		],
		variants: {
			variant: {
				// SOLID: Contrast text on colored background
				solid: "text-(--c-contrast) bg-(--c-solid)",

				// OUTLINE: Colored text with border
				outline: [
					"text-(--c-fg)",
					"shadow-[inset_0_0_0_1px_var(--c-subtle)]",
				],

				// SUBTLE: Colored text with subtle background
				subtle: "text-(--c-fg) bg-(--c-muted)",

				// SURFACE: Colored text with very subtle background + border
				surface: [
					"text-(--c-fg)",
					"shadow-[inset_0_0_0_1px_var(--c-subtle)]",
					"bg-(--c-muted)/20",
				],
			},
			size: {
				xs: "text-xs leading-2xs px-1 min-h-4",
				sm: "text-xs leading-xs px-1.5 min-h-5",
				md: "text-sm leading-sm px-2 min-h-6",
				lg: "text-sm leading-sm px-2.5 min-h-7",
			},
		},
		defaultVariants: {
			variant: "subtle",
			size: "sm",
		},
	});

	export type CodeVariants = VariantProps<typeof code>;
</script>

<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import type { ClassNameValue } from "tailwind-merge";
	import { getColourStyle } from "$saas/utils/colours";

	interface Props extends Omit<HTMLAttributes<HTMLElement>, "class"> {
		/**
		 * The visual style of the code element.
		 * @default "subtle"
		 */
		variant?: CodeVariants["variant"];
		/**
		 * The size of the code element.
		 * @default "sm"
		 */
		size?: CodeVariants["size"];
		/**
		 * The colour palette to use.
		 * @default "gray"
		 */
		colour?: ColourName;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: ClassNameValue;
	}

	let {
		variant = "subtle",
		size = "sm",
		colour = "gray",
		class: className,
		children,
		style,
		...restProps
	}: Props = $props();

	const colourVars = $derived(getColourStyle(colour));

	const finalClass = $derived(
		code({
			variant,
			size,
			class: className,
		}),
	);

	const finalStyle = $derived([colourVars, style].filter(Boolean).join("; "));
</script>

<code class={finalClass} style={finalStyle} {...restProps}>
	{@render children?.()}
</code>
