import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Timeline } from "$saas/components/timeline";
import TimelineWrapper from "../wrappers/components/Timeline.svelte";

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

const timelineSizes = ["sm", "md", "lg", "xl"] as const;
const timelineVariants = ["subtle", "solid", "outline", "plain"] as const;

const meta: Meta = {
	title: "Components/Timeline",
	component: Timeline.Root,
	argTypes: {
		size: {
			control: "select",
			options: timelineSizes,
			description: "The size of the timeline.",
			table: { defaultValue: { summary: "md" } },
		},
		variant: {
			control: "select",
			options: timelineVariants,
			description: "The visual style of the timeline.",
			table: { defaultValue: { summary: "solid" } },
		},
		colour: {
			control: "select",
			options: colours,
			description: "The colour theme.",
			table: { defaultValue: { summary: "gray" } },
		},
		class: {
			control: "text",
			description: "CSS class to apply to the component.",
		},
	},
	parameters: {
		docs: {
			description: {
				component: "A vertical list of events or activities displayed in chronological order.",
			},
		},
		anatomy: `<script>
  import { Timeline } from "@saas-ui/svelte/components/timeline";
</script>

<Timeline.Root>
  <Timeline.Item>
    <Timeline.Connector>
      <Icon />
    </Timeline.Connector>
    <Timeline.Content>
      <Timeline.Title>Event title</Timeline.Title>
      <Timeline.Description>Event description</Timeline.Description>
    </Timeline.Content>
  </Timeline.Item>
</Timeline.Root>`,
	},
	args: {
		size: "md",
		variant: "solid",
		colour: "gray",
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic timeline with icons and content.",
			},
		},
	},
	render: () =>
		({
			Component: TimelineWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `size` prop to change the size of the timeline.",
			},
		},
	},
	render: () =>
		({
			Component: TimelineWrapper,
			props: { story: "sizes" },
		}) as any,
};

export const Variants: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `variant` prop to change the visual style.",
			},
		},
	},
	render: () =>
		({
			Component: TimelineWrapper,
			props: { story: "variants" },
		}) as any,
};

export const ContentBefore: Story = {
	parameters: {
		docs: {
			description: {
				story: "Add content before the connector for timestamps.",
			},
		},
	},
	render: () =>
		({
			Component: TimelineWrapper,
			props: { story: "contentBefore" },
		}) as any,
};

export const Alternating: Story = {
	parameters: {
		docs: {
			description: {
				story: "Create an alternating timeline layout.",
			},
		},
	},
	render: () =>
		({
			Component: TimelineWrapper,
			props: { story: "alternating" },
		}) as any,
};
