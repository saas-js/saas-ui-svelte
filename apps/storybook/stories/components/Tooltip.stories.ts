import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Tooltip } from "$saas/components/tooltip";
import TooltipWrapper from "../wrappers/components/Tooltip.svelte";

const tooltipVariants = ["default", "inverted"] as const;

const meta: Meta = {
	title: "components/Tooltip",
	component: Tooltip,
	parameters: {
		docs: {
			description: {
				component:
					"A tooltip displays contextual information when hovering over or focusing on an element.",
			},
		},
		anatomy: `<script>
  import { Tooltip } from "@saas-ui/svelte/components/tooltip";
</script>

<Tooltip content="Tooltip text">
  <Button>Hover me</Button>
</Tooltip>`,
		usesPortal: true,
		subComponents: [
			{
				name: "Tooltip",
				description:
					"A composed tooltip component that handles trigger, positioning, and content display.",
				props: {
					id: {
						type: "string",
						default: "auto-generated",
						description:
							"The unique identifier for the tooltip. If not provided, a unique ID will be auto-generated.",
					},
					content: {
						type: "string | Snippet",
						default: "-",
						description:
							"The text content of the tooltip. Can be a string, snippet, or use children when trigger prop is provided.",
					},
					children: {
						type: "Snippet",
						default: "-",
						description:
							"The trigger element (default usage). When trigger prop is provided, children become the content instead.",
					},
					trigger: {
						type: "Snippet",
						default: "-",
						description:
							"Alternative trigger element. When provided, children become the content.",
					},
					showArrow: {
						type: "boolean",
						default: "false",
						description:
							"Whether to show an arrow pointing to the trigger element.",
					},
					variant: {
						type: '"default" | "inverted"',
						default: '"default"',
						description: "The visual style of the tooltip.",
					},
					openDelay: {
						type: "number",
						default: "0",
						description:
							"The delay before the tooltip opens (in ms).",
					},
					closeDelay: {
						type: "number",
						default: "100",
						description:
							"The delay before the tooltip closes (in ms).",
					},
					positioning: {
						type: "TooltipRootProps['positioning']",
						default: '{ placement: "bottom", strategy: "fixed" }',
						description: "The positioning options for the tooltip.",
					},
					interactive: {
						type: "boolean",
						default: "false",
						description:
							"Whether the tooltip content is interactive (can be hovered/clicked).",
					},
					closeOnPointerDown: {
						type: "boolean",
						default: "true",
						description:
							"Whether to close the tooltip when the trigger is clicked.",
					},
					disabled: {
						type: "boolean",
						default: "false",
						description: "Whether the tooltip is disabled.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
		],
	},
	argTypes: {
		content: {
			control: "text",
			description: "The content of the tooltip.",
		},
		showArrow: {
			control: "boolean",
			description: "Whether to show an arrow.",
			table: { defaultValue: { summary: "false" } },
		},
		variant: {
			control: "select",
			options: tooltipVariants,
			description: "The visual style of the tooltip.",
			table: { defaultValue: { summary: "default" } },
		},
		interactive: {
			control: "boolean",
			description: "Whether the tooltip content is interactive.",
			table: { defaultValue: { summary: "false" } },
		},
		openDelay: {
			control: "number",
			description: "Delay in ms before opening.",
			table: { defaultValue: { summary: "0" } },
		},
		closeDelay: {
			control: "number",
			description: "Delay in ms before closing.",
			table: { defaultValue: { summary: "100" } },
		},
		disabled: {
			control: "boolean",
			description: "Whether the tooltip is disabled.",
			table: { defaultValue: { summary: "false" } },
		},
		class: {
			control: "text",
			description: "CSS class to apply to the component.",
		},
	},
	args: {
		content: "This is a tooltip",
		showArrow: false,
		variant: "default",
		interactive: false,
		openDelay: 0,
		closeDelay: 0,
		disabled: false,
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic tooltip on hover.",
			},
		},
	},
	render: () =>
		({
			Component: TooltipWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Arrow: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use `showArrow` to display an arrow pointing to the trigger.",
			},
		},
	},
	render: () =>
		({
			Component: TooltipWrapper,
			props: { story: "arrow" },
		}) as any,
};

export const Inverted: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Use `variant="inverted"` for a dark tooltip (inverted from the default light panel style).',
			},
		},
	},
	render: () =>
		({
			Component: TooltipWrapper,
			props: { story: "inverted" },
		}) as any,
};

export const Placements: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `positioning` prop to control placement.",
			},
		},
	},
	render: () =>
		({
			Component: TooltipWrapper,
			props: { story: "placements" },
		}) as any,
};

export const Offset: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use custom offset for precise positioning.",
			},
		},
	},
	render: () =>
		({
			Component: TooltipWrapper,
			props: { story: "offset" },
		}) as any,
};

export const Delays: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use `openDelay` to add a delay before showing.",
			},
		},
	},
	render: () =>
		({
			Component: TooltipWrapper,
			props: { story: "delays" },
		}) as any,
};

export const Interactive: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use `interactive` to allow hovering over the tooltip content.",
			},
		},
	},
	render: () =>
		({
			Component: TooltipWrapper,
			props: { story: "interactive" },
		}) as any,
};

export const Disabled: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use `disabled` to prevent the tooltip from showing.",
			},
		},
	},
	render: () =>
		({
			Component: TooltipWrapper,
			props: { story: "disabled" },
		}) as any,
};

export const CustomContent: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `trigger` and `children` snippets for custom content.",
			},
		},
	},
	render: () =>
		({
			Component: TooltipWrapper,
			props: { story: "customContent" },
		}) as any,
};
