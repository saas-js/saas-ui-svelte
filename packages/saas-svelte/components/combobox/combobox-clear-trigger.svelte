<script lang="ts">
import { Combobox } from "@ark-ui/svelte/combobox";
import { getContext } from "svelte";
import { COMBOBOX_CTX, type ComboboxContext } from "./combobox-root.svelte";
import XIcon from "phosphor-svelte/lib/XIcon";

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

<Combobox.ClearTrigger
	class={ctx?.styles?.clearTrigger({ class: className })}
	{...rest}
>
	<XIcon />
</Combobox.ClearTrigger>
