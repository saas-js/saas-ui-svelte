import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Editable } from "$saas/components/editable";
import EditableWrapper from "../wrappers/components/Editable.svelte";
import {
	commonArgTypes,
	getControls,
	colours,
	editableSizes,
	editableActivationModes,
} from "../utils";

const meta: Meta = {
	title: "components/Editable",
	component: Editable.Root,
	argTypes: {
		size: {
			...commonArgTypes.size,
			options: editableSizes,
		},
		colour: {
			...commonArgTypes.colour,
			options: colours,
		},
		disabled: commonArgTypes.disabled,
		invalid: commonArgTypes.invalid,
		activationMode: {
			control: "select",
			options: editableActivationModes,
		},
		class: commonArgTypes.class,
	},
	parameters: {
		controls: getControls([
			"size",
			"colour",
			"disabled",
			"invalid",
			"activationMode",
			"class",
		]),
		docs: {
			description: {
				component:
					"An inline text component that switches between display and edit modes for in-place editing.",
			},
		},
		anatomy: `<script>
  import {
    Editable,
    EditableArea,
    EditablePreview,
    EditableInput,
    EditableTextarea,
    EditableControl,
    EditableEditTrigger,
    EditableSubmitTrigger,
    EditableCancelTrigger,
    EditableLabel,
  } from "@saas-ui/svelte/components/editable";
</script>

<Editable.Root defaultValue="Click to edit">
  <Editable.Label>Name</Editable.Label>
  <Editable.Area>
    <Editable.Input />
    <Editable.Preview />
  </Editable.Area>
  <Editable.Control>
    <Editable.EditTrigger>Edit</Editable.EditTrigger>
    <Editable.CancelTrigger>Cancel</Editable.CancelTrigger>
    <Editable.SubmitTrigger>Save</Editable.SubmitTrigger>
  </Editable.Control>
</Editable.Root>`,
		subComponents: [
			{
				name: "Editable.Root",
				description: "The root container component for the editable.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description:
							"The content to render inside the editable.",
					},
					activationMode: {
						type: '"focus" | "dblclick" | "click" | "none"',
						default: '"focus"',
						description:
							"The activation mode for entering edit mode.",
					},
					autoResize: {
						type: "boolean",
						default: "false",
						description:
							"Whether to auto-resize the input to fit content.",
					},
					defaultValue: {
						type: "string",
						default: "-",
						description: "The initial value when uncontrolled.",
					},
					value: {
						type: "string",
						default: "-",
						description: "The controlled value.",
					},
					onValueChange: {
						type: "(details: { value: string }) => void",
						default: "-",
						description: "Called when the value changes.",
					},
					onValueCommit: {
						type: "(details: { value: string }) => void",
						default: "-",
						description:
							"Called when the value is committed (submitted).",
					},
					onValueRevert: {
						type: "(details: { value: string }) => void",
						default: "-",
						description:
							"Called when the value is reverted (cancelled).",
					},
					onEditChange: {
						type: "(details: { edit: boolean }) => void",
						default: "-",
						description: "Called when edit mode changes.",
					},
					placeholder: {
						type: "string | { edit: string; preview: string }",
						default: "-",
						description: "Placeholder text when empty.",
					},
					maxLength: {
						type: "number",
						default: "-",
						description: "Maximum number of characters allowed.",
					},
					selectOnFocus: {
						type: "boolean",
						default: "true",
						description: "Whether to select text on focus.",
					},
					submitMode: {
						type: '"enter" | "blur" | "none" | "both"',
						default: '"both"',
						description: "How to submit the value.",
					},
					disabled: {
						type: "boolean",
						default: "false",
						description: "Whether the editable is disabled.",
					},
					readOnly: {
						type: "boolean",
						default: "false",
						description: "Whether the editable is read-only.",
					},
					required: {
						type: "boolean",
						default: "false",
						description: "Whether the editable is required.",
					},
					invalid: {
						type: "boolean",
						default: "false",
						description: "Whether the editable is invalid.",
					},
					size: {
						type: '"xs" | "sm" | "md" | "lg"',
						default: '"md"',
						description: "The size of the editable.",
					},
					colour: {
						type: "ColourName",
						default: '"gray"',
						description: "The colour theme for focus states.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes.",
					},
					style: {
						type: "string",
						default: "-",
						description: "Additional inline styles.",
					},
					name: {
						type: "string",
						default: "-",
						description: "The name attribute for form submission.",
					},
					form: {
						type: "string",
						default: "-",
						description: "The form ID for form association.",
					},
				},
			},
			{
				name: "Editable.Area",
				description: "Container for the preview and input elements.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The content to render inside the area.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes.",
					},
				},
			},
			{
				name: "Editable.Preview",
				description:
					"Displays the current value when not in edit mode.",
				props: {
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes.",
					},
				},
			},
			{
				name: "Editable.Input",
				description: "Single-line text input for editing the value.",
				props: {
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes.",
					},
					style: {
						type: "string",
						default: "-",
						description: "Additional inline styles.",
					},
				},
			},
			{
				name: "Editable.Textarea",
				description: "Multi-line text input for editing the value.",
				props: {
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes.",
					},
					style: {
						type: "string",
						default: "-",
						description: "Additional inline styles.",
					},
					rows: {
						type: "number",
						default: "2",
						description: "Number of rows for the textarea.",
					},
				},
			},
			{
				name: "Editable.Label",
				description: "Label element for the editable input.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The label content.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes.",
					},
				},
			},
			{
				name: "Editable.Control",
				description:
					"Container for edit, cancel, and submit trigger buttons.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description:
							"The content to render inside the control.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes.",
					},
				},
			},
			{
				name: "Editable.EditTrigger",
				description: "Button to enter edit mode.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description:
							"The content to render inside the trigger.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes.",
					},
					variant: {
						type: "ButtonVariants['variant']",
						default: '"ghost"',
						description: "Button variant.",
					},
					size: {
						type: "ButtonVariants['size']",
						default: '"xs"',
						description: "Button size.",
					},
					colour: {
						type: "ColourName",
						default: '"gray"',
						description: "Button colour.",
					},
					icon: {
						type: "boolean",
						default: "false",
						description: "Whether this is an icon-only button.",
					},
					style: {
						type: "string",
						default: "-",
						description: "Additional inline styles.",
					},
				},
			},
			{
				name: "Editable.CancelTrigger",
				description: "Button to cancel editing and revert changes.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description:
							"The content to render inside the trigger.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes.",
					},
					variant: {
						type: "ButtonVariants['variant']",
						default: '"outline"',
						description: "Button variant.",
					},
					size: {
						type: "ButtonVariants['size']",
						default: '"xs"',
						description: "Button size.",
					},
					colour: {
						type: "ColourName",
						default: '"gray"',
						description: "Button colour.",
					},
					icon: {
						type: "boolean",
						default: "false",
						description: "Whether this is an icon-only button.",
					},
					style: {
						type: "string",
						default: "-",
						description: "Additional inline styles.",
					},
				},
			},
			{
				name: "Editable.SubmitTrigger",
				description: "Button to submit and commit the edited value.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description:
							"The content to render inside the trigger.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes.",
					},
					variant: {
						type: "ButtonVariants['variant']",
						default: '"outline"',
						description: "Button variant.",
					},
					size: {
						type: "ButtonVariants['size']",
						default: '"xs"',
						description: "Button size.",
					},
					colour: {
						type: "ColourName",
						default: '"gray"',
						description: "Button colour.",
					},
					icon: {
						type: "boolean",
						default: "false",
						description: "Whether this is an icon-only button.",
					},
					style: {
						type: "string",
						default: "-",
						description: "Additional inline styles.",
					},
				},
			},
		],
	},
	args: {
		size: "md",
		colour: "gray",
		activationMode: "focus",
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic editable text with default styling.",
			},
		},
	},
	render: () =>
		({
			Component: EditableWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Controlled: Story = {
	parameters: {
		docs: {
			description: {
				story: "Controlled editable component with external state management.",
			},
		},
	},
	render: () =>
		({
			Component: EditableWrapper,
			props: { story: "controlled" },
		}) as any,
};

export const WithDoubleClick: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Use `activationMode="dblclick"` to require a double-click to enter edit mode.',
			},
		},
	},
	render: () =>
		({
			Component: EditableWrapper,
			props: { story: "doubleClick" },
		}) as any,
};

export const Disabled: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `disabled` prop to disable the editable component.",
			},
		},
	},
	render: () =>
		({
			Component: EditableWrapper,
			props: { story: "disabled" },
		}) as any,
};

export const Invalid: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `invalid` prop to show an invalid state.",
			},
		},
	},
	render: () =>
		({
			Component: EditableWrapper,
			props: { story: "invalid" },
		}) as any,
};

export const Textarea: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use `Editable.Textarea` for multi-line editing.",
			},
		},
	},
	render: () =>
		({
			Component: EditableWrapper,
			props: { story: "textarea" },
		}) as any,
};

export const WithControls: Story = {
	parameters: {
		docs: {
			description: {
				story: "Add edit, cancel, and submit controls with `Editable.Control`.",
			},
		},
	},
	render: () =>
		({
			Component: EditableWrapper,
			props: { story: "withControls" },
		}) as any,
};

export const Colours: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `colour` prop to change the colour scheme.",
			},
		},
	},
	render: () =>
		({
			Component: EditableWrapper,
			props: { story: "colours" },
		}) as any,
};
