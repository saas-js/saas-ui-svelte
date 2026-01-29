import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Popover } from "$saas/components/popover";
import PopoverWrapper from "../wrappers/components/Popover.svelte";

const popoverSizes = ["xs", "sm", "md", "lg"] as const;

const meta: Meta = {
	title: "components/Popover",
	component: Popover.Root,
	argTypes: {
		size: {
			control: "select",
			options: popoverSizes,
			description: "The size of the popover.",
			table: { defaultValue: { summary: "md" } },
		},
		open: {
			control: "boolean",
			description: "Whether the popover is open.",
		},
		autoFocus: {
			control: "boolean",
			description: "Whether to auto-focus the first focusable element.",
			table: { defaultValue: { summary: "true" } },
		},
		closeOnEscape: {
			control: "boolean",
			description: "Whether to close on escape key.",
			table: { defaultValue: { summary: "true" } },
		},
		closeOnInteractOutside: {
			control: "boolean",
			description: "Whether to close when clicking outside.",
			table: { defaultValue: { summary: "true" } },
		},
		modal: {
			control: "boolean",
			description: "Whether the popover should be modal.",
			table: { defaultValue: { summary: "false" } },
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
		docs: {
			description: {
				component:
					"A floating panel that appears next to a trigger element, commonly used for displaying additional content or forms.",
			},
		},
		anatomy: `<script>
  import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverTitle,
    PopoverDescription,
    PopoverArrow,
    PopoverCloseTrigger,
  } from "@saas-ui/svelte/components/popover";
</script>

<Popover.Root>
  <PopoverTrigger triggerText="Open Popover" />
  <PopoverContent>
    <PopoverArrow />
    <PopoverHeader>
      <PopoverTitle>Popover Title</PopoverTitle>
      <PopoverCloseTrigger />
    </PopoverHeader>
    <PopoverBody>
      <PopoverDescription>Popover content goes here.</PopoverDescription>
    </PopoverBody>
    <PopoverFooter>Footer content</PopoverFooter>
  </PopoverContent>
</Popover.Root>`,
		usesPortal: true,
		subComponents: [
			{
				name: "Popover.Root",
				description: "The root container component for the popover.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The popover content.",
					},
					id: {
						type: "string",
						default: "-",
						description: "The unique identifier for the popover.",
					},
					size: {
						type: '"xs" | "sm" | "md" | "lg"',
						default: '"md"',
						description: "The size of the popover.",
					},
					open: {
						type: "boolean",
						default: "-",
						description: "Whether the popover is open.",
					},
					onOpenChange: {
						type: "(details: { open: boolean }) => void",
						default: "-",
						description: "Handler called when the open state changes.",
					},
					autoFocus: {
						type: "boolean",
						default: "true",
						description:
							"Whether to automatically set focus on the first focusable content when opened.",
					},
					closeOnEscape: {
						type: "boolean",
						default: "true",
						description: "Whether to close when the escape key is pressed.",
					},
					closeOnInteractOutside: {
						type: "boolean",
						default: "true",
						description: "Whether to close when clicking outside.",
					},
					modal: {
						type: "boolean",
						default: "false",
						description: "Whether the popover should be modal.",
					},
					portalled: {
						type: "boolean",
						default: "true",
						description: "Whether the popover is portalled.",
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
						type: "PopoverRootProps['positioning']",
						default: '{ placement: "bottom", gutter: 12 }',
						description: "The positioning options for the popover.",
					},
					initialFocusEl: {
						type: "() => HTMLElement | null",
						default: "-",
						description: "Element to receive focus when the popover is opened.",
					},
				},
			},
			{
				name: "Popover.Trigger",
				description: "The trigger element that opens the popover.",
				props: {
					children: {
						type: "Snippet<[{ props: () => Record<string, any> }]>",
						default: "-",
						description:
							"The trigger element. Receives trigger props that must be spread onto an interactive element. Optional when using triggerText or triggerIcon.",
					},
					triggerText: {
						type: "string",
						default: "-",
						description: "Simple text to display on the trigger button.",
					},
					triggerIcon: {
						type: "Component",
						default: "-",
						description: "Icon component to display on the trigger button.",
					},
					triggerVariant: {
						type: '"ghost" | "outline" | "solid" | "subtle" | "plain"',
						default: '"outline"',
						description: "Variant for the auto-generated trigger button.",
					},
					triggerSize: {
						type: '"xs" | "sm" | "md" | "lg"',
						default: '"sm"',
						description: "Size for the auto-generated trigger button.",
					},
					triggerClass: {
						type: "string",
						default: "-",
						description:
							"CSS classes to apply to the auto-generated trigger button.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Popover.Content",
				description: "The content container of the popover.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The content to display in the popover.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Popover.Header",
				description: "The header section of the popover.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The header content.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Popover.Body",
				description: "The body section of the popover.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The body content.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Popover.Footer",
				description: "The footer section of the popover.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The footer content.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Popover.Title",
				description: "The title element of the popover.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The title content.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Popover.Description",
				description: "The description element of the popover.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The description content.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Popover.Arrow",
				description: "The arrow element pointing to the trigger.",
				props: {
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Popover.CloseTrigger",
				description: "The close button for the popover.",
				props: {
					children: {
						type: "Snippet<[() => Record<string, unknown>]>",
						default: "-",
						description:
							"Custom content for the close trigger. Receives trigger props that must be spread onto an interactive element.",
					},
					buttonText: {
						type: "string",
						default: "-",
						description:
							"Simple text to display on the close button (creates a text button instead of icon).",
					},
					buttonVariant: {
						type: '"ghost" | "outline" | "solid" | "subtle" | "plain"',
						default: '"ghost"',
						description:
							"Variant for the auto-generated button when using buttonText.",
					},
					buttonSize: {
						type: '"xs" | "sm" | "md" | "lg"',
						default: '"sm"',
						description:
							"Size for the auto-generated button when using buttonText.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
					"aria-label": {
						type: "string",
						default: '"Close"',
						description: "Accessible label for the close button.",
					},
				},
			},
		],
	},
	args: {
		size: "md",
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic popover with form content and close button.",
			},
		},
	},
	render: () =>
		({
			Component: PopoverWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Controlled: Story = {
	parameters: {
		docs: {
			description: {
				story: "Controlled popover with external state management using the `open` prop.",
			},
		},
	},
	render: () =>
		({
			Component: PopoverWrapper,
			props: { story: "controlled" },
		}) as any,
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Popover in different sizes. Available sizes: `xs`, `sm`, `md`, `lg`.",
			},
		},
	},
	render: () =>
		({
			Component: PopoverWrapper,
			props: { story: "sizes" },
		}) as any,
};

export const LazyMounted: Story = {
	parameters: {
		docs: {
			description: {
				story: "Lazy mounted popover that only renders content when opened and unmounts on close.",
			},
		},
	},
	render: () =>
		({
			Component: PopoverWrapper,
			props: { story: "lazyMounted" },
		}) as any,
};

export const Placement: Story = {
	parameters: {
		docs: {
			description: {
				story: "Popover with custom placement relative to the trigger element.",
			},
		},
	},
	render: () =>
		({
			Component: PopoverWrapper,
			props: { story: "placement" },
		}) as any,
};

export const Offset: Story = {
	parameters: {
		docs: {
			description: {
				story: "Popover with custom offset distance from the trigger element.",
			},
		},
	},
	render: () =>
		({
			Component: PopoverWrapper,
			props: { story: "offset" },
		}) as any,
};

export const SameWidth: Story = {
	parameters: {
		docs: {
			description: {
				story: "Popover that matches the width of its trigger element.",
			},
		},
	},
	render: () =>
		({
			Component: PopoverWrapper,
			props: { story: "sameWidth" },
		}) as any,
};

export const Nested: Story = {
	parameters: {
		docs: {
			description: {
				story: "Nested popovers demonstrating popover within popover functionality.",
			},
		},
	},
	render: () =>
		({
			Component: PopoverWrapper,
			props: { story: "nested" },
		}) as any,
};

export const InitialFocus: Story = {
	parameters: {
		docs: {
			description: {
				story: "Popover with initial focus on a specific element using `initialFocusEl`.",
			},
		},
	},
	render: () =>
		({
			Component: PopoverWrapper,
			props: { story: "initialFocus" },
		}) as any,
};

export const Form: Story = {
	parameters: {
		docs: {
			description: {
				story: "Popover containing a form layout for inline editing or quick actions.",
			},
		},
	},
	render: () =>
		({
			Component: PopoverWrapper,
			props: { story: "form" },
		}) as any,
};

export const WithHeaderFooter: Story = {
	parameters: {
		docs: {
			description: {
				story: "Popover with distinct header, body, and footer sections.",
			},
		},
	},
	render: () =>
		({
			Component: PopoverWrapper,
			props: { story: "withHeaderFooter" },
		}) as any,
};
