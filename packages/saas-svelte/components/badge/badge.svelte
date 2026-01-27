<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { HTMLAttributes } from "svelte/elements";
	import type { ColourName } from "$saas/utils/colours";

	export const badge = tv({
		base: [
			"tabular-nums",
			"whitespace-nowrap",
			"select-none",
			"items-center",
			"gap-x-1 gap-y-1",
			"font-medium",
			"inline-flex",
			"rounded-full",
			"antialiased",
		],
		variants: {
			variant: {
				subtle: "bg-(--c-muted) text-(--c-fg)",
				solid: "bg-(--c-solid) text-(--c-contrast)",
				outline:
					"text-(--c-fg) shadow-[inset_0_0_0_1px_var(--c-border)]",
				surface:
					"bg-(--c-muted) text-(--c-fg) shadow-[inset_0_0_0_1px_var(--c-border)]",
			},
			size: {
				xs: "min-h-4 text-xs leading-3 px-1",
				sm: "min-h-5 text-xs leading-4 px-1.5",
				md: "min-h-6 text-sm leading-5 px-2",
				lg: "min-h-7 text-sm leading-5 px-2.5",
			},
		},
		defaultVariants: {
			variant: "subtle",
			size: "sm",
		},
	});

	export type BadgeVariants = VariantProps<typeof badge>;
</script>

<script lang="ts">
	import type { Snippet } from "svelte";
	import { getColourStyle } from "$saas/utils/colours";

	interface Props extends Omit<HTMLAttributes<HTMLSpanElement>, "color"> {
		/**
		 * The badge content.
		 */
		children: Snippet;
		/**
		 * The visual style of the badge.
		 * @default "subtle"
		 */
		variant?: BadgeVariants["variant"];
		/**
		 * The size of the badge.
		 * @default "sm"
		 */
		size?: BadgeVariants["size"];
		/**
		 * The colour palette of the badge.
		 * @default "gray"
		 */
		colour?: ColourName;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	}

	let {
		children,
		variant = "subtle",
		size = "sm",
		colour = "gray",
		class: className,
		style,
		...restProps
	}: Props = $props();

	const colourStyle = $derived(getColourStyle(colour));
	const finalStyle = $derived(
		[colourStyle, style].filter(Boolean).join("; "),
	);

	const finalClass = $derived(badge({ variant, size, class: className }));
</script>

<span class={finalClass} style={finalStyle} {...restProps}>
	{@render children()}
</span>
