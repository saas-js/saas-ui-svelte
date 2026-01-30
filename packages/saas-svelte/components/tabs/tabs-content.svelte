<script lang="ts">
import { Tabs } from "@ark-ui/svelte";
import { getContext, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";
import { TABS_CTX, type TabsContext } from "./tabs-root.svelte";

interface Props {
	/**
	 * The content of the tab panel.
	 */
	children: Snippet;
	/**
	 * The unique value of the tab this content belongs to.
	 */
	value: string;
	/**
	 * Additional classes to apply.
	 */
	class?: string;
	[key: string]: any;
}

let { children, value, class: className, ...restProps }: Props = $props();

const ctx = getContext<TabsContext>(TABS_CTX);
const styles = $derived(ctx.styles);
</script>

<Tabs.Content
	value={value}
	class={twMerge(styles.content(), className)}
	{...restProps}
>
	{@render children()}
</Tabs.Content>
