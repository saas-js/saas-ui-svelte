<script lang="ts">
	import { Tabs } from "@ark-ui/svelte";
	import { getContext, type Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { TABS_CTX, type TabsContext } from "./tabs-root.svelte";

	interface Props {
		/**
		 * The content of the trigger.
		 */
		children: Snippet;
		/**
		 * The unique value of the tab.
		 */
		value: string;
		/**
		 * Whether the tab is disabled.
		 * @default false
		 */
		disabled?: boolean;
		/**
		 * Additional classes to apply.
		 */
		class?: string;
		[key: string]: any;
	}

	let {
		children,
		value,
		disabled = false,
		class: className,
		...restProps
	}: Props = $props();

	const ctx = getContext<TabsContext>(TABS_CTX);
	const styles = $derived(ctx.styles);
</script>

<Tabs.Trigger
	{value}
	{disabled}
	class={twMerge(styles.trigger(), className)}
	{...restProps}
>
	{@render children()}
</Tabs.Trigger>
