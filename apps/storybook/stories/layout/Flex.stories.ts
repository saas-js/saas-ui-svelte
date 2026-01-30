import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Flex } from "$saas/layout/flex";
import FlexWrapper from "../wrappers/layout/Flex.svelte";
import {
	commonArgTypes,
	getControls,
	flexDirections,
	flexAlignOptions,
	flexJustifyOptions,
	flexWrapOptions,
} from "../utils";

const meta: Meta = {
	title: "layout/Flex",
	component: Flex,
	argTypes: {
		direction: {
			control: "select",
			options: flexDirections,
			description: "The flex direction.",
			table: { defaultValue: { summary: "row" } },
		},
		align: {
			control: "select",
			options: flexAlignOptions,
			description: "Shorthand for alignItems.",
		},
		justify: {
			control: "select",
			options: flexJustifyOptions,
			description: "Shorthand for justifyContent.",
		},
		wrap: {
			control: "select",
			options: flexWrapOptions,
			description: "Shorthand for flexWrap.",
		},
		gap: {
			control: "number",
			description: "The gap between children.",
		},
		children: commonArgTypes.children,
		class: commonArgTypes.class,
	},
	parameters: {
		controls: getControls([
			"direction",
			"align",
			"justify",
			"wrap",
			"gap",
			"children",
			"class",
		]),
		docs: {
			description: {
				component:
					"A flexbox container component with convenient props for direction, alignment, justification, wrapping, and gap. Simplifies common flexbox patterns.",
			},
		},
		anatomy: `<script>
  import { Flex } from "@saas-ui/svelte/layout/flex";
</script>

<Flex direction="row" align="center" justify="between" gap={4}>
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Flex>`,
	},
	args: {
		gap: 4,
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic flex container with items arranged in a row with configurable `gap`.",
			},
		},
	},
	render: (args) =>
		({ Component: FlexWrapper, props: { story: "basic", args } }) as any,
};

export const Direction: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `direction` prop to change flex direction: `row`, `column`, `row-reverse`, or `column-reverse`.",
			},
		},
	},
	render: () =>
		({ Component: FlexWrapper, props: { story: "direction" } }) as any,
};

export const Justify: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `justify` prop to control content distribution: `start`, `center`, `end`, `between`, `around`, or `evenly`.",
			},
		},
	},
	render: () =>
		({ Component: FlexWrapper, props: { story: "justify" } }) as any,
};
