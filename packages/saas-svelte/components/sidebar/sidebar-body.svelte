<script lang="ts">
	import { getContext } from "svelte";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { twMerge } from "tailwind-merge";
	import { SIDEBAR_CTX, type SidebarContext } from "./sidebar-root.svelte";
	import { Box } from "$saas/layout/box";

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/**
		 * The content to render inside the sidebar body
		 */
		children?: Snippet;
	}

	let { children, class: className, ...restProps }: Props = $props();

	const ctx = getContext<SidebarContext>(SIDEBAR_CTX);
	const finalClass = $derived(
		twMerge(ctx?.styles?.body() ?? "", className as string),
	);
</script>

<Box class={finalClass} {...restProps}>
	{@render children?.()}
</Box>
