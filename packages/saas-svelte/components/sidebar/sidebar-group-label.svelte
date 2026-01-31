<script lang="ts">
import { getContext } from "svelte";
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { twMerge } from "tailwind-merge";
import { SIDEBAR_CTX, type SidebarContext } from "./sidebar-root.svelte";
import { Text } from "$saas/typography/text";

interface Props extends HTMLAttributes<HTMLDivElement> {
	/**
	 * The label text or content
	 */
	children?: Snippet;
}

let { children, class: className, ...restProps }: Props = $props();

const ctx = getContext<SidebarContext>(SIDEBAR_CTX);
const finalClass = $derived(twMerge(ctx?.styles?.groupLabel() ?? "", className as string));
</script>

<Text as="div" class={finalClass} {...restProps}>
	{@render children?.()}
</Text>
