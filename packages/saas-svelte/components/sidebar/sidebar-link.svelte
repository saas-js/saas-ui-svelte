<script lang="ts">
	import { getContext, type Component } from "svelte";
	import type { Snippet } from "svelte";
	import type { HTMLAnchorAttributes } from "svelte/elements";
	import { twMerge } from "tailwind-merge";
	import {
		SIDEBAR_CTX,
		type SidebarContext,
		sidebar,
	} from "./sidebar-root.svelte";
	import { Icon } from "$saas/components/icon";
	import { Box } from "$saas/layout/box";
	import { Text } from "$saas/typography/text";

	interface Props extends HTMLAnchorAttributes {
		/**
		 * Whether this link is currently active
		 * @default false
		 */
		active?: boolean;
		/**
		 * Icon component to display before the label. Auto-sized to fit.
		 */
		icon?: Component<any>;
		/**
		 * The label text or content
		 */
		children?: Snippet;
	}

	let {
		active = false,
		icon,
		children,
		class: className,
		href,
		...restProps
	}: Props = $props();

	const ctx = getContext<SidebarContext>(SIDEBAR_CTX);
	const styles = $derived(ctx?.styles ?? sidebar());
	const finalClass = $derived(
		twMerge(styles.item({ active }), className as string),
	);
	const iconClass = $derived(styles.itemIcon());
	const labelClass = $derived(styles.itemLabel());
</script>

<a
	{href}
	class={finalClass}
	aria-current={active ? "page" : undefined}
	data-active={active || undefined}
	{...restProps}
>
	{#if icon}
		<Box as="span" class={iconClass}>
			<Icon as={icon} size="sm" />
		</Box>
	{/if}
	<Text as="span" class={twMerge(labelClass)}>
		{@render children?.()}
	</Text>
</a>
