<script module lang="ts">
	import { tv } from "tailwind-variants";
	import { twMerge } from "tailwind-merge";

	/**
	 * Tailwind Variants styles for the GridList item component.
	 */
	export const gridListItem = tv({
		base: [
			"outline-0",
			"flex-1",
			"px-3 py-2",
			"rounded-[inherit]",
			"antialiased",
		],
		variants: {
			interactive: {
				true: [
					"select-none",
					"cursor-pointer",
					"transition-colors duration-150",
					"hover:bg-bg-subtle",
					"active:bg-bg-subtle",
					"disabled:cursor-not-allowed",
					"disabled:opacity-50",
					"disabled:hover:bg-transparent",
					"disabled:active:bg-transparent",
				],
				false: [],
			},
		},
		defaultVariants: {
			interactive: false,
		},
	});
</script>

<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { getContext } from "svelte";
	import { Flex } from "$saas/layout/flex";
	import {
		GRID_LIST_CTX,
		type GridListContext,
	} from "./grid-list-root.svelte";

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/**
		 * The content to render inside the item.
		 */
		children: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	}

	let { children, class: className }: Props = $props();

	const context = getContext<GridListContext>(GRID_LIST_CTX);
	const interactive = $derived(context?.interactive ?? false);
</script>

<Flex
	role="row"
	tabindex={interactive ? 0 : undefined}
	align="center"
	justify="between"
	gap={2}
	class={twMerge(gridListItem({ interactive }), className)}
>
	{@render children()}
</Flex>
