<script lang="ts">
	import { getContext, type Snippet } from "svelte";
	import { COMBOBOX_CTX, type ComboboxContext } from "./combobox-root.svelte";

	interface Props {
		/**
		 * The indicators (clear trigger, dropdown trigger, etc.).
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

<div class={ctx?.styles?.indicatorGroup({ class: className })}>
	{@render children()}
</div>
