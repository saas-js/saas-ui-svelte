import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Form } from "$saas/components/form";
import FormWrapper from "../wrappers/components/Form.svelte";
import { commonArgTypes, getControls } from "../utils";

const meta: Meta = {
	title: "components/Form",
	component: Form,
	argTypes: {
		children: commonArgTypes.children,
		class: commonArgTypes.class,
	},
	parameters: {
		controls: getControls(["children", "class"]),
		docs: {
			description: {
				component:
					"A form component with built-in validation support and field management.",
			},
		},
		anatomy: `<script>
  import {
    Form,
    FormField,
    SubmitButton,
    DisplayIf,
  } from "@saas-ui/svelte/components/form";
</script>

<Form onSubmit={handleSubmit}>
  <FormField name="email" label="Email" type="email" />
  <FormField name="password" label="Password" type="password" />
  <DisplayIf name="showExtra" condition={(value) => value}>
    <FormField name="extra" label="Extra Field" />
  </DisplayIf>
  <SubmitButton>Submit</SubmitButton>
</Form>`,
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic `Form` with a single field and submit button.",
			},
		},
	},
	render: () =>
		({
			Component: FormWrapper,
			props: { story: "basic" },
		}) as any,
};

export const WithValidation: Story = {
	parameters: {
		docs: {
			description: {
				story: "`Form` with `Zod` schema validation.",
			},
		},
	},
	render: () =>
		({
			Component: FormWrapper,
			props: { story: "withValidation" },
		}) as any,
};

export const FieldTypes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Showcase of all available `FormField` types.",
			},
		},
	},
	render: () =>
		({
			Component: FormWrapper,
			props: { story: "fieldTypes" },
		}) as any,
};

export const ConditionalFields: Story = {
	parameters: {
		docs: {
			description: {
				story: "Conditional field rendering with `DisplayIf`.",
			},
		},
	},
	render: () =>
		({
			Component: FormWrapper,
			props: { story: "conditionalFields" },
		}) as any,
};

export const SubmitOptions: Story = {
	parameters: {
		docs: {
			description: {
				story: "Different `SubmitButton` options.",
			},
		},
	},
	render: () =>
		({
			Component: FormWrapper,
			props: { story: "submitOptions" },
		}) as any,
};
