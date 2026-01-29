import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Drawer } from "$saas/components/drawer";
import DrawerWrapper from "../wrappers/components/Drawer.svelte";
import {
	commonArgTypes,
	getControls,
	drawerSizes,
	drawerPlacements,
	dialogRoles,
} from "../utils";

const meta: Meta = {
	title: "components/Drawer",
	component: Drawer.Root,
	argTypes: {
		open: {
			control: "boolean",
		},
		size: {
			...commonArgTypes.size,
			options: drawerSizes,
		},
		placement: {
			control: "select",
			options: drawerPlacements,
			table: { defaultValue: { summary: "end" } },
		},
		attached: {
			control: "boolean",
			description:
				"Whether the drawer is attached to the edge of the viewport.",
			table: { defaultValue: { summary: "false" } },
		},
		role: {
			control: "select",
			options: dialogRoles,
			table: { defaultValue: { summary: "dialog" } },
		},
		children: commonArgTypes.children,
		class: commonArgTypes.class,
	},
	parameters: {
		controls: getControls([
			"open",
			"size",
			"placement",
			"attached",
			"role",
			"children",
			"class",
		]),
		docs: {
			description: {
				component: "A panel that slides in from the edge of the screen, typically used for navigation or additional content.",
			},
		},
		anatomy: `<script>
  import {
    Drawer,
    DrawerTrigger,
    DrawerContent,
    DrawerHeader,
    DrawerTitle,
    DrawerBody,
    DrawerFooter,
    DrawerCloseButton,
    DrawerActionTrigger,
  } from "@saas-ui/svelte/components/drawer";
</script>

<Drawer.Root>
  <Drawer.Trigger>Open Drawer</Drawer.Trigger>
  <Drawer.Content>
    <Drawer.Header>
      <Drawer.Title>Drawer Title</Drawer.Title>
      <Drawer.CloseButton />
    </Drawer.Header>
    <Drawer.Body>
      Drawer content goes here...
    </Drawer.Body>
    <Drawer.Footer>
      <Drawer.ActionTrigger>Cancel</Drawer.ActionTrigger>
      <Button>Save</Button>
    </Drawer.Footer>
  </Drawer.Content>
</Drawer.Root>`,
		usesPortal: true,
		subComponents: [
			{
				name: "Drawer.Root",
				description: "The root container component for the drawer.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The drawer content.",
					},
					open: {
						type: "boolean",
						default: "false",
						description: "Whether the drawer is open.",
					},
					onOpenChange: {
						type: "(details: { open: boolean }) => void",
						default: "-",
						description: "Handler called when the open state changes.",
					},
					size: {
						type: '"xs" | "sm" | "md" | "lg" | "xl" | "full"',
						default: '"sm"',
						description: "The size of the drawer.",
					},
					placement: {
						type: '"start" | "end" | "top" | "bottom"',
						default: '"end"',
						description: "The placement of the drawer.",
					},
					attached: {
						type: "boolean",
						default: "false",
						description:
							"Whether the drawer is attached to the edge of the viewport (no padding/rounded corners).",
					},
					role: {
						type: '"dialog" | "alertdialog"',
						default: '"dialog"',
						description: "The role of the drawer.",
					},
					initialFocusEl: {
						type: "() => HTMLElement | null",
						default: "-",
						description: "Element to receive focus when the drawer is opened.",
					},
					finalFocusEl: {
						type: "() => HTMLElement | null",
						default: "-",
						description: "Element to receive focus when the drawer is closed.",
					},
					restoreFocus: {
						type: "boolean",
						default: "true",
						description:
							"Whether to restore focus to the element that had focus before the drawer was opened.",
					},
					lazyMount: {
						type: "boolean",
						default: "-",
						description: "Whether to lazily mount the drawer content.",
					},
					unmountOnExit: {
						type: "boolean",
						default: "-",
						description: "Whether to unmount the drawer on exit.",
					},
				},
			},
			{
				name: "Drawer.Content",
				description:
					"The content container that renders inside a portal with backdrop.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The drawer content.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
					offset: {
						type: "string",
						default: "-",
						description:
							"The offset from the edge of the viewport (in spacing units). Overrides the attached prop when set.",
					},
					rounded: {
						type: "string",
						default: "-",
						description:
							'Custom border radius class (e.g., "rounded-md", "rounded-lg"). When used with offset, applies rounding to the drawer.',
					},
				},
			},
			{
				name: "Drawer.Header",
				description: "The header section of the drawer.",
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
				name: "Drawer.Title",
				description: "The title element for the drawer.",
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
				name: "Drawer.Body",
				description: "The main body content area with scrolling support.",
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
				name: "Drawer.Footer",
				description: "The footer section for action buttons.",
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
				name: "Drawer.Trigger",
				description: "Button that opens the drawer.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The trigger content.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
					asChild: {
						type: "boolean",
						default: "false",
						description: "Whether to render as a child element.",
					},
					variant: {
						type: '"solid" | "outline" | "ghost" | "subtle" | "surface" | "plain"',
						default: '"outline"',
						description: "The button variant.",
					},
					size: {
						type: '"2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"',
						default: '"md"',
						description: "The button size.",
					},
					colour: {
						type: "ColourName",
						default: '"gray"',
						description: "The colour theme of the button.",
					},
					style: {
						type: "string",
						default: "-",
						description: "Additional inline styles.",
					},
				},
			},
			{
				name: "Drawer.CloseButton",
				description: "Close button positioned in the top-right corner.",
				props: {
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Drawer.ActionTrigger",
				description: "Action button that closes the drawer when clicked.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The action trigger content.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
					asChild: {
						type: "boolean",
						default: "false",
						description: "Whether to render as a child element.",
					},
					variant: {
						type: '"solid" | "outline" | "ghost" | "subtle" | "surface" | "plain"',
						default: '"surface"',
						description: "The button variant.",
					},
					size: {
						type: '"2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl"',
						default: '"md"',
						description: "The button size.",
					},
					colour: {
						type: "ColourName",
						default: '"gray"',
						description: "The colour theme of the button.",
					},
					style: {
						type: "string",
						default: "-",
						description: "Additional inline styles.",
					},
				},
			},
		],
	},
	args: {
		size: "xs",
		placement: "end",
		attached: false,
		role: "dialog",
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic drawer with title, body content, and action buttons.",
			},
		},
	},
	render: () =>
		({
			Component: DrawerWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Attached: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `attached` prop to render the drawer attached to the edge of the viewport without padding or rounded corners.",
			},
		},
	},
	render: () =>
		({
			Component: DrawerWrapper,
			props: { story: "attached" },
		}) as any,
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `size` prop to change the size of the drawer. Options include `xs`, `sm`, `md`, `lg`, `xl`, and `full`.",
			},
		},
	},
	render: () =>
		({
			Component: DrawerWrapper,
			props: { story: "sizes" },
		}) as any,
};

export const Offset: Story = {
	parameters: {
		docs: {
			description: {
				story: "Pass the `offset` prop to the `Drawer.Content` to add spacing around the drawer. You can also use the `rounded` prop to customize the border radius.",
			},
		},
	},
	render: () =>
		({
			Component: DrawerWrapper,
			props: { story: "offset" },
		}) as any,
};

export const Placement: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `placement` prop to change the position of the drawer. Options include `start` (left), `end` (right), `top`, and `bottom`.",
			},
		},
	},
	render: () =>
		({
			Component: DrawerWrapper,
			props: { story: "placement" },
		}) as any,
};

export const InitialFocus: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `initialFocusEl` prop to set which element receives focus when the drawer opens. This is useful for directing user attention to a specific input field.",
			},
		},
	},
	render: () =>
		({
			Component: DrawerWrapper,
			props: { story: "initialFocus" },
		}) as any,
};
