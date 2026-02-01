<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

	export const centre = tv({
		base: "items-center justify-center",
		variants: {
			inline: {
				true: "inline-flex",
				false: "flex",
			},
		},
		defaultVariants: {
			inline: false,
		},
	});

	export type CentreVariants = VariantProps<typeof centre>;
</script>

<script lang="ts">
	import type { Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";

	interface Props {
		/**
		 * Whether to use inline-flex instead of flex.
		 * @default false
		 */
		inline?: boolean;
		/**
		 * The content to render inside the center container.
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
		inline = false,
		children,
		class: className,
		...restProps
	}: Props = $props();
</script>

<div class={twMerge(centre({ inline }), className)} {...restProps}>
	{@render children?.()}
</div>
