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

<Card.Root class="story-preview my-6 overflow-hidden">
	<Card.Body class="bg-bg-default p-6">
		{@render children?.()}
	</Card.Body>

	{#if code}
		<Box class="border-border-default border-t">
			<Button
				variant="ghost"
				size="sm"
				onclick={() => (showCode = !showCode)}
				class="w-full justify-start rounded-none px-4 py-2"
			>
				<Text size="sm" class="text-fg-muted"
					>{showCode ? "Hide" : "Show"} code</Text
				>
			</Button>

			{#if showCode}
				<Box
					class="border-border-default bg-bg-subtle overflow-x-auto border-t p-4"
				>
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
