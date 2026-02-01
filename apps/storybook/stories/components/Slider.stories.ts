import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Slider } from "$saas/components/slider";
import SliderWrapper from "../wrappers/components/Slider.svelte";

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

const sliderSizes = ["sm", "md", "lg"] as const;
const sliderVariants = ["outline", "solid"] as const;

const meta: Meta = {
	title: "components/Slider",
	component: Slider.Root,
	argTypes: {
		size: {
			control: "select",
			options: sliderSizes,
			description: "The size of the slider.",
			table: { defaultValue: { summary: "md" } },
		},
		variant: {
			control: "select",
			options: sliderVariants,
			description: "The visual variant of the slider.",
			table: { defaultValue: { summary: "outline" } },
		},
		colour: {
			control: "select",
			options: colours,
			description: "The colour theme of the slider.",
			table: { defaultValue: { summary: "gray" } },
		},
		disabled: {
			control: "boolean",
			description: "Whether the slider is disabled.",
			table: { defaultValue: { summary: "false" } },
		},
		min: {
			control: "number",
			description: "The minimum value of the slider.",
			table: { defaultValue: { summary: "0" } },
		},
		max: {
			control: "number",
			description: "The maximum value of the slider.",
			table: { defaultValue: { summary: "100" } },
		},
		step: {
			control: "number",
			description: "The step value of the slider.",
			table: { defaultValue: { summary: "1" } },
		},
		class: {
			control: "text",
			description: "CSS class to apply to the component.",
		},
	},
	args: {
		size: "md",
		variant: "outline",
		colour: "gray",
		disabled: false,
	},
	parameters: {
		docs: {
			description: {
				component:
					"An input component that allows users to select a value or range from a continuous or discrete set of values by dragging a thumb along a track.",
			},
		},
		anatomy: `<script>
  import {
    Slider,
    SliderRoot,
    SliderControl,
    SliderTrack,
    SliderRange,
    SliderThumb,
    SliderLabel,
    SliderValueText,
    SliderMarkerGroup,
    SliderMarker,
  } from "@saas-ui/svelte/components/slider";
</script>

<Slider.Root defaultValue={[50]}>
  <Slider.Label>Volume</Slider.Label>
  <Slider.ValueText />
  <Slider.Control>
    <Slider.Track>
      <Slider.Range />
    </Slider.Track>
    <Slider.Thumb index={0} />
  </Slider.Control>
  <Slider.MarkerGroup>
    <Slider.Marker value={25}>25%</Slider.Marker>
    <Slider.Marker value={50}>50%</Slider.Marker>
    <Slider.Marker value={75}>75%</Slider.Marker>
  </Slider.MarkerGroup>
</Slider.Root>`,
		subComponents: [
			{
				name: "Slider.Root",
				description:
					"The slider container that provides context to all child components.",
				props: {
					children: {
						type: "Snippet",
						description:
							"Content to render inside the slider (composition API).",
					},
					class: {
						type: "string",
						description: "Additional CSS classes to apply.",
					},
					size: {
						type: '"sm" | "md" | "lg"',
						default: '"md"',
						description: "The size of the slider.",
					},
					variant: {
						type: '"outline" | "solid"',
						default: '"outline"',
						description: "The visual variant of the slider.",
					},
					orientation: {
						type: '"horizontal" | "vertical"',
						default: '"horizontal"',
						description: "The orientation of the slider.",
					},
					colour: {
						type: "ColourName",
						default: '"gray"',
						description: "The colour palette.",
					},
					disabled: {
						type: "boolean",
						default: "false",
						description: "Whether the slider is disabled.",
					},
					value: {
						type: "number[]",
						description: "The controlled value of the slider.",
					},
					defaultValue: {
						type: "number[]",
						description: "The initial value of the slider.",
					},
					min: {
						type: "number",
						default: "0",
						description: "The minimum value of the slider.",
					},
					max: {
						type: "number",
						default: "100",
						description: "The maximum value of the slider.",
					},
					step: {
						type: "number",
						default: "1",
						description: "The step value of the slider.",
					},
					name: {
						type: "string",
						description: "The name for the hidden input.",
					},
					onValueChange: {
						type: "(details: { value: number[] }) => void",
						description: "Function invoked when the value changes.",
					},
					onValueChangeEnd: {
						type: "(details: { value: number[] }) => void",
						description:
							"Function invoked when the value change ends.",
					},
				},
			},
			{
				name: "Slider.Control",
				description:
					"The control container that holds the track and thumb.",
				props: {
					children: {
						type: "Snippet",
						description:
							"Content to render inside the control (typically Track and Thumb).",
					},
					class: {
						type: "string",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Slider.Track",
				description: "The track that shows the slider's range.",
				props: {
					children: {
						type: "Snippet",
						description:
							"Content to render inside the track (typically Range).",
					},
					class: {
						type: "string",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Slider.Range",
				description: "The filled range portion of the track.",
				props: {
					class: {
						type: "string",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Slider.Thumb",
				description: "The draggable thumb element.",
				props: {
					index: {
						type: "number",
						required: true,
						description:
							"The index of the thumb (for range sliders, 0 for first thumb, 1 for second, etc).",
					},
					children: {
						type: "Snippet",
						description: "Content to render inside the thumb.",
					},
					class: {
						type: "string",
						description: "Additional CSS classes to apply.",
					},
					name: {
						type: "string",
						description: "The name for the hidden input.",
					},
				},
			},
			{
				name: "Slider.Label",
				description: "The label for the slider.",
				props: {
					children: {
						type: "Snippet",
						description: "Content to render as the label.",
					},
					class: {
						type: "string",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Slider.ValueText",
				description: "Displays the current slider value.",
				props: {
					children: {
						type: "Snippet",
						description: "Content to render as the value text.",
					},
					class: {
						type: "string",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Slider.MarkerGroup",
				description: "Container for slider markers.",
				props: {
					children: {
						type: "Snippet",
						description:
							"Content to render inside the marker group (typically Marker components).",
					},
					class: {
						type: "string",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Slider.Marker",
				description:
					"Individual marker for indicating specific values on the slider.",
				props: {
					value: {
						type: "number",
						required: true,
						description: "The value at which to place the marker.",
					},
					children: {
						type: "Snippet",
						description: "Content to render inside the marker.",
					},
					class: {
						type: "string",
						description: "Additional CSS classes to apply.",
					},
					showDot: {
						type: "boolean",
						default: "true",
						description: "Whether to show a dot indicator.",
					},
				},
			},
		],
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic slider with default styling.",
			},
		},
	},
	render: () =>
		({
			Component: SliderWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `size` prop to change the size of the slider.",
			},
		},
	},
	render: () =>
		({
			Component: SliderWrapper,
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
			Component: SliderWrapper,
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
			Component: SliderWrapper,
			props: { story: "colours" },
		}) as any,
};

export const Label: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `Slider.Label` component to add a label to the slider.",
			},
		},
	},
	render: () =>
		({
			Component: SliderWrapper,
			props: { story: "label" },
		}) as any,
};

export const Range: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use multiple thumbs for range selection.",
			},
		},
	},
	render: () =>
		({
			Component: SliderWrapper,
			props: { story: "range" },
		}) as any,
};

export const Disabled: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `disabled` prop to disable the slider.",
			},
		},
	},
	render: () =>
		({
			Component: SliderWrapper,
			props: { story: "disabled" },
		}) as any,
};

export const Marks: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `Slider.MarkerGroup` and `Slider.Marker` components to display value markers.",
			},
		},
	},
	render: () =>
		({
			Component: SliderWrapper,
			props: { story: "marks" },
		}) as any,
};

export const Vertical: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Use `orientation="vertical"` for vertical sliders.',
			},
		},
	},
	render: () =>
		({
			Component: SliderWrapper,
			props: { story: "vertical" },
		}) as any,
};

export const Controlled: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use `value` and `onValueChange` props for controlled sliders.",
			},
		},
	},
	render: () =>
		({
			Component: SliderWrapper,
			props: { story: "controlled" },
		}) as any,
};

export const Steps: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `step` prop to set increment values.",
			},
		},
	},
	render: () =>
		({
			Component: SliderWrapper,
			props: { story: "steps" },
		}) as any,
};

export const ChangeEnd: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use `onValueChangeEnd` to capture the final value after dragging.",
			},
		},
	},
	render: () =>
		({
			Component: SliderWrapper,
			props: { story: "changeEnd" },
		}) as any,
};
