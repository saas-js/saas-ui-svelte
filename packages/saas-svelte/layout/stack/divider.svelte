<script lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";
	import type { HTMLAttributes } from "svelte/elements";
	import { twMerge } from "tailwind-merge";

	const divider = tv({
		base: "shrink-0 self-stretch border-border-default",
		variants: {
			orientation: {
				horizontal: "my-2 border-t",
				vertical: "mx-2 border-l",
			},
		},
		defaultVariants: {
			orientation: "horizontal",
		},
	});

	type DividerVariants = VariantProps<typeof divider>;

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/**
		 * The orientation of the divider.
		 * @default "horizontal"
		 */
		orientation?: DividerVariants["orientation"];

		/**
		 * Additional CSS classes to apply to the divider.
		 */
		class?: string;
	}

	let {
		orientation = "horizontal",
		class: className,
		...restProps
	}: Props = $props();
</script>

<div
	role="separator"
	aria-orientation={orientation}
	class={twMerge(divider({ orientation }), className)}
	{...restProps}
></div>
