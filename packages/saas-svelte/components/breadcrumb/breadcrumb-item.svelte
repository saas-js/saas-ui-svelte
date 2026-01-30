<script lang="ts">
import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";
import { getContext } from "svelte";
import { twMerge } from "tailwind-merge";
import {
	BREADCRUMB_CTX,
	type BreadcrumbContext,
} from "./breadcrumb-root.svelte";

interface Props extends HTMLAttributes<HTMLLIElement> {
	/**
	 * The breadcrumb item content.
	 */
	children: Snippet;
	/**
	 * Whether to show the separator after this item.
	 * @default true
	 */
	showSeparator?: boolean;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
}

let {
	children,
	showSeparator = true,
	class: className,
	...restProps
}: Props = $props();

const context = getContext<BreadcrumbContext>(BREADCRUMB_CTX);
const styles = $derived(context?.styles);
</script>

<li class={twMerge(styles?.item() ?? "", className as string)} {...restProps}>
	{@render children()}
</li>

{#if showSeparator}
	<li aria-hidden="true" class={styles?.separator()}>
		{#if typeof context?.separator === "string"}
			{context.separator}
		{:else if context?.separator}
			{@const Separator = context.separator}
			<Separator />
		{:else}
			/
		{/if}
	</li>
{/if}
