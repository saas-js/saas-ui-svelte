import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Separator } from "$saas/components/separator";
import SeparatorWrapper from "../wrappers/components/Separator.svelte";

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

const separatorSizes = ["xs", "sm", "md", "lg"] as const;
const separatorVariants = ["solid", "dashed", "dotted"] as const;
const separatorOrientations = ["horizontal", "vertical"] as const;

const meta: Meta = {
	title: "components/Separator",
	component: Separator,
	argTypes: {
		orientation: {
			control: "select",
			options: separatorOrientations,
			description: "The orientation of the separator.",
			table: { defaultValue: { summary: "horizontal" } },
		},
		variant: {
			control: "select",
			options: separatorVariants,
			description: "The visual variant of the separator.",
			table: { defaultValue: { summary: "solid" } },
		},
		size: {
			control: "select",
			options: separatorSizes,
			description: "The thickness of the separator.",
			table: { defaultValue: { summary: "sm" } },
		},
		colour: {
			control: "select",
			options: colours,
			description: "The colour of the separator.",
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
					"A visual divider that separates content into distinct sections, available in horizontal or vertical orientations.",
			},
		},
		anatomy: `<script>
  import { Separator } from "@saas-ui/svelte/components/separator";
</script>

<Separator orientation="horizontal" variant="solid" size="sm" />`,
	},
	args: {
		orientation: "horizontal",
		variant: "solid",
		size: "sm",
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic separator with default styling.",
			},
		},
	},
	render: () =>
		({
			Component: SeparatorWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Variants: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `variant` prop to change the line style.",
			},
		},
	},
	render: () =>
		({
			Component: SeparatorWrapper,
			props: { story: "variants" },
		}) as any,
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `size` prop to change the thickness of the separator.",
			},
		},
	},
	render: () =>
		({
			Component: SeparatorWrapper,
			props: { story: "sizes" },
		}) as any,
};

export const Label: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use separators with text labels for visual grouping.",
			},
		},
	},
	render: () =>
		({
			Component: SeparatorWrapper,
			props: { story: "label" },
		}) as any,
};

export const Vertical: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Use `orientation="vertical"` for vertical separators.',
			},
		},
	},
	render: () =>
		({
			Component: SeparatorWrapper,
			props: { story: "vertical" },
		}) as any,
};

export const Colours: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `colour` prop to change the colour of the separator.",
			},
		},
	},
	render: () =>
		({
			Component: SeparatorWrapper,
			props: { story: "colours" },
		}) as any,
};
