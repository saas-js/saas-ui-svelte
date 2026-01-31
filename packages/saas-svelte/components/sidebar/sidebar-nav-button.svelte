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

interface Props extends HTMLAttributes<HTMLDivElement> {
	/**
	 * Whether this button is currently active
	 * @default false
	 */
	active?: boolean;
	/**
	 * The content to render inside the nav button (icon + label)
	 */
	children?: Snippet;
}

let {
	active = false,
	children,
	class: className,
	...restProps
}: Props = $props();

const ctx = getContext<SidebarContext>(SIDEBAR_CTX);
const styles = $derived(ctx?.styles ?? sidebar());
const finalClass = $derived(twMerge(styles.item({ active }), className as string));
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
	{@render children?.()}
</div>
