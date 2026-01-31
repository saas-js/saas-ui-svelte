<script module lang="ts">
import { twMerge } from "tailwind-merge";

export const GRID_LIST_CTX = Symbol("GRID_LIST_CTX");

export interface GridListContext {
	interactive: boolean;
}
</script>

<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { setContext } from "svelte";
import { Text } from "$saas/typography/text";

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
}: Props = $props();

let contextState = $state<GridListContext>({ interactive: false });

$effect(() => {
	contextState.interactive = interactive;
});

setContext<GridListContext>(GRID_LIST_CTX, contextState);

const baseStyles = "relative py-1";
</script>

<Text
	as="div"
	size="sm"
	role="grid"
	aria-readonly="true"
	class={twMerge(baseStyles, className)}
>
	{@render children()}
</Text>
