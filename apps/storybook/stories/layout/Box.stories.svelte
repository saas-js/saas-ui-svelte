<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Box } from "$saas/layout/box";
	import { HStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import { Badge } from "$saas/components/badge";
	import { Icon } from "$saas/components/icon";
	import Star from "phosphor-svelte/lib/Star";
	import { commonArgTypes, getControls } from "../utils";

	const { Story } = defineMeta({
		title: "layout/Box",
		component: Box,
		argTypes: {
			as: {
				control: "text",
				description: "The HTML element to render.",
				table: { defaultValue: { summary: "div" } },
			},
			children: commonArgTypes.children,
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls(["as", "children", "class"]),
		},
		args: {
			as: "div",
		},
	});
</script>

{#snippet basicStory(args: any)}
	<Box {...args} class="bg-(--colors-red-solid) w-full p-4 text-fg-inverted"
		>This is the Box</Box
	>
{/snippet}

{#snippet shorthandStory()}
	<Box
		class="bg-(--colors-orange-solid) w-full p-4 text-(--colors-orange-contrast) rounded-lg"
	>
		This is the Box with shorthand classes
	</Box>
{/snippet}

{#snippet borderStory()}
	<Box class="p-4 border border-border-default text-fg-muted rounded-md">
		Box with border
	</Box>
{/snippet}

{#snippet asPropStory()}
	<Box as="section" class="text-fg-default p-4 bg-bg-subtle rounded-md">
		This is a Box rendered as a section
	</Box>
{/snippet}

{#snippet shadowStory()}
	<Box class="bg-bg-default shadow-md rounded-md p-4">Box with shadow</Box>
{/snippet}

{#snippet compositionStory()}
	<Box
		class="max-w-sm border border-border-default rounded-lg overflow-hidden"
	>
		<img
			src="https://bit.ly/2Z4KKcF"
			alt="Rear view of modern home with pool"
			class="w-full h-48 object-cover"
		/>
		<Box class="p-4 space-y-2">
			<HStack>
				<Badge colour="teal" variant="solid">Superhost</Badge>
				<HStack gap={1} class="font-medium">
					<Icon as={Star} colour="orange" weight="fill" size="sm" />
					<Text>4.5 (34)</Text>
				</HStack>
			</HStack>
			<Text weight="medium">
				Modern home in city center in the heart of historic Los Angeles
			</Text>
			<Text class="text-fg-muted">$435 • 3 beds</Text>
		</Box>
	</Box>
{/snippet}

{#snippet nestedStory()}
	<Box class="p-4 bg-bg-subtle rounded-lg">
		<Box class="p-4 bg-bg-default rounded-md shadow-sm">
			<Box class="p-4 bg-bg-emphasized rounded">Nested boxes</Box>
		</Box>
	</Box>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Shorthand" template={shorthandStory} />

<Story name="Border" template={borderStory} />

<Story name="As Prop" template={asPropStory} />

<Story name="Shadow" template={shadowStory} />

<Story name="Composition" template={compositionStory} />

<Story name="Nested" template={nestedStory} />
