import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Navbar } from "$saas/components/navbar";
import NavbarWrapper from "../wrappers/components/Navbar.svelte";

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
const navbarVariants = ["default", "glass", "solid"] as const;
const navbarPositions = ["static", "sticky", "fixed"] as const;

const meta: Meta = {
	title: "components/Navbar",
	component: Navbar.Root,
	argTypes: {
		variant: {
			control: "select",
			options: navbarVariants,
			description: "The visual style of the component.",
			table: { defaultValue: { summary: "default" } },
		},
		position: {
			control: "select",
			options: navbarPositions,
			description: "The position of the navbar.",
			table: { defaultValue: { summary: "static" } },
		},
		bordered: {
			control: "boolean",
			description: "Whether to show a bottom border.",
			table: { defaultValue: { summary: "false" } },
		},
		colour: {
			control: "select",
			options: colours,
			description: "The colour palette for solid variant.",
			table: { defaultValue: { summary: "accent" } },
		},
		children: {
			control: false,
			description: "The content to be rendered inside the component.",
			table: { type: { summary: "Snippet" } },
		},
		class: {
			control: "text",
			description: "Additional CSS classes to apply.",
		},
	},
	parameters: {
		docs: {
			description: {
				component:
					"A responsive navigation bar component for site-wide navigation with support for branding, links, and mobile menus.",
			},
		},
		anatomy: `<script>
  import {
    Navbar,
    NavbarContent,
    NavbarBrand,
    NavbarItemGroup,
    NavbarItem,
    NavbarLink,
  } from "@saas-ui/svelte/components/navbar";
</script>

<Navbar.Root>
  <NavbarContent>
    <NavbarBrand>Logo</NavbarBrand>
    <NavbarItemGroup>
      <NavbarItem>
        <NavbarLink href="/">Home</NavbarLink>
      </NavbarItem>
      <NavbarItem>
        <NavbarLink href="/about">About</NavbarLink>
      </NavbarItem>
    </NavbarItemGroup>
  </NavbarContent>
</Navbar.Root>`,
	},
	args: {
		variant: "default",
		position: "static",
		bordered: false,
		colour: "accent",
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic navbar with default styling, brand, and navigation links.",
			},
		},
	},
	render: () =>
		({
			Component: NavbarWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Bordered: Story = {
	parameters: {
		docs: {
			description: {
				story: "Navbar with a bottom border using the `bordered` prop.",
			},
		},
	},
	render: () =>
		({
			Component: NavbarWrapper,
			props: { story: "bordered" },
		}) as any,
};

export const GlassVariant: Story = {
	parameters: {
		docs: {
			description: {
				story: "Glass variant navbar with backdrop blur effect for modern aesthetics.",
			},
		},
	},
	render: () =>
		({
			Component: NavbarWrapper,
			props: { story: "glass" },
		}) as any,
};

export const SolidVariant: Story = {
	parameters: {
		docs: {
			description: {
				story: "Solid variant navbar with a coloured background.",
			},
		},
	},
	render: () =>
		({
			Component: NavbarWrapper,
			props: { story: "solid" },
		}) as any,
};

export const Variants: Story = {
	parameters: {
		docs: {
			description: {
				story: "All navbar variants side by side: `default`, `glass`, and `solid`.",
			},
		},
	},
	render: () =>
		({
			Component: NavbarWrapper,
			props: { story: "variants" },
		}) as any,
};

export const Sticky: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Sticky navbar that stays at the top when scrolling using `position="sticky"`.',
			},
		},
	},
	render: () =>
		({
			Component: NavbarWrapper,
			props: { story: "sticky" },
		}) as any,
};

export const HideOnScroll: Story = {
	parameters: {
		docs: {
			description: {
				story: "Navbar that hides when scrolling down and shows when scrolling up for better content visibility.",
			},
		},
	},
	render: () =>
		({
			Component: NavbarWrapper,
			props: { story: "hideOnScroll" },
		}) as any,
};

export const Colours: Story = {
	parameters: {
		docs: {
			description: {
				story: "Navbar with different colour palettes using the `colour` prop.",
			},
		},
	},
	render: () =>
		({
			Component: NavbarWrapper,
			props: { story: "colours" },
		}) as any,
};

export const MobileNavigation: Story = {
	parameters: {
		docs: {
			description: {
				story: "Responsive navbar with mobile navigation drawer for smaller screens.",
			},
		},
	},
	render: () =>
		({
			Component: NavbarWrapper,
			props: { story: "mobileNav" },
		}) as any,
};
