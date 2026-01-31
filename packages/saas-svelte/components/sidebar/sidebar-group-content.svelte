<script lang="ts">
import { getContext } from "svelte";
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { twMerge } from "tailwind-merge";
import { SIDEBAR_CTX, type SidebarContext } from "./sidebar-root.svelte";
import { VStack } from "$saas/layout/stack";

interface Props extends HTMLAttributes<HTMLDivElement> {
	/**
	 * The content to render inside the group content area
	 */
	children?: Snippet;
}

let { children, class: className, ...restProps }: Props = $props();

const ctx = getContext<SidebarContext>(SIDEBAR_CTX);
const finalClass = $derived(twMerge(ctx?.styles?.groupContent() ?? "", className as string));
</script>

<VStack class={finalClass} {...restProps}>
	{@render children?.()}
</VStack>
