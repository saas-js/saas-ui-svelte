import type { Meta, StoryObj } from "@storybook/sveltekit";
import { PinInput } from "$saas/components/pin-input";
import PinInputWrapper from "../wrappers/components/PinInput.svelte";

const pinInputSizes = ["xs", "sm", "md", "lg"] as const;
const inputVariants = ["outline", "subtle", "flushed"] as const;
const pinInputTypes = ["numeric", "alphabetic", "alphanumeric"] as const;
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
	title: "components/Pin Input",
	component: PinInput,
	parameters: {
		docs: {
			description: {
				component:
					"A pin input component for entering verification codes, PINs, or OTP values with individual character inputs.",
			},
		},
		anatomy: `<script>
  import { PinInput } from "@saas-ui/svelte/components/pin-input";
</script>

<PinInput count={4} otp />`,
		subComponents: [
			{
				name: "PinInput",
				description:
					"A composed pin input component that renders individual character inputs for entering codes.",
				props: {
					variant: {
						type: '"outline" | "subtle" | "flushed"',
						default: '"outline"',
						description: "The visual style of the pin input.",
					},
					size: {
						type: '"xs" | "sm" | "md" | "lg"',
						default: '"md"',
						description: "The size of the pin input.",
					},
					colour: {
						type: "ColourName",
						default: '"gray"',
						description: "The colour theme of the pin input.",
					},
					invalid: {
						type: "boolean",
						default: "false",
						description:
							"Whether the pin input is in an invalid state.",
					},
					disabled: {
						type: "boolean",
						default: "false",
						description: "Whether the pin input is disabled.",
					},
					placeholder: {
						type: "string",
						default: '"○"',
						description: "The placeholder text for each input.",
					},
					value: {
						type: "string[]",
						default: "-",
						description:
							"The current value of the pin input (bindable).",
					},
					defaultValue: {
						type: "string[]",
						default: "-",
						description: "The default value of the pin input.",
					},
					onValueChange: {
						type: "(details: { value: string[]; valueAsString: string }) => void",
						default: "-",
						description: "Callback when the value changes.",
					},
					onValueComplete: {
						type: "(details: { value: string[]; valueAsString: string }) => void",
						default: "-",
						description:
							"Callback when all inputs have valid values.",
					},
					onValueInvalid: {
						type: "(details: { value: string; index: number }) => void",
						default: "-",
						description:
							"Callback when an invalid value is entered.",
					},
					count: {
						type: "number",
						default: "4",
						description: "The number of pin inputs to render.",
					},
					type: {
						type: '"numeric" | "alphabetic" | "alphanumeric"',
						default: '"numeric"',
						description:
							"The type of value the pin input should allow.",
					},
					otp: {
						type: "boolean",
						default: "false",
						description:
							"Whether the pin input is in one-time code (OTP) mode.",
					},
					mask: {
						type: "boolean",
						default: "false",
						description:
							"Whether to mask the input value (like password).",
					},
					attached: {
						type: "boolean",
						default: "false",
						description:
							"Whether the inputs are visually attached to each other.",
					},
					autoFocus: {
						type: "boolean",
						default: "false",
						description: "Whether to auto-focus the first input.",
					},
					blurOnComplete: {
						type: "boolean",
						default: "false",
						description: "Whether to blur on complete.",
					},
					selectOnFocus: {
						type: "boolean",
						default: "true",
						description: "Whether to select input value on focus.",
					},
					name: {
						type: "string",
						default: "-",
						description: "The name attribute for form submission.",
					},
					required: {
						type: "boolean",
						default: "false",
						description: "Whether the pin input is required.",
					},
					readOnly: {
						type: "boolean",
						default: "false",
						description: "Whether the pin input is read-only.",
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
						description: "The id of the pin input.",
					},
					"aria-label": {
						type: "string",
						default: "-",
						description:
							"Accessible label for the pin input group.",
					},
				},
			},
		],
	},
	argTypes: {
		variant: {
			control: "select",
			options: inputVariants,
			description: "The visual style of the component.",
			table: { defaultValue: { summary: "outline" } },
		},
		size: {
			control: "select",
			options: pinInputSizes,
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
			description: "Placeholder text for each input.",
			table: { defaultValue: { summary: "circle" } },
		},
		count: {
			control: "number",
			description: "The number of pin inputs to render.",
			table: { defaultValue: { summary: "4" } },
		},
		type: {
			control: "select",
			options: pinInputTypes,
			description: "The type of value the pin input should allow.",
			table: { defaultValue: { summary: "numeric" } },
		},
		otp: {
			control: "boolean",
			description: "Whether the pin input is in OTP mode.",
			table: { defaultValue: { summary: "false" } },
		},
		mask: {
			control: "boolean",
			description: "Whether to mask the input value.",
			table: { defaultValue: { summary: "false" } },
		},
		attached: {
			control: "boolean",
			description: "Whether the inputs are visually attached.",
			table: { defaultValue: { summary: "false" } },
		},
		class: {
			control: "text",
			description: "Additional CSS classes to apply.",
		},
	},
	args: {
		variant: "outline",
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
				story: "Basic pin input with default styling and four character inputs.",
			},
		},
	},
	render: () =>
		({
			Component: PinInputWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Pin input in different sizes. Available sizes: `xs`, `sm`, `md`, `lg`.",
			},
		},
	},
	render: () =>
		({
			Component: PinInputWrapper,
			props: { story: "sizes" },
		}) as any,
};

export const Variants: Story = {
	parameters: {
		docs: {
			description: {
				story: "Pin input with different variants. Available variants: `outline`, `subtle`, `flushed`.",
			},
		},
	},
	render: () =>
		({
			Component: PinInputWrapper,
			props: { story: "variants" },
		}) as any,
};

export const OneTimeCode: Story = {
	parameters: {
		docs: {
			description: {
				story: "Pin input in OTP mode for one-time codes with autocomplete support.",
			},
		},
	},
	render: () =>
		({
			Component: PinInputWrapper,
			props: { story: "oneTimeCode" },
		}) as any,
};

export const Mask: Story = {
	parameters: {
		docs: {
			description: {
				story: "Pin input with masked values for sensitive codes like PINs.",
			},
		},
	},
	render: () =>
		({
			Component: PinInputWrapper,
			props: { story: "mask" },
		}) as any,
};

export const Placeholder: Story = {
	parameters: {
		docs: {
			description: {
				story: "Pin input with custom placeholder characters.",
			},
		},
	},
	render: () =>
		({
			Component: PinInputWrapper,
			props: { story: "placeholder" },
		}) as any,
};

export const WithField: Story = {
	parameters: {
		docs: {
			description: {
				story: "Pin input with `Field` wrapper for label and helper text support.",
			},
		},
	},
	render: () =>
		({
			Component: PinInputWrapper,
			props: { story: "withField" },
		}) as any,
};

export const Controlled: Story = {
	parameters: {
		docs: {
			description: {
				story: "Controlled pin input with external state management.",
			},
		},
	},
	render: () =>
		({
			Component: PinInputWrapper,
			props: { story: "controlled" },
		}) as any,
};

export const Attached: Story = {
	parameters: {
		docs: {
			description: {
				story: "Pin input with visually attached inputs using the `attached` prop.",
			},
		},
	},
	render: () =>
		({
			Component: PinInputWrapper,
			props: { story: "attached" },
		}) as any,
};

export const Alphanumeric: Story = {
	parameters: {
		docs: {
			description: {
				story: "Pin input with different input types: `numeric`, `alphabetic`, or `alphanumeric`.",
			},
		},
	},
	render: () =>
		({
			Component: PinInputWrapper,
			props: { story: "alphanumeric" },
		}) as any,
};

export const Disabled: Story = {
	parameters: {
		docs: {
			description: {
				story: "Disabled pin input that prevents user interaction.",
			},
		},
	},
	render: () =>
		({
			Component: PinInputWrapper,
			props: { story: "disabled" },
		}) as any,
};

export const Invalid: Story = {
	parameters: {
		docs: {
			description: {
				story: "Invalid pin input state for displaying validation errors.",
			},
		},
	},
	render: () =>
		({
			Component: PinInputWrapper,
			props: { story: "invalid" },
		}) as any,
};

export const Colours: Story = {
	parameters: {
		docs: {
			description: {
				story: "Pin input with different colour schemes using the `colour` prop.",
			},
		},
	},
	render: () =>
		({
			Component: PinInputWrapper,
			props: { story: "colours" },
		}) as any,
};

export const Count: Story = {
	parameters: {
		docs: {
			description: {
				story: "Pin input with different counts of character inputs.",
			},
		},
	},
	render: () =>
		({
			Component: PinInputWrapper,
			props: { story: "count" },
		}) as any,
};
