<script lang="ts">
	import { getContext, type Snippet } from "svelte";
	import { twMerge } from "tailwind-merge";
	import { Flex } from "$saas/layout/flex";
	import { POPOVER_CTX, type PopoverContext } from "./popover-root.svelte";

	interface Props {
		/**
		 * The footer content.
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

<Flex
	align="center"
	class={twMerge(ctx?.styles?.footer() ?? "", className as string)}
	{...rest}
>
	{@render children()}
</Flex>
