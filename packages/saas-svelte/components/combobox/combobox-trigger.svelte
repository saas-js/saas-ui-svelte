<script lang="ts">
	import { Combobox } from "@ark-ui/svelte/combobox";
	import { getContext } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { COMBOBOX_CTX, type ComboboxContext } from "./combobox-root.svelte";
	import CaretDownIcon from "phosphor-svelte/lib/CaretDownIcon";

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

<Combobox.Trigger
	class={twMerge(ctx?.styles?.trigger() ?? "", className as string)}
	{...rest}
>
	<CaretDownIcon aria-hidden="true" />
</Combobox.Trigger>
