import type { Meta, StoryObj } from "@storybook/sveltekit";
import { ActionBar } from "$saas/components/action-bar";
import ActionBarWrapper from "../wrappers/components/ActionBar.svelte";
import { commonArgTypes, getControls } from "../utils";

const meta: Meta = {
	title: "components/Action Bar",
	component: ActionBar,
	argTypes: {
		closeOnInteractOutside: {
			control: "boolean",
			description: "Whether to close when clicking outside.",
			table: { defaultValue: { summary: "false" } },
		},
		class: commonArgTypes.class,
	},
	parameters: {
		controls: getControls(["closeOnInteractOutside", "class"]),
		docs: {
			description: {
				component:
					"A floating bar that appears when items are selected, providing contextual actions.",
			},
		},
		// Custom field for anatomy code
		anatomy: `<script>
  import {
    ActionBar,
    ActionBarSelectionTrigger,
    ActionBarSeparator,
    ActionBarCloseButton,
  } from "@saas-ui/svelte/components/action-bar";
</script>

<ActionBar open={true}>
  <ActionBarSelectionTrigger>2 selected</ActionBarSelectionTrigger>
  <ActionBarSeparator />
  <Button variant="outline" size="sm">Delete</Button>
  <ActionBarCloseButton />
</ActionBar>`,
		// Mark as portal component for special handling
		usesPortal: true,
		// Sub-component props for documentation
		subComponents: [
			{
				name: "ActionBar",
				description:
					"The root container component that renders a floating bar at the bottom of the screen.",
				props: {
					open: {
						type: "boolean",
						default: "false",
						description: "Whether the action bar is open/visible.",
					},
					onOpenChange: {
						type: "(details: { open: boolean }) => void",
						default: "-",
						description:
							"Callback fired when the open state changes.",
					},
					closeOnInteractOutside: {
						type: "boolean",
						default: "false",
						description:
							"Whether to close the action bar when clicking outside.",
					},
					children: {
						type: "Snippet",
						default: "-",
						description: "Content to render inside the action bar.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "ActionBarSelectionTrigger",
				description:
					"A button that displays the selection count or status.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description:
							"Content to render inside the trigger (typically 'X selected').",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "ActionBarSeparator",
				description: "A visual separator between action groups.",
				props: {
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "ActionBarCloseButton",
				description: "A button to dismiss the action bar.",
				props: {
					"aria-label": {
						type: "string",
						default: '"Close"',
						description: "Accessible label for the close button.",
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
	args: {
		closeOnInteractOutside: false,
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic `ActionBar` with `ActionBarSelectionTrigger` and action buttons.",
			},
		},
	},
	render: () =>
		({
			Component: ActionBarWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Closable: Story = {
	parameters: {
		docs: {
			description: {
				story: "`ActionBar` with `ActionBarCloseButton` for dismissing.",
			},
		},
	},
	render: () =>
		({
			Component: ActionBarWrapper,
			props: { story: "closable" },
		}) as any,
};

export const MultipleActions: Story = {
	parameters: {
		docs: {
			description: {
				story: "Action bar with multiple actions including destructive actions.",
			},
		},
	},
	render: () =>
		({
			Component: ActionBarWrapper,
			props: { story: "multipleActions" },
		}) as any,
};

export const Interactive: Story = {
	parameters: {
		docs: {
			description: {
				story: "Interactive demo showing action bar responding to checkbox selection.",
			},
		},
	},
	render: () =>
		({
			Component: ActionBarWrapper,
			props: { story: "interactive" },
		}) as any,
};
