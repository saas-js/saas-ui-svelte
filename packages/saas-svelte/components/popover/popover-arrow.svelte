<script lang="ts">
import { Popover } from "@ark-ui/svelte/popover";
import { getContext } from "svelte";
import { POPOVER_CTX, type PopoverContext } from "./popover-root.svelte";

interface Props {
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
	[key: string]: unknown;
}

let { class: className, ...rest }: Props = $props();

const ctx = getContext<PopoverContext>(POPOVER_CTX);
</script>

<Popover.Arrow class={ctx?.styles?.arrow({ class: className })} {...rest}>
	<Popover.ArrowTip class={ctx?.styles?.arrowTip()} />
</Popover.Arrow>
