<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Spinner } from "$saas/components/spinner";
	import { VStack, HStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import {
		colours,
		commonArgTypes,
		getControls,
		spinnerSizes,
	} from "../utils";

	const { Story } = defineMeta({
		title: "components/Spinner",
		component: Spinner,
		argTypes: {
			size: {
				control: "select",
				options: spinnerSizes,
				description: "The size of the spinner.",
				table: { defaultValue: { summary: "md" } },
			},
			colour: commonArgTypes.colour,
			label: {
				control: "text",
				description: "Accessible label for screen readers.",
				table: { defaultValue: { summary: "Loading" } },
			},
			animationDuration: {
				control: "text",
				description: "The animation duration.",
				table: { defaultValue: { summary: "0.5s" } },
			},
			borderWidth: {
				control: "text",
				description: "The border width (thickness) of the spinner.",
				table: { defaultValue: { summary: "2px" } },
			},
			trackColour: {
				...commonArgTypes.colour,
				description: "The track colour palette of the spinner.",
			},
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls([
				"size",
				"colour",
				"label",
				"animationDuration",
				"borderWidth",
				"trackColour",
				"class",
			]),
		},
		args: {
			size: "md",
			colour: "gray",
		},
	});
</script>

{#snippet basicStory(args: any)}
	<Spinner {...args} />
{/snippet}

{#snippet sizesStory()}
	<HStack align="start" gap={4} class="flex-wrap">
		{#each spinnerSizes as size}
			<VStack gap={2} class="items-center">
				<Text size="xs">{size}</Text>
				<Spinner {size} />
			</VStack>
		{/each}
	</HStack>
{/snippet}

{#snippet coloursStory()}
	<VStack gap={4}>
		{#each colours as colour}
			<HStack gap={4} class="items-center">
				<Text size="xs" class="w-16">{colour}</Text>
				<Spinner size="sm" {colour} />
				<Spinner size="md" {colour} />
				<Spinner size="lg" {colour} />
			</HStack>
		{/each}
	</VStack>
{/snippet}

{#snippet trackColourStory()}
	<HStack gap={4}>
		<Spinner colour="red" trackColour="gray" />
		<Spinner colour="blue" trackColour="gray" />
		<Spinner colour="green" trackColour="gray" />
	</HStack>
{/snippet}

{#snippet customSpeedStory()}
	<HStack align="start" gap={4} class="flex-wrap">
		<VStack gap={2} class="items-center">
			<Text size="xs">0.3s</Text>
			<Spinner colour="blue" animationDuration="0.3s" />
		</VStack>
		<VStack gap={2} class="items-center">
			<Text size="xs">0.5s</Text>
			<Spinner colour="blue" animationDuration="0.5s" />
		</VStack>
		<VStack gap={2} class="items-center">
			<Text size="xs">0.8s</Text>
			<Spinner colour="blue" animationDuration="0.8s" />
		</VStack>
		<VStack gap={2} class="items-center">
			<Text size="xs">1.2s</Text>
			<Spinner colour="blue" animationDuration="1.2s" />
		</VStack>
	</HStack>
{/snippet}

{#snippet thicknessStory()}
	<HStack align="start" gap={4} class="flex-wrap">
		<VStack gap={2} class="items-center">
			<Text size="xs">1px</Text>
			<Spinner colour="blue" size="lg" borderWidth="1px" />
		</VStack>
		<VStack gap={2} class="items-center">
			<Text size="xs">2px</Text>
			<Spinner colour="blue" size="lg" borderWidth="2px" />
		</VStack>
		<VStack gap={2} class="items-center">
			<Text size="xs">3px</Text>
			<Spinner colour="blue" size="lg" borderWidth="3px" />
		</VStack>
		<VStack gap={2} class="items-center">
			<Text size="xs">4px</Text>
			<Spinner colour="blue" size="lg" borderWidth="4px" />
		</VStack>
	</HStack>
{/snippet}

{#snippet withLabelStory()}
	<VStack gap={2} class="items-center">
		<Spinner colour="teal" />
		<Text size="sm" class="text-teal-fg">Loading...</Text>
	</VStack>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="Colours" template={coloursStory} />

<Story name="Track Colour" template={trackColourStory} />

<Story name="Custom Speed" template={customSpeedStory} />

<Story name="Thickness" template={thicknessStory} />

<Story name="With Label" template={withLabelStory} />
