<script lang="ts">
	import { Combobox } from "@ark-ui/svelte/combobox";
	import { getContext } from "svelte";
	import { COMBOBOX_CTX, type ComboboxContext } from "./combobox-root.svelte";
	import Check from "phosphor-svelte/lib/Check";

	interface Props {
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	}

	let { class: className }: Props = $props();

	const ctx = getContext<ComboboxContext>(COMBOBOX_CTX);
</script>

<Combobox.ItemIndicator
	class={ctx?.styles?.itemIndicator({ class: className })}
>
	<Check weight="bold" />
</Combobox.ItemIndicator>
