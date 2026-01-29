import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Text } from "$saas/typography/text";
import TextWrapper from "../wrappers/typography/Text.svelte";
import {
	commonArgTypes,
	getControls,
	textSizes,
	textWeights,
	textLeadingOptions,
} from "../utils";

const meta: Meta = {
	title: "typography/Text",
	component: Text,
	argTypes: {
		as: {
			control: "text",
			table: { defaultValue: { summary: "p" } },
		},
		size: {
			...commonArgTypes.size,
			options: textSizes,
		},
		weight: {
			control: "select",
			options: textWeights,
			table: { defaultValue: { summary: "normal" } },
		},
		truncate: {
			control: "boolean",
		},
		lineClamp: {
			control: "select",
			options: textLeadingOptions,
		},
		fontWeight: {
			table: { disable: true },
		},
		textStyle: {
			table: { disable: true },
		},
		children: commonArgTypes.children,
		class: commonArgTypes.class,
	},
	parameters: {
		docs: {
			description: {
				component:
					"A flexible text element for body content with configurable size, weight, and text overflow handling.",
			},
		},
		anatomy: `<script>
  import { Text } from "@saas-ui/svelte/typography/text";
</script>

<!-- Basic text -->
<Text>This is body text.</Text>

<!-- With size -->
<Text size="lg">Larger text</Text>

<!-- With truncation -->
<Text truncate>Very long text that will be truncated...</Text>

<!-- With line clamp -->
<Text lineClamp="2">
  Long text that spans multiple lines will be clamped to 2 lines...
</Text>`,
		controls: getControls([
			"as",
			"size",
			"weight",
			"truncate",
			"lineClamp",
			"class",
			"children",
		]),
	},
	args: {
		size: "md",
		weight: "normal",
		as: "p",
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic text with default styling for body content and paragraphs.",
			},
		},
	},
	render: () =>
		({
			Component: TextWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `size` prop to change the size of the text. Available sizes: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`, `6xl`, `7xl`.",
			},
		},
	},
	render: () =>
		({
			Component: TextWrapper,
			props: { story: "sizes" },
		}) as any,
};

export const Weights: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `weight` prop to change the font weight. Available weights: `light`, `normal`, `medium`, `semibold`, `bold`.",
			},
		},
	},
	render: () =>
		({
			Component: TextWrapper,
			props: { story: "weights" },
		}) as any,
};

export const Truncation: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `truncate` prop to truncate text after a single line with an ellipsis.",
			},
		},
	},
	render: () =>
		({
			Component: TextWrapper,
			props: { story: "truncation" },
		}) as any,
};

export const LineClamp: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `lineClamp` prop to limit text to a specific number of lines with an ellipsis.",
			},
		},
	},
	render: () =>
		({
			Component: TextWrapper,
			props: { story: "lineClamp" },
		}) as any,
};
