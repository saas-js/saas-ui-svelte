import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Tag } from "$saas/components/tag";
import TagWrapper from "../wrappers/components/Tag.svelte";

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

const tagVariants = ["subtle", "solid", "outline", "surface"] as const;
const tagSizes = ["sm", "md", "lg", "xl"] as const;

const meta: Meta = {
	title: "components/Tag",
	component: Tag,
	argTypes: {
		variant: {
			control: "select",
			options: tagVariants,
			description: "The visual style of the tag.",
			table: { defaultValue: { summary: "surface" } },
		},
		size: {
			control: "select",
			options: tagSizes,
			description: "The size of the tag.",
			table: { defaultValue: { summary: "md" } },
		},
		colour: {
			control: "select",
			options: colours,
			description: "The colour theme of the tag.",
		},
		closable: {
			control: "boolean",
			description: "Whether the tag is closable.",
			table: { defaultValue: { summary: "false" } },
		},
		maxWidth: {
			control: "text",
			description:
				"Maximum width of the tag. Content exceeding this width will be truncated.",
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
					"A compact label element for categorizing or labelling items.",
			},
		},
		anatomy: `<script>
  import { Tag } from "@saas-ui/svelte/components/tag";
</script>

<Tag>Label</Tag>

<!-- With close button -->
<Tag closable onClose={() => console.log("closed")}>
  Closable
</Tag>`,
	},
	args: {
		variant: "surface",
		size: "md",
		colour: "gray",
		closable: false,
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic tag with default styling.",
			},
		},
	},
	render: () =>
		({
			Component: TagWrapper,
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
			Component: TagWrapper,
			props: { story: "variants" },
		}) as any,
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `size` prop to change the size of the tag.",
			},
		},
	},
	render: () =>
		({
			Component: TagWrapper,
			props: { story: "sizes" },
		}) as any,
};

export const Colours: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `colour` prop to change the colour theme.",
			},
		},
	},
	render: () =>
		({
			Component: TagWrapper,
			props: { story: "colours" },
		}) as any,
};

export const Closable: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `closable` prop to add a close button.",
			},
		},
	},
	render: () =>
		({
			Component: TagWrapper,
			props: { story: "closable" },
		}) as any,
};

export const Overflow: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `maxWidth` prop to truncate long content.",
			},
		},
	},
	render: () =>
		({
			Component: TagWrapper,
			props: { story: "overflow" },
		}) as any,
};

export const Avatar: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `startAvatar` prop to add an avatar.",
			},
		},
	},
	render: () =>
		({
			Component: TagWrapper,
			props: { story: "avatar" },
		}) as any,
};

export const AsButton: Story = {
	parameters: {
		docs: {
			description: {
				story: "Wrap tag in a `button` element for clickable tags.",
			},
		},
	},
	render: () =>
		({
			Component: TagWrapper,
			props: { story: "asButton" },
		}) as any,
};
