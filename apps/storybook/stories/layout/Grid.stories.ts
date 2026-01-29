import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Grid } from "$saas/layout/grid";
import GridWrapper from "../wrappers/layout/Grid.svelte";
import { commonArgTypes, getControls } from "../utils";

const meta: Meta = {
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
		docs: {
			description: {
				component:
					"A CSS Grid container component with props for columns, rows, and gap. Use with GridItem for advanced spanning and positioning.",
			},
		},
		anatomy: `<script>
  import { Grid, GridItem } from "@saas-ui/svelte/layout/grid";
</script>

<Grid columns={3} gap={4}>
  <GridItem>Item 1</GridItem>
  <GridItem colSpan={2}>Spans 2 columns</GridItem>
  <GridItem>Item 3</GridItem>
</Grid>`,
	},
	args: {
		columns: 3,
		gap: 4,
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic grid layout with configurable number of equal-width columns and `gap`.",
			},
		},
	},
	render: (args) => ({ Component: GridWrapper, props: { story: "basic", args } }) as any,
};

export const Spanning: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use `GridItem` with `colSpan` and `rowSpan` props to create items that span multiple columns or rows.",
			},
		},
	},
	render: () => ({ Component: GridWrapper, props: { story: "spanning" } }) as any,
};

export const CustomGap: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use `gapX` and `gapY` to set different horizontal and vertical gaps between grid items.",
			},
		},
	},
	render: () => ({ Component: GridWrapper, props: { story: "customGap" } }) as any,
};
