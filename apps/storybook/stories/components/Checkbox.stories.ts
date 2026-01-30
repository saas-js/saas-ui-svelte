import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Checkbox } from "$saas/components/checkbox";
import CheckboxWrapper from "../wrappers/components/Checkbox.svelte";
import {
	colours,
	checkboxVariants,
	checkboxSizes,
	commonArgTypes,
	getControls,
} from "../utils";

const meta: Meta = {
	title: "components/Checkbox",
	component: Checkbox.Root,
	argTypes: {
		checked: {
			control: "boolean",
			table: { type: { summary: "boolean | 'indeterminate'" } },
		},
		size: {
			...commonArgTypes.size,
			options: checkboxSizes,
		},
		variant: {
			...commonArgTypes.variant,
			options: checkboxVariants,
			table: { defaultValue: { summary: "solid" } },
		},
		colour: {
			...commonArgTypes.colour,
			options: colours,
			table: { defaultValue: { summary: "indigo" } },
		},
		label: {
			control: "text",
		},
		disabled: commonArgTypes.disabled,
		invalid: commonArgTypes.invalid,
		value: {
			control: "text",
		},
		class: commonArgTypes.class,
		children: commonArgTypes.children,
	},
	parameters: {
		controls: getControls([
			"checked",
			"size",
			"variant",
			"colour",
			"label",
			"disabled",
			"invalid",
			"value",
			"orientation",
			"class",
			"children",
		]),
		docs: {
			description: {
				component:
					"A form control that allows users to select one or more options from a set.",
			},
		},
		anatomy: `<script>
  import {
    Checkbox,
    CheckboxControl,
    CheckboxLabel,
    CheckboxIndicator,
    CheckboxGroup,
  } from "@saas-ui/svelte/components/checkbox";
</script>

<!-- Simple checkbox with label -->
<Checkbox.Root label="Accept terms" />

<!-- Checkbox group -->
<CheckboxGroup label="Select options">
  <Checkbox.Root label="Option 1" value="1" />
  <Checkbox.Root label="Option 2" value="2" />
  <Checkbox.Root label="Option 3" value="3" />
</CheckboxGroup>`,
		subComponents: [
			{
				name: "Checkbox.Root",
				description: "The root checkbox component.",
				props: {
					children: {
						type: "Snippet",
						description:
							"Content to render inside the checkbox (composition API).",
					},
					label: {
						type: "string",
						description:
							"The label text displayed next to the checkbox.",
					},
					class: {
						type: "string",
						description: "Additional CSS classes to apply.",
					},
					size: {
						type: '"sm" | "md" | "lg"',
						default: '"md"',
						description: "The size of the checkbox.",
					},
					variant: {
						type: '"solid" | "subtle" | "outline"',
						default: '"solid"',
						description: "The visual style of the checkbox.",
					},
					colour: {
						type: "ColourName",
						default: '"indigo"',
						description: "The colour palette of the checkbox.",
					},
					checked: {
						type: 'boolean | "indeterminate"',
						default: "false",
						description:
							"The controlled checked state of the checkbox.",
					},
					defaultChecked: {
						type: "boolean",
						description:
							"The default checked state when uncontrolled.",
					},
					value: {
						type: "string",
						description:
							"The value of the checkbox (used in groups).",
					},
					name: {
						type: "string",
						description: "The name of the input field.",
					},
					disabled: {
						type: "boolean",
						default: "false",
						description: "Whether the checkbox is disabled.",
					},
					invalid: {
						type: "boolean",
						default: "false",
						description:
							"Whether the checkbox is in an invalid state.",
					},
					required: {
						type: "boolean",
						default: "false",
						description: "Whether the checkbox is required.",
					},
					icon: {
						type: "Component<any>",
						description:
							"Custom icon component to render when checked. Auto-sized to fill the checkbox.",
					},
					onCheckedChange: {
						type: '(details: { checked: boolean | "indeterminate" }) => void',
						description:
							"Callback invoked when the checked state changes.",
					},
				},
			},
			{
				name: "Checkbox.Control",
				description:
					"The visual control element for the checkbox (the box itself).",
				props: {
					children: {
						type: "Snippet",
						required: true,
						description:
							"The content of the control (usually indicators).",
					},
					class: {
						type: "string",
						description:
							"Additional classes to apply to the control.",
					},
					checked: {
						type: 'boolean | "indeterminate"',
						default: "false",
						description: "Whether the checkbox is checked.",
					},
				},
			},
			{
				name: "Checkbox.Indicator",
				description:
					"The indicator element that shows when the checkbox is checked.",
				props: {
					children: {
						type: "Snippet",
						required: true,
						description:
							"The content of the indicator (usually an icon).",
					},
					indeterminate: {
						type: "boolean",
						default: "false",
						description:
							"Whether this indicator is for the indeterminate state.",
					},
					class: {
						type: "string",
						description:
							"Additional classes to apply to the indicator.",
					},
				},
			},
			{
				name: "Checkbox.Label",
				description: "The text label for the checkbox.",
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
				name: "Checkbox.Group",
				description:
					"A container for grouping related checkboxes with shared state.",
				props: {
					children: {
						type: "Snippet",
						description: "Content to render inside the group.",
					},
					orientation: {
						type: '"horizontal" | "vertical"',
						default: '"vertical"',
						description: "The layout orientation of the group.",
					},
					label: {
						type: "string",
						description: "The label displayed above the group.",
					},
					value: {
						type: "string[]",
						description:
							"The controlled value of the checkbox group.",
					},
					defaultValue: {
						type: "string[]",
						description:
							"The default value of the checkbox group when uncontrolled.",
					},
					name: {
						type: "string",
						description:
							"The name of the input fields in the checkbox group (useful for form submission).",
					},
					disabled: {
						type: "boolean",
						description: "Whether the checkbox group is disabled.",
					},
					readOnly: {
						type: "boolean",
						description: "Whether the checkbox group is read-only.",
					},
					invalid: {
						type: "boolean",
						description: "Whether the checkbox group is invalid.",
					},
					onValueChange: {
						type: "(value: string[]) => void",
						description: "Callback invoked when the value changes.",
					},
					class: {
						type: "string",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Checkbox.HiddenInput",
				description:
					"A hidden input element for form submission and accessibility.",
				props: {},
			},
		],
	},
	args: {
		size: "md",
		variant: "solid",
		colour: "indigo",
		label: "Accept terms and conditions",
		checked: false,
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic checkbox with label and default styling.",
			},
		},
	},
	render: () =>
		({
			Component: CheckboxWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Variants: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `variant` prop to change the visual style. Available variants: `outline`, `subtle`, `solid`.",
			},
		},
	},
	render: () =>
		({
			Component: CheckboxWrapper,
			props: { story: "variants" },
		}) as any,
};

export const Controlled: Story = {
	parameters: {
		docs: {
			description: {
				story: "Controlled checkbox with bound `checked` state for programmatic control.",
			},
		},
	},
	render: () =>
		({
			Component: CheckboxWrapper,
			props: { story: "controlled" },
		}) as any,
};

export const Colours: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `colour` prop to change the colour scheme. Supports all standard colour palettes.",
			},
		},
	},
	render: () =>
		({
			Component: CheckboxWrapper,
			props: { story: "colours" },
		}) as any,
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `size` prop to change the size of the checkbox. Available sizes: `sm`, `md`, `lg`.",
			},
		},
	},
	render: () =>
		({
			Component: CheckboxWrapper,
			props: { story: "sizes" },
		}) as any,
};

export const States: Story = {
	parameters: {
		docs: {
			description: {
				story: "Checkbox states including `disabled` and `invalid` for form validation.",
			},
		},
	},
	render: () =>
		({
			Component: CheckboxWrapper,
			props: { story: "states" },
		}) as any,
};

export const Group: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use `Checkbox.Group` to group related checkboxes with shared state management.",
			},
		},
	},
	render: () =>
		({
			Component: CheckboxWrapper,
			props: { story: "group" },
		}) as any,
};

export const CustomIcon: Story = {
	parameters: {
		docs: {
			description: {
				story: "Checkbox with a custom icon instead of the default checkmark.",
			},
		},
	},
	render: () =>
		({
			Component: CheckboxWrapper,
			props: { story: "customIcon" },
		}) as any,
};

export const Indeterminate: Story = {
	parameters: {
		docs: {
			description: {
				story: "Indeterminate state for parent checkbox when only some child checkboxes are selected.",
			},
		},
	},
	render: () =>
		({
			Component: CheckboxWrapper,
			props: { story: "indeterminate" },
		}) as any,
};

export const Description: Story = {
	parameters: {
		docs: {
			description: {
				story: "Checkbox with additional description text for extra context.",
			},
		},
	},
	render: () =>
		({
			Component: CheckboxWrapper,
			props: { story: "description" },
		}) as any,
};

export const WithLink: Story = {
	parameters: {
		docs: {
			description: {
				story: "Checkbox with a link in the label for terms and conditions scenarios.",
			},
		},
	},
	render: () =>
		({
			Component: CheckboxWrapper,
			props: { story: "link" },
		}) as any,
};
