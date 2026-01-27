<script lang="ts">
	import { Combobox } from "@ark-ui/svelte/combobox";
	import { getContext, type Snippet } from "svelte";
	import { COMBOBOX_CTX, type ComboboxContext } from "./combobox-root.svelte";

	interface Props {
		/**
		 * The group content.
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

<Combobox.ItemGroup
	class={ctx?.styles?.itemGroup({ class: className })}
	{...rest}
>
	{@render children()}
</Combobox.ItemGroup>
