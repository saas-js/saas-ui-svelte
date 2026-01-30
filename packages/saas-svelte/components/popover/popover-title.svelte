<script lang="ts">
import { Popover } from "@ark-ui/svelte/popover";
import { getContext, type Snippet } from "svelte";
import { POPOVER_CTX, type PopoverContext } from "./popover-root.svelte";

interface Props {
	/**
	 * The title content.
	 */
	children: Snippet;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
	[key: string]: unknown;
}

let { children, class: className, ...rest }: Props = $props();

const ctx = getContext<PopoverContext>(POPOVER_CTX);
</script>

<Popover.Title class={ctx?.styles?.title({ class: className })} {...rest}>
	{@render children()}
</Popover.Title>
