<script module lang="ts">
import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind Variants styles for the GridList root component.
 */
export const gridListRoot = tv({
	base: ["text-sm leading-5", "relative py-1", "antialiased"],
});

export const GRID_LIST_CTX = Symbol("GRID_LIST_CTX");

export interface GridListContext {
	interactive: boolean;
}
</script>

<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { setContext } from "svelte";

interface Props extends HTMLAttributes<HTMLDivElement> {
	/**
	 * The content to render inside the grid list.
	 */
	children: Snippet;
	/**
	 * Whether the grid list items are interactive (hoverable/clickable).
	 * @default false
	 */
	interactive?: boolean;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
}

let {
	children,
	interactive = false,
	class: className,
	...restProps
}: Props = $props();

let contextState = $state<GridListContext>({ interactive: false });

$effect(() => {
	contextState.interactive = interactive;
});

setContext<GridListContext>(GRID_LIST_CTX, contextState);
</script>

<div
	role="grid"
	aria-readonly="true"
	class={twMerge(gridListRoot(), className as string)}
	{...restProps}
>
	{@render children()}
</div>
