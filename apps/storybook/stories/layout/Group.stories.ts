import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Group } from "$saas/layout/group";
import GroupWrapper from "../wrappers/layout/Group.svelte";
import { commonArgTypes, getControls, orientations } from "../utils";

const meta: Meta = {
	title: "layout/Group",
	component: Group as any,
	argTypes: {
		attached: {
			control: "boolean",
			description: "If `true`, the elements will be attached together.",
			table: { defaultValue: { summary: "false" } },
		},
		grow: {
			control: "boolean",
			description:
				"If `true`, the elements will grow to fill the available space.",
			table: { defaultValue: { summary: "false" } },
		},
		orientation: {
			control: "radio",
			options: orientations,
			description: "The orientation of the group.",
			table: { defaultValue: { summary: "horizontal" } },
		},
		class: commonArgTypes.class,
		children: commonArgTypes.children,
	},
	parameters: {
		controls: getControls(["attached", "grow", "orientation", "class"]),
		docs: {
			description: {
				component:
					"A layout component for grouping related elements together, with options for attached styling (seamless borders) and equal-width distribution.",
			},
		},
		anatomy: `<script>
  import { Group } from "@saas-ui/svelte/layout/group";
  import { Button } from "@saas-ui/svelte/components/button";
</script>

<!-- Spaced group -->
<Group>
  <Button>One</Button>
  <Button>Two</Button>
</Group>

<!-- Attached group -->
<Group attached>
  <Button>One</Button>
  <Button>Two</Button>
</Group>`,
	},
	args: {
		attached: false,
		grow: false,
		orientation: "horizontal",
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic group with default gap between items arranged horizontally.",
			},
		},
	},
	render: (args) =>
		({ Component: GroupWrapper, props: { story: "basic", args } }) as any,
};

export const WithButtons: Story = {
	parameters: {
		docs: {
			description: {
				story: "Common use case showing buttons grouped together with consistent spacing.",
			},
		},
	},
	render: () =>
		({ Component: GroupWrapper, props: { story: "withButtons" } }) as any,
};

export const Attached: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use `attached` prop to join elements seamlessly with connected borders, ideal for segmented controls.",
			},
		},
	},
	render: () =>
		({ Component: GroupWrapper, props: { story: "attached" } }) as any,
};

export const Grow: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use `grow` prop to make all items expand equally to fill the available container width.",
			},
		},
	},
	render: () =>
		({ Component: GroupWrapper, props: { story: "grow" } }) as any,
};
