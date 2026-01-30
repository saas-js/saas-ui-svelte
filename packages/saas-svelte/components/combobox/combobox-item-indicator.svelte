<script lang="ts">
import { Combobox } from "@ark-ui/svelte/combobox";
import { getContext } from "svelte";
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
	class={ctx?.styles?.itemIndicator({ class: className })}
>
	<CheckIcon weight="bold" />
</Combobox.ItemIndicator>
