<script lang="ts">
import { getContext } from "svelte";
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { twMerge } from "tailwind-merge";
import {
	SIDEBAR_CTX,
	type SidebarContext,
	sidebar,
} from "./sidebar-root.svelte";
import { Flex } from "$saas/layout/flex";

interface Props extends HTMLAttributes<HTMLDivElement> {
	/**
	 * The content to render inside the group header
	 */
	children?: Snippet;
}

let { children, class: className, ...restProps }: Props = $props();

const ctx = getContext<SidebarContext>(SIDEBAR_CTX);
const styles = $derived(ctx?.styles ?? sidebar());
const finalClass = $derived(twMerge(styles.groupHeader(), className as string));
</script>

<Flex align="center" class={finalClass} {...restProps}>
	{@render children?.()}
</Flex>
