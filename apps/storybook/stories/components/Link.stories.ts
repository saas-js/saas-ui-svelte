import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Link } from "$saas/components/link";
import LinkWrapper from "../wrappers/components/Link.svelte";

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

const linkVariants = ["underline", "plain"] as const;

const meta: Meta = {
	title: "components/Link",
	component: Link,
	argTypes: {
		variant: {
			control: "select",
			options: linkVariants,
			description: "The visual style of the component.",
			table: { defaultValue: { summary: "plain" } },
		},
		colour: {
			control: "select",
			options: colours,
			description: "The colour theme of the component.",
			table: { defaultValue: { summary: "gray" } },
		},
		href: {
			control: "text",
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
					"A styled anchor component for navigation with variant and colour options.",
			},
		},
		anatomy: `<script>
  import { Link } from "@saas-ui/svelte/components/link";
</script>

<Link href="/about" variant="underline" colour="blue">
  Learn more
</Link>`,
	},
	args: {
		variant: "plain",
		colour: "gray",
		href: "#",
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic `Link` component for navigation.",
			},
		},
	},
	render: () =>
		({
			Component: LinkWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Variants: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `variant` prop to change the appearance of the `Link` component.",
			},
		},
	},
	render: () =>
		({
			Component: LinkWrapper,
			props: { story: "variants" },
		}) as any,
};

export const WithinText: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use `Link` within text to create a hyperlink.",
			},
		},
	},
	render: () =>
		({
			Component: LinkWrapper,
			props: { story: "withinText" },
		}) as any,
};

export const External: Story = {
	parameters: {
		docs: {
			description: {
				story: "Add an external link icon to the `Link` component.",
			},
		},
	},
	render: () =>
		({
			Component: LinkWrapper,
			props: { story: "external" },
		}) as any,
};

export const Colours: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `colour` prop to change the colour of the `Link`.",
			},
		},
	},
	render: () =>
		({
			Component: LinkWrapper,
			props: { story: "colours" },
		}) as any,
};
