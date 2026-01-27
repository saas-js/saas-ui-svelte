<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Button } from "$saas/components/button";
	import { Icon } from "$saas/components/icon";
	import { Text } from "$saas/typography/text";
	import { HStack, VStack } from "$saas/layout/stack";
	import Heart from "phosphor-svelte/lib/Heart";
	import Envelope from "phosphor-svelte/lib/Envelope";
	import ArrowRight from "phosphor-svelte/lib/ArrowRight";
	import CaretDown from "phosphor-svelte/lib/CaretDown";
	import {
		colours,
		buttonSizes,
		buttonVariants,
		commonArgTypes,
		getControls,
	} from "../utils";

	const { Story } = defineMeta({
		title: "components/Button",
		component: Button,
		argTypes: {
			variant: {
				...commonArgTypes.variant,
				options: buttonVariants,
			},
			size: {
				...commonArgTypes.size,
				options: buttonSizes,
			},
			colour: {
				...commonArgTypes.colour,
				options: colours,
			},
			loading: {
				control: "boolean",
				description: "Whether the button is in a loading state.",
				table: { defaultValue: { summary: "false" } },
			},
			loadingText: {
				control: "text",
				description: "Text to display when localing.",
			},
			icon: commonArgTypes.icon,
			children: commonArgTypes.children,
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls([
				"variant",
				"size",
				"colour",
				"loading",
				"loadingText",
				"icon",
				"children",
				"class",
			]),
		},
		args: {
			variant: "surface",
			size: "md",
			colour: "gray",
		},
	});
</script>

{#snippet basicStory(args: any)}
	<Button {...args}>Button</Button>
{/snippet}

{#snippet sizesStory()}
	<HStack align="start" gap={4} class="flex-wrap">
		{#each buttonSizes as size}
			<VStack gap={2} class="items-center">
				<Text size="xs">{size}</Text>
				<Button {size}>Button ({size})</Button>
			</VStack>
		{/each}
	</HStack>
{/snippet}

{#snippet buttonVariantsStory()}
	<HStack align="start" gap={4} class="flex-wrap p-4">
		{#each buttonVariants as variant}
			<VStack gap={2} class="items-center">
				<Text size="xs">{variant}</Text>
				<Button {variant}>{variant}</Button>
			</VStack>
		{/each}
	</HStack>
{/snippet}

{#snippet iconsStory()}
	<HStack gap={4} class="flex-wrap">
		<Button colour="teal" variant="solid">
			<Icon as={Envelope} class="size-4" aria-hidden="true" />
			Mail
		</Button>

		<Button colour="teal" variant="outline">
			Call us
			<Icon as={ArrowRight} class="size-4" aria-hidden="true" />
		</Button>
	</HStack>

	<br />

	<VStack align="start" gap={4}>
		{#each buttonSizes as size}
			<Button colour="rose" variant="solid" {size} icon aria-label="Like">
				<Icon as={Heart} aria-hidden="true" />
			</Button>
		{/each}
	</VStack>
{/snippet}

{#snippet loadingStory()}
	<HStack gap={4} class="flex-wrap">
		<Button loading>Click me</Button>
		<Button loading loadingText="Saving...">Click me</Button>
	</HStack>
{/snippet}

{#snippet coloursStory()}
	<VStack gap={4}>
		{#each colours as colour}
			<HStack gap={4}>
				<Text size="xs" class="w-16">{colour}</Text>
				<Button variant="glass" {colour}>Glass</Button>
				<Button variant="solid" {colour}>Solid</Button>
				<Button variant="subtle" {colour}>Subtle</Button>
				<Button variant="surface" {colour}>Surface</Button>
				<Button variant="outline" {colour}>Outline</Button>
			</HStack>
		{/each}
	</VStack>
{/snippet}

{#snippet groupStory()}
	<Button.Group>
		<Button variant="outline" size="sm">Button</Button>
		<Button variant="outline" size="sm" icon aria-label="More options">
			<Icon as={CaretDown} aria-hidden="true" />
		</Button>
	</Button.Group>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="Variants" template={buttonVariantsStory} />

<Story name="With Icon" template={iconsStory} />

<Story name="Colours" template={coloursStory} />

<Story name="Loading" template={loadingStory} />

<Story name="Group" template={groupStory} />
