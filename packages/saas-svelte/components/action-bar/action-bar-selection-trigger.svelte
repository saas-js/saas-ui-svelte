<script lang="ts">
import type { Snippet } from "svelte";
import type { HTMLButtonAttributes } from "svelte/elements";
import { twMerge } from "tailwind-merge";
import { actionBar } from "./action-bar.svelte";

interface Props extends HTMLButtonAttributes {
	/**
	 * Content to render inside the selection trigger (typically "X selected").
	 */
	children?: Snippet;
}

let { children, class: className, ...restProps }: Props = $props();

const styles = actionBar();
</script>

<button
	type="button"
	class={twMerge(styles.selectionTrigger() as string, className as string)}
	data-part="action-bar-selection-trigger"
	{...restProps}
>
	{@render children?.()}
</button>
