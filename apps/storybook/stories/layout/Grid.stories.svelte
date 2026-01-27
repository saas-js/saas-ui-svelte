<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Grid, GridItem } from "$saas/layout/grid";
	import { DecorativeBox } from "$saas/layout/stack";
	import { commonArgTypes, getControls } from "../utils";

	const { Story } = defineMeta({
		title: "layout/Grid",
		component: Grid,
		argTypes: {
			columns: {
				control: "number",
				description: "The number of columns in the grid template.",
			},
			rows: {
				control: "number",
				description: "The number of rows in the grid template.",
			},
			gap: {
				control: "number",
				description: "The gap between grid items.",
				table: { defaultValue: { summary: "4" } },
			},
			gapX: {
				control: "number",
				description: "The column gap between grid items.",
			},
			gapY: {
				control: "number",
				description: "The row gap between grid items.",
			},
			children: commonArgTypes.children,
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls(["columns", "rows", "gap", "gapX", "gapY", "children", "class"]),
		},
		args: {
			columns: 3,
			gap: 4,
		},
	});
</script>

{#snippet basicStory(args: any)}
	<Grid {...args}>
		<DecorativeBox class="h-20" />
		<DecorativeBox class="h-20" />
		<DecorativeBox class="h-20" />
	</Grid>
{/snippet}

{#snippet spanningStory()}
	<Grid rows={2} columns={5} gap={4} class="h-[200px]">
		<GridItem rowSpan={2} colSpan={1}>
			<DecorativeBox class="w-full h-full">rowSpan=2</DecorativeBox>
		</GridItem>
		<GridItem colSpan={2}>
			<DecorativeBox class="w-full h-full">colSpan=2</DecorativeBox>
		</GridItem>
		<GridItem colSpan={2}>
			<DecorativeBox class="w-full h-full">colSpan=2</DecorativeBox>
		</GridItem>
		<GridItem colSpan={4}>
			<DecorativeBox class="w-full h-full">colSpan=4</DecorativeBox>
		</GridItem>
	</Grid>
{/snippet}

{#snippet customGapStory()}
	<Grid columns={3} gapX={8} gapY={2}>
		<DecorativeBox class="h-20" />
		<DecorativeBox class="h-20" />
		<DecorativeBox class="h-20" />
		<DecorativeBox class="h-20" />
		<DecorativeBox class="h-20" />
		<DecorativeBox class="h-20" />
	</Grid>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Spanning" template={spanningStory} />

<Story name="CustomGap" template={customGapStory} />
