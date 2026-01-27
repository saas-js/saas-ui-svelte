<script module lang="ts">
	import { Text } from "$saas/typography/text";
	import { VStack, HStack } from "$saas/layout/stack";
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Icon } from "$saas/components/icon";
	import { DataList } from "$saas/components/data-list";
	import Star from "phosphor-svelte/lib/Star";
	import Heart from "phosphor-svelte/lib/Heart";
	import {
		commonArgTypes,
		getControls,
		sizes,
		colours,
		iconWeights,
	} from "../utils";

	const { Story } = defineMeta({
		title: "components/Icon",
		component: Icon,
		argTypes: {
			as: {
				control: false,
				description:
					"The icon component to render (e.g. from phosphor-svelte or custom).",
				table: { type: { summary: "Component" } },
			},
			size: {
				...commonArgTypes.size,
				description: "The size of the icon.",
				options: [...sizes, "2xl"],
				table: {
					type: { summary: "IconSize" },
					defaultValue: { summary: "md" },
				},
			},
			weight: {
				control: "select",
				description:
					"The weight/style of the icon (for Phosphor icons).",
				options: iconWeights,
				table: {
					type: {
						summary:
							'"thin" | "light" | "regular" | "bold" | "fill" | "duotone"',
					},
					defaultValue: { summary: "regular" },
				},
			},
			mirrored: {
				control: "boolean",
				description:
					"Whether to flip the icon horizontally (for Phosphor icons).",
				table: {
					type: { summary: "boolean" },
					defaultValue: { summary: "false" },
				},
			},
			colour: {
				...commonArgTypes.colour,
				description: "The colour theme of the icon.",
				table: {
					type: { summary: "ColourName" },
					defaultValue: { summary: "currentColor" },
				},
			},
			viewBox: {
				control: "text",
				description: "The SVG viewBox attribute (for custom icons).",
				table: {
					type: { summary: "string" },
					defaultValue: { summary: "0 0 24 24" },
				},
			},
			style: {
				control: "text",
				description: "Inline CSS styles to apply to the icon.",
				table: { type: { summary: "string" } },
			},
			children: {
				...commonArgTypes.children,
				description:
					"SVG path elements for custom icons (if `as` is not provided).",
			},
			class: {
				...commonArgTypes.class,
				description: "Additional CSS classes to apply to the icon.",
			},
		},
		parameters: {
			controls: getControls([
				"as",
				"size",
				"weight",
				"mirrored",
				"colour",
				"viewBox",
				"style",
				"children",
				"class",
			]),
		},
		args: {
			size: "lg",
			weight: "fill",
			colour: "pink",
		},
	});
</script>

{#snippet basicStory(args: any)}
	<Icon as={Heart} colour="yellow" {...args} />
{/snippet}

{#snippet coloursStory(args: any)}
	<HStack gap={4} class="flex-wrap">
		{#each colours as colour}
			<VStack gap={2} class="items-center">
				<Text size="xs">{colour}</Text>
				<Icon as={Heart} {colour} weight="fill" size={args.size} />
			</VStack>
		{/each}
	</HStack>
{/snippet}

{#snippet sizesStory()}
	<HStack gap={4} class="items-end">
		{#each sizes as size}
			<VStack gap={2} class="items-center">
				<Text size="xs">{size}</Text>
				<Icon as={Star} colour="yellow" weight="fill" {size} />
			</VStack>
		{/each}
	</HStack>
{/snippet}

{#snippet weightsStory()}
	<DataList.Root>
		{#each iconWeights as weight}
			<DataList.Item>
				<DataList.ItemLabel>{weight}</DataList.ItemLabel>
				<DataList.ItemValue>
					<Icon as={Heart} colour="rose" size="xl" {weight} />
				</DataList.ItemValue>
			</DataList.Item>
		{/each}
	</DataList.Root>
{/snippet}

{#snippet customSvgStory()}
	<Icon size="xl" colour="blue" viewBox="0 0 32 32">
		<path
			fill="currentColor"
			d="M16,11.5a3,3,0,1,0-3-3A3,3,0,0,0,16,11.5Z"
		/>
		<path
			fill="currentColor"
			d="M16.868.044A8.579,8.579,0,0,0,16,0a15.99,15.99,0,0,0-.868,31.956A8.579,8.579,0,0,0,16,32,15.99,15.99,0,0,0,16.868.044ZM16,26.5a3,3,0,1,1,3-3A3,3,0,0,1,16,26.5ZM16,15A8.483,8.483,0,0,0,8.788,27.977,13.986,13.986,0,0,1,16,2a6.5,6.5,0,0,1,0,13Z"
		/>
	</Icon>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Colours" template={coloursStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="Weights" template={weightsStory} />

<Story name="Custom SVG" template={customSvgStory} />
