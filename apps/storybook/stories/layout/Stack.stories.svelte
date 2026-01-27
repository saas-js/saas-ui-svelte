<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import {
		Stack,
		HStack,
		VStack,
		Divider,
		DecorativeBox,
	} from "$saas/layout/stack";
	import {
		commonArgTypes,
		getControls,
		stackDirections,
		stackAlignOptions,
		stackJustifyOptions,
	} from "../utils";

	const { Story } = defineMeta({
		title: "layout/Stack",
		component: Stack,
		argTypes: {
			direction: {
				control: "select",
				options: stackDirections,
				table: { defaultValue: { summary: "column" } },
			},
			align: {
				control: "select",
				options: stackAlignOptions,
				table: { defaultValue: { summary: "stretch" } },
			},
			justify: {
				control: "select",
				options: stackJustifyOptions,
				table: { defaultValue: { summary: "start" } },
			},
			class: commonArgTypes.class,
			children: commonArgTypes.children,
		},
		parameters: {
			controls: getControls([
				"direction",
				"align",
				"justify",
				"class",
				"children",
			]),
		},
	});

	export { Stack, HStack, VStack, Divider, DecorativeBox };
</script>

{#snippet basicStory(args: any)}
	<Stack {...args}>
		<DecorativeBox class="h-20" />
		<DecorativeBox class="h-20" />
		<DecorativeBox class="h-20" />
	</Stack>
{/snippet}

{#snippet horizontalStory()}
	<div class="flex justify-center">
		<Stack direction="row" class="h-20">
			<DecorativeBox class="w-40!" />
			<DecorativeBox class="w-40!" />
			<DecorativeBox class="w-40!" />
		</Stack>
	</div>
{/snippet}

{#snippet hStackStory()}
	<div class="flex justify-center">
		<HStack>
			<DecorativeBox class="h-10 w-40!" />
			<DecorativeBox class="h-5 w-40!" />
			<DecorativeBox class="h-20 w-40!" />
		</HStack>
	</div>
{/snippet}

{#snippet vStackStory()}
	<VStack>
		<DecorativeBox class="w-1/2 h-20" />
		<DecorativeBox class="w-1/4 h-20" />
		<DecorativeBox class="w-full h-20" />
	</VStack>
{/snippet}

{#snippet separatorStory()}
	<Stack>
		<DecorativeBox class="h-20" />
		<Divider />
		<DecorativeBox class="h-20" />
		<Divider />
		<DecorativeBox class="h-20" />
	</Stack>
{/snippet}

{#snippet responsiveStory()}
	<div class="flex justify-center">
		<Stack gap={10} class="flex-col md:flex-row">
			<DecorativeBox class="size-20!" />
			<DecorativeBox class="size-20!" />
			<DecorativeBox class="size-20!" />
		</Stack>
	</div>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Horizontal" template={horizontalStory} />

<Story name="With HStack" template={hStackStory} />

<Story name="With VStack" template={vStackStory} />

<Story name="With Separator" template={separatorStory} />

<Story name="Responsive" template={responsiveStory} />
