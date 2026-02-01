<script lang="ts">
	import type { Snippet } from "svelte";
	import { getContext } from "svelte";
	import { twMerge } from "tailwind-merge";
	import {
		BREADCRUMB_CTX,
		type BreadcrumbContext,
	} from "./breadcrumb-root.svelte";

	interface Props {
		/**
		 * The menu content (MenuRoot with MenuButton, MenuContent, etc.).
		 */
		children: Snippet;
		/**
		 * Whether to show the separator after this menu.
		 * @default true
		 */
		showSeparator?: boolean;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	}

	let { children, showSeparator = true, class: className }: Props = $props();

	const context = getContext<BreadcrumbContext>(BREADCRUMB_CTX);
	const styles = $derived(context?.styles);
</script>

<li class={twMerge(styles?.item() ?? "", className as string)}>
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
