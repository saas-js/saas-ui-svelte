import type { Meta, StoryObj } from "@storybook/sveltekit";
import { NativeSelect } from "$saas/components/native-select";
import NativeSelectWrapper from "../wrappers/components/NativeSelect.svelte";

const nativeSelectSizes = ["xs", "sm", "md", "lg", "xl"] as const;
const nativeSelectVariants = ["outline", "subtle", "plain"] as const;

const meta: Meta = {
	title: "components/Select (Native)",
	component: NativeSelect,
	argTypes: {
		variant: {
			control: "select",
			options: nativeSelectVariants,
			description: "The visual style of the component.",
			table: { defaultValue: { summary: "outline" } },
		},
		size: {
			control: "select",
			options: nativeSelectSizes,
			description: "The size of the component.",
			table: { defaultValue: { summary: "md" } },
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
		class: {
			control: "text",
			description: "Additional CSS classes to apply.",
		},
	},
	parameters: {
		docs: {
			description: {
				component:
					"A native HTML select element with custom styling for simple dropdown selection needs.",
			},
		},
		anatomy: `<script>
  import { NativeSelect } from "@saas-ui/svelte/components/native-select";
</script>

<NativeSelect>
  <option value="">Select an option</option>
  <option value="option1">Option 1</option>
  <option value="option2">Option 2</option>
  <option value="option3">Option 3</option>
</NativeSelect>`,
	},
	args: {
		variant: "outline",
		size: "sm",
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
				story: "Basic native select with default styling and placeholder option.",
			},
		},
	},
	render: () =>
		({
			Component: NativeSelectWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `size` prop to change the size. Available sizes: `xs`, `sm`, `md`, `lg`, `xl`.",
			},
		},
	},
	render: () =>
		({
			Component: NativeSelectWrapper,
			props: { story: "sizes" },
		}) as any,
};

export const Variants: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `variant` prop to change the visual style. Available variants: `outline`, `subtle`, `plain`.",
			},
		},
	},
	render: () =>
		({
			Component: NativeSelectWrapper,
			props: { story: "variants" },
		}) as any,
};

export const WithValidation: Story = {
	parameters: {
		docs: {
			description: {
				story: "Native select integrated with form validation for required field handling.",
			},
		},
	},
	render: () =>
		({
			Component: NativeSelectWrapper,
			props: { story: "hookForm" },
		}) as any,
};
