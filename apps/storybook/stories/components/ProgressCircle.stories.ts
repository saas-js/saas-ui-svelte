import type { Meta, StoryObj } from "@storybook/sveltekit";
import { ProgressCircle } from "$saas/components/progress-circle";
import ProgressCircleWrapper from "../wrappers/components/ProgressCircle.svelte";

const sizes = ["xs", "sm", "md", "lg", "xl"] as const;
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

const meta: Meta = {
	title: "components/Progress Circle",
	component: ProgressCircle,
	argTypes: {
		value: {
			control: { type: "range", min: 0, max: 100, step: 1 },
			description:
				"The current value of the progress (0-100). Set to null for indeterminate state.",
			table: { defaultValue: { summary: "0" } },
		},
		min: {
			control: { type: "number" },
			description: "The minimum value.",
			table: { defaultValue: { summary: "0" } },
		},
		max: {
			control: { type: "number" },
			description: "The maximum value.",
			table: { defaultValue: { summary: "100" } },
		},
		size: {
			control: "select",
			options: sizes,
			description: "The size of the component.",
			table: { defaultValue: { summary: "md" } },
		},
		colour: {
			control: "select",
			options: colours,
			description: "The colour theme of the component.",
			table: { defaultValue: { summary: "gray" } },
		},
		showValue: {
			control: "boolean",
			description: "Whether to show the value as text in the center.",
			table: { defaultValue: { summary: "false" } },
		},
		thickness: {
			control: "text",
			description:
				"Custom thickness for the stroke (overrides size default).",
		},
		rounded: {
			control: "boolean",
			description: "Whether to use rounded stroke caps.",
			table: { defaultValue: { summary: "false" } },
		},
		label: {
			control: "text",
			description: "Accessible label for the progress.",
		},
		class: {
			control: "text",
			description: "Additional CSS classes to apply.",
		},
	},
	parameters: {
		docs: {
			description: {
				component:
					"A circular progress indicator that visually represents the completion status of a task or process.",
			},
		},
		anatomy: `<script>
  import { ProgressCircle } from "@saas-ui/svelte/components/progress-circle";
</script>

<ProgressCircle value={75} size="md" colour="blue" />`,
	},
	args: {
		value: 75,
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
				story: "Basic circular progress indicator.",
			},
		},
	},
	render: () =>
		({
			Component: ProgressCircleWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Rounded: Story = {
	parameters: {
		docs: {
			description: {
				story: "Circular progress with rounded stroke caps using the `rounded` prop.",
			},
		},
	},
	render: () =>
		({
			Component: ProgressCircleWrapper,
			props: { story: "rounded" },
		}) as any,
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `size` prop to change the size of the progress circle.",
			},
		},
	},
	render: () =>
		({
			Component: ProgressCircleWrapper,
			props: { story: "sizes" },
		}) as any,
};

export const Colours: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `colour` prop to change the colour of the progress circle.",
			},
		},
	},
	render: () =>
		({
			Component: ProgressCircleWrapper,
			props: { story: "colours" },
		}) as any,
};

export const WithValueText: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `showValue` prop to display the value text in the center.",
			},
		},
	},
	render: () =>
		({
			Component: ProgressCircleWrapper,
			props: { story: "withValueText" },
		}) as any,
};

export const CustomThickness: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `thickness` prop to customize the stroke width.",
			},
		},
	},
	render: () =>
		({
			Component: ProgressCircleWrapper,
			props: { story: "customThickness" },
		}) as any,
};

export const Indeterminate: Story = {
	parameters: {
		docs: {
			description: {
				story: "Set `value` to `null` for indeterminate progress with unknown duration.",
			},
		},
	},
	render: () =>
		({
			Component: ProgressCircleWrapper,
			props: { story: "indeterminate" },
		}) as any,
};

export const Values: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `value` prop to set different progress values.",
			},
		},
	},
	render: () =>
		({
			Component: ProgressCircleWrapper,
			props: { story: "values" },
		}) as any,
};

export const RangeColors: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `trackColour` prop for different range colours.",
			},
		},
	},
	render: () =>
		({
			Component: ProgressCircleWrapper,
			props: { story: "rangeColors" },
		}) as any,
};
