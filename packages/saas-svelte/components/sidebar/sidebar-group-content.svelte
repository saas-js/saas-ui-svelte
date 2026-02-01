<script lang="ts">
	import { getContext } from "svelte";
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { twMerge } from "tailwind-merge";
	import { SIDEBAR_CTX, type SidebarContext } from "./sidebar-root.svelte";

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/**
		 * The content to render inside the group content area
		 */
		children?: Snippet;
	}

	let { children, class: className, ...restProps }: Props = $props();

	const ctx = getContext<SidebarContext>(SIDEBAR_CTX);
	const finalClass = $derived(
		twMerge(
			"flex flex-col",
			ctx?.styles?.groupContent() ?? "",
			className as string,
		),
	);
</script>

<div class={finalClass} {...restProps}>
	{@render children?.()}
</div>
