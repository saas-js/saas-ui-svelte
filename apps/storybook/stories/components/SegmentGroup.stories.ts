import type { Meta, StoryObj } from "@storybook/sveltekit";
import { SegmentGroup } from "$saas/components/segment-group";
import SegmentGroupWrapper from "../wrappers/components/SegmentGroup.svelte";

const colours = [
	"gray",
	"red",
	"orange",
	"yellow",
	"green",
	"teal",
	"blue",
	"cyan",
	"purple",
	"pink",
	"rose",
] as const;

const segmentGroupSizes = ["xs", "sm", "md", "lg"] as const;
const orientations = ["horizontal", "vertical"] as const;

const meta: Meta = {
	title: "components/Segment Group",
	component: SegmentGroup.Root,
	argTypes: {
		value: {
			control: "text",
			description: "The controlled value of the segment group.",
		},
		size: {
			control: "select",
			options: segmentGroupSizes,
			description: "The size of the component.",
			table: { defaultValue: { summary: "md" } },
		},
		colour: {
			control: "select",
			options: colours,
			description: "The colour of the component.",
			table: { defaultValue: { summary: "gray" } },
		},
		orientation: {
			control: "select",
			options: orientations,
			description: "Layout orientation of the segment group.",
			table: { defaultValue: { summary: "horizontal" } },
		},
		disabled: {
			control: "boolean",
			description: "Whether the component is disabled.",
			table: { defaultValue: { summary: "false" } },
		},
		class: {
			control: "text",
			description: "CSS class to apply to the component.",
		},
	},
	parameters: {
		docs: {
			description: {
				component:
					"A group of mutually exclusive toggle buttons that function like radio buttons but with a more visual, segmented appearance.",
			},
		},
		anatomy: `<script>
  import {
    SegmentGroup,
    SegmentGroupRoot,
    SegmentGroupItem,
    SegmentGroupIndicator,
  } from "@saas-ui/svelte/components/segment-group";
</script>

<SegmentGroup.Root defaultValue="weekly">
  <SegmentGroup.Indicator />
  <SegmentGroup.Item value="daily">Daily</SegmentGroup.Item>
  <SegmentGroup.Item value="weekly">Weekly</SegmentGroup.Item>
  <SegmentGroup.Item value="monthly">Monthly</SegmentGroup.Item>
</SegmentGroup.Root>`,
	},
	args: {
		size: "md",
		colour: "gray",
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic segment group with default styling.",
			},
		},
	},
	render: () =>
		({
			Component: SegmentGroupWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `size` prop to change the size of the segment group.",
			},
		},
	},
	render: () =>
		({
			Component: SegmentGroupWrapper,
			props: { story: "sizes" },
		}) as any,
};

export const Controlled: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `value` and `onValueChange` props to control the selected value.",
			},
		},
	},
	render: () =>
		({
			Component: SegmentGroupWrapper,
			props: { story: "controlled" },
		}) as any,
};

export const Colours: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `colour` prop to change the colour of the segment group.",
			},
		},
	},
	render: () =>
		({
			Component: SegmentGroupWrapper,
			props: { story: "colours" },
		}) as any,
};

export const Disabled: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `disabled` prop to disable the entire segment group.",
			},
		},
	},
	render: () =>
		({
			Component: SegmentGroupWrapper,
			props: { story: "disabled" },
		}) as any,
};

export const DisabledItem: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `disabled` prop on individual items to disable specific segments.",
			},
		},
	},
	render: () =>
		({
			Component: SegmentGroupWrapper,
			props: { story: "disabledItem" },
		}) as any,
};

export const WithIcon: Story = {
	parameters: {
		docs: {
			description: {
				story: "Add icons to segment items for visual enhancement.",
			},
		},
	},
	render: () =>
		({
			Component: SegmentGroupWrapper,
			props: { story: "withIcon" },
		}) as any,
};

export const IconOnly: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use icon-only segments with `aria-label` for accessibility.",
			},
		},
	},
	render: () =>
		({
			Component: SegmentGroupWrapper,
			props: { story: "iconOnly" },
		}) as any,
};

export const Card: Story = {
	parameters: {
		docs: {
			description: {
				story: "Example of segment group used within a card component.",
			},
		},
	},
	render: () =>
		({
			Component: SegmentGroupWrapper,
			props: { story: "card" },
		}) as any,
};
