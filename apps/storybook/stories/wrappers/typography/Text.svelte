<script lang="ts" module>
	// Wrapper components for complex Text stories
	// These are imported by Text.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { Text } from "$saas/typography/text";
	import { DataList } from "$saas/components/data-list";

	const textSizes = [
		"xs",
		"sm",
		"md",
		"lg",
		"xl",
		"2xl",
		"3xl",
		"4xl",
		"5xl",
		"6xl",
		"7xl",
	] as const;
	const textWeights = ["light", "normal", "medium", "semibold", "bold"] as const;

	interface Props {
		story: "basic" | "sizes" | "weights" | "truncation" | "lineClamp";
	}

	let { story }: Props = $props();
</script>

{#if story === "basic"}
	<Text>Sphinx of black quartz, judge my vow.</Text>
{:else if story === "sizes"}
	<DataList.Root orientation="vertical">
		{#each textSizes as size}
			<DataList.Item>
				<DataList.ItemLabel>{size}</DataList.ItemLabel>
				<DataList.ItemValue>
					<Text {size}>Chakra</Text>
				</DataList.ItemValue>
			</DataList.Item>
		{/each}
	</DataList.Root>
{:else if story === "weights"}
	<DataList.Root orientation="vertical">
		{#each textWeights as w}
			<DataList.Item>
				<DataList.ItemLabel>{w}</DataList.ItemLabel>
				<DataList.ItemValue>
					<Text weight={w}>Sphinx of black quartz, judge my vow.</Text>
				</DataList.ItemValue>
			</DataList.Item>
		{/each}
	</DataList.Root>
{:else if story === "truncation"}
	<div class="flex max-w-[300px]">
		<Text truncate>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit.
		</Text>
	</div>
{:else if story === "lineClamp"}
	<div class="flex max-w-[300px]">
		<Text lineClamp="2">
			Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
			eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
			ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
			aliquip ex ea commodo consequat.
		</Text>
	</div>
{/if}
