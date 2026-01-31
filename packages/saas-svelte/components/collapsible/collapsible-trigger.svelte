<script lang="ts">
import { Collapsible as ArkCollapsible } from "@ark-ui/svelte/collapsible";
import { getContext, type Snippet } from "svelte";
import type { CollapsibleTriggerProps } from "@ark-ui/svelte/collapsible";
import { twMerge } from "tailwind-merge";
import { button } from "../button/button.svelte";
import { type ColourName, getColourStyle } from "$saas/utils/colours";
import { COLLAPSIBLE_CTX, type CollapsibleContext } from "./collapsible.svelte";

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

let { children, class: className, colour = "gray", ...rest }: Props = $props();

const ctx = getContext<CollapsibleContext>(COLLAPSIBLE_CTX);
const colourVars = $derived(getColourStyle(colour));

function handlePrefetch() {
	if (!ctx?.disabled) {
		ctx?.onPrefetch?.();
	}
}
</script>

<ArkCollapsible.Trigger {...rest}>
	{#snippet asChild(props)}
		<button
			type="button"
			class={twMerge(button({ variant: "ghost" }), "mb-2", className as string)}
			style={colourVars}
			onmouseenter={handlePrefetch}
			onfocus={handlePrefetch}
			{...props()}
		>
			{@render children?.()}
		</button>
	{/snippet}
</ArkCollapsible.Trigger>
