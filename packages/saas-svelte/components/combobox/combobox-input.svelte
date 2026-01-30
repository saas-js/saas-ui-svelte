<script lang="ts">
import { Combobox } from "@ark-ui/svelte/combobox";
import { getContext } from "svelte";
import { COMBOBOX_CTX, type ComboboxContext } from "./combobox-root.svelte";

interface Props {
	/**
	 * Placeholder text for the input.
	 */
	placeholder?: string;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
	[key: string]: any;
}

let { placeholder, class: className, ...rest }: Props = $props();

const ctx = getContext<ComboboxContext>(COMBOBOX_CTX);
</script>

<Combobox.Input
	placeholder={placeholder}
	class={ctx?.styles?.input({ class: className })}
	style={ctx?.colourStyle}
	{...rest}
/>
