<script lang="ts">
	import { getContext, type Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { Box } from "$saas/layout/box";
	import { POPOVER_CTX, type PopoverContext } from "./popover-root.svelte";

	interface Props {
		/**
		 * The body content.
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

<Box class={twMerge(ctx?.styles?.body() ?? "", className as string)} {...rest}>
	{@render children()}
</Box>
