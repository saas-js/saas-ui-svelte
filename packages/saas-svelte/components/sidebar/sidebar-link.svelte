<script lang="ts">
import { getContext, type Component } from "svelte";
import type { Snippet } from "svelte";
import type { HTMLAnchorAttributes } from "svelte/elements";
import {
	SIDEBAR_CTX,
	type SidebarContext,
	sidebar,
} from "./sidebar-root.svelte";
import { Icon } from "$saas/components/icon";

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
	styles.item({ active, class: className as string }),
);
const iconClass = $derived(styles.itemIcon());
const labelClass = $derived(styles.itemLabel());
</script>

<a
	href={href}
	class={finalClass}
	aria-current={active ? "page" : undefined}
	data-active={active || undefined}
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
</a>
