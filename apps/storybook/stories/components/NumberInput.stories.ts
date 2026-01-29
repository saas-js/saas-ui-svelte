import type { Meta, StoryObj } from "@storybook/sveltekit";
import { NumberInput } from "$saas/components/number-input";
import NumberInputWrapper from "../wrappers/components/NumberInput.svelte";

const numberInputSizes = ["xs", "sm", "md", "lg"] as const;
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
	title: "components/Number Input",
	component: NumberInput,
	argTypes: {
		size: {
			control: "select",
			options: numberInputSizes,
			description: "The size of the component.",
			table: { defaultValue: { summary: "md" } },
		},
		colour: {
			control: "select",
			options: colours,
			description: "The colour theme of the component.",
			table: { defaultValue: { summary: "gray" } },
		},
		invalid: {
			control: "boolean",
			description: "Whether the component is in an invalid state.",
			table: { defaultValue: { summary: "false" } },
		},
		disabled: {
			control: "boolean",
			description: "Whether the component is disabled.",
			table: { defaultValue: { summary: "false" } },
		},
		placeholder: {
			control: "text",
			description: "Placeholder text for the input.",
		},
		min: {
			control: "number",
			description: "The minimum value allowed.",
		},
		max: {
			control: "number",
			description: "The maximum value allowed.",
		},
		step: {
			control: "number",
			description: "The step increment/decrement value.",
			table: { defaultValue: { summary: "1" } },
		},
		defaultValue: {
			control: "text",
			description: "The default value of the number input.",
		},
		allowMouseWheel: {
			control: "boolean",
			description: "Whether to allow mouse wheel to change the value.",
			table: { defaultValue: { summary: "false" } },
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
					"An input component for entering numeric values with increment and decrement controls.",
			},
		},
		anatomy: `<script>
  import { NumberInput } from "@saas-ui/svelte/components/number-input";
</script>

<NumberInput
  min={0}
  max={100}
  step={1}
  defaultValue="10"
/>`,
		subComponents: [
			{
				name: "NumberInput",
				description:
					"A complete number input component with increment/decrement controls.",
				props: {
					size: {
						type: '"xs" | "sm" | "md" | "lg"',
						default: '"md"',
						description: "The size of the number input.",
					},
					colour: {
						type: "ColourName",
						default: '"gray"',
						description: "The colour theme of the number input.",
					},
					invalid: {
						type: "boolean",
						default: "false",
						description: "Whether the number input is in an invalid state.",
					},
					disabled: {
						type: "boolean",
						default: "false",
						description: "Whether the number input is disabled.",
					},
					placeholder: {
						type: "string",
						default: "-",
						description: "Placeholder text for the input.",
					},
					value: {
						type: "string",
						default: "-",
						description: "The current value of the number input.",
					},
					defaultValue: {
						type: "string",
						default: "-",
						description: "The default value of the number input.",
					},
					onValueChange: {
						type: "(details: { value: string; valueAsNumber: number }) => void",
						default: "-",
						description: "Callback when the value changes.",
					},
					min: {
						type: "number",
						default: "-",
						description: "The minimum value allowed.",
					},
					max: {
						type: "number",
						default: "-",
						description: "The maximum value allowed.",
					},
					step: {
						type: "number",
						default: "1",
						description: "The step increment/decrement value.",
					},
					allowMouseWheel: {
						type: "boolean",
						default: "false",
						description: "Whether to allow mouse wheel to change the value.",
					},
					clampValueOnBlur: {
						type: "boolean",
						default: "true",
						description:
							"Whether to clamp the value when the input loses focus.",
					},
					allowOverflow: {
						type: "boolean",
						default: "false",
						description:
							"Whether to allow the value to overflow the min/max range.",
					},
					spinOnPress: {
						type: "boolean",
						default: "true",
						description:
							"Whether to spin the value when the increment/decrement button is pressed.",
					},
					inputMode: {
						type: '"text" | "decimal" | "numeric"',
						default: '"decimal"',
						description: "The input mode for the input element.",
					},
					locale: {
						type: "string",
						default: '"en-US"',
						description: "The locale for formatting.",
					},
					formatOptions: {
						type: "Intl.NumberFormatOptions",
						default: "-",
						description: "Format options for Intl.NumberFormat.",
					},
					name: {
						type: "string",
						default: "-",
						description: "The name attribute for form submission.",
					},
					required: {
						type: "boolean",
						default: "false",
						description: "Whether the input is required.",
					},
					readOnly: {
						type: "boolean",
						default: "false",
						description: "Whether the input is read-only.",
					},
					"aria-label": {
						type: "string",
						default: "-",
						description: "Accessible label for the input (for screen readers).",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
					style: {
						type: "string",
						default: "-",
						description: "Inline styles.",
					},
					id: {
						type: "string",
						default: "-",
						description: "The id of the input element.",
					},
				},
			},
		],
	},
	args: {
		size: "md",
		colour: "gray",
		defaultValue: "10",
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic number input with default styling and increment/decrement buttons.",
			},
		},
	},
	render: () =>
		({
			Component: NumberInputWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Number input in different sizes. Available sizes: `xs`, `sm`, `md`, `lg`.",
			},
		},
	},
	render: () =>
		({
			Component: NumberInputWrapper,
			props: { story: "sizes" },
		}) as any,
};

export const MinAndMax: Story = {
	parameters: {
		docs: {
			description: {
				story: "Number input with `min` and `max` constraints to limit the value range.",
			},
		},
	},
	render: () =>
		({
			Component: NumberInputWrapper,
			props: { story: "minMax" },
		}) as any,
};

export const Step: Story = {
	parameters: {
		docs: {
			description: {
				story: "Number input with custom `step` value for increment/decrement operations.",
			},
		},
	},
	render: () =>
		({
			Component: NumberInputWrapper,
			props: { story: "step" },
		}) as any,
};

export const MouseWheel: Story = {
	parameters: {
		docs: {
			description: {
				story: "Number input with mouse wheel support enabled via `allowMouseWheel` prop.",
			},
		},
	},
	render: () =>
		({
			Component: NumberInputWrapper,
			props: { story: "mouseWheel" },
		}) as any,
};

export const Disabled: Story = {
	parameters: {
		docs: {
			description: {
				story: "Disabled number input that prevents user interaction.",
			},
		},
	},
	render: () =>
		({
			Component: NumberInputWrapper,
			props: { story: "disabled" },
		}) as any,
};

export const Invalid: Story = {
	parameters: {
		docs: {
			description: {
				story: "Invalid number input state for displaying validation errors.",
			},
		},
	},
	render: () =>
		({
			Component: NumberInputWrapper,
			props: { story: "invalid" },
		}) as any,
};

export const WithField: Story = {
	parameters: {
		docs: {
			description: {
				story: "Number input with `Field` wrapper for label and helper text support.",
			},
		},
	},
	render: () =>
		({
			Component: NumberInputWrapper,
			props: { story: "withField" },
		}) as any,
};

export const FormatPercent: Story = {
	parameters: {
		docs: {
			description: {
				story: "Number input with value formatted as percentage.",
			},
		},
	},
	render: () =>
		({
			Component: NumberInputWrapper,
			props: { story: "formatPercent" },
		}) as any,
};

export const FormatCurrency: Story = {
	parameters: {
		docs: {
			description: {
				story: "Number input with value formatted as currency.",
			},
		},
	},
	render: () =>
		({
			Component: NumberInputWrapper,
			props: { story: "formatCurrency" },
		}) as any,
};

export const FormatUnit: Story = {
	parameters: {
		docs: {
			description: {
				story: "Number input with value formatted with a unit suffix.",
			},
		},
	},
	render: () =>
		({
			Component: NumberInputWrapper,
			props: { story: "formatUnit" },
		}) as any,
};

export const Colours: Story = {
	parameters: {
		docs: {
			description: {
				story: "Number input with different colour schemes using the `colour` prop.",
			},
		},
	},
	render: () =>
		({
			Component: NumberInputWrapper,
			props: { story: "colours" },
		}) as any,
};
