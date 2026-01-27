<script lang="ts">
	import { Collapsible as ArkCollapsible } from "@ark-ui/svelte/collapsible";
	import { collapsibleIndicator } from "./collapsible.svelte";
	import type { Snippet } from "svelte";

	interface Props {
		/**
		 * The indicator icon content.
		 */
		children?: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	}

	let { children, class: className }: Props = $props();
</script>

<ArkCollapsible.Indicator class={collapsibleIndicator({ class: className })}>
	{#if children}
		{@render children()}
	{/if}
</ArkCollapsible.Indicator>
