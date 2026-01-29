import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Kbd } from "$saas/components/kbd";
import KbdWrapper from "../wrappers/components/Kbd.svelte";

const kbdVariants = ["raised", "outline", "subtle", "plain"] as const;
const kbdSizes = ["sm", "md", "lg"] as const;

const meta: Meta = {
	title: "components/Kbd",
	component: Kbd,
	argTypes: {
		variant: {
			control: "select",
			options: kbdVariants,
			description: "The visual style of the component.",
			table: { defaultValue: { summary: "subtle" } },
		},
		size: {
			control: "select",
			options: kbdSizes,
			description: "The size of the component.",
			table: { defaultValue: { summary: "md" } },
		},
		children: {
			control: false,
			description: "The content to be rendered inside the component.",
			table: { type: { summary: "Snippet" } },
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
					"A component for displaying keyboard shortcuts and key combinations.",
			},
		},
		anatomy: `<script>
  import { Kbd } from "@saas-ui/svelte/components/kbd";
</script>

<Kbd>Ctrl</Kbd> + <Kbd>C</Kbd>

<!-- With variants and sizes -->
<Kbd variant="raised" size="lg">Enter</Kbd>`,
	},
	args: {
		variant: "subtle",
		size: "md",
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic `Kbd` component displaying a keyboard shortcut.",
			},
		},
	},
	render: () =>
		({
			Component: KbdWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Combinations: Story = {
	parameters: {
		docs: {
			description: {
				story: "Render `Kbd` to showcase key combinations.",
			},
		},
	},
	render: () =>
		({
			Component: KbdWrapper,
			props: { story: "combinations" },
		}) as any,
};

export const FunctionKeys: Story = {
	parameters: {
		docs: {
			description: {
				story: "Example of using `Kbd` to showcase function keys.",
			},
		},
	},
	render: () =>
		({
			Component: KbdWrapper,
			props: { story: "functionKeys" },
		}) as any,
};

export const Variants: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `variant` prop to change the appearance of the `Kbd` component.",
			},
		},
	},
	render: () =>
		({
			Component: KbdWrapper,
			props: { story: "variants" },
		}) as any,
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `size` prop to change the size of the `Kbd` component.",
			},
		},
	},
	render: () =>
		({
			Component: KbdWrapper,
			props: { story: "sizes" },
		}) as any,
};

export const WithinText: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use `Kbd` within text to highlight key combinations.",
			},
		},
	},
	render: () =>
		({
			Component: KbdWrapper,
			props: { story: "withinText" },
		}) as any,
};
