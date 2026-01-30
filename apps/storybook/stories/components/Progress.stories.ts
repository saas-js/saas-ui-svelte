import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Progress } from "$saas/components/progress";
import ProgressWrapper from "../wrappers/components/Progress.svelte";

const progressSizes = ["xs", "sm", "md", "lg", "xl"] as const;
const progressVariants = ["outline", "subtle"] as const;
const progressShapes = ["square", "rounded", "full"] as const;
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
	title: "components/Progress",
	component: Progress.Root,
	argTypes: {
		value: {
			control: { type: "number", min: 0, max: 100 },
			description:
				"The current value of the progress (0-100). Set to null for indeterminate.",
			table: { defaultValue: { summary: "50" } },
		},
		min: {
			control: "number",
			description: "The minimum value.",
			table: { defaultValue: { summary: "0" } },
		},
		max: {
			control: "number",
			description: "The maximum value.",
			table: { defaultValue: { summary: "100" } },
		},
		size: {
			control: "select",
			options: progressSizes,
			description: "The size of the component.",
			table: { defaultValue: { summary: "md" } },
		},
		variant: {
			control: "select",
			options: progressVariants,
			description: "The visual style of the component.",
			table: { defaultValue: { summary: "outline" } },
		},
		shape: {
			control: "select",
			options: progressShapes,
			description: "The shape of the progress bar.",
			table: { defaultValue: { summary: "rounded" } },
		},
		colour: {
			control: "select",
			options: colours,
			description: "The colour theme of the component.",
			table: { defaultValue: { summary: "accent" } },
		},
		striped: {
			control: "boolean",
			description: "Whether to show stripes on the progress bar.",
			table: { defaultValue: { summary: "false" } },
		},
		animated: {
			control: "boolean",
			description: "Whether to animate the stripes.",
			table: { defaultValue: { summary: "false" } },
		},
		class: {
			control: "text",
			description: "Additional CSS classes to apply.",
		},
		children: {
			control: false,
			description: "The content to be rendered inside the component.",
			table: { type: { summary: "Snippet" } },
		},
	},
	parameters: {
		docs: {
			description: {
				component:
					"A horizontal bar that visually indicates the completion status of a task or process.",
			},
		},
		anatomy: `<script>
  import {
    Progress,
    ProgressRoot,
    ProgressTrack,
    ProgressRange,
    ProgressLabel,
    ProgressValueText,
  } from "@saas-ui/svelte/components/progress";
</script>

<Progress.Root value={50}>
  <Progress.Label>Loading...</Progress.Label>
  <Progress.Track>
    <Progress.Range />
  </Progress.Track>
  <Progress.ValueText />
</Progress.Root>`,
	},
	args: {
		value: 50,
		size: "md",
		variant: "outline",
		shape: "rounded",
		colour: "accent",
		striped: false,
		animated: false,
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic progress bar with default styling.",
			},
		},
	},
	render: () =>
		({
			Component: ProgressWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `size` prop to change the size of the progress bar.",
			},
		},
	},
	render: () =>
		({
			Component: ProgressWrapper,
			props: { story: "sizes" },
		}) as any,
};

export const Variants: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `variant` prop to change the visual style of the progress bar.",
			},
		},
	},
	render: () =>
		({
			Component: ProgressWrapper,
			props: { story: "variants" },
		}) as any,
};

export const Shapes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `shape` prop to change the shape of the progress bar.",
			},
		},
	},
	render: () =>
		({
			Component: ProgressWrapper,
			props: { story: "shapes" },
		}) as any,
};

export const Colours: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `colour` prop to change the colour scheme of the progress bar.",
			},
		},
	},
	render: () =>
		({
			Component: ProgressWrapper,
			props: { story: "colours" },
		}) as any,
};

export const WithLabel: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use `Progress.Label` to add a label to the progress bar.",
			},
		},
	},
	render: () =>
		({
			Component: ProgressWrapper,
			props: { story: "withLabel" },
		}) as any,
};

export const InlineLabel: Story = {
	parameters: {
		docs: {
			description: {
				story: "Progress bar with inline label using `Progress.ValueText`.",
			},
		},
	},
	render: () =>
		({
			Component: ProgressWrapper,
			props: { story: "inlineLabel" },
		}) as any,
};

export const WithInfoTip: Story = {
	parameters: {
		docs: {
			description: {
				story: "Progress bar with info tooltip on label.",
			},
		},
	},
	render: () =>
		({
			Component: ProgressWrapper,
			props: { story: "withInfoTip" },
		}) as any,
};

export const Indeterminate: Story = {
	parameters: {
		docs: {
			description: {
				story: "Set `value` to `null` for an indeterminate progress bar.",
			},
		},
	},
	render: () =>
		({
			Component: ProgressWrapper,
			props: { story: "indeterminate" },
		}) as any,
};

export const Stripes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `striped` prop to add a striped pattern to the progress bar.",
			},
		},
	},
	render: () =>
		({
			Component: ProgressWrapper,
			props: { story: "stripes" },
		}) as any,
};

export const AnimatedStripes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `animated` prop to animate the striped pattern.",
			},
		},
	},
	render: () =>
		({
			Component: ProgressWrapper,
			props: { story: "animatedStripes" },
		}) as any,
};

export const Values: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `value` prop to set the progress percentage.",
			},
		},
	},
	render: () =>
		({
			Component: ProgressWrapper,
			props: { story: "values" },
		}) as any,
};

export const RangeColours: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `colour` prop dynamically to indicate value ranges.",
			},
		},
	},
	render: () =>
		({
			Component: ProgressWrapper,
			props: { story: "rangeColours" },
		}) as any,
};
