<script lang="ts">
	import { Popover } from "@ark-ui/svelte/popover";
	import { Portal } from "@ark-ui/svelte/portal";
	import { getContext, type Snippet } from "svelte";
	import { POPOVER_CTX, type PopoverContext } from "./popover-root.svelte";

	interface Props {
		/**
		 * The content to display in the popover.
		 */
		children: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		[key: string]: unknown;
	}

	let { children, class: className, ...rest }: Props = $props();

	const ctx = getContext<PopoverContext>(POPOVER_CTX);
</script>

{#if ctx?.portalled !== false}
	<Portal>
		<Popover.Positioner class={ctx?.styles?.positioner()}>
			<Popover.Content
				class={ctx?.styles?.content({ class: className })}
				{...rest}
			>
				{@render children()}
			</Popover.Content>
		</Popover.Positioner>
	</Portal>
{:else}
	<Popover.Positioner class={ctx?.styles?.positioner()}>
		<Popover.Content
			class={ctx?.styles?.content({ class: className })}
			{...rest}
		>
			{@render children()}
		</Popover.Content>
	</Popover.Positioner>
{/if}
