import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Kbd } from "$saas/components/kbd";
import KbdWrapper from "../wrappers/components/Kbd.svelte";
import { commonArgTypes, getControls, kbdVariants, kbdSizes } from "../utils";

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
		colour: commonArgTypes.colour,
		keys: {
			control: "object",
			description:
				"Modifier keys to display (e.g., ['command', 'shift']). Supported: command, option, shift, control, enter, backspace, delete, escape, tab, arrow keys.",
			table: { type: { summary: "string[]" } },
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
		controls: getControls([
			"variant",
			"size",
			"colour",
			"keys",
			"children",
			"class",
		]),
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

<!-- With modifier keys -->
<Kbd keys={["command"]}>K</Kbd>

<!-- With colour -->
<Kbd colour="indigo" keys={["command"]}>K</Kbd>

<!-- With variants and sizes -->
<Kbd variant="raised" size="lg">Enter</Kbd>`,
	},
	args: {
		variant: "subtle",
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

export const Colours: Story = {
	parameters: {
		docs: {
			description: {
				story:
					"Use the `colour` prop to change the colour of the `Kbd` component. Supports all standard colour palettes.",
			},
		},
	},
	render: () =>
		({
			Component: KbdWrapper,
			props: { story: "colours" },
		}) as any,
};

export const ModifierKeys: Story = {
	parameters: {
		docs: {
			description: {
				story:
					"Use the `keys` prop to display modifier key symbols. Supports command (⌘), option (⌥), shift (⇧), control (⌃), and more.",
			},
		},
	},
	render: () =>
		({
			Component: KbdWrapper,
			props: { story: "modifierKeys" },
		}) as any,
};
