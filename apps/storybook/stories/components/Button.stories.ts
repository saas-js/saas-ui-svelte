import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Button } from "$saas/components/button";
import ButtonWrapper from "../wrappers/components/Button.svelte";

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

const buttonSizes = ["xs", "sm", "md", "lg", "xl"] as const;
const buttonVariants = [
	"solid",
	"subtle",
	"outline",
	"ghost",
	"plain",
	"surface",
	"glass",
] as const;

const meta: Meta = {
	title: "components/Button",
	component: Button,
	argTypes: {
		variant: {
			control: "select",
			options: buttonVariants,
			description: "The visual style of the button",
			table: { defaultValue: { summary: "surface" } },
		},
		size: {
			control: "select",
			options: buttonSizes,
			description: "The size of the button",
			table: { defaultValue: { summary: "md" } },
		},
		colour: {
			control: "select",
			options: colours,
			description: "The colour scheme of the button",
			table: { defaultValue: { summary: "gray" } },
		},
		loading: {
			control: "boolean",
			description: "Whether the button is in a loading state",
			table: { defaultValue: { summary: "false" } },
		},
		loadingText: {
			control: "text",
			description: "Text to display when loading",
		},
		disabled: {
			control: "boolean",
			description: "Whether the button is disabled",
			table: { defaultValue: { summary: "false" } },
		},
	},
	parameters: {
		docs: {
			description: {
				component:
					"An interactive element that triggers an action when clicked, supporting various visual styles and states.",
			},
		},
		anatomy: `<script>
  import { Button } from "@saas-ui/svelte/components/button";
</script>

<!-- Basic button -->
<Button>Click me</Button>

<!-- Button with icon -->
<Button>
  <Icon slot="start" />
  With Icon
</Button>

<!-- Button group -->
<Button.Group>
  <Button>One</Button>
  <Button>Two</Button>
  <Button>Three</Button>
</Button.Group>`,
	},
	args: {
		variant: "surface",
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
				story: "Basic button with default styling for general actions.",
			},
		},
	},
	render: () =>
		({
			Component: ButtonWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `size` prop to change the size of the button. Available sizes: `xs`, `sm`, `md`, `lg`, `xl`.",
			},
		},
	},
	render: () =>
		({
			Component: ButtonWrapper,
			props: { story: "sizes" },
		}) as any,
};

export const Variants: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `variant` prop to change the visual style. Available variants: `solid`, `subtle`, `outline`, `ghost`, `plain`, `surface`, `glass`.",
			},
		},
	},
	render: () =>
		({
			Component: ButtonWrapper,
			props: { story: "variants" },
		}) as any,
};

export const WithIcon: Story = {
	parameters: {
		docs: {
			description: {
				story: "Add icons to buttons by including them as children. Use icon-only buttons for compact actions.",
			},
		},
	},
	render: () =>
		({
			Component: ButtonWrapper,
			props: { story: "icons" },
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
			Component: ButtonWrapper,
			props: { story: "colours" },
		}) as any,
};

export const Loading: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `loading` and `loadingText` props to show a loading spinner during async operations.",
			},
		},
	},
	render: () =>
		({
			Component: ButtonWrapper,
			props: { story: "loading" },
		}) as any,
};

export const Group: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use `Button.Group` to group related buttons together with connected styling.",
			},
		},
	},
	render: () =>
		({
			Component: ButtonWrapper,
			props: { story: "group" },
		}) as any,
};
