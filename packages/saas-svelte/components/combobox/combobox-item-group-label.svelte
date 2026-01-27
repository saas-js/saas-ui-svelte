<script lang="ts">
	import { Combobox } from "@ark-ui/svelte/combobox";
	import { getContext, type Snippet } from "svelte";
	import { COMBOBOX_CTX, type ComboboxContext } from "./combobox-root.svelte";

	interface Props {
		/**
		 * The group label content.
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

<Combobox.ItemGroupLabel
	class={ctx?.styles?.itemGroupLabel({ class: className })}
	{...rest}
>
	{@render children()}
</Combobox.ItemGroupLabel>
