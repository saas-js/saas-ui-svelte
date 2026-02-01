<script lang="ts">
	import { Tabs } from "@ark-ui/svelte/tabs";
	import { getContext, type Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { TABS_CTX, type TabsContext } from "./tabs-root.svelte";

	interface Props {
		/**
		 * The content of the tabs list.
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

<Tabs.List class={twMerge(styles.list(), className)} {...restProps}>
	{@render children()}
</Tabs.List>
