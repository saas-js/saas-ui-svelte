<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Input } from "$saas/components/input";
	import { Group } from "$saas/layout/group";
	import { Stack, HStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import { Kbd } from "$saas/components/kbd";
	import User from "phosphor-svelte/lib/User";
	import MagnifyingGlass from "phosphor-svelte/lib/MagnifyingGlass";
	import {
		commonArgTypes,
		getControls,
		inputVariants,
		inputSizes,
		colours,
	} from "../utils";

	const { Story } = defineMeta({
		title: "components/Input",
		component: Input,
		parameters: {
			controls: getControls([
				"variant",
				"size",
				"colour",
				"invalid",
				"disabled",
				"placeholder",
				"class",
			]),
		},
		argTypes: {
			variant: {
				...commonArgTypes.variant,
				options: inputVariants,
			},
			size: {
				...commonArgTypes.size,
				options: inputSizes,
			},
			colour: {
				...commonArgTypes.colour,
				options: colours,
			},
			invalid: commonArgTypes.invalid,
			disabled: commonArgTypes.disabled,
			placeholder: {
				control: "text",
			},
			class: commonArgTypes.class,
		},
		args: {
			placeholder: "Enter text...",
			variant: "outline",
			size: "md",
			colour: "gray",
		},
	});
</script>

{#snippet variantsStory()}
	<Stack gap={4} class="max-w-md">
		{#each inputVariants as variant}
			<HStack align="center" gap={4}>
				<Text size="xs" class="min-w-[8ch]">{variant}</Text>
				<Input {variant} placeholder="Placeholder" class="flex-1" />
			</HStack>
		{/each}
	</Stack>
{/snippet}

{#snippet sizesStory()}
	<Stack gap={4} class="max-w-md">
		{#each inputSizes as size}
			<HStack align="center" gap={4}>
				<Text size="xs" class="min-w-[3ch]">{size}</Text>
				<Input {size} placeholder="Placeholder" class="flex-1" />
			</HStack>
		{/each}
	</Stack>
{/snippet}

{#snippet leftElementStory()}
	<HStack gap={4} class="w-full">
		<Input.Group class="flex-1">
			<Input.Element placement="left">
				<User class="size-3.5" aria-hidden="true" />
			</Input.Element>
			<Input placeholder="Username" class="pl-8" />
		</Input.Group>

		<Input.Group class="flex-1">
			<Input.Element placement="left">https://</Input.Element>
			<Input placeholder="yoursite.com" class="pl-16" />
		</Input.Group>
	</HStack>
{/snippet}

{#snippet leftAndRightElementStory()}
	<HStack gap={4} class="w-full">
		<Input.Group class="flex-1">
			<Input.Element placement="left">
				<MagnifyingGlass class="size-3.5" aria-hidden="true" />
			</Input.Element>
			<Input placeholder="Search contacts" class="px-8" />
			<Input.Element placement="right" class="pointer-events-auto">
				<Kbd>⌘K</Kbd>
			</Input.Element>
		</Input.Group>

		<Input.Group class="flex-1">
			<Input.Element placement="left">https://</Input.Element>
			<Input placeholder="yoursite.com" class="pl-16" />
		</Input.Group>
	</HStack>
{/snippet}

{#snippet withAddonsStory()}
	<Stack gap={4} class="max-w-sm">
		<Group attached>
			<Input.Addon>https://</Input.Addon>
			<Input placeholder="website.com" class="-ml-px focus-visible:z-1" />
		</Group>

		<Group attached>
			<Input placeholder="jdoe" class="-mr-px focus-visible:z-1" />
			<Input.Addon>@gmail.com</Input.Addon>
		</Group>
	</Stack>
{/snippet}

{#snippet disabledStory()}
	<Stack class="max-w-sm">
		<Input disabled placeholder="Disabled input" />
	</Stack>
{/snippet}

{#snippet coloursStory()}
	<Stack gap={4} class="max-w-sm">
		{#each colours as colour}
			<HStack align="center" gap={4}>
				<Text size="xs" class="min-w-[8ch] capitalize">{colour}</Text>
				<Input
					{colour}
					placeholder="Focus to see {colour} ring"
					class="flex-1"
				/>
			</HStack>
		{/each}
	</Stack>
{/snippet}

{#snippet inputWithPlaceholderStyleStory()}
	<Stack class="max-w-sm">
		<Input
			colour="teal"
			placeholder="custom placeholder"
			class="text-(--c-fg) placeholder:text-inherit"
		/>
	</Stack>
{/snippet}

{#snippet basicStory(args: any)}
	<Input {...args} />
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Variants" template={variantsStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="Left Element" template={leftElementStory} />

<Story name="Left And Right Element" template={leftAndRightElementStory} />

<Story name="With Addons" template={withAddonsStory} />

<Story name="Disabled" template={disabledStory} />

<Story name="Colours" template={coloursStory} />

<Story
	name="Input With Placeholder Style"
	template={inputWithPlaceholderStyleStory}
/>
