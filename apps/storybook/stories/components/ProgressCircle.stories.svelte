<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import {
		ProgressCircle,
		type ProgressCircleVariants,
	} from "$saas/components/progress-circle";
	import { Text } from "$saas/typography/text";
	import { HStack, VStack } from "$saas/layout/stack";
	import { colours, sizes, commonArgTypes, getControls } from "../utils";

	type Size = NonNullable<ProgressCircleVariants["size"]>;

	const { Story } = defineMeta({
		title: "components/Progress Circle",
		component: ProgressCircle,
		argTypes: {
			value: {
				control: { type: "range", min: 0, max: 100, step: 1 },
				description:
					"The current value of the progress (0-100). Set to null for indeterminate state.",
				table: { defaultValue: { summary: "0" } },
			},
			min: {
				control: { type: "number" },
				description: "The minimum value.",
				table: { defaultValue: { summary: "0" } },
			},
			max: {
				control: { type: "number" },
				description: "The maximum value.",
				table: { defaultValue: { summary: "100" } },
			},
			size: {
				...commonArgTypes.size,
				options: sizes,
			},
			colour: {
				...commonArgTypes.colour,
				options: colours,
			},
			showValue: {
				control: "boolean",
				description: "Whether to show the value as text in the center.",
				table: { defaultValue: { summary: "false" } },
			},
			thickness: {
				control: "text",
				description:
					"Custom thickness for the stroke (overrides size default).",
			},
			rounded: {
				control: "boolean",
				description: "Whether to use rounded stroke caps.",
				table: { defaultValue: { summary: "false" } },
			},
			label: {
				control: "text",
				description: "Accessible label for the progress.",
			},
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls([
				"value",
				"min",
				"max",
				"size",
				"colour",
				"showValue",
				"thickness",
				"rounded",
				"label",
				"class",
			]),
		},
		args: {
			value: 75,
			size: "md",
			colour: "gray",
		},
	});
</script>

{#snippet basicStory(args: any)}
	<ProgressCircle {...args} />
{/snippet}

{#snippet roundedStory()}
	<HStack gap={8}>
		<ProgressCircle value={75} colour="indigo" />
		<ProgressCircle value={75} colour="indigo" rounded />
	</HStack>
{/snippet}

{#snippet sizesStory()}
	<HStack align="center" gap={8} class="flex-wrap">
		{#each sizes as size (size)}
			<VStack gap={2} class="items-center">
				<Text size="xs">{size}</Text>
				<ProgressCircle
					size={size as Size}
					value={30}
					colour="indigo"
					rounded
				/>
			</VStack>
		{/each}
	</HStack>
{/snippet}

{#snippet coloursStory()}
	<VStack gap={4}>
		{#each colours as colour}
			<HStack gap={8} class="px-4 items-center">
				<Text size="xs" class="w-16">{colour}</Text>
				<ProgressCircle size="sm" value={30} {colour} rounded />
				<ProgressCircle size="md" value={30} {colour} rounded />
				<ProgressCircle size="lg" value={30} {colour} rounded />
			</HStack>
		{/each}
	</VStack>
{/snippet}

{#snippet valueTextStory()}
	<HStack gap={8} class="items-center">
		{#each ["md", "lg", "xl"] as size (size)}
			<ProgressCircle
				size={size as Size}
				value={65}
				colour="teal"
				showValue
			/>
		{/each}
	</HStack>
{/snippet}

{#snippet thicknessStory()}
	<HStack gap={8} class="items-center">
		<ProgressCircle value={75} colour="purple" thickness="2px" />
		<ProgressCircle value={75} colour="purple" />
		<ProgressCircle value={75} colour="purple" thickness="8px" />
	</HStack>
{/snippet}

{#snippet indeterminateStory()}
	<HStack gap={8} class="items-center">
		{#each sizes as size (size)}
			<ProgressCircle size={size as Size} value={null} colour="blue" />
		{/each}
	</HStack>
{/snippet}

{#snippet valuesStory()}
	<HStack gap={6} class="items-center flex-wrap">
		{#each [0, 25, 50, 75, 100] as value}
			<VStack gap={2} class="items-center">
				<ProgressCircle
					{value}
					colour="emerald"
					showValue
					size="lg"
					rounded
				/>
			</VStack>
		{/each}
	</HStack>
{/snippet}

{#snippet rangeColorStory()}
	<HStack gap={8}>
		<ProgressCircle value={75} colour="orange" />
		<ProgressCircle value={75} colour="rose" />
		<ProgressCircle value={75} colour="cyan" />
	</HStack>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Rounded" template={roundedStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="Colours" template={coloursStory} />

<Story name="With Value Text" template={valueTextStory} />

<Story name="Custom Thickness" template={thicknessStory} />

<Story name="Indeterminate" template={indeterminateStory} />

<Story name="Values" template={valuesStory} />

<Story name="Range Colors" template={rangeColorStory} />
