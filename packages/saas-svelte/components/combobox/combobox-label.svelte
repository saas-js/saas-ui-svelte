<script lang="ts">
	import { Combobox } from "@ark-ui/svelte/combobox";
	import { getContext, type Snippet } from "svelte";
	import { COMBOBOX_CTX, type ComboboxContext } from "./combobox-root.svelte";

	interface Props {
		/**
		 * The label content.
		 */
		children: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	}

	let { children, class: className }: Props = $props();

	const ctx = getContext<ComboboxContext>(COMBOBOX_CTX);
</script>

<Combobox.Label class={ctx?.styles?.label({ class: className })}>
	{@render children()}
</Combobox.Label>
