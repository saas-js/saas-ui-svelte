<script lang="ts">
import { getContext, type Component } from "svelte";
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";
import { twMerge } from "tailwind-merge";
import {
	SIDEBAR_CTX,
	type SidebarContext,
	sidebar,
} from "./sidebar-root.svelte";
import { Icon } from "$saas/components/icon";

interface Props extends HTMLAttributes<HTMLDivElement> {
	/**
	 * Whether this item is currently active
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
	...restProps
}: Props = $props();

const ctx = getContext<SidebarContext>(SIDEBAR_CTX);
const styles = $derived(ctx?.styles ?? sidebar());
const finalClass = $derived(twMerge(styles.item({ active }), className as string));
const iconClass = $derived(styles.itemIcon());
const labelClass = $derived(styles.itemLabel());
</script>

<div
	role="button"
	tabindex="0"
	class={finalClass}
	data-active={active || undefined}
	onkeydown={(e: KeyboardEvent & { currentTarget: HTMLDivElement }) => {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			e.currentTarget.click();
		}
	}}
	{...restProps}
>
	{#if icon}
		<span class={iconClass}>
			<Icon as={icon} size="sm" />
		</span>
	{/if}
	<span class={labelClass}>
		{@render children?.()}
	</span>
</div>
