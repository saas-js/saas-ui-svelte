import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Badge } from "$saas/components/badge";
import BadgeWrapper from "../wrappers/components/Badge.svelte";
import {
	commonArgTypes,
	getControls,
	badgeVariants,
	badgeSizes,
} from "../utils";

const meta: Meta = {
	title: "components/Badge",
	component: Badge,
	argTypes: {
		variant: {
			...commonArgTypes.variant,
			options: badgeVariants,
		},
		size: {
			...commonArgTypes.size,
			options: badgeSizes,
			table: { defaultValue: { summary: "sm" } },
		},
		colour: commonArgTypes.colour,
		children: commonArgTypes.children,
		class: commonArgTypes.class,
	},
	parameters: {
		controls: getControls([
			"variant",
			"size",
			"colour",
			"children",
			"class",
		]),
		docs: {
			description: {
				component:
					"A small label used to highlight an item's status or category for quick recognition.",
			},
		},
		anatomy: `<script>
  import { Badge } from "@saas-ui/svelte/components/badge";
</script>

<Badge>Default</Badge>
<Badge variant="solid" colour="green">Success</Badge>
<Badge variant="outline" colour="blue">Info</Badge>
<Badge variant="subtle" colour="red">Error</Badge>`,
	},
	args: {
		variant: "subtle",
		size: "sm",
		colour: "gray",
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic badge with default styling for simple labeling.",
			},
		},
	},
	render: () =>
		({
			Component: BadgeWrapper,
			props: { story: "basic" },
		}) as any,
};

export const WithIcon: Story = {
	parameters: {
		docs: {
			description: {
				story: "Badges with icons for added visual context and meaning.",
			},
		},
	},
	render: () =>
		({
			Component: BadgeWrapper,
			props: { story: "withIcon" },
		}) as any,
};

export const Variants: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `variant` prop to change the visual style. Available variants: `subtle`, `solid`, `outline`, `surface`.",
			},
		},
	},
	render: () =>
		({
			Component: BadgeWrapper,
			props: { story: "variants" },
		}) as any,
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `size` prop to change the size of the badge. Available sizes: `xs`, `sm`, `md`, `lg`.",
			},
		},
	},
	render: () =>
		({
			Component: BadgeWrapper,
			props: { story: "sizes" },
		}) as any,
};

export const Colours: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `colour` prop to change the colour of the badge. Supports all standard colour palettes.",
			},
		},
	},
	render: () =>
		({
			Component: BadgeWrapper,
			props: { story: "colours" },
		}) as any,
};
