<script lang="ts">
import { Combobox } from "@ark-ui/svelte/combobox";
import { getContext, type Snippet } from "svelte";
import { COMBOBOX_CTX, type ComboboxContext } from "./combobox-root.svelte";

interface Props {
	/**
	 * The item text content.
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

<Combobox.ItemText class={ctx?.styles?.itemText({ class: className })}>
	{@render children()}
</Combobox.ItemText>
