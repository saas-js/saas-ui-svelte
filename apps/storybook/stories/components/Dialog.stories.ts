import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Dialog } from "$saas/components/dialog";
import DialogWrapper from "../wrappers/components/Dialog.svelte";
import {
	commonArgTypes,
	getControls,
	dialogSizes,
	dialogPlacements,
	dialogScrollBehaviors,
	dialogMotionPresets,
	dialogRoles,
} from "../utils";

const meta: Meta = {
	title: "components/Dialog",
	component: Dialog.Root,
	argTypes: {
		open: {
			control: "boolean",
		},
		size: {
			...commonArgTypes.size,
			options: dialogSizes,
		},
		placement: {
			control: "select",
			options: dialogPlacements,
			table: { defaultValue: { summary: "center" } },
		},
		scrollBehavior: {
			control: "select",
			options: dialogScrollBehaviors,
			table: { defaultValue: { summary: "outside" } },
		},
		motionPreset: {
			control: "select",
			options: dialogMotionPresets,
			table: { defaultValue: { summary: "scale" } },
		},
		role: {
			control: "select",
			options: dialogRoles,
			table: { defaultValue: { summary: "dialog" } },
		},
		onPrefetch: {
			action: "prefetch",
			description:
				"Callback invoked when hovering over the trigger. Similar to Astro's link prefetching, this allows preloading data before opening.",
			table: { category: "Events" },
		},
		children: commonArgTypes.children,
		class: commonArgTypes.class,
	},
	parameters: {
		controls: getControls([
			"open",
			"size",
			"placement",
			"scrollBehavior",
			"motionPreset",
			"role",
			"children",
			"class",
		]),
		docs: {
			description: {
				component:
					"A modal dialog that overlays the page content to display important information or require user interaction.",
			},
		},
		anatomy: `<script>
  import {
    Dialog,
    DialogTrigger,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogBody,
    DialogFooter,
    DialogCloseButton,
    DialogActionTrigger,
  } from "@saas-ui/svelte/components/dialog";
</script>

<Dialog.Root>
  <Dialog.Trigger>Open Dialog</Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Dialog Title</Dialog.Title>
      <Dialog.CloseButton />
    </Dialog.Header>
    <Dialog.Body>
      Dialog content goes here...
    </Dialog.Body>
    <Dialog.Footer>
      <Dialog.ActionTrigger>Cancel</Dialog.ActionTrigger>
      <Button>Confirm</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>`,
		usesPortal: true,
		subComponents: [
			{
				name: "Dialog.Root",
				description:
					"The root container component that manages dialog state and context.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The dialog content.",
					},
					open: {
						type: "boolean",
						default: "false",
						description: "Whether the dialog is open.",
					},
					onOpenChange: {
						type: "(details: { open: boolean }) => void",
						default: "-",
						description:
							"Handler called when the open state changes.",
					},
					size: {
						type: '"xs" | "sm" | "md" | "lg" | "xl" | "cover" | "full"',
						default: '"md"',
						description: "The size of the dialog.",
					},
					placement: {
						type: '"center" | "top" | "bottom"',
						default: '"center"',
						description: "The placement of the dialog.",
					},
					scrollBehavior: {
						type: '"inside" | "outside"',
						default: '"outside"',
						description: "The scroll behavior of the dialog.",
					},
					motionPreset: {
						type: '"scale" | "slide-in-bottom" | "none"',
						default: '"scale"',
						description: "The motion preset of the dialog.",
					},
					role: {
						type: '"dialog" | "alertdialog"',
						default: '"dialog"',
						description: "The role of the dialog.",
					},
					initialFocusEl: {
						type: "() => HTMLElement | null",
						default: "-",
						description:
							"Element to receive focus when the dialog is opened.",
					},
					finalFocusEl: {
						type: "() => HTMLElement | null",
						default: "-",
						description:
							"Element to receive focus when the dialog is closed.",
					},
					restoreFocus: {
						type: "boolean",
						default: "true",
						description:
							"Whether to restore focus to the element that had focus before the dialog was opened.",
					},
					lazyMount: {
						type: "boolean",
						default: "-",
						description:
							"Whether to lazily mount the dialog content.",
					},
					unmountOnExit: {
						type: "boolean",
						default: "-",
						description: "Whether to unmount the dialog on exit.",
					},
					onPrefetch: {
						type: "() => void",
						default: "-",
						description:
							"Callback invoked when hovering over the trigger (for prefetching content). Similar to Astro's link prefetching, this allows preloading data before opening.",
					},
				},
			},
			{
				name: "Dialog.Trigger",
				description: "A button that opens the dialog when clicked.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description:
							"Content to render inside the trigger button.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
					asChild: {
						type: "boolean",
						default: "false",
						description:
							"Whether to render as a child element instead of a button.",
					},
					variant: {
						type: '"solid" | "outline" | "ghost" | "subtle" | "surface" | "plain"',
						default: '"outline"',
						description:
							"The visual variant of the trigger button.",
					},
					size: {
						type: '"2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"',
						default: '"md"',
						description: "The size of the trigger button.",
					},
					colour: {
						type: "ColourName",
						default: '"gray"',
						description: "The colour of the trigger button.",
					},
					style: {
						type: "string",
						default: "-",
						description: "Inline styles to apply.",
					},
				},
			},
			{
				name: "Dialog.Content",
				description:
					"The container for the dialog content, rendered in a portal.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "Content to render inside the dialog.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Dialog.Header",
				description:
					"The header section of the dialog, typically containing the title and close button.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "Content to render inside the header.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Dialog.Title",
				description: "The title text of the dialog.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The title text content.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Dialog.Body",
				description: "The main content area of the dialog.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "Content to render inside the body.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Dialog.Footer",
				description:
					"The footer section of the dialog, typically containing action buttons.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "Content to render inside the footer.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Dialog.CloseButton",
				description:
					"A close button (X icon) positioned in the top-right corner of the dialog.",
				props: {
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Dialog.ActionTrigger",
				description:
					"A button that closes the dialog when clicked, typically used for cancel or secondary actions.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "Content to render inside the button.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
					asChild: {
						type: "boolean",
						default: "false",
						description:
							"Whether to render as a child element instead of a button.",
					},
					variant: {
						type: '"solid" | "outline" | "ghost" | "subtle" | "surface" | "plain"',
						default: '"surface"',
						description: "The visual variant of the button.",
					},
					size: {
						type: '"2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"',
						default: '"md"',
						description: "The size of the button.",
					},
					colour: {
						type: "ColourName",
						default: '"gray"',
						description: "The colour of the button.",
					},
					style: {
						type: "string",
						default: "-",
						description: "Inline styles to apply.",
					},
				},
			},
		],
	},
	args: {
		size: "md",
		placement: "center",
		scrollBehavior: "outside",
		motionPreset: "scale",
		role: "dialog",
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic dialog with title, body content, and action buttons.",
			},
		},
	},
	render: () =>
		({
			Component: DialogWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `size` prop to change the size of the dialog. Options include `xs`, `sm`, `md`, `lg`, `xl`, `cover`, and `full`.",
			},
		},
	},
	render: () =>
		({
			Component: DialogWrapper,
			props: { story: "sizes" },
		}) as any,
};

export const Cover: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Use `size="cover"` to make the dialog cover the entire screen while revealing a small portion of the page behind.',
			},
		},
	},
	render: () =>
		({
			Component: DialogWrapper,
			props: { story: "cover" },
		}) as any,
};

export const InitialFocus: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `initialFocusEl` prop to set which element receives focus when the dialog opens. This is useful for directing user attention to a specific input field.",
			},
		},
	},
	render: () =>
		({
			Component: DialogWrapper,
			props: { story: "initialFocus" },
		}) as any,
};

export const InsideScroll: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Use the `scrollBehavior="inside"` prop to change the scroll behavior of the dialog when its content overflows.',
			},
		},
	},
	render: () =>
		({
			Component: DialogWrapper,
			props: { story: "insideScroll" },
		}) as any,
};

export const OutsideScroll: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Use the `scrollBehavior="outside"` prop to change the scroll behavior of the dialog when its content overflows.',
			},
		},
	},
	render: () =>
		({
			Component: DialogWrapper,
			props: { story: "outsideScroll" },
		}) as any,
};

export const MotionPreset: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `motionPreset` prop to change the animation of the dialog.",
			},
		},
	},
	render: () =>
		({
			Component: DialogWrapper,
			props: { story: "motionPreset" },
		}) as any,
};

export const AlertDialog: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Set `role="alertdialog"` to change the dialog to an alert dialog.',
			},
		},
	},
	render: () =>
		({
			Component: DialogWrapper,
			props: { story: "alertDialog" },
		}) as any,
};

export const WithDataList: Story = {
	parameters: {
		docs: {
			description: {
				story: "Compose the `Dialog` component with the `DataList` component to display structured information.",
			},
		},
	},
	render: () =>
		({
			Component: DialogWrapper,
			props: { story: "withDataList" },
		}) as any,
};
