import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Sidebar } from "$saas/components/sidebar";
import SidebarWrapper from "../wrappers/components/Sidebar.svelte";

const meta: Meta = {
	title: "components/Sidebar",
	component: Sidebar.Root,
	argTypes: {
		class: {
			control: "text",
			description: "CSS class to apply to the component.",
		},
	},
	parameters: {
		docs: {
			description: {
				component:
					"A vertical navigation component that provides a collapsible sidebar layout for application navigation.",
			},
		},
		anatomy: `<script>
  import {
    Sidebar,
    SidebarRoot,
    SidebarHeader,
    SidebarBody,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupHeader,
    SidebarGroupTitle,
    SidebarGroupLabel,
    SidebarGroupContent,
    SidebarNavItem,
    SidebarNavButton,
    SidebarItem,
    SidebarLink,
    SidebarToggle,
  } from "@saas-ui/svelte/components/sidebar";
</script>

<Sidebar.Root>
  <Sidebar.Header>
    <Logo />
  </Sidebar.Header>
  <Sidebar.Body>
    <Sidebar.Group>
      <Sidebar.GroupHeader>
        <Sidebar.GroupTitle>Navigation</Sidebar.GroupTitle>
      </Sidebar.GroupHeader>
      <Sidebar.GroupContent>
        <Sidebar.NavItem href="/dashboard">Dashboard</Sidebar.NavItem>
        <Sidebar.NavItem href="/settings">Settings</Sidebar.NavItem>
      </Sidebar.GroupContent>
    </Sidebar.Group>
  </Sidebar.Body>
  <Sidebar.Footer>
    <Sidebar.Toggle />
  </Sidebar.Footer>
</Sidebar.Root>`,
		subComponents: [
			{
				name: "Sidebar.Root",
				description: "The main sidebar container component.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The content to render inside the sidebar.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Sidebar.Header",
				description: "The header section of the sidebar.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The content to render inside the sidebar header.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Sidebar.Body",
				description: "The main scrollable body section of the sidebar.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The content to render inside the sidebar body.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Sidebar.Footer",
				description: "The footer section of the sidebar.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The content to render inside the sidebar footer.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Sidebar.Group",
				description: "A group container for organizing sidebar items.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The content to render inside the sidebar group.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Sidebar.GroupHeader",
				description: "The header section of a sidebar group.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The content to render inside the group header.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Sidebar.GroupTitle",
				description: "The title element for a sidebar group.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The title text or content.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Sidebar.GroupLabel",
				description: "A label element for a sidebar group.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The label text or content.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Sidebar.GroupContent",
				description: "The content area of a sidebar group.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The content to render inside the group content area.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Sidebar.NavItem",
				description: "A navigation item wrapper element.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The content to render inside the nav item.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Sidebar.NavButton",
				description: "A button-style navigation element.",
				props: {
					active: {
						type: "boolean",
						default: "false",
						description: "Whether this button is currently active.",
					},
					children: {
						type: "Snippet",
						default: "-",
						description: "The content to render inside the nav button (icon + label).",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Sidebar.Item",
				description: "A clickable sidebar item with icon support.",
				props: {
					active: {
						type: "boolean",
						default: "false",
						description: "Whether this item is currently active.",
					},
					icon: {
						type: "Component",
						default: "-",
						description: "Icon component to display before the label. Auto-sized to fit.",
					},
					children: {
						type: "Snippet",
						default: "-",
						description: "The label text or content.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Sidebar.Link",
				description: "A navigation link element with icon support.",
				props: {
					active: {
						type: "boolean",
						default: "false",
						description: "Whether this link is currently active.",
					},
					icon: {
						type: "Component",
						default: "-",
						description: "Icon component to display before the label. Auto-sized to fit.",
					},
					href: {
						type: "string",
						default: "-",
						description: "The URL the link points to.",
					},
					children: {
						type: "Snippet",
						default: "-",
						description: "The label text or content.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Sidebar.Toggle",
				description: "A button to toggle the sidebar collapsed state.",
				props: {
					onclick: {
						type: "(collapsed: boolean) => void",
						default: "-",
						description: "Callback when the toggle is clicked.",
					},
					children: {
						type: "Snippet",
						default: "-",
						description: "The icon or content to display in the toggle.",
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
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic sidebar with navigation items.",
			},
		},
	},
	render: () =>
		({
			Component: SidebarWrapper,
			props: { story: "basic" },
		}) as any,
};
