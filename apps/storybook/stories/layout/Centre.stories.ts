import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Centre } from "$saas/layout/centre";
import CentreWrapper from "../wrappers/layout/Centre.svelte";
import { commonArgTypes, getControls } from "../utils";

const meta: Meta = {
	title: "layout/Centre",
	component: Centre,
	argTypes: {
		inline: {
			control: "boolean",
			description: "Whether to use inline-flex instead of flex.",
			table: { defaultValue: { summary: "false" } },
		},
		children: commonArgTypes.children,
		class: commonArgTypes.class,
	},
	parameters: {
		controls: getControls(["inline", "children", "class"]),
		docs: {
			description: {
				component:
					"A layout component that centers its children both horizontally and vertically using flexbox. Also exports Square and AbsoluteCentre variants for specific centering needs.",
			},
		},
		anatomy: `<script>
  import { Centre, Square, AbsoluteCentre } from "@saas-ui/svelte/layout/centre";
</script>

<!-- Center content with flexbox -->
<Centre class="h-32">
  Centered content
</Centre>

<!-- Fixed-size square container -->
<Square size={10}>
  Icon
</Square>

<!-- Absolute positioning center -->
<div class="relative h-32">
  <AbsoluteCentre>
    Absolutely centered
  </AbsoluteCentre>
</div>`,
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic `Centre` component that horizontally and vertically centers its children using flexbox.",
			},
		},
	},
	render: (args) =>
		({ Component: CentreWrapper, props: { story: "basic", args } }) as any,
};

export const Square: Story = {
	parameters: {
		docs: {
			description: {
				story: "`Square` component creates a fixed-size square container with centered content, useful for icons and avatars.",
			},
		},
	},
	render: () =>
		({ Component: CentreWrapper, props: { story: "square" } }) as any,
};

export const Circle: Story = {
	parameters: {
		docs: {
			description: {
				story: "Combine `Square` with `rounded-full` class to create circular containers for badges and icons.",
			},
		},
	},
	render: () =>
		({ Component: CentreWrapper, props: { story: "circle" } }) as any,
};

export const AbsoluteCentre: Story = {
	parameters: {
		docs: {
			description: {
				story: "`AbsoluteCentre` uses absolute positioning to center content within a relatively positioned parent.",
			},
		},
	},
	render: () =>
		({
			Component: CentreWrapper,
			props: { story: "absoluteCentre" },
		}) as any,
};
