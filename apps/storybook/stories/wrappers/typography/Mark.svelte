<script lang="ts" module>
	// Wrapper components for complex Mark stories
	// These are imported by Mark.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { Mark } from "$saas/typography/mark";
	import { Text } from "$saas/typography/text";
	import { DataList } from "$saas/components/data-list";

	const markVariants = ["subtle", "solid", "text", "plain"] as const;

	interface Props {
		story: "basic" | "variants";
	}

	let { story }: Props = $props();
</script>

{#if story === "basic"}
	<Text>
		The <Mark>design system</Mark> is a collection of UI elements
	</Text>
{:else if story === "variants"}
	<DataList.Root orientation="vertical">
		{#each markVariants as variant}
			<DataList.Item>
				<DataList.ItemLabel>{variant}</DataList.ItemLabel>
				<DataList.ItemValue>
					<Text>
						The <Mark {variant} colour="indigo">design system</Mark>
						is a collection of UI elements
					</Text>
				</DataList.ItemValue>
			</DataList.Item>
		{/each}
	</DataList.Root>
{/if}
