import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Circle } from "$saas/layout/circle";
import CircleWrapper from "../wrappers/layout/Circle.svelte";
import { commonArgTypes, getControls, sizes, circleVariants } from "../utils";

const meta: Meta = {
	title: "layout/Circle",
	component: Circle,
	argTypes: {
		size: {
			...commonArgTypes.size,
			options: sizes,
			description: "The size of the circle.",
			table: { defaultValue: { summary: "md" } },
		},
		variant: {
			control: "select",
			options: circleVariants,
			description: "The visual style of the circle.",
			table: { defaultValue: { summary: "solid" } },
		},
		colour: {
			...commonArgTypes.colour,
			description: "The colour of the component.",
		},
		children: commonArgTypes.children,
		class: commonArgTypes.class,
	},
	parameters: {
		controls: getControls([
			"size",
			"variant",
			"colour",
			"children",
			"class",
		]),
		docs: {
			description: {
				component:
					"A circular container component with built-in colour variants and sizes, ideal for displaying icons, initials, or status indicators.",
			},
		},
		anatomy: `<script>
  import { Circle } from "@saas-ui/svelte/layout/circle";
</script>

<Circle size="md" colour="blue" variant="solid">
  A
</Circle>`,
	},
	args: {
		size: "md",
		variant: "solid",
		colour: "gray",
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic circle with configurable `size`, `variant`, and `colour`. Use for avatars, badges, or icon containers.",
			},
		},
	},
	render: (args) => ({ Component: CircleWrapper, props: { story: "basic", args } }) as any,
};
