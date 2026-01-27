<script lang="ts">
	import { getContext } from "svelte";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { SIDEBAR_CTX, type SidebarContext } from "./sidebar-root.svelte";

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/**
		 * The content to render inside the group header
		 */
		children?: Snippet;
	}

	let { children, class: className, ...restProps }: Props = $props();

	const ctx = getContext<SidebarContext>(SIDEBAR_CTX);
	const finalClass = $derived(
		["flex items-center px-2.5 py-1.5", className]
			.filter(Boolean)
			.join(" "),
	);
</script>

<div class={finalClass} {...restProps}>
	{@render children?.()}
</div>
