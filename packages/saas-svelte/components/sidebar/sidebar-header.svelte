<script lang="ts">
import { getContext } from "svelte";
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { SIDEBAR_CTX, type SidebarContext } from "./sidebar-root.svelte";

interface Props extends HTMLAttributes<HTMLElement> {
	/**
	 * The content to render inside the sidebar header
	 */
	children?: Snippet;
}

let { children, class: className, ...restProps }: Props = $props();

const ctx = getContext<SidebarContext>(SIDEBAR_CTX);
const finalClass = $derived(
	ctx?.styles?.header({ class: className as string }),
);
</script>

<header class={finalClass} {...restProps}>
	{@render children?.()}
</header>
