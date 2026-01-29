import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Heading } from "$saas/typography/heading";
import HeadingWrapper from "../wrappers/typography/Heading.svelte";
import {
	commonArgTypes,
	getControls,
	textSizes,
	headingWeights,
} from "../utils";

const meta: Meta = {
	title: "typography/Heading",
	component: Heading,
	argTypes: {
		as: {
			control: "text",
			table: { defaultValue: { summary: "h2" } },
		},
		size: {
			...commonArgTypes.size,
			options: textSizes,
		},
		weight: {
			control: "select",
			options: headingWeights,
			table: { defaultValue: { summary: "semibold" } },
		},
		fontWeight: {
			table: { disable: true },
		},
		children: commonArgTypes.children,
		class: commonArgTypes.class,
	},
	parameters: {
		docs: {
			description: {
				component:
					"A heading element for page titles and section headers with configurable size, weight, and semantic level.",
			},
		},
		anatomy: `<script>
  import { Heading } from "@saas-ui/svelte/typography/heading";
</script>

<!-- Basic heading -->
<Heading>Page Title</Heading>

<!-- With size -->
<Heading size="3xl">Large Heading</Heading>

<!-- As different element -->
<Heading as="h1" size="4xl">Main Title</Heading>`,
		controls: getControls([
			"as",
			"size",
			"weight",
			"class",
			"children",
		]),
	},
	args: {
		size: "xl",
		weight: "semibold",
		as: "h2",
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic heading with default styling for page titles and section headers.",
			},
		},
	},
	render: () =>
		({
			Component: HeadingWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `size` prop to change the size of the heading. Available sizes: `xs`, `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`, `6xl`, `7xl`.",
			},
		},
	},
	render: () =>
		({
			Component: HeadingWrapper,
			props: { story: "sizes" },
		}) as any,
};

export const Multiline: Story = {
	parameters: {
		docs: {
			description: {
				story: "Headings work well with multiline text content for longer titles.",
			},
		},
	},
	render: () =>
		({
			Component: HeadingWrapper,
			props: { story: "multiline" },
		}) as any,
};

export const Weights: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `weight` prop to change the font weight. Available weights: `normal`, `medium`, `semibold`, `bold`.",
			},
		},
	},
	render: () =>
		({
			Component: HeadingWrapper,
			props: { story: "weights" },
		}) as any,
};

export const AsElement: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `as` prop to render as different heading levels (`h1`-`h6`) for proper semantic structure.",
			},
		},
	},
	render: () =>
		({
			Component: HeadingWrapper,
			props: { story: "asElement" },
		}) as any,
};

export const Highlight: Story = {
	parameters: {
		docs: {
			description: {
				story: "Combine with the `Mark` component to highlight important text within headings.",
			},
		},
	},
	render: () =>
		({
			Component: HeadingWrapper,
			props: { story: "highlight" },
		}) as any,
};

export const Composition: Story = {
	parameters: {
		docs: {
			description: {
				story: "Compose headings with other components for rich layouts and visual hierarchy.",
			},
		},
	},
	render: () =>
		({
			Component: HeadingWrapper,
			props: { story: "composition" },
		}) as any,
};
