<script lang="ts">
	import { Collapsible as ArkCollapsible } from "@ark-ui/svelte/collapsible";
	import { twMerge } from "tailwind-merge";
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

<ArkCollapsible.Indicator
	class={twMerge(collapsibleIndicator(), className as string)}
>
	{@render children?.()}
</ArkCollapsible.Indicator>
