<script lang="ts">
	import { getContext } from "svelte";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { twMerge } from "tailwind-merge";
	import { SIDEBAR_CTX, type SidebarContext } from "./sidebar-root.svelte";

	interface Props extends Omit<HTMLAttributes<HTMLButtonElement>, "onclick"> {
		/**
		 * Callback when the toggle is clicked
		 */
		onclick?: (collapsed: boolean) => void;
		/**
		 * The icon or content to display in the toggle
		 */
		children?: Snippet;
	}

	let { onclick, children, class: className, ...restProps }: Props = $props();

	const ctx = getContext<SidebarContext>(SIDEBAR_CTX);
	const finalClass = $derived(
		twMerge(ctx?.styles?.toggle() ?? "", className as string),
	);
</script>

<button
	type="button"
	aria-label={ctx?.collapsed ? "Expand sidebar" : "Collapse sidebar"}
	class={finalClass}
	onclick={() => onclick?.(!ctx?.collapsed)}
	{...restProps}
>
	{@render children?.()}
</button>
