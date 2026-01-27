<script lang="ts">
	import { Collapsible as ArkCollapsible } from "@ark-ui/svelte/collapsible";
	import type { Snippet } from "svelte";
	import type { CollapsibleTriggerProps } from "@ark-ui/svelte/collapsible";
	import { button } from "../button/button.svelte";
	import { type ColourName, getColourStyle } from "$saas/utils/colours";

	interface Props extends Omit<CollapsibleTriggerProps, "asChild"> {
		/**
		 * The content of the trigger.
		 */
		children?: Snippet;
		/**
		 * The colour of the trigger button.
		 * @default "gray"
		 */
		colour?: ColourName;
	}

	let {
		children,
		class: className,
		colour = "gray",
		...rest
	}: Props = $props();

	const colourVars = $derived(getColourStyle(colour));
</script>

<ArkCollapsible.Trigger {...rest}>
	{#snippet asChild(props)}
		<button
			type="button"
			class={button({
				variant: "ghost",
				className: `mb-2 ${className || ""}`,
			})}
			style={colourVars}
			{...props()}
		>
			{#if children}
				{@render children()}
			{/if}
		</button>
	{/snippet}
</ArkCollapsible.Trigger>
