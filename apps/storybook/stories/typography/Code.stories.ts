import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Code } from "$saas/typography/code";
import CodeWrapper from "../wrappers/typography/Code.svelte";
import {
	colours,
	commonArgTypes,
	getControls,
	codeVariants,
	codeSizes,
} from "../utils";

const meta: Meta = {
	title: "typography/Code",
	component: Code,
	argTypes: {
		variant: {
			control: "select",
			options: codeVariants as any,
			table: { defaultValue: { summary: "subtle" } },
		},
		size: {
			control: "select",
			options: codeSizes as any,
			table: { defaultValue: { summary: "sm" } },
		},
		colour: {
			...commonArgTypes.colour,
			options: colours as any,
		},
		children: commonArgTypes.children,
		class: commonArgTypes.class,
	},
	parameters: {
		docs: {
			description: {
				component:
					"An inline code element for displaying code snippets with syntax-appropriate styling.",
			},
		},
		anatomy: `<script>
  import { Code } from "@saas-ui/svelte/typography/code";
</script>

<!-- Basic code -->
<Code>console.log("Hello")</Code>

<!-- With variant -->
<Code variant="solid">npm install</Code>

<!-- With size -->
<Code size="lg">const x = 42</Code>`,
		controls: getControls([
			"variant",
			"size",
			"colour",
			"children",
			"class",
		]),
	},
	args: {
		variant: "subtle",
		size: "sm",
		colour: "gray",
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic inline code element with default styling for displaying code snippets.",
			},
		},
	},
	render: () =>
		({
			Component: CodeWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `size` prop to change the size of the code. Available sizes: `xs`, `sm`, `md`, `lg`.",
			},
		},
	},
	render: () =>
		({
			Component: CodeWrapper,
			props: { story: "sizes" },
		}) as any,
};

export const Variants: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `variant` prop to change the visual style. Available variants: `solid`, `outline`, `subtle`, `surface`.",
			},
		},
	},
	render: () =>
		({
			Component: CodeWrapper,
			props: { story: "variants" },
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
			Component: CodeWrapper,
			props: { story: "colours" },
		}) as any,
};
