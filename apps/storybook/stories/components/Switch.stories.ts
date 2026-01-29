import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Switch } from "$saas/components/switch";
import SwitchWrapper from "../wrappers/components/Switch.svelte";

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

const switchSizes = ["xs", "sm", "md", "lg"] as const;
const switchVariants = ["solid", "raised"] as const;

const meta: Meta = {
	title: "components/Switch",
	component: Switch,
	argTypes: {
		size: {
			control: "select",
			options: switchSizes,
			description: "The size of the switch.",
			table: { defaultValue: { summary: "md" } },
		},
		variant: {
			control: "select",
			options: switchVariants,
			description: "The visual variant of the switch.",
			table: { defaultValue: { summary: "solid" } },
		},
		colour: {
			control: "select",
			options: colours,
			description: "The colour palette to use.",
			table: { defaultValue: { summary: "accent" } },
		},
		checked: {
			control: "boolean",
			description: "Whether the switch is checked.",
		},
		disabled: {
			control: "boolean",
			description: "Whether the switch is disabled.",
		},
		class: {
			control: "text",
			description: "CSS class to apply to the component.",
		},
	},
	parameters: {
		docs: {
			description: {
				component: "A toggle switch for binary on/off states.",
			},
		},
		anatomy: `<script>
  import { Switch } from "@saas-ui/svelte/components/switch";
</script>

<Switch>Enable notifications</Switch>`,
	},
	args: {
		size: "md",
		variant: "solid",
		colour: "accent",
		checked: false,
		disabled: false,
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic switch with default styling.",
			},
		},
	},
	render: () =>
		({
			Component: SwitchWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `size` prop to change the size of the switch.",
			},
		},
	},
	render: () =>
		({
			Component: SwitchWrapper,
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
			Component: SwitchWrapper,
			props: { story: "variants" },
		}) as any,
};

export const Colours: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `colour` prop to change the colour theme.",
			},
		},
	},
	render: () =>
		({
			Component: SwitchWrapper,
			props: { story: "colours" },
		}) as any,
};

export const Disabled: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `disabled` prop to disable the switch.",
			},
		},
	},
	render: () =>
		({
			Component: SwitchWrapper,
			props: { story: "disabled" },
		}) as any,
};

export const ThumbLabel: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `thumbLabel` prop to add icons to the thumb.",
			},
		},
	},
	render: () =>
		({
			Component: SwitchWrapper,
			props: { story: "thumbLabel" },
		}) as any,
};

export const TrackLabel: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `trackLabel` prop to add icons to the track.",
			},
		},
	},
	render: () =>
		({
			Component: SwitchWrapper,
			props: { story: "trackLabel" },
		}) as any,
};
