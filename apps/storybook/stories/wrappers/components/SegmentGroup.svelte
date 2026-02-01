<script lang="ts" module>
	// Wrapper components for complex SegmentGroup stories
	// These are imported by SegmentGroup.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { SegmentGroup } from "$saas/components/segment-group";
	import { HStack, VStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import { Heading } from "$saas/typography/heading";
	import { Icon } from "$saas/components/icon";
	import { Card } from "$saas/components/card";
	import { Button } from "$saas/components/button";
	import { Field } from "$saas/components/field";
	import Table from "phosphor-svelte/lib/Table";
	import GridFour from "phosphor-svelte/lib/GridFour";
	import List from "phosphor-svelte/lib/List";
	import MagnifyingGlass from "phosphor-svelte/lib/MagnifyingGlass";
	import { colours, segmentGroupSizes } from "../../utils";

	const items = ["React", "Vue", "Svelte"];
	const views = [
		{ value: "table", label: "Table", icon: Table },
		{ value: "board", label: "Board", icon: GridFour },
		{ value: "list", label: "List", icon: List },
	];

	interface Props {
		story:
			| "basic"
			| "sizes"
			| "controlled"
			| "colours"
			| "disabled"
			| "disabledItem"
			| "withIcon"
			| "iconOnly"
			| "card";
	}

	let { story }: Props = $props();

	let controlledValue = $state("React");
</script>

{#if story === "basic"}
	<SegmentGroup.Root defaultValue="React">
		<SegmentGroup.Indicator />
		{#each items as item}
			<SegmentGroup.Item value={item} label={item} />
		{/each}
	</SegmentGroup.Root>
{:else if story === "sizes"}
	<VStack gap={4}>
		{#each segmentGroupSizes as size}
			<VStack gap={2} align="start">
				<SegmentGroup.Root {size} defaultValue="React">
					<SegmentGroup.Indicator />
					{#each items as item}
						<SegmentGroup.Item value={item} label={item} />
					{/each}
				</SegmentGroup.Root>
				<Text size="xs" class="text-fg-muted">size = {size}</Text>
			</VStack>
		{/each}
	</VStack>
{:else if story === "controlled"}
	<VStack gap={4} align="start">
		<Text size="sm" class="text-fg-muted">
			Selected: {controlledValue}
		</Text>
		<SegmentGroup.Root
			bind:value={controlledValue}
			onValueChange={({ value }) => (controlledValue = value ?? "React")}
		>
			<SegmentGroup.Indicator />
			{#each items as item}
				<SegmentGroup.Item value={item} label={item} />
			{/each}
		</SegmentGroup.Root>
	</VStack>
{:else if story === "colours"}
	<VStack gap={4}>
		{#each colours as colour}
			<HStack gap={4} align="center">
				<Text size="xs" class="text-fg-muted w-16">{colour}</Text>
				<SegmentGroup.Root {colour} defaultValue="React">
					<SegmentGroup.Indicator />
					{#each items as item}
						<SegmentGroup.Item value={item} label={item} />
					{/each}
				</SegmentGroup.Root>
			</HStack>
		{/each}
	</VStack>
{:else if story === "disabled"}
	<SegmentGroup.Root defaultValue="React" disabled>
		<SegmentGroup.Indicator />
		{#each items as item}
			<SegmentGroup.Item value={item} label={item} />
		{/each}
	</SegmentGroup.Root>
{:else if story === "disabledItem"}
	<SegmentGroup.Root defaultValue="React">
		<SegmentGroup.Indicator />
		<SegmentGroup.Item value="React" label="React" />
		<SegmentGroup.Item value="Vue" label="Vue" disabled />
		<SegmentGroup.Item value="Svelte" label="Svelte" />
	</SegmentGroup.Root>
{:else if story === "withIcon"}
	<SegmentGroup.Root defaultValue="table">
		<SegmentGroup.Indicator />
		{#each views as item}
			<SegmentGroup.Item value={item.value}>
				<HStack gap={2}>
					<Icon as={item.icon} size="sm" />
					{item.label}
				</HStack>
			</SegmentGroup.Item>
		{/each}
	</SegmentGroup.Root>
{:else if story === "iconOnly"}
	<SegmentGroup.Root defaultValue="table">
		<SegmentGroup.Indicator />
		{#each views as item}
			<SegmentGroup.Item value={item.value} aria-label={item.label}>
				<Icon as={item.icon} size="sm" aria-hidden="true" />
			</SegmentGroup.Item>
		{/each}
	</SegmentGroup.Root>
{:else if story === "card"}
	<Card.Root class="w-80">
		<Card.Header>
			<Heading size="lg">Find your dream home</Heading>
		</Card.Header>
		<Card.Body class="gap-6">
			<Field.Root>
				<Field.Label>Bedrooms</Field.Label>
				<SegmentGroup.Root defaultValue="Any" size="sm">
					<SegmentGroup.Indicator />
					{#each ["Any", "1", "2", "3", "3+"] as item}
						<SegmentGroup.Item value={item} label={item} />
					{/each}
				</SegmentGroup.Root>
			</Field.Root>
			<Field.Root>
				<Field.Label>Beds</Field.Label>
				<SegmentGroup.Root defaultValue="1" size="sm">
					<SegmentGroup.Indicator />
					{#each ["Any", "1", "2", "2+"] as item}
						<SegmentGroup.Item value={item} label={item} />
					{/each}
				</SegmentGroup.Root>
			</Field.Root>
			<Field.Root>
				<Field.Label>Bathrooms</Field.Label>
				<SegmentGroup.Root defaultValue="3" size="sm">
					<SegmentGroup.Indicator />
					{#each ["Any", "1", "2", "3"] as item}
						<SegmentGroup.Item value={item} label={item} />
					{/each}
				</SegmentGroup.Root>
			</Field.Root>
		</Card.Body>
		<Card.Footer class="mt-3 justify-between">
			<Button variant="outline">Reset</Button>
			<Button>
				<Icon as={MagnifyingGlass} size="sm" />
				20 results
			</Button>
		</Card.Footer>
	</Card.Root>
{/if}
