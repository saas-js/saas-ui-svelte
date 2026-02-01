<script module lang="ts">
import { tv, type VariantProps } from "tailwind-variants";

export const absoluteCentre = tv({
	base: "absolute flex items-center justify-center",
	variants: {
		axis: {
			horizontal: "left-1/2 -translate-x-1/2",
			vertical: "top-1/2 -translate-y-1/2",
			both: "left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2",
		},
	},
	defaultVariants: {
		axis: "both",
	},
});

export type AbsoluteCentreVariants = VariantProps<typeof absoluteCentre>;
</script>

<script lang="ts">
import type { Snippet } from "svelte";
import { twMerge } from "tailwind-merge";

interface Props {
	/**
	 * The axis to center on.
	 * - "horizontal": Centers horizontally only
	 * - "vertical": Centers vertically only
	 * - "both": Centers both horizontally and vertically
	 * @default "both"
	 */
	axis?: AbsoluteCentreVariants["axis"];
	/**
	 * The content to render inside the absolute center container.
	 */
	children?: Snippet;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
	/**
	 * Additional HTML attributes to spread onto the element.
	 */
	[key: string]: unknown;
}

let {
	axis = "both",
	children,
	class: className,
	...restProps
}: Props = $props();
</script>

<div class={twMerge(absoluteCentre({ axis }), className)} {...restProps}>
	{@render children?.()}
</div>
