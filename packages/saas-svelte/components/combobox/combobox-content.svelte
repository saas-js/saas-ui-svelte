<script lang="ts">
	import { Combobox } from "@ark-ui/svelte/combobox";
	import { Portal } from "@ark-ui/svelte/portal";
	import { getContext, type Snippet } from "svelte";
	import { COMBOBOX_CTX, type ComboboxContext } from "./combobox-root.svelte";

	interface Props {
		/**
		 * The dropdown content.
		 */
		children: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		[key: string]: any;
	}

	let { children, class: className, ...rest }: Props = $props();

	const ctx = getContext<ComboboxContext>(COMBOBOX_CTX);
</script>

<Portal>
	<Combobox.Positioner class={ctx?.styles?.positioner()}>
		<Combobox.Content
			class={ctx?.styles?.content({ class: className })}
			style={ctx?.colourStyle}
			{...rest}
		>
			{@render children()}
		</Combobox.Content>
	</Combobox.Positioner>
</Portal>

<style global>
	/* Apply slide animations based on combobox placement */
	[data-scope="combobox"][data-part="content"][data-placement^="bottom"] {
		animation: var(--animate-submenu-bottom);
	}
	[data-scope="combobox"][data-part="content"][data-placement^="top"] {
		animation: var(--animate-submenu-top);
	}
	[data-scope="combobox"][data-part="content"][data-placement^="left"] {
		animation: var(--animate-submenu-left);
	}
	[data-scope="combobox"][data-part="content"][data-placement^="right"] {
		animation: var(--animate-submenu-right);
	}
	/* Fallback for comboboxes without explicit placement */
	[data-scope="combobox"][data-part="content"]:not([data-placement]) {
		animation: var(--animate-submenu-bottom);
	}
</style>
