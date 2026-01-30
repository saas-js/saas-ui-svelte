<script lang="ts">
import { Combobox } from "@ark-ui/svelte/combobox";
import { getContext } from "svelte";
import { twMerge } from "tailwind-merge";
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
	class={twMerge(ctx?.styles?.clearTrigger() ?? "", className as string)}
	{...rest}
>
	<XIcon />
</Combobox.ClearTrigger>
