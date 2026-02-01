<script lang="ts">
import { Dialog } from "@ark-ui/svelte/dialog";
import type { Snippet } from "svelte";
import { twMerge } from "tailwind-merge";
import { tv } from "tailwind-variants";

const dialogTitle = tv({
	base: ["text-base", "font-semibold", "leading-6", "antialiased"],
});

interface Props {
	children: Snippet;
	class?: string;
	[key: string]: any;
}

let { children, class: className, ...rest }: Props = $props();
</script>

<Dialog.Title class={twMerge(dialogTitle(), className as string)} {...rest}>
	{@render children()}
</Dialog.Title>
