import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Icon } from "$saas/components/icon";
import IconWrapper from "../wrappers/components/Icon.svelte";
import {
	commonArgTypes,
	getControls,
	sizes,
	colours,
	iconWeights,
} from "../utils";

const meta: Meta = {
	title: "components/Icon",
	component: Icon,
	argTypes: {
		as: {
			control: false,
			description:
				"The icon component to render (e.g. from phosphor-svelte or custom).",
			table: { type: { summary: "Component" } },
		},
		size: {
			...commonArgTypes.size,
			description: "The size of the icon.",
			options: [...sizes, "2xl"],
			table: {
				type: { summary: "IconSize" },
				defaultValue: { summary: "md" },
			},
		},
		weight: {
			control: "select",
			description:
				"The weight/style of the icon (for Phosphor icons).",
			options: iconWeights,
			table: {
				type: {
					summary:
						'"thin" | "light" | "regular" | "bold" | "fill" | "duotone"',
				},
				defaultValue: { summary: "regular" },
			},
		},
		mirrored: {
			control: "boolean",
			description:
				"Whether to flip the icon horizontally (for Phosphor icons).",
			table: {
				type: { summary: "boolean" },
				defaultValue: { summary: "false" },
			},
		},
		colour: {
			...commonArgTypes.colour,
			description: "The colour theme of the icon.",
			table: {
				type: { summary: "ColourName" },
				defaultValue: { summary: "currentColor" },
			},
		},
		viewBox: {
			control: "text",
			description: "The SVG viewBox attribute (for custom icons).",
			table: {
				type: { summary: "string" },
				defaultValue: { summary: "0 0 24 24" },
			},
		},
		style: {
			control: "text",
			description: "Inline CSS styles to apply to the icon.",
			table: { type: { summary: "string" } },
		},
		children: {
			...commonArgTypes.children,
			description:
				"SVG path elements for custom icons (if `as` is not provided).",
		},
		class: {
			...commonArgTypes.class,
			description: "Additional CSS classes to apply to the icon.",
		},
	},
	parameters: {
		controls: getControls([
			"as",
			"size",
			"weight",
			"mirrored",
			"colour",
			"viewBox",
			"style",
			"children",
			"class",
		]),
		docs: {
			description: {
				component:
					"A flexible icon component that supports Phosphor icons and custom SVG paths.",
			},
		},
		anatomy: `<script>
  import { Icon } from "@saas-ui/svelte/components/icon";
  import Heart from "phosphor-svelte/lib/Heart";
</script>

<Icon as={Heart} size="lg" colour="pink" weight="fill" />

<!-- Or with custom SVG -->
<Icon viewBox="0 0 24 24" size="md">
  <path d="M12 2L15 8H9L12 2Z" fill="currentColor" />
</Icon>`,
	},
	args: {
		size: "lg",
		weight: "fill",
		colour: "pink",
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic icon using a Phosphor icon.",
			},
		},
	},
	render: () =>
		({
			Component: IconWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Colours: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `colour` prop to change the icon colour.",
			},
		},
	},
	render: () =>
		({
			Component: IconWrapper,
			props: { story: "colours" },
		}) as any,
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `size` prop to change the icon size.",
			},
		},
	},
	render: () =>
		({
			Component: IconWrapper,
			props: { story: "sizes" },
		}) as any,
};

export const Weights: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `weight` prop to change the icon weight (`Phosphor` icons).",
			},
		},
	},
	render: () =>
		({
			Component: IconWrapper,
			props: { story: "weights" },
		}) as any,
};

export const CustomSVG: Story = {
	parameters: {
		docs: {
			description: {
				story: "Create custom icons by passing SVG paths as children.",
			},
		},
	},
	render: () =>
		({
			Component: IconWrapper,
			props: { story: "customSvg" },
		}) as any,
};
