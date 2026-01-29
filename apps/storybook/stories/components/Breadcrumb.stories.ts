import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Breadcrumb } from "$saas/components/breadcrumb";
import BreadcrumbWrapper from "../wrappers/components/Breadcrumb.svelte";
import {
	commonArgTypes,
	getControls,
	breadcrumbSizes,
	breadcrumbVariants,
} from "../utils";

const meta: Meta = {
	title: "components/Breadcrumb",
	component: Breadcrumb.Root,
	argTypes: {
		variant: {
			...commonArgTypes.variant,
			options: breadcrumbVariants,
			table: { defaultValue: { summary: "plain" } },
		},
		size: {
			...commonArgTypes.size,
			options: breadcrumbSizes,
			table: { defaultValue: { summary: "md" } },
		},
		separator: {
			control: "text",
			description: "The separator between breadcrumb items.",
			table: { defaultValue: { summary: "/" } },
		},
		children: commonArgTypes.children,
		class: commonArgTypes.class,
	},
	parameters: {
		controls: getControls([
			"variant",
			"size",
			"separator",
			"children",
			"class",
		]),
		docs: {
			description: {
				component:
					"A navigation aid that shows the user's location within a website hierarchy and allows navigation to parent pages.",
			},
		},
		anatomy: `<script>
  import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbCurrentLink,
  } from "@saas-ui/svelte/components/breadcrumb";
</script>

<Breadcrumb.Root>
  <BreadcrumbItem>
    <BreadcrumbLink href="/">Home</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbItem>
    <BreadcrumbLink href="/products">Products</BreadcrumbLink>
  </BreadcrumbItem>
  <BreadcrumbItem>
    <BreadcrumbCurrentLink>Current Page</BreadcrumbCurrentLink>
  </BreadcrumbItem>
</Breadcrumb.Root>`,
		// Sub-component props for documentation
		subComponents: [
			{
				name: "Breadcrumb.Root",
				description: "The breadcrumb container.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The breadcrumb items.",
					},
					size: {
						type: '"sm" | "md" | "lg"',
						default: '"md"',
						description: "The size of the breadcrumb.",
					},
					variant: {
						type: '"plain" | "underline"',
						default: '"plain"',
						description: "The visual style of the breadcrumb links.",
					},
					separator: {
						type: "Component | string",
						default: '"/"',
						description:
							"The separator element between breadcrumb items. Can be a string or SVG component.",
					},
					separatorGap: {
						type: "string | number",
						default: "-",
						description: "The gap around separators (in spacing units).",
					},
					ariaLabel: {
						type: "string",
						default: '"Breadcrumb"',
						description: "Accessible label for the breadcrumb navigation.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Breadcrumb.Item",
				description: "A single breadcrumb item.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The breadcrumb item content.",
					},
					showSeparator: {
						type: "boolean",
						default: "true",
						description: "Whether to show the separator after this item.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Breadcrumb.Link",
				description: "A clickable breadcrumb link.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The link content.",
					},
					showSeparator: {
						type: "boolean",
						default: "true",
						description: "Whether to show the separator after this link.",
					},
					as: {
						type: '"a" | "button"',
						default: '"a"',
						description: "Render as a button instead of an anchor.",
					},
					href: {
						type: "string",
						default: "-",
						description: "The URL the link points to.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Breadcrumb.CurrentLink",
				description:
					"The current page indicator in the breadcrumb (non-interactive).",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The current page content.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Breadcrumb.Ellipsis",
				description:
					"An ellipsis indicator used to collapse middle breadcrumb items.",
				props: {
					showSeparator: {
						type: "boolean",
						default: "true",
						description: "Whether to show the separator after the ellipsis.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Breadcrumb.Menu",
				description:
					"A breadcrumb item that contains a dropdown menu for collapsed items.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description:
							"The menu content (MenuRoot with MenuButton, MenuContent, etc.).",
					},
					showSeparator: {
						type: "boolean",
						default: "true",
						description: "Whether to show the separator after this menu.",
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
		variant: "plain",
		size: "md",
		separator: "/",
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic breadcrumb navigation with default styling.",
			},
		},
	},
	render: () =>
		({
			Component: BreadcrumbWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `size` prop to change the size of the breadcrumb. Available sizes: `sm`, `md`, `lg`.",
			},
		},
	},
	render: () =>
		({
			Component: BreadcrumbWrapper,
			props: { story: "sizes" },
		}) as any,
};

export const Variants: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `variant` prop to change the visual style. Available variants: `plain`, `underline`.",
			},
		},
	},
	render: () =>
		({
			Component: BreadcrumbWrapper,
			props: { story: "variants" },
		}) as any,
};

export const WithSeparator: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `separator` prop to customize the separator character between items.",
			},
		},
	},
	render: () =>
		({
			Component: BreadcrumbWrapper,
			props: { story: "withSeparator" },
		}) as any,
};

export const WithIcon: Story = {
	parameters: {
		docs: {
			description: {
				story: "Breadcrumb items with icons for enhanced visual navigation.",
			},
		},
	},
	render: () =>
		({
			Component: BreadcrumbWrapper,
			props: { story: "withIcon" },
		}) as any,
};

export const WithEllipsis: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use ellipsis to collapse middle breadcrumb items when the path is too long.",
			},
		},
	},
	render: () =>
		({
			Component: BreadcrumbWrapper,
			props: { story: "withEllipsis" },
		}) as any,
};

export const WithMenu: Story = {
	parameters: {
		docs: {
			description: {
				story: "Breadcrumb with a dropdown menu for accessing collapsed navigation items.",
			},
		},
	},
	render: () =>
		({
			Component: BreadcrumbWrapper,
			props: { story: "withMenu" },
		}) as any,
};
