import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Radio } from "$saas/components/radio";
import RadioWrapper from "../wrappers/components/Radio.svelte";

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

const radioVariants = ["solid", "outline"] as const;
const radioSizes = ["sm", "md", "lg"] as const;
const orientations = ["horizontal", "vertical"] as const;

const meta: Meta = {
	title: "components/Radio",
	component: Radio.Group,
	argTypes: {
		value: {
			control: "text",
			description: "The controlled value of the radio group.",
		},
		size: {
			control: "select",
			options: radioSizes,
			description: "The size of the component.",
			table: { defaultValue: { summary: "md" } },
		},
		variant: {
			control: "select",
			options: radioVariants,
			description: "The variant of the component.",
			table: { defaultValue: { summary: "solid" } },
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
			description: "Layout orientation of the radio group.",
			table: { defaultValue: { summary: "vertical" } },
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
					"A set of mutually exclusive options where only one can be selected at a time.",
			},
		},
		anatomy: `<script>
  import {
    Radio,
    RadioGroup,
    RadioItem,
    RadioItemControl,
    RadioItemText,
    RadioIndicator,
    RadioItemHiddenInput,
    RadioLabel,
  } from "@saas-ui/svelte/components/radio";
</script>

<Radio.Group>
  <Radio.Label>Select an option</Radio.Label>
  <Radio.Item value="option1">
    <Radio.ItemControl>
      <Radio.Indicator />
    </Radio.ItemControl>
    <Radio.ItemText>Option 1</Radio.ItemText>
    <Radio.ItemHiddenInput />
  </Radio.Item>
  <Radio.Item value="option2">
    <Radio.ItemControl>
      <Radio.Indicator />
    </Radio.ItemControl>
    <Radio.ItemText>Option 2</Radio.ItemText>
    <Radio.ItemHiddenInput />
  </Radio.Item>
</Radio.Group>`,
		subComponents: [
			{
				name: "Radio.Group",
				description:
					"The radio group container that manages state and context.",
				props: {
					children: {
						type: "Snippet",
						description:
							"Content to render inside the radio group.",
					},
					class: {
						type: "string",
						description: "Additional CSS classes to apply.",
					},
					size: {
						type: '"sm" | "md" | "lg"',
						default: '"md"',
						description: "The size of the radio buttons.",
					},
					variant: {
						type: '"solid" | "subtle" | "outline"',
						default: '"solid"',
						description: "The visual style of the radio buttons.",
					},
					colour: {
						type: "ColourName",
						default: '"indigo"',
						description: "The colour palette of the radio buttons.",
					},
					value: {
						type: "string",
						description: "The controlled value of the radio group.",
					},
					defaultValue: {
						type: "string",
						description: "The default value when uncontrolled.",
					},
					name: {
						type: "string",
						description:
							"The name of the input fields (used for form submission).",
					},
					orientation: {
						type: '"horizontal" | "vertical"',
						default: '"vertical"',
						description: "Layout orientation of the radio group.",
					},
					disabled: {
						type: "boolean",
						default: "false",
						description: "Whether the radio group is disabled.",
					},
					invalid: {
						type: "boolean",
						default: "false",
						description:
							"Whether the radio group is in an invalid state.",
					},
					readOnly: {
						type: "boolean",
						default: "false",
						description: "Whether the radio group is read-only.",
					},
					onValueChange: {
						type: "(details: { value: string | null }) => void",
						description: "Callback invoked when the value changes.",
					},
				},
			},
			{
				name: "Radio.Item",
				description: "An individual radio item within the group.",
				props: {
					children: {
						type: "Snippet",
						description:
							"Content to render inside the radio item (composition API).",
					},
					label: {
						type: "string",
						description:
							"The label text displayed next to the radio.",
					},
					class: {
						type: "string",
						description: "Additional CSS classes to apply.",
					},
					value: {
						type: "string",
						required: true,
						description: "The value of this radio item.",
					},
					disabled: {
						type: "boolean",
						default: "false",
						description: "Whether this radio item is disabled.",
					},
					invalid: {
						type: "boolean",
						default: "false",
						description: "Whether this radio item is invalid.",
					},
				},
			},
			{
				name: "Radio.ItemControl",
				description:
					"The visual control element for the radio (the circular button).",
				props: {
					children: {
						type: "Snippet",
						description:
							"The content of the control (usually indicators).",
					},
					class: {
						type: "string",
						description:
							"Additional classes to apply to the control.",
					},
				},
			},
			{
				name: "Radio.Indicator",
				description:
					"The indicator element that shows when the radio is selected.",
				props: {
					children: {
						type: "Snippet",
						description:
							"Optional custom content for the indicator.",
					},
					class: {
						type: "string",
						description:
							"Additional classes to apply to the indicator.",
					},
				},
			},
			{
				name: "Radio.ItemText",
				description: "The text label for a radio item.",
				props: {
					children: {
						type: "Snippet",
						required: true,
						description: "The content of the label.",
					},
					class: {
						type: "string",
						description:
							"Additional classes to apply to the label.",
					},
				},
			},
			{
				name: "Radio.ItemHiddenInput",
				description:
					"A hidden input element for form submission and accessibility.",
				props: {},
			},
			{
				name: "Radio.Label",
				description: "A label for the entire radio group.",
				props: {
					children: {
						type: "Snippet",
						required: true,
						description: "The content of the group label.",
					},
					class: {
						type: "string",
						description:
							"Additional classes to apply to the label.",
					},
				},
			},
		],
	},
	args: {
		size: "md",
		variant: "solid",
		colour: "indigo",
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic radio group with default styling.",
			},
		},
	},
	render: () =>
		({
			Component: RadioWrapper,
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
			Component: RadioWrapper,
			props: { story: "controlled" },
		}) as any,
};

export const Colours: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `colour` prop to change the colour of the radio buttons.",
			},
		},
	},
	render: () =>
		({
			Component: RadioWrapper,
			props: { story: "colours" },
		}) as any,
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `size` prop to change the size of the radio buttons.",
			},
		},
	},
	render: () =>
		({
			Component: RadioWrapper,
			props: { story: "sizes" },
		}) as any,
};

export const Variants: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `variant` prop to change the visual style of the radio buttons.",
			},
		},
	},
	render: () =>
		({
			Component: RadioWrapper,
			props: { story: "variants" },
		}) as any,
};

export const Disabled: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `disabled` prop to disable a radio item or the entire group.",
			},
		},
	},
	render: () =>
		({
			Component: RadioWrapper,
			props: { story: "disabled" },
		}) as any,
};

export const Orientation: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `orientation` prop to change the layout direction of the radio group.",
			},
		},
	},
	render: () =>
		({
			Component: RadioWrapper,
			props: { story: "orientation" },
		}) as any,
};

export const WithLabel: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use `Radio.Label` to add a label to the radio group.",
			},
		},
	},
	render: () =>
		({
			Component: RadioWrapper,
			props: { story: "withLabel" },
		}) as any,
};

export const Composition: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the composition API for full control over the radio button structure.",
			},
		},
	},
	render: () =>
		({
			Component: RadioWrapper,
			props: { story: "composition" },
		}) as any,
};
