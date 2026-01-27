<script lang="ts">
	import { getContext } from "svelte";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { SIDEBAR_CTX, type SidebarContext } from "./sidebar-root.svelte";

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/**
		 * The content to render inside the nav item
		 */
		children?: Snippet;
	}

	let { children, class: className, ...restProps }: Props = $props();

	const ctx = getContext<SidebarContext>(SIDEBAR_CTX);
	const finalClass = $derived(
		["text-[.8125rem] leading-[1.1375rem] relative py-px", className]
			.filter(Boolean)
			.join(" "),
	);
</script>

<div class={finalClass} {...restProps}>
	{@render children?.()}
</div>
