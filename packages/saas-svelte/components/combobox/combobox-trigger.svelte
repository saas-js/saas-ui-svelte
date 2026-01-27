<script lang="ts">
	import { Combobox } from "@ark-ui/svelte/combobox";
	import { getContext } from "svelte";
	import { COMBOBOX_CTX, type ComboboxContext } from "./combobox-root.svelte";
	import CaretDown from "phosphor-svelte/lib/CaretDown";

	interface Props {
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
		[key: string]: any;
	}

	let { class: className, ...rest }: Props = $props();

	const ctx = getContext<ComboboxContext>(COMBOBOX_CTX);
</script>

<Combobox.Trigger class={ctx?.styles?.trigger({ class: className })} {...rest}>
	<CaretDown aria-hidden="true" />
</Combobox.Trigger>
