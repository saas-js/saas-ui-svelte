import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Blockquote } from "$saas/typography/blockquote";
import BlockquoteWrapper from "../wrappers/typography/Blockquote.svelte";
import {
	colours,
	commonArgTypes,
	getControls,
	blockquoteVariants,
	alignOptions,
} from "../utils";

const meta: Meta = {
	title: "typography/Block Quote",
	component: Blockquote,
	argTypes: {
		variant: {
			control: "select",
			options: blockquoteVariants,
			description: "The visual style of the blockquote.",
			table: { defaultValue: { summary: "subtle" } },
		},
		colour: {
			...commonArgTypes.colour,
			description: "The colour of the component.",
		},
		justify: {
			control: "select",
			options: alignOptions,
			description: "The alignment of the content.",
			table: { defaultValue: { summary: "start" } },
		},
		cite: {
			control: "text",
			description: "The source of the quote.",
		},
		showDash: {
			control: "boolean",
			description: "Whether to show a dash before the citation.",
			table: { defaultValue: { summary: "false" } },
		},
		showIcon: {
			control: "boolean",
			description: "Whether to show the default quote icon.",
			table: { defaultValue: { summary: "false" } },
		},
		icon: commonArgTypes.icon,
		children: commonArgTypes.children,
		class: commonArgTypes.class,
	},
	parameters: {
		docs: {
			description: {
				component:
					"A styled quotation element for displaying quotes with optional citations and decorative icons.",
			},
		},
		anatomy: `<script>
  import { Blockquote } from "@saas-ui/svelte/typography/blockquote";
</script>

<!-- Basic blockquote -->
<Blockquote>
  The only way to do great work is to love what you do.
</Blockquote>

<!-- With citation -->
<Blockquote cite="Steve Jobs" showDash>
  The only way to do great work is to love what you do.
</Blockquote>

<!-- With icon -->
<Blockquote showIcon>
  The only way to do great work is to love what you do.
</Blockquote>`,
		controls: getControls([
			"variant",
			"justify",
			"colour",
			"cite",
			"showDash",
			"showIcon",
			"icon",
			"children",
			"class",
		]),
	},
	args: {
		variant: "subtle",
		colour: "gray",
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic blockquote with default styling for displaying quotations.",
			},
		},
	},
	render: () =>
		({
			Component: BlockquoteWrapper,
			props: { story: "basic" },
		}) as any,
};

export const WithCite: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `cite` prop to add an attribution and `showDash` to display a dash before the citation.",
			},
		},
	},
	render: () =>
		({
			Component: BlockquoteWrapper,
			props: { story: "withCite" },
		}) as any,
};

export const Colours: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `colour` prop to change the colour scheme. Supports all standard colour options.",
			},
		},
	},
	render: () =>
		({
			Component: BlockquoteWrapper,
			props: { story: "colours" },
		}) as any,
};

export const Variants: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `variant` prop to change the visual style. Available variants: `subtle`, `solid`, `plain`.",
			},
		},
	},
	render: () =>
		({
			Component: BlockquoteWrapper,
			props: { story: "variants" },
		}) as any,
};

export const Icon: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `showIcon` prop to display a decorative quote icon.",
			},
		},
	},
	render: () =>
		({
			Component: BlockquoteWrapper,
			props: { story: "icon" },
		}) as any,
};

export const CustomIcon: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `icon` prop to provide a custom icon component instead of the default quote icon.",
			},
		},
	},
	render: () =>
		({
			Component: BlockquoteWrapper,
			props: { story: "customIcon" },
		}) as any,
};
