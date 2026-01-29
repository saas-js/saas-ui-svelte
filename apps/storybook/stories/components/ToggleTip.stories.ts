import type { Meta, StoryObj } from "@storybook/sveltekit";
import { ToggleTip } from "$saas/components/toggle-tip";
import ToggleTipWrapper from "../wrappers/components/ToggleTip.svelte";

const toggleTipSizes = ["xs", "sm", "md", "lg"] as const;
const toggleTipPlacements = ["top", "bottom", "left", "right"] as const;

const meta: Meta = {
	title: "components/Toggle Tip",
	component: ToggleTip,
	argTypes: {
		content: {
			control: "text",
			description: "The content of the toggle tip.",
		},
		size: {
			control: "select",
			options: toggleTipSizes,
			description: "The size of the toggle tip.",
			table: { defaultValue: { summary: "sm" } },
		},
		placement: {
			control: "select",
			options: toggleTipPlacements,
			description: "The placement of the toggle tip.",
			table: { defaultValue: { summary: "top" } },
		},
		class: {
			control: "text",
			description: "CSS class to apply to the component.",
		},
	},
	parameters: {
		docs: {
			description: {
				component: "A popover-style tip that toggles on click, used for providing additional context.",
			},
		},
		anatomy: `<script>
  import { ToggleTip, InfoTip } from "@saas-ui/svelte/components/toggle-tip";
</script>

<ToggleTip content="Additional information">
  <button>Click me</button>
</ToggleTip>

<!-- Or use InfoTip for a preset info icon trigger -->
<InfoTip>Helpful information here</InfoTip>`,
		usesPortal: true,
	},
	args: {
		content: "This is some additional information.",
		size: "sm",
		placement: "top",
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic toggle tip with icon trigger.",
			},
		},
	},
	render: () =>
		({
			Component: ToggleTipWrapper,
			props: { story: "basic" },
		}) as any,
};

export const InfoTip: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use `InfoTip` for a convenient info icon toggle tip.",
			},
		},
	},
	render: () =>
		({
			Component: ToggleTipWrapper,
			props: { story: "infoTip" },
		}) as any,
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `size` prop to change the size of the toggle tip.",
			},
		},
	},
	render: () =>
		({
			Component: ToggleTipWrapper,
			props: { story: "sizes" },
		}) as any,
};

export const Positioning: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `placement` prop to control the position.",
			},
		},
	},
	render: () =>
		({
			Component: ToggleTipWrapper,
			props: { story: "positioning" },
		}) as any,
};

export const CustomContent: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `children` slot for custom content.",
			},
		},
	},
	render: () =>
		({
			Component: ToggleTipWrapper,
			props: { story: "customContent" },
		}) as any,
};
