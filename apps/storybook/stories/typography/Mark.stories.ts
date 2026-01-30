import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Mark } from "$saas/typography/mark";
import MarkWrapper from "../wrappers/typography/Mark.svelte";
import { commonArgTypes, getControls, markVariants } from "../utils";

const meta: Meta = {
	title: "typography/Mark",
	component: Mark,
	argTypes: {
		variant: {
			control: "select",
			options: markVariants,
			table: { defaultValue: { summary: "subtle" } },
		},
		colour: commonArgTypes.colour,
		children: commonArgTypes.children,
		class: commonArgTypes.class,
	},
	parameters: {
		docs: {
			description: {
				component:
					"A mark element for highlighting or emphasizing text inline with customizable styling variants.",
			},
		},
		anatomy: `<script>
  import { Mark } from "@saas-ui/svelte/typography/mark";
</script>

<!-- Basic mark -->
<p>This is <Mark>highlighted</Mark> text.</p>

<!-- With variant -->
<p>This is <Mark variant="solid" colour="blue">important</Mark> text.</p>

<!-- Text style -->
<p>This is <Mark variant="text" colour="red">emphasized</Mark> text.</p>`,
		controls: getControls(["variant", "colour", "class", "children"]),
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
				story: "Basic mark with default styling for highlighting text inline.",
			},
		},
	},
	render: () =>
		({
			Component: MarkWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Variants: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `variant` prop to change the visual style. Available variants: `subtle`, `solid`, `text`, `plain`.",
			},
		},
	},
	render: () =>
		({
			Component: MarkWrapper,
			props: { story: "variants" },
		}) as any,
};
