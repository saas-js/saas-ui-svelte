import type { Meta, StoryObj } from "@storybook/sveltekit";
import { GridList } from "$saas/components/grid-list";
import GridListWrapper from "../wrappers/components/GridList.svelte";
import { commonArgTypes, getControls } from "../utils";

const meta: Meta = {
	title: "components/Grid List",
	component: GridList.Root,
	argTypes: {
		interactive: {
			control: "boolean",
			description: "Whether the grid list items are interactive.",
			table: { defaultValue: { summary: "false" } },
		},
		class: commonArgTypes.class,
	},
	parameters: {
		controls: getControls(["interactive", "class"]),
		docs: {
			description: {
				component:
					"A grid-based list component for displaying items in a structured layout with optional interactivity.",
			},
		},
		anatomy: `<script>
  import {
    GridList,
    GridListRoot,
    GridListHeader,
    GridListItem,
    GridListCell,
  } from "@saas-ui/svelte/components/grid-list";
</script>

<GridList.Root interactive>
  <GridList.Header>
    <GridList.Cell>Name</GridList.Cell>
    <GridList.Cell>Status</GridList.Cell>
  </GridList.Header>
  <GridList.Item>
    <GridList.Cell>Item 1</GridList.Cell>
    <GridList.Cell>Active</GridList.Cell>
  </GridList.Item>
</GridList.Root>`,
	},
	args: {
		interactive: true,
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic `GridList` with `interactive` items.",
			},
		},
	},
	render: () =>
		({
			Component: GridListWrapper,
			props: { story: "basic" },
		}) as any,
};

export const WithHeader: Story = {
	parameters: {
		docs: {
			description: {
				story: "`GridList` with a `GridList.Header` section.",
			},
		},
	},
	render: () =>
		({
			Component: GridListWrapper,
			props: { story: "withHeader" },
		}) as any,
};
