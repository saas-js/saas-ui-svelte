<script lang="ts">
	import { HoverCard } from "@ark-ui/svelte/hover-card";
	import { Portal } from "@ark-ui/svelte/portal";
	import { getContext, type Snippet } from "svelte";
	import {
		HOVER_CARD_CTX,
		type HoverCardContext,
	} from "./hover-card-root.svelte";

	interface Props {
		/**
		 * The content to display in the hover card.
		 */
		children: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		[key: string]: unknown;
	}

	let { children, class: className, ...rest }: Props = $props();

	const ctx = getContext<HoverCardContext>(HOVER_CARD_CTX);
</script>

{#if ctx?.portalled !== false}
	<Portal>
		<HoverCard.Positioner class={ctx?.styles?.positioner()}>
			<HoverCard.Content
				class={ctx?.styles?.content({ class: className })}
				role="tooltip"
				{...rest}
			>
				{@render children()}
			</HoverCard.Content>
		</HoverCard.Positioner>
	</Portal>
{:else}
	<HoverCard.Positioner class={ctx?.styles?.positioner()}>
		<HoverCard.Content
			class={ctx?.styles?.content({ class: className })}
			role="tooltip"
			{...rest}
		>
			{@render children()}
		</HoverCard.Content>
	</HoverCard.Positioner>
{/if}
