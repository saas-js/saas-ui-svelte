<script lang="ts">
	import { Combobox } from "@ark-ui/svelte/combobox";
	import { getContext } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { COMBOBOX_CTX, type ComboboxContext } from "./combobox-root.svelte";
	import CheckIcon from "phosphor-svelte/lib/CheckIcon";

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
	class={twMerge(ctx?.styles?.itemIndicator() ?? "", className as string)}
>
	<CheckIcon weight="bold" />
</Combobox.ItemIndicator>
