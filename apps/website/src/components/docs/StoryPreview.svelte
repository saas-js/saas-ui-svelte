<script lang="ts">
	import { Card } from "@saas-ui/svelte/components/card";
	import { Button } from "@saas-ui/svelte/components/button";
	import { Text } from "@saas-ui/svelte/typography/text";
	import { Code } from "@saas-ui/svelte/typography/code";
	import { Box } from "@saas-ui/svelte/layout/box";

	interface Props {
		/** The story name to pass to the wrapper */
		story: string;
		/** Optional code snippet to display */
		code?: string;
		/** Children slot for the actual rendered component */
		children?: import("svelte").Snippet;
	}

	let { story, code, children }: Props = $props();

	let showCode = $state(false);
</script>

<Card.Root class="my-6 overflow-hidden story-preview">
	<Card.Body class="p-6 bg-bg-default">
		{@render children?.()}
	</Card.Body>

	{#if code}
		<Box class="border-t border-border-default">
			<Button
				variant="ghost"
				size="sm"
				onclick={() => (showCode = !showCode)}
				class="justify-start w-full px-4 py-2 rounded-none"
			>
				<Text size="sm" class="text-fg-muted">{showCode ? "Hide" : "Show"} code</Text>
			</Button>

			{#if showCode}
				<Box class="p-4 overflow-x-auto border-t border-border-default bg-bg-subtle">
					<Code size="sm">{code}</Code>
				</Box>
			{/if}
		</Box>
	{/if}
</Card.Root>

<style>
	:global(.story-preview) {
		container-type: inline-size;
	}
</style>
