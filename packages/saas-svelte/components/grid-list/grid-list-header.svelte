<script module lang="ts">
	import { twMerge } from "tailwind-merge";
</script>

<script lang="ts">
	import type { Snippet } from "svelte";
	import type { HTMLAttributes } from "svelte/elements";
	import { Text } from "$saas/typography/text";
	import { Flex } from "$saas/layout/flex";
	import { Box } from "$saas/layout/box";

	interface Props extends HTMLAttributes<HTMLDivElement> {
		/**
		 * The content to render inside the header.
		 */
		children: Snippet;
		/**
		 * Additional CSS classes to apply.
		 */
		class?: string;
	}

	let { children, class: className }: Props = $props();

	const baseStyles = "sticky px-3 py-1 text-fg-muted";
</script>

<Box as="div" role="row">
	<Text
		as="div"
		role="columnheader"
		size="sm"
		weight="medium"
		class={twMerge(baseStyles, className)}
	>
		<Flex>
			{@render children()}
		</Flex>
	</Text>
</Box>
