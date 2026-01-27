<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Bleed } from "$saas/layout/bleed";
	import { DecorativeBox, Stack } from "$saas/layout/stack";
	import { commonArgTypes, getControls } from "../utils";

	const { Story } = defineMeta({
		title: "layout/Bleed",
		component: Bleed,
		argTypes: {
			inline: {
				control: "number",
				description: "The negative margin on the x-axis.",
			},
			block: {
				control: "number",
				description: "The negative margin on the y-axis.",
			},
			inlineStart: {
				control: "number",
				description: "The negative margin on the inline-start axis.",
			},
			inlineEnd: {
				control: "number",
				description: "The negative margin on the inline-end axis.",
			},
			blockStart: {
				control: "number",
				description: "The negative margin on the block-start axis.",
			},
			blockEnd: {
				control: "number",
				description: "The negative margin on the block-end axis.",
			},
			children: commonArgTypes.children,
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls(["inline", "block", "inlineStart", "inlineEnd", "blockStart", "blockEnd", "children", "class"]),
		},
		args: {
			inline: 8,
		},
	});
</script>

{#snippet basicStory(args: any)}
	<div class="p-8 rounded-sm border border-border-default">
		<Bleed {...args}>
			<DecorativeBox class="h-16">Bleed</DecorativeBox>
		</Bleed>
	</div>
{/snippet}

{#snippet directionStory()}
	<Stack gap={4}>
		<div class="p-8 rounded-sm border border-border-default">
			<Bleed inlineStart={8}>
				<DecorativeBox class="h-8">inlineStart</DecorativeBox>
			</Bleed>
		</div>

		<div class="p-8 rounded-sm border border-border-default">
			<Bleed inlineEnd={8}>
				<DecorativeBox class="h-8">inlineEnd</DecorativeBox>
			</Bleed>
		</div>

		<div class="p-8 rounded-sm border border-border-default">
			<Bleed blockStart={8}>
				<DecorativeBox class="h-8">blockStart</DecorativeBox>
			</Bleed>
		</div>

		<div class="p-8 rounded-sm border border-border-default">
			<Bleed blockEnd={8}>
				<DecorativeBox class="h-8">blockEnd</DecorativeBox>
			</Bleed>
		</div>
	</Stack>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Direction" template={directionStory} />
