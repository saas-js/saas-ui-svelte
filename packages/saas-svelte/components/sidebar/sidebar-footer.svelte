<script lang="ts">
import { getContext } from "svelte";
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { twMerge } from "tailwind-merge";
import { SIDEBAR_CTX, type SidebarContext } from "./sidebar-root.svelte";

interface Props extends HTMLAttributes<HTMLElement> {
	/**
	 * The content to render inside the sidebar footer
	 */
	children?: Snippet;
}

let { children, class: className, ...restProps }: Props = $props();

const ctx = getContext<SidebarContext>(SIDEBAR_CTX);
const finalClass = $derived(twMerge(ctx?.styles?.footer() ?? "", className as string));
</script>

<footer class={finalClass} {...restProps}>
	{@render children?.()}
</footer>
