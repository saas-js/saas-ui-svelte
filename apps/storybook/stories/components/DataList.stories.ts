import type { Meta, StoryObj } from "@storybook/sveltekit";
import { DataList } from "$saas/components/data-list";
import DataListWrapper from "../wrappers/components/DataList.svelte";
import {
	commonArgTypes,
	getControls,
	orientations,
	dataListSizes,
} from "../utils";

const meta: Meta = {
	title: "components/Data List",
	component: DataList.Root,
	argTypes: {
		size: {
			...commonArgTypes.size,
			options: dataListSizes,
			table: { defaultValue: { summary: "md" } },
		},
		orientation: {
			control: "select",
			options: orientations,
			table: { defaultValue: { summary: "horizontal" } },
		},
		divider: {
			control: "boolean",
			table: { defaultValue: { summary: "false" } },
		},
		colour: commonArgTypes.colour,
		class: commonArgTypes.class,
		children: commonArgTypes.children,
	},
	parameters: {
		controls: getControls([
			"size",
			"orientation",
			"divider",
			"colour",
			"class",
		]),
		docs: {
			description: {
				component:
					"A component for displaying key-value pairs in a structured list format.",
			},
		},
		anatomy: `<script>
  import {
    DataList,
    DataListItem,
    DataListItemLabel,
    DataListItemValue,
  } from "@saas-ui/svelte/components/data-list";
</script>

<DataList.Root>
  <DataList.Item>
    <DataList.ItemLabel>Status</DataList.ItemLabel>
    <DataList.ItemValue>Active</DataList.ItemValue>
  </DataList.Item>
  <DataList.Item>
    <DataList.ItemLabel>Created</DataList.ItemLabel>
    <DataList.ItemValue>Jan 1, 2024</DataList.ItemValue>
  </DataList.Item>
</DataList.Root>`,
	},
	args: {
		size: "md",
		orientation: "horizontal",
		divider: false,
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic `DataList` displaying stats with label-value pairs.",
			},
		},
	},
	render: () =>
		({
			Component: DataListWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `size` prop to change the size of the data list component.",
			},
		},
	},
	render: () =>
		({
			Component: DataListWrapper,
			props: { story: "sizes" },
		}) as any,
};

export const Orientation: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `orientation` prop to control how labels and values are arranged within each item. The default `horizontal` orientation displays the label and value side-by-side.",
			},
		},
	},
	render: () =>
		({
			Component: DataListWrapper,
			props: { story: "orientation" },
		}) as any,
};

export const Vertical: Story = {
	parameters: {
		docs: {
			description: {
				story: "Set `orientation` to `vertical` to stack the label above the value within each item.",
			},
		},
	},
	render: () =>
		({
			Component: DataListWrapper,
			props: { story: "vertical" },
		}) as any,
};

export const WithDivider: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `divider` prop to add separators between items.",
			},
		},
	},
	render: () =>
		({
			Component: DataListWrapper,
			props: { story: "divider" },
		}) as any,
};
