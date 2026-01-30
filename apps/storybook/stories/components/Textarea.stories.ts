import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Textarea } from "$saas/components/textarea";
import TextareaWrapper from "../wrappers/components/Textarea.svelte";

const inputVariants = ["outline", "subtle", "flushed"] as const;
const textareaSizes = ["xs", "sm", "md", "lg", "xl"] as const;

const meta: Meta = {
	title: "components/Textarea",
	component: Textarea,
	argTypes: {
		variant: {
			control: "select",
			options: inputVariants,
			description: "The visual style of the textarea.",
			table: { defaultValue: { summary: "outline" } },
		},
		size: {
			control: "select",
			options: textareaSizes,
			description: "The size of the textarea.",
			table: { defaultValue: { summary: "md" } },
		},
		invalid: {
			control: "boolean",
			description: "Whether the textarea is in an invalid state.",
			table: { defaultValue: { summary: "false" } },
		},
		disabled: {
			control: "boolean",
			description: "Whether the textarea is disabled.",
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
					"A multi-line text input field for longer form content.",
			},
		},
		anatomy: `<script>
  import { Textarea } from "@saas-ui/svelte/components/textarea";
</script>

<Textarea placeholder="Enter description..." />

<!-- Auto-resizing textarea -->
<Textarea.Autoresize placeholder="Auto-grows as you type..." />`,
	},
	args: {
		variant: "outline",
		size: "md",
		invalid: false,
		disabled: false,
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic textarea with default styling.",
			},
		},
	},
	render: () =>
		({
			Component: TextareaWrapper,
			props: { story: "basic" },
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
			Component: TextareaWrapper,
			props: { story: "variants" },
		}) as any,
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `size` prop to change the size of the textarea.",
			},
		},
	},
	render: () =>
		({
			Component: TextareaWrapper,
			props: { story: "sizes" },
		}) as any,
};

export const HelperText: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use `Field.HelperText` to add helper text below the textarea.",
			},
		},
	},
	render: () =>
		({
			Component: TextareaWrapper,
			props: { story: "helperText" },
		}) as any,
};

export const ErrorText: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use `Field.ErrorText` to show validation errors.",
			},
		},
	},
	render: () =>
		({
			Component: TextareaWrapper,
			props: { story: "errorText" },
		}) as any,
};

export const Field: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use `Field.Root` to wrap the textarea with label and helper text.",
			},
		},
	},
	render: () =>
		({
			Component: TextareaWrapper,
			props: { story: "field" },
		}) as any,
};

export const HookForm: Story = {
	parameters: {
		docs: {
			description: {
				story: "Example form with textarea and input fields.",
			},
		},
	},
	render: () =>
		({
			Component: TextareaWrapper,
			props: { story: "hookForm" },
		}) as any,
};

export const Resize: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `resize` prop to control resize behavior.",
			},
		},
	},
	render: () =>
		({
			Component: TextareaWrapper,
			props: { story: "resize" },
		}) as any,
};

export const Autoresize: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use `Textarea.Autoresize` for auto-expanding textareas.",
			},
		},
	},
	render: () =>
		({
			Component: TextareaWrapper,
			props: { story: "autoresize" },
		}) as any,
};
