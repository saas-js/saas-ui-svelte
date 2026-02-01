<script lang="ts">
import { Dialog } from "@ark-ui/svelte/dialog";
import type { Snippet } from "svelte";
import { tv } from "tailwind-variants";
import { twMerge } from "tailwind-merge";

const drawerTitle = tv({
	base: ["text-base", "font-semibold", "leading-6", "antialiased"],
});

interface Props {
	/**
	 * The title content.
	 */
	children: Snippet;
	/**
	 * Additional CSS classes to apply.
	 */
	class?: string;
	[key: string]: any;
}

let { children, class: className, ...rest }: Props = $props();
</script>

<Dialog.Title class={twMerge(drawerTitle(), className as string)} {...rest}>
	{@render children()}
</Dialog.Title>
