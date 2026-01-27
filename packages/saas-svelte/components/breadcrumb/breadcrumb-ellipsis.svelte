<script lang="ts">
	import type { HTMLAttributes } from "svelte/elements";
	import type { Snippet } from "svelte";
	import { getContext } from "svelte";
	import {
		BREADCRUMB_CTX,
		type BreadcrumbContext,
	} from "./breadcrumb-root.svelte";
	import DotsThree from "phosphor-svelte/lib/DotsThree";

	interface Props extends HTMLAttributes<HTMLLIElement> {
		/**
		 * Whether to show the separator after the ellipsis.
		 * @default true
		 */
		showSeparator?: boolean;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	}

	let {
		showSeparator = true,
		class: className,
		...restProps
	}: Props = $props();

	const context = getContext<BreadcrumbContext>(BREADCRUMB_CTX);
	const styles = $derived(context?.styles);
</script>

<li
	role="presentation"
	aria-hidden="true"
	class={styles?.ellipsis({ class: className })}
	{...restProps}
>
	<DotsThree class="size-3.5" weight="bold" aria-hidden="true" />
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
