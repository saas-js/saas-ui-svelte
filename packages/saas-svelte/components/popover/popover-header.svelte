<script lang="ts">
import { getContext, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";
import { POPOVER_CTX, type PopoverContext } from "./popover-root.svelte";

interface Props {
	/**
	 * The header content.
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

<div class={twMerge(ctx?.styles?.header() ?? "", className as string)} {...rest}>
	{@render children()}
</div>
