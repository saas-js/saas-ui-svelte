<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Flex } from "$saas/layout/flex";
	import { DecorativeBox } from "$saas/layout/stack";
	import { commonArgTypes, getControls, flexDirections, flexAlignOptions, flexJustifyOptions, flexWrapOptions } from "../utils";

	const { Story } = defineMeta({
		title: "layout/Flex",
		component: Flex,
		argTypes: {
			direction: {
				control: "select",
				options: flexDirections,
				description: "The flex direction.",
				table: { defaultValue: { summary: "row" } },
			},
			align: {
				control: "select",
				options: flexAlignOptions,
				description: "Shorthand for alignItems.",
			},
			justify: {
				control: "select",
				options: flexJustifyOptions,
				description: "Shorthand for justifyContent.",
			},
			wrap: {
				control: "select",
				options: flexWrapOptions,
				description: "Shorthand for flexWrap.",
			},
			gap: {
				control: "number",
				description: "The gap between children.",
			},
			children: commonArgTypes.children,
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls(["direction", "align", "justify", "wrap", "gap", "children", "class"]),
		},
		args: {
			gap: 4,
		},
	});
</script>

{#snippet basicStory(args: any)}
	<Flex {...args}>
		<DecorativeBox class="h-10 flex-1" />
		<DecorativeBox class="h-10 flex-1" />
		<DecorativeBox class="h-10 flex-1" />
	</Flex>
{/snippet}

{#snippet directionStory()}
	<Flex gap={4} direction="column">
		<DecorativeBox class="h-10" />
		<DecorativeBox class="h-10" />
		<DecorativeBox class="h-10" />
	</Flex>
{/snippet}

{#snippet justifyStory()}
	<Flex direction="column" gap={4}>
		<Flex justify="start">
			<DecorativeBox class="h-10 w-32" />
			<DecorativeBox class="h-10 w-32">flex-start</DecorativeBox>
			<DecorativeBox class="h-10 w-32" />
		</Flex>

		<Flex justify="center">
			<DecorativeBox class="h-10 w-32" />
			<DecorativeBox class="h-10 w-32">center</DecorativeBox>
			<DecorativeBox class="h-10 w-32" />
		</Flex>

		<Flex justify="end">
			<DecorativeBox class="h-10 w-32" />
			<DecorativeBox class="h-10 w-32">flex-end</DecorativeBox>
			<DecorativeBox class="h-10 w-32" />
		</Flex>

		<Flex justify="between">
			<DecorativeBox class="h-10 w-32" />
			<DecorativeBox class="h-10 w-32">space-between</DecorativeBox>
			<DecorativeBox class="h-10 w-32" />
		</Flex>
	</Flex>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Direction" template={directionStory} />

<Story name="Justify" template={justifyStory} />
