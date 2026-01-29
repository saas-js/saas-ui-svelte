import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Field } from "$saas/components/field";
import FieldWrapper from "../wrappers/components/Field.svelte";
import { commonArgTypes, getControls } from "../utils";

const meta: Meta = {
	title: "components/Field",
	component: Field.Root,
	argTypes: {
		disabled: commonArgTypes.disabled,
		invalid: commonArgTypes.invalid,
		required: {
			control: "boolean",
			table: { defaultValue: { summary: "false" } },
		},
		readOnly: {
			control: "boolean",
			table: { defaultValue: { summary: "false" } },
		},
		children: commonArgTypes.children,
		class: commonArgTypes.class,
	},
	parameters: {
		controls: getControls([
			"disabled",
			"invalid",
			"required",
			"readOnly",
			"children",
			"class",
		]),
		docs: {
			description: {
				component: "A wrapper component that provides consistent structure and accessibility for form inputs with labels, helper text, and error messages.",
			},
		},
		anatomy: `<script>
  import {
    Field,
    FieldLabel,
    FieldHelperText,
    FieldErrorText,
  } from "@saas-ui/svelte/components/field";
  import { Input } from "@saas-ui/svelte/components/input";
</script>

<Field.Root>
  <Field.Label>Email</Field.Label>
  <Input placeholder="Enter your email" />
  <Field.HelperText>We'll never share your email.</Field.HelperText>
  <Field.ErrorText>Email is required</Field.ErrorText>
</Field.Root>`,
	},
	args: {
		disabled: false,
		invalid: false,
		required: false,
		readOnly: false,
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic field with a label and input.",
			},
		},
	},
	render: () =>
		({
			Component: FieldWrapper,
			props: { story: "basic" },
		}) as any,
};

export const HelperText: Story = {
	parameters: {
		docs: {
			description: {
				story: "Field with helper text to provide additional context.",
			},
		},
	},
	render: () =>
		({
			Component: FieldWrapper,
			props: { story: "helperText" },
		}) as any,
};

export const ErrorText: Story = {
	parameters: {
		docs: {
			description: {
				story: "Field in an `invalid` state with error text.",
			},
		},
	},
	render: () =>
		({
			Component: FieldWrapper,
			props: { story: "errorText" },
		}) as any,
};

export const Disabled: Story = {
	parameters: {
		docs: {
			description: {
				story: "Field in a `disabled` state.",
			},
		},
	},
	render: () =>
		({
			Component: FieldWrapper,
			props: { story: "disabled" },
		}) as any,
};

export const Textarea: Story = {
	parameters: {
		docs: {
			description: {
				story: "Field with a `Textarea` input.",
			},
		},
	},
	render: () =>
		({
			Component: FieldWrapper,
			props: { story: "textarea" },
		}) as any,
};

export const NativeSelect: Story = {
	parameters: {
		docs: {
			description: {
				story: "Field with a `NativeSelect` element.",
			},
		},
	},
	render: () =>
		({
			Component: FieldWrapper,
			props: { story: "nativeSelect" },
		}) as any,
};
