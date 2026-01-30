<script lang="ts">
import { getContext, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";
import { TABS_CTX, type TabsContext } from "./tabs-root.svelte";

interface Props {
	/**
	 * The content (tab panels) to render.
	 */
	children: Snippet;
	/**
	 * Additional classes to apply.
	 */
	class?: string;
	[key: string]: any;
}

let { children, class: className, ...restProps }: Props = $props();

const ctx = getContext<TabsContext>(TABS_CTX);
const styles = $derived(ctx.styles);
</script>

<div class={twMerge(styles.contentGroup(), className)} {...restProps}>
	{@render children()}
</div>
