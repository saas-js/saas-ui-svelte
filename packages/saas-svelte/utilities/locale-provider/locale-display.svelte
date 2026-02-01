<script lang="ts">
	import { getLocaleContext } from "$saas/utilities/locale-provider";
	import { VStack } from "$saas/layout/stack";
	import { Box } from "$saas/layout/box";
	import type { Snippet } from "svelte";

	interface Props {
		/**
		 * Additional content to render below the locale display.
		 */
		children?: Snippet;
	}

	let { children }: Props = $props();

	const context = getLocaleContext();
	const displayData = $derived({
		locale: context?.locale || "en-US",
		dir: context?.dir || "ltr",
	});
</script>

<VStack gap={2}>
	<Box as="pre" class="bg-bg-subtle leading-sm rounded p-4 font-mono text-sm"
		>{JSON.stringify(displayData, null, 2)}</Box
	>
	{@render children?.()}
</VStack>
