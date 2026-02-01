import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Spinner } from "$saas/components/spinner";
import SpinnerWrapper from "../wrappers/components/Spinner.svelte";

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

const spinnerSizes = ["xs", "sm", "md", "lg", "xl"] as const;

const meta: Meta = {
	title: "components/Spinner",
	component: Spinner,
	argTypes: {
		size: {
			control: "select",
			options: spinnerSizes,
			description: "The size of the spinner.",
			table: { defaultValue: { summary: "md" } },
		},
		colour: {
			control: "select",
			options: colours,
			description: "The colour of the spinner.",
		},
		label: {
			control: "text",
			description: "Accessible label for screen readers.",
			table: { defaultValue: { summary: "Loading" } },
		},
		animationDuration: {
			control: "text",
			description: "The animation duration.",
			table: { defaultValue: { summary: "0.5s" } },
		},
		borderWidth: {
			control: "text",
			description: "The border width (thickness) of the spinner.",
			table: { defaultValue: { summary: "2px" } },
		},
		trackColour: {
			control: "select",
			options: colours,
			description: "The track colour palette of the spinner.",
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
					"A loading indicator that displays a circular spinning animation.",
			},
		},
		anatomy: `<script>
  import { Spinner } from "@saas-ui/svelte/components/spinner";
</script>

<Spinner />`,
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
				story: "Basic spinner with default styling.",
			},
		},
	},
	render: () =>
		({
			Component: SpinnerWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `size` prop to change the size of the spinner.",
			},
		},
	},
	render: () =>
		({
			Component: SpinnerWrapper,
			props: { story: "sizes" },
		}) as any,
};

export const Colours: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `colour` prop to change the colour of the spinner.",
			},
		},
	},
	render: () =>
		({
			Component: SpinnerWrapper,
			props: { story: "colours" },
		}) as any,
};

export const TrackColour: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `trackColour` prop to change the colour of the spinner track (the non-spinning background).",
			},
		},
	},
	render: () =>
		({
			Component: SpinnerWrapper,
			props: { story: "trackColour" },
		}) as any,
};

export const AnimationDuration: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `animationDuration` prop to control the rotation speed of the spinner animation.",
			},
		},
	},
	render: () =>
		({
			Component: SpinnerWrapper,
			props: { story: "customSpeed" },
		}) as any,
};

export const BorderWidth: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `borderWidth` prop to adjust the stroke width of the spinner ring.",
			},
		},
	},
	render: () =>
		({
			Component: SpinnerWrapper,
			props: { story: "thickness" },
		}) as any,
};

export const WithLabel: Story = {
	parameters: {
		docs: {
			description: {
				story: "Combine spinner with text for a loading indicator.",
			},
		},
	},
	render: () =>
		({
			Component: SpinnerWrapper,
			props: { story: "withLabel" },
		}) as any,
};
