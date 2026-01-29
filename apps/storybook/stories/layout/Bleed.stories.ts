import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Bleed } from "$saas/layout/bleed";
import BleedWrapper from "../wrappers/layout/Bleed.svelte";
import { commonArgTypes, getControls } from "../utils";

const meta: Meta = {
	title: "layout/Bleed",
	component: Bleed,
	argTypes: {
		inline: {
			control: "number",
			description: "The negative margin on the x-axis.",
		},
		block: {
			control: "number",
			description: "The negative margin on the y-axis.",
		},
		inlineStart: {
			control: "number",
			description: "The negative margin on the inline-start axis.",
		},
		inlineEnd: {
			control: "number",
			description: "The negative margin on the inline-end axis.",
		},
		blockStart: {
			control: "number",
			description: "The negative margin on the block-start axis.",
		},
		blockEnd: {
			control: "number",
			description: "The negative margin on the block-end axis.",
		},
		children: commonArgTypes.children,
		class: commonArgTypes.class,
	},
	parameters: {
		controls: getControls(["inline", "block", "inlineStart", "inlineEnd", "blockStart", "blockEnd", "children", "class"]),
		docs: {
			description: {
				component:
					"A layout component that applies negative margins to allow content to bleed outside its container boundaries, useful for full-width images or edge-to-edge content.",
			},
		},
		anatomy: `<script>
  import { Bleed } from "@saas-ui/svelte/layout/bleed";
</script>

<Bleed inline={8}>
  <img src="full-width.jpg" alt="..." />
</Bleed>`,
	},
	args: {
		inline: 8,
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic bleed effect that extends content beyond its container using negative margins.",
			},
		},
	},
	render: (args) => ({ Component: BleedWrapper, props: { story: "basic", args } }) as any,
};

export const Direction: Story = {
	parameters: {
		docs: {
			description: {
				story: "Control the bleed direction using `inline` (horizontal), `block` (vertical), or individual directional props.",
			},
		},
	},
	render: () => ({ Component: BleedWrapper, props: { story: "direction" } }) as any,
};
