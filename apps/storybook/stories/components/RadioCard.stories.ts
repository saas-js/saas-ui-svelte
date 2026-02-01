import type { Meta, StoryObj } from "@storybook/sveltekit";
import { RadioCard } from "$saas/components/radio-card";
import RadioCardWrapper from "../wrappers/components/RadioCard.svelte";

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

const radioCardSizes = ["sm", "md", "lg"] as const;
const radioCardAligns = ["start", "center", "end"] as const;
const orientations = ["horizontal", "vertical"] as const;

const meta: Meta = {
	title: "components/Radio Card",
	component: RadioCard.Root,
	argTypes: {
		value: {
			control: "text",
			description: "The controlled value of the radio card group.",
		},
		size: {
			control: "select",
			options: radioCardSizes,
			description: "The size of the component.",
			table: { defaultValue: { summary: "md" } },
		},
		align: {
			control: "select",
			options: radioCardAligns,
			description: "The alignment of content within cards.",
			table: { defaultValue: { summary: "start" } },
		},
		colour: {
			control: "select",
			options: colours,
			description: "The colour of the component.",
			table: { defaultValue: { summary: "indigo" } },
		},
		orientation: {
			control: "select",
			options: orientations,
			description: "Layout orientation of the items container.",
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
					"A card-based radio selection component that provides a more visual way to select from mutually exclusive options.",
			},
		},
		anatomy: `<script>
  import {
    RadioCard,
    RadioCardRoot,
    RadioCardLabel,
    RadioCardItem,
    RadioCardItemAddon,
  } from "@saas-ui/svelte/components/radio-card";
</script>

<RadioCard.Root>
  <RadioCard.Label>Select a plan</RadioCard.Label>
  <RadioCard.Item value="basic" label="Basic" description="For small teams" />
  <RadioCard.Item value="pro" label="Pro" description="For growing teams">
    <RadioCard.ItemAddon>Most popular</RadioCard.ItemAddon>
  </RadioCard.Item>
</RadioCard.Root>`,
	},
	args: {
		size: "md",
		align: "start",
		colour: "indigo",
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic radio card group with default styling.",
			},
		},
	},
	render: () =>
		({
			Component: RadioCardWrapper,
			props: { story: "basic" },
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
			Component: RadioCardWrapper,
			props: { story: "controlled" },
		}) as any,
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `size` prop to change the size of the radio cards.",
			},
		},
	},
	render: () =>
		({
			Component: RadioCardWrapper,
			props: { story: "sizes" },
		}) as any,
};

export const Colours: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `colour` prop to change the colour of the radio cards.",
			},
		},
	},
	render: () =>
		({
			Component: RadioCardWrapper,
			props: { story: "colours" },
		}) as any,
};

export const WithIcon: Story = {
	parameters: {
		docs: {
			description: {
				story: "Pass an `icon` component to display an icon above the label.",
			},
		},
	},
	render: () =>
		({
			Component: RadioCardWrapper,
			props: { story: "withIcon" },
		}) as any,
};

export const Centered: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Use the `align="center"` prop to center content within cards.',
			},
		},
	},
	render: () =>
		({
			Component: RadioCardWrapper,
			props: { story: "centered" },
		}) as any,
};

export const WithAddon: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `addon` prop to add content below the card body.",
			},
		},
	},
	render: () =>
		({
			Component: RadioCardWrapper,
			props: { story: "withAddon" },
		}) as any,
};

export const VerticalLayout: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Use the `orientation="vertical"` prop to stack cards vertically.',
			},
		},
	},
	render: () =>
		({
			Component: RadioCardWrapper,
			props: { story: "verticalLayout" },
		}) as any,
};

export const Disabled: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `disabled` prop to disable the entire radio card group.",
			},
		},
	},
	render: () =>
		({
			Component: RadioCardWrapper,
			props: { story: "disabled" },
		}) as any,
};
