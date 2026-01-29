import type { Meta, StoryObj } from "@storybook/sveltekit";
import { HoverCard } from "$saas/components/hover-card";
import HoverCardWrapper from "../wrappers/components/HoverCard.svelte";
import { commonArgTypes, getControls, hoverCardSizes } from "../utils";

const meta: Meta = {
	title: "components/Hover Card",
	component: HoverCard.Root,
	argTypes: {
		size: {
			...commonArgTypes.size,
			options: hoverCardSizes,
			description: "The size of the hover card.",
			table: { defaultValue: { summary: "md" } },
		},
		openDelay: {
			control: "number",
			description:
				"The duration from when the mouse enters the trigger until the hover card opens.",
			table: { defaultValue: { summary: "700" } },
		},
		closeDelay: {
			control: "number",
			description:
				"The duration from when the mouse leaves the trigger or content until the hover card closes.",
			table: { defaultValue: { summary: "300" } },
		},
		lazyMount: {
			control: "boolean",
			description: "Whether to enable lazy mounting.",
			table: { defaultValue: { summary: "false" } },
		},
		unmountOnExit: {
			control: "boolean",
			description: "Whether to unmount on exit.",
			table: { defaultValue: { summary: "false" } },
		},
	},
	parameters: {
		controls: getControls([
			"size",
			"openDelay",
			"closeDelay",
			"lazyMount",
			"unmountOnExit",
		]),
		docs: {
			description: {
				component:
					"A card that appears when hovering over a trigger element, useful for displaying additional information.",
			},
		},
		anatomy: `<script>
  import {
    HoverCard,
    HoverCardRoot,
    HoverCardTrigger,
    HoverCardContent,
    HoverCardArrow,
  } from "@saas-ui/svelte/components/hover-card";
</script>

<HoverCard.Root>
  <HoverCard.Trigger>Hover me</HoverCard.Trigger>
  <HoverCard.Content>
    <HoverCard.Arrow />
    <p>Additional information displayed on hover</p>
  </HoverCard.Content>
</HoverCard.Root>`,
		subComponents: [
			{
				name: "HoverCard.Root",
				description: "The hover card container.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The hover card content.",
					},
					id: {
						type: "string",
						default: "auto-generated",
						description: "The unique identifier for the hover card.",
					},
					size: {
						type: '"xs" | "sm" | "md" | "lg"',
						default: '"md"',
						description: "The size of the hover card.",
					},
					open: {
						type: "boolean",
						default: "-",
						description: "Whether the hover card is open.",
					},
					onOpenChange: {
						type: "(details: { open: boolean }) => void",
						default: "-",
						description: "Handler called when the open state changes.",
					},
					openDelay: {
						type: "number",
						default: "700",
						description:
							"The duration from when the mouse enters the trigger until the hover card opens.",
					},
					closeDelay: {
						type: "number",
						default: "300",
						description:
							"The duration from when the mouse leaves the trigger or content until the hover card closes.",
					},
					portalled: {
						type: "boolean",
						default: "true",
						description: "Whether the hover card is portalled.",
					},
					lazyMount: {
						type: "boolean",
						default: "false",
						description: "Whether to enable lazy mounting.",
					},
					unmountOnExit: {
						type: "boolean",
						default: "false",
						description: "Whether to unmount on exit.",
					},
					positioning: {
						type: "HoverCardRootProps['positioning']",
						default: '{ placement: "bottom", gutter: 12 }',
						description: "The positioning options for the hover card.",
					},
				},
			},
			{
				name: "HoverCard.Trigger",
				description: "The element that triggers the hover card on hover.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The trigger element content.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
					style: {
						type: "string",
						default: "-",
						description: "Additional inline styles to apply.",
					},
				},
			},
			{
				name: "HoverCard.Content",
				description: "The content displayed inside the hover card.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The content to display in the hover card.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "HoverCard.Arrow",
				description:
					"An optional arrow element that points to the trigger.",
				props: {
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
		],
	},
	args: {
		size: "sm",
		openDelay: 700,
		closeDelay: 300,
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic hover card that appears when hovering over a link.",
			},
		},
	},
	render: () =>
		({
			Component: HoverCardWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Controlled: Story = {
	parameters: {
		docs: {
			description: {
				story: "Controlled hover card with external state management.",
			},
		},
	},
	render: () =>
		({
			Component: HoverCardWrapper,
			props: { story: "controlled" },
		}) as any,
};

export const Delays: Story = {
	parameters: {
		docs: {
			description: {
				story: "Customize open and close delays.",
			},
		},
	},
	render: () =>
		({
			Component: HoverCardWrapper,
			props: { story: "delays" },
		}) as any,
};

export const Placement: Story = {
	parameters: {
		docs: {
			description: {
				story: "Change the placement of the hover card.",
			},
		},
	},
	render: () =>
		({
			Component: HoverCardWrapper,
			props: { story: "placement" },
		}) as any,
};
