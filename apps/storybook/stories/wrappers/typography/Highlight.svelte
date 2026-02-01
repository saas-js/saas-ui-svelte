<script lang="ts" module>
	// Wrapper components for complex Highlight stories
	// These are imported by Highlight.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { Highlight } from "$saas/typography/highlight";
	import { Heading } from "$saas/typography/heading";
	import { Text } from "$saas/typography/text";
	import { Stack } from "$saas/layout/stack";

	interface Props {
		story:
			| "basic"
			| "multiple"
			| "customStyle"
			| "searchQuery"
			| "markClass";
	}

	let { story }: Props = $props();
</script>

{#if story === "basic"}
	<Highlight
		query="spotlight"
		text="With the Highlight component, you can spotlight words."
		variant="subtle"
		colour="orange"
	/>
{:else if story === "multiple"}
	<Heading size="lg">
		<Highlight
			query={["spotlight", "emphasise", "accentuate"]}
			text="With the Highlight component, you can spotlight, emphasise and accentuate words."
			variant="subtle"
			colour="teal"
		/>
	</Heading>
{:else if story === "customStyle"}
	<Highlight
		query="component"
		variant="text"
		text="With the Highlight component, you can spotlight words."
	/>
{:else if story === "searchQuery"}
	{@const query = "spot"}
	{@const results = ["Spotlight bulb", "Spot cleaner", "Spot ceiling"]}
	<Stack>
		<Text>Search result for: spot</Text>
		<Stack>
			{#each results as item}
				<Highlight ignoreCase {query} variant="text" text={item} />
			{/each}
		</Stack>
	</Stack>
{:else if story === "markClass"}
	<Highlight
		query="custom"
		variant="plain"
		text="Use markClass to apply custom styling to highlighted text."
		markClass="underline decoration-2 decoration-pink-500"
	/>
{/if}
