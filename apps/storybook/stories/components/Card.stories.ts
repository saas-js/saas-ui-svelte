import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Card } from "$saas/components/card";
import CardWrapper from "../wrappers/components/Card.svelte";
import {
	commonArgTypes,
	getControls,
	cardVariants,
	cardSizes,
} from "../utils";

const meta: Meta = {
	title: "components/Card",
	component: Card.Root,
	argTypes: {
		variant: {
			...commonArgTypes.variant,
			options: cardVariants,
			table: { defaultValue: { summary: "outline" } },
		},
		size: {
			...commonArgTypes.size,
			options: cardSizes,
			table: { defaultValue: { summary: "md" } },
		},
		children: commonArgTypes.children,
		class: commonArgTypes.class,
	},
	parameters: {
		controls: getControls(["variant", "size", "children", "class"]),
		docs: {
			description: {
				component:
					"A container component for grouping related content and actions, providing visual separation and hierarchy.",
			},
		},
		anatomy: `<script>
  import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    CardDescription,
  } from "@saas-ui/svelte/components/card";
</script>

<Card.Root>
  <CardHeader>
    <CardTitle>Card Title</CardTitle>
    <CardDescription>Card description goes here</CardDescription>
  </CardHeader>
  <CardBody>
    <p>Main content of the card goes here.</p>
  </CardBody>
  <CardFooter>
    <Button>Action</Button>
  </CardFooter>
</Card.Root>`,
		subComponents: [
			{
				name: "Card.Root",
				description: "The main card container.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The card content.",
					},
					variant: {
						type: '"subtle" | "outline" | "elevated"',
						default: '"outline"',
						description: "The visual style of the card.",
					},
					size: {
						type: '"sm" | "md" | "lg"',
						default: '"md"',
						description: "The size of the card.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
					style: {
						type: "string",
						default: "-",
						description: "Inline styles to apply to the card.",
					},
				},
			},
			{
				name: "Card.Header",
				description: "The header section of the card.",
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
				name: "Card.Body",
				description: "The body section of the card.",
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
				name: "Card.Footer",
				description: "The footer section of the card.",
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
				name: "Card.Title",
				description: "The title element within the card header.",
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
				name: "Card.Description",
				description: "The description element within the card header.",
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
		],
	},
	args: {
		variant: "outline",
		size: "md",
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic card with header, body, and footer sections.",
			},
		},
	},
	render: () =>
		({
			Component: CardWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Variants: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `variant` prop to change the visual style. Available variants: `subtle`, `outline`, `elevated`.",
			},
		},
	},
	render: () =>
		({
			Component: CardWrapper,
			props: { story: "variants" },
		}) as any,
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `size` prop to change the size of the card. Available sizes: `sm`, `md`, `lg`.",
			},
		},
	},
	render: () =>
		({
			Component: CardWrapper,
			props: { story: "sizes" },
		}) as any,
};

export const WithForm: Story = {
	parameters: {
		docs: {
			description: {
				story: "Card containing a form with input fields and submit button.",
			},
		},
	},
	render: () =>
		({
			Component: CardWrapper,
			props: { story: "withForm" },
		}) as any,
};

export const WithImage: Story = {
	parameters: {
		docs: {
			description: {
				story: "Card with an image element for visual content display.",
			},
		},
	},
	render: () =>
		({
			Component: CardWrapper,
			props: { story: "withImage" },
		}) as any,
};

export const Horizontal: Story = {
	parameters: {
		docs: {
			description: {
				story: "Horizontal card layout with side-by-side content arrangement.",
			},
		},
	},
	render: () =>
		({
			Component: CardWrapper,
			props: { story: "horizontal" },
		}) as any,
};

export const WithAvatar: Story = {
	parameters: {
		docs: {
			description: {
				story: "Card displaying user profile information with avatar.",
			},
		},
	},
	render: () =>
		({
			Component: CardWrapper,
			props: { story: "withAvatar" },
		}) as any,
};
