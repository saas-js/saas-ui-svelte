import type { Meta, StoryObj } from "@storybook/sveltekit";
import { PasswordInput } from "$saas/components/password-input";
import PasswordInputWrapper from "../wrappers/components/PasswordInput.svelte";

const passwordInputSizes = ["xs", "sm", "md", "lg"] as const;
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
	title: "components/Password Input",
	component: PasswordInput,
	argTypes: {
		size: {
			control: "select",
			options: passwordInputSizes,
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
		class: {
			control: "text",
			description: "Additional CSS classes to apply.",
		},
	},
	parameters: {
		docs: {
			description: {
				component:
					"A password input component with a visibility toggle button to show or hide the entered password.",
			},
		},
		anatomy: `<script>
  import { PasswordInput } from "@saas-ui/svelte/components/password-input";
</script>

<PasswordInput placeholder="Enter your password" />`,
	},
	args: {
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
				story: "Basic password input with visibility toggle button.",
			},
		},
	},
	render: () =>
		({
			Component: PasswordInputWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Password input in different sizes. Available sizes: `xs`, `sm`, `md`, `lg`.",
			},
		},
	},
	render: () =>
		({
			Component: PasswordInputWrapper,
			props: { story: "sizes" },
		}) as any,
};

export const Controlled: Story = {
	parameters: {
		docs: {
			description: {
				story: "Controlled password input with external value management.",
			},
		},
	},
	render: () =>
		({
			Component: PasswordInputWrapper,
			props: { story: "controlled" },
		}) as any,
};

export const ControlledVisibility: Story = {
	parameters: {
		docs: {
			description: {
				story: "Controlled visibility state to programmatically show or hide the password.",
			},
		},
	},
	render: () =>
		({
			Component: PasswordInputWrapper,
			props: { story: "controlledVisibility" },
		}) as any,
};

export const WithField: Story = {
	parameters: {
		docs: {
			description: {
				story: "Password input with `Field` wrapper for label and helper text support.",
			},
		},
	},
	render: () =>
		({
			Component: PasswordInputWrapper,
			props: { story: "withField" },
		}) as any,
};

export const Disabled: Story = {
	parameters: {
		docs: {
			description: {
				story: "Disabled password input that prevents user interaction.",
			},
		},
	},
	render: () =>
		({
			Component: PasswordInputWrapper,
			props: { story: "disabled" },
		}) as any,
};

export const Invalid: Story = {
	parameters: {
		docs: {
			description: {
				story: "Invalid password input state for displaying validation errors.",
			},
		},
	},
	render: () =>
		({
			Component: PasswordInputWrapper,
			props: { story: "invalid" },
		}) as any,
};

export const Colours: Story = {
	parameters: {
		docs: {
			description: {
				story: "Password input with different colour schemes using the `colour` prop.",
			},
		},
	},
	render: () =>
		({
			Component: PasswordInputWrapper,
			props: { story: "colours" },
		}) as any,
};
