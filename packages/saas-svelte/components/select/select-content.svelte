<script lang="ts">
	import { Select, useSelectContext } from "@ark-ui/svelte/select";
	import { Portal } from "@ark-ui/svelte/portal";
	import { getContext, type Snippet } from "svelte";
	import { SELECT_CTX, type SelectContext } from "./select-root.svelte";

	interface Props {
		/**
		 * The select content.
		 */
		children: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		/**
		 * Whether to render the select content in a portal.
		 * @default true
		 */
		portal?: boolean;
		[key: string]: any;
	}

	let {
		children,
		class: className,
		portal = true,
		...rest
	}: Props = $props();

	const ctx = getContext<SelectContext>(SELECT_CTX);
	const selectApi = useSelectContext();

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === "Tab") {
			selectApi().setOpen(false);
		}
	}
</script>

{#snippet selectContent()}
	<Select.Positioner class={ctx?.styles?.positioner()}>
		<Select.Content
			class={ctx?.styles?.content({ class: className })}
			style={ctx?.colourStyle}
			onkeydown={handleKeyDown}
			{...rest}
		>
			{@render children()}
		</Select.Content>
	</Select.Positioner>
{/snippet}

{#if portal}
	<Portal>
		{@render selectContent()}
	</Portal>
{:else}
	{@render selectContent()}
{/if}

<style global>
	/* Apply slide + fade animations based on placement and state */
	[data-scope="select"][data-part="content"][data-state="open"][data-placement^="top"] {
		animation:
			slide-from-bottom var(--durations-fast) ease-out,
			fade-in var(--durations-fast) ease-out;
	}
	[data-scope="select"][data-part="content"][data-state="closed"][data-placement^="top"] {
		animation:
			slide-to-bottom var(--durations-fast) ease-in,
			fade-out var(--durations-fast) ease-in;
	}
	[data-scope="select"][data-part="content"][data-state="open"][data-placement^="bottom"] {
		animation:
			slide-from-top var(--durations-fast) ease-out,
			fade-in var(--durations-fast) ease-out;
	}
	[data-scope="select"][data-part="content"][data-state="closed"][data-placement^="bottom"] {
		animation:
			slide-to-top var(--durations-fast) ease-in,
			fade-out var(--durations-fast) ease-in;
	}
	/* Fallback for content without placement */
	[data-scope="select"][data-part="content"][data-state="open"]:not([data-placement]) {
		animation:
			slide-from-top var(--durations-fast) ease-out,
			fade-in var(--durations-fast) ease-out;
	}
	[data-scope="select"][data-part="content"][data-state="closed"]:not([data-placement]) {
		animation:
			slide-to-top var(--durations-fast) ease-in,
			fade-out var(--durations-fast) ease-in;
	}
</style>
