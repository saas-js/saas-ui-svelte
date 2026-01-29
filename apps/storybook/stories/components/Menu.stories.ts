import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Menu } from "$saas/components/menu";
import MenuWrapper from "../wrappers/components/Menu.svelte";

const menuSizes = ["sm", "md"] as const;
const colours = [
	"gray",
	"red",
	"orange",
	"yellow",
	"green",
	"teal",
	"blue",
	"cyan",
	"purple",
	"pink",
	"rose",
] as const;

const meta: Meta = {
	title: "components/Menu",
	component: Menu.Root,
	argTypes: {
		size: {
			control: "select",
			options: menuSizes,
			description: "The size of the menu.",
			table: { defaultValue: { summary: "md" } },
		},
		colour: {
			control: "select",
			options: colours,
			description: "The colour theme of the component.",
			table: { defaultValue: { summary: "indigo" } },
		},
		open: {
			control: "boolean",
			description: "Whether the menu is open.",
		},
		closeOnSelect: {
			control: "boolean",
			description: "Whether to close the menu when an option is selected.",
			table: { defaultValue: { summary: "true" } },
		},
		loopFocus: {
			control: "boolean",
			description: "Whether to loop the keyboard navigation.",
			table: { defaultValue: { summary: "false" } },
		},
		children: {
			control: false,
			description: "The content to be rendered inside the component.",
			table: { type: { summary: "Snippet" } },
		},
	},
	parameters: {
		docs: {
			description: {
				component:
					"A dropdown menu component for displaying a list of actions or options triggered by a button.",
			},
		},
		anatomy: `<script>
  import {
    Menu,
    MenuButton,
    MenuContent,
    MenuItem,
    MenuItemGroup,
    MenuSeparator,
  } from "@saas-ui/svelte/components/menu";
</script>

<Menu.Root>
  <MenuButton>Open Menu</MenuButton>
  <MenuContent>
    <MenuItemGroup>
      <MenuItem value="edit">Edit</MenuItem>
      <MenuItem value="duplicate">Duplicate</MenuItem>
    </MenuItemGroup>
    <MenuSeparator />
    <MenuItem value="delete">Delete</MenuItem>
  </MenuContent>
</Menu.Root>`,
		usesPortal: true,
		subComponents: [
			{
				name: "Menu.Root",
				description: "The root container component that provides context for the menu.",
				props: {
					children: {
						type: "Snippet",
						description: "The menu content.",
						required: true,
					},
					id: {
						type: "string",
						description: "The unique identifier for the menu. If not provided, a unique ID will be auto-generated.",
					},
					size: {
						type: '"sm" | "md"',
						default: '"md"',
						description: "The size of the menu.",
					},
					colour: {
						type: "ColourName",
						default: '"indigo"',
						description: "The colour palette for highlighted items.",
					},
					open: {
						type: "boolean",
						description: "Whether the menu is open.",
					},
					closeOnSelect: {
						type: "boolean",
						default: "true",
						description: "Whether to close the menu when an option is selected.",
					},
					loopFocus: {
						type: "boolean",
						default: "false",
						description: "Whether to loop the keyboard navigation.",
					},
				},
			},
			{
				name: "Menu.Button",
				description: "The button that triggers the menu to open.",
				props: {
					children: {
						type: "Snippet",
						description: "The button content.",
						required: true,
					},
					class: {
						type: "string",
						description: "Additional CSS classes to apply.",
					},
					variant: {
						type: '"solid" | "subtle" | "outline" | "ghost" | "plain" | "breadcrumb"',
						default: '"outline"',
						description: "The visual style of the button.",
					},
					size: {
						type: '"xs" | "sm" | "md" | "lg" | "xl" | "2xl"',
						default: '"md"',
						description: "The size of the button.",
					},
					colour: {
						type: "ColourName",
						default: '"gray"',
						description: "The colour palette of the button.",
					},
					showIndicator: {
						type: "boolean",
						default: "false",
						description: "Whether to show the dropdown indicator.",
					},
					asChild: {
						type: "boolean",
						description: "Whether to render as a child element.",
					},
					style: {
						type: "string",
						description: "Additional inline styles.",
					},
				},
			},
			{
				name: "Menu.Content",
				description: "The container for menu items that appears when the menu is open.",
				props: {
					children: {
						type: "Snippet",
						description: "The menu content.",
						required: true,
					},
					class: {
						type: "string",
						description: "Additional CSS classes to apply.",
					},
					portal: {
						type: "boolean",
						default: "true",
						description: "Whether to render the menu in a portal.",
					},
				},
			},
			{
				name: "Menu.Item",
				description: "A single menu item that can be selected.",
				props: {
					children: {
						type: "Snippet",
						description: "The menu item content.",
						required: true,
					},
					value: {
						type: "string",
						description: "The unique value of the menu item.",
						required: true,
					},
					class: {
						type: "string",
						description: "Additional CSS classes to apply.",
					},
					disabled: {
						type: "boolean",
						description: "Whether the menu item is disabled.",
					},
				},
			},
			{
				name: "Menu.ItemLink",
				description: "A menu item that renders as a navigation link.",
				props: {
					children: {
						type: "Snippet",
						description: "The link text.",
						required: true,
					},
					value: {
						type: "string",
						description: "The unique value of the menu item.",
						required: true,
					},
					href: {
						type: "string",
						description: "The URL to navigate to.",
						required: true,
					},
					target: {
						type: "string",
						description: "Where to open the link.",
					},
					rel: {
						type: "string",
						description: "Relationship of the linked URL.",
					},
					class: {
						type: "string",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Menu.ItemCommand",
				description: "Displays a keyboard shortcut alongside a menu item.",
				props: {
					children: {
						type: "Snippet",
						description: "The command content (keyboard shortcut).",
						required: true,
					},
					class: {
						type: "string",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Menu.ItemGroup",
				description: "Groups related menu items together with an optional label.",
				props: {
					children: {
						type: "Snippet",
						description: "The menu item group content.",
						required: true,
					},
					title: {
						type: "string",
						description: "The group title/label.",
					},
					class: {
						type: "string",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Menu.Separator",
				description: "A visual separator between menu items.",
				props: {
					class: {
						type: "string",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Menu.TriggerItem",
				description: "A menu item that opens a submenu when hovered or selected.",
				props: {
					children: {
						type: "Snippet",
						description: "The trigger item content.",
						required: true,
					},
					value: {
						type: "string",
						description: "The unique value of the menu item.",
						required: true,
					},
					class: {
						type: "string",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Menu.ContextTrigger",
				description: "A trigger that opens the menu on right-click (context menu).",
				props: {
					children: {
						type: "Snippet",
						description: "The context trigger content.",
						required: true,
					},
					class: {
						type: "string",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Menu.CheckboxItem",
				description: "A menu item with a checkbox for multi-selection options.",
				props: {
					children: {
						type: "Snippet",
						description: "The checkbox item content.",
						required: true,
					},
					value: {
						type: "string",
						description: "The unique value of the checkbox item.",
						required: true,
					},
					checked: {
						type: "boolean",
						description: "Whether the checkbox is checked.",
					},
					class: {
						type: "string",
						description: "Additional CSS classes to apply.",
					},
					showIndicator: {
						type: "boolean",
						default: "true",
						description: "Whether to show the checkbox indicator.",
					},
					startElement: {
						type: "Snippet",
						description: "Element to render at the start of the item (for custom content, overrides showIndicator).",
					},
					disabled: {
						type: "boolean",
						description: "Whether the checkbox item is disabled.",
					},
				},
			},
			{
				name: "Menu.RadioItemGroup",
				description: "Groups radio items together for single-selection options.",
				props: {
					children: {
						type: "Snippet",
						description: "The radio item group content.",
						required: true,
					},
					value: {
						type: "string",
						description: "The controlled value of the radio group.",
					},
					onValueChange: {
						type: "(details: { value: string }) => void",
						description: "Handler called when the value changes.",
					},
					class: {
						type: "string",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Menu.RadioItem",
				description: "A menu item with a radio button for single-selection within a group.",
				props: {
					children: {
						type: "Snippet",
						description: "The radio item content.",
						required: true,
					},
					value: {
						type: "string",
						description: "The unique value of the radio item.",
						required: true,
					},
					class: {
						type: "string",
						description: "Additional CSS classes to apply.",
					},
					showIndicator: {
						type: "boolean",
						default: "true",
						description: "Whether to show the radio indicator.",
					},
					startElement: {
						type: "Snippet",
						description: "Element to render at the start of the item (for custom content, overrides showIndicator).",
					},
					disabled: {
						type: "boolean",
						description: "Whether the radio item is disabled.",
					},
				},
			},
			{
				name: "Menu.ItemIndicator",
				description: "The indicator element shown for checked checkbox or radio items.",
				props: {
					children: {
						type: "Snippet",
						description: "Custom indicator content.",
					},
					class: {
						type: "string",
						description: "Additional CSS classes to apply.",
					},
				},
			},
		],
	},
	args: {
		size: "md",
		colour: "indigo",
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic menu with default styling and simple menu items.",
			},
		},
	},
	render: () =>
		({
			Component: MenuWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `size` prop to control the size of the menu. Available sizes: `sm`, `md`.",
			},
		},
	},
	render: () =>
		({
			Component: MenuWrapper,
			props: { story: "sizes" },
		}) as any,
};

export const Command: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `Menu.ItemCommand` component to display keyboard shortcuts alongside menu items.",
			},
		},
	},
	render: () =>
		({
			Component: MenuWrapper,
			props: { story: "command" },
		}) as any,
};

export const ContextMenu: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use `Menu.ContextTrigger` to create a right-click context menu.",
			},
		},
	},
	render: () =>
		({
			Component: MenuWrapper,
			props: { story: "contextMenu" },
		}) as any,
};

export const Group: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use `Menu.ItemGroup` to group related menu items together with an optional label.",
			},
		},
	},
	render: () =>
		({
			Component: MenuWrapper,
			props: { story: "group" },
		}) as any,
};

export const Submenu: Story = {
	parameters: {
		docs: {
			description: {
				story: "Nested menus using `Menu.TriggerItem` to create submenus.",
			},
		},
	},
	render: () =>
		({
			Component: MenuWrapper,
			props: { story: "submenu" },
		}) as any,
};

export const Links: Story = {
	parameters: {
		docs: {
			description: {
				story: "Menu items rendered as navigation links using `Menu.ItemLink`.",
			},
		},
	},
	render: () =>
		({
			Component: MenuWrapper,
			props: { story: "links" },
		}) as any,
};

export const Radio: Story = {
	parameters: {
		docs: {
			description: {
				story: "Radio items in a menu for single-selection options using `Menu.RadioItemGroup`.",
			},
		},
	},
	render: () =>
		({
			Component: MenuWrapper,
			props: { story: "radio" },
		}) as any,
};

export const Checkbox: Story = {
	parameters: {
		docs: {
			description: {
				story: "Checkbox items in a menu for multi-selection options using `Menu.CheckboxItem`.",
			},
		},
	},
	render: () =>
		({
			Component: MenuWrapper,
			props: { story: "checkbox" },
		}) as any,
};

export const IconAndCommand: Story = {
	parameters: {
		docs: {
			description: {
				story: "Compose menu items with icons and keyboard command shortcuts.",
			},
		},
	},
	render: () =>
		({
			Component: MenuWrapper,
			props: { story: "iconAndCommand" },
		}) as any,
};

export const Placement: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use `positioning.placement` to control menu placement relative to the trigger.",
			},
		},
	},
	render: () =>
		({
			Component: MenuWrapper,
			props: { story: "placement" },
		}) as any,
};

export const MixedLayout: Story = {
	parameters: {
		docs: {
			description: {
				story: "Mixed layout with horizontal and vertical items for complex menu structures.",
			},
		},
	},
	render: () =>
		({
			Component: MenuWrapper,
			props: { story: "mixedLayout" },
		}) as any,
};

export const Colours: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `colour` prop to change the colour scheme of the menu.",
			},
		},
	},
	render: () =>
		({
			Component: MenuWrapper,
			props: { story: "colours" },
		}) as any,
};
