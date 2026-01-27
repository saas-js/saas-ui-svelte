<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
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
	import {
		colours,
		segmentGroupSizes,
		orientations,
		commonArgTypes,
		getControls,
	} from "../utils";

	const { Story } = defineMeta({
		title: "components/Segment Group",
		component: SegmentGroup.Root,
		argTypes: {
			value: {
				control: "text",
				description: "The controlled value of the segment group.",
			},
			size: {
				...commonArgTypes.size,
				options: segmentGroupSizes,
			},
			colour: {
				...commonArgTypes.colour,
				options: colours,
				table: { defaultValue: { summary: "gray" } },
			},
			orientation: {
				control: "select",
				options: orientations,
				description: "Layout orientation of the segment group.",
				table: { defaultValue: { summary: "horizontal" } },
			},
			disabled: commonArgTypes.disabled,
			class: commonArgTypes.class,
			children: commonArgTypes.children,
		},
		parameters: {
			controls: getControls([
				"value",
				"size",
				"colour",
				"orientation",
				"disabled",
				"class",
				"children",
			]),
		},
		args: {
			size: "md",
			colour: "gray",
		},
	});

	const items = ["React", "Vue", "Svelte"];
	const views = [
		{ value: "table", label: "Table", icon: Table },
		{ value: "board", label: "Board", icon: GridFour },
		{ value: "list", label: "List", icon: List },
	];
</script>

<script lang="ts">
	let controlledValue = $state("React");
</script>

{#snippet basicStory(args: any)}
	<SegmentGroup.Root {...args} defaultValue="React">
		<SegmentGroup.Indicator />
		{#each items as item}
			<SegmentGroup.Item value={item} label={item} />
		{/each}
	</SegmentGroup.Root>
{/snippet}

{#snippet sizesStory()}
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
{/snippet}

{#snippet controlledStory()}
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
{/snippet}

{#snippet coloursStory()}
	<VStack gap={4}>
		{#each colours as colour}
			<HStack gap={4} align="center">
				<Text size="xs" class="w-16 text-fg-muted">{colour}</Text>
				<SegmentGroup.Root {colour} defaultValue="React">
					<SegmentGroup.Indicator />
					{#each items as item}
						<SegmentGroup.Item value={item} label={item} />
					{/each}
				</SegmentGroup.Root>
			</HStack>
		{/each}
	</VStack>
{/snippet}

{#snippet disabledStory()}
	<SegmentGroup.Root defaultValue="React" disabled>
		<SegmentGroup.Indicator />
		{#each items as item}
			<SegmentGroup.Item value={item} label={item} />
		{/each}
	</SegmentGroup.Root>
{/snippet}

{#snippet disabledItemStory()}
	<SegmentGroup.Root defaultValue="React">
		<SegmentGroup.Indicator />
		<SegmentGroup.Item value="React" label="React" />
		<SegmentGroup.Item value="Vue" label="Vue" disabled />
		<SegmentGroup.Item value="Svelte" label="Svelte" />
	</SegmentGroup.Root>
{/snippet}

{#snippet withIconStory()}
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
{/snippet}

{#snippet iconOnlyStory()}
	<SegmentGroup.Root defaultValue="table">
		<SegmentGroup.Indicator />
		{#each views as item}
			<SegmentGroup.Item value={item.value} aria-label={item.label}>
				<Icon as={item.icon} size="sm" aria-hidden="true" />
			</SegmentGroup.Item>
		{/each}
	</SegmentGroup.Root>
{/snippet}

{#snippet cardStory()}
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
		<Card.Footer class="justify-between mt-3">
			<Button variant="outline">Reset</Button>
			<Button>
				<Icon as={MagnifyingGlass} size="sm" />
				20 results
			</Button>
		</Card.Footer>
	</Card.Root>
{/snippet}

<Story name="Basic" template={basicStory} />
<Story name="Sizes" template={sizesStory} />
<Story name="Controlled" template={controlledStory} />
<Story name="Colours" template={coloursStory} />
<Story name="Disabled" template={disabledStory} />
<Story name="Disabled Item" template={disabledItemStory} />
<Story name="With Icon" template={withIconStory} />
<Story name="Icon Only" template={iconOnlyStory} />
<Story name="Card" template={cardStory} />
