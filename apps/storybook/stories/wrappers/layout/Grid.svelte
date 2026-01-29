<script lang="ts">
	import { Grid, GridItem } from "$saas/layout/grid";
	import { DecorativeBox } from "$saas/layout/stack";

	interface Props {
		story: "basic" | "spanning" | "customGap";
		args?: any;
	}

	let { story, args = {} }: Props = $props();
</script>

{#if story === "basic"}
	<Grid {...args}>
		<DecorativeBox class="h-20" />
		<DecorativeBox class="h-20" />
		<DecorativeBox class="h-20" />
	</Grid>
{:else if story === "spanning"}
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
{:else if story === "customGap"}
	<Grid columns={3} gapX={8} gapY={2}>
		<DecorativeBox class="h-20" />
		<DecorativeBox class="h-20" />
		<DecorativeBox class="h-20" />
		<DecorativeBox class="h-20" />
		<DecorativeBox class="h-20" />
		<DecorativeBox class="h-20" />
	</Grid>
{/if}
