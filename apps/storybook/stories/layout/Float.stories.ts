import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Float } from "$saas/layout/float";
import FloatWrapper from "../wrappers/layout/Float.svelte";
import { commonArgTypes, getControls, floatPlacements } from "../utils";

const meta: Meta = {
	title: "layout/Float",
	component: Float,
	argTypes: {
		placement: {
			control: "select",
			options: floatPlacements,
			description: "The placement of the indicator.",
			table: { defaultValue: { summary: "top-end" } },
		},
		offsetX: {
			control: "text",
			description: "The x offset of the indicator.",
		},
		offsetY: {
			control: "text",
			description: "The y offset of the indicator.",
		},
		offset: {
			control: "text",
			description: "The x and y offset of the indicator.",
		},
		children: commonArgTypes.children,
		class: commonArgTypes.class,
	},
	parameters: {
		controls: getControls([
			"placement",
			"offsetX",
			"offsetY",
			"offset",
			"children",
			"class",
		]),
		docs: {
			description: {
				component:
					"A positioning component that floats its content at a specified position relative to its parent. Useful for badges, indicators, and notification dots.",
			},
		},
		anatomy: `<script>
  import { Float } from "@saas-ui/svelte/layout/float";
</script>

<div class="relative">
  <Avatar />
  <Float placement="top-end">
    <Badge>3</Badge>
  </Float>
</div>`,
	},
	args: {
		placement: "top-end",
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic float positioning with default `top-end` placement for badge or indicator overlays.",
			},
		},
	},
	render: (args) =>
		({ Component: FloatWrapper, props: { story: "basic", args } }) as any,
};

export const Placements: Story = {
	parameters: {
		docs: {
			description: {
				story: "All available placements: `top-start`, `top-center`, `top-end`, `middle-start`, `middle-center`, `middle-end`, `bottom-start`, `bottom-center`, `bottom-end`.",
			},
		},
	},
	render: () =>
		({ Component: FloatWrapper, props: { story: "placements" } }) as any,
};

export const Offsets: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use `offset`, `offsetX`, or `offsetY` props to fine-tune the floating element position.",
			},
		},
	},
	render: () =>
		({ Component: FloatWrapper, props: { story: "offsets" } }) as any,
};

export const WithAvatar: Story = {
	parameters: {
		docs: {
			description: {
				story: "Common use case showing a notification badge floating on an avatar component.",
			},
		},
	},
	render: () =>
		({ Component: FloatWrapper, props: { story: "withAvatar" } }) as any,
};
