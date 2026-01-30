import type { Meta, StoryObj } from "@storybook/sveltekit";
import { CloseButton } from "$saas/components/close-button";
import CloseButtonWrapper from "../wrappers/components/CloseButton.svelte";
import {
	commonArgTypes,
	getControls,
	closeButtonSizes,
	closeButtonVariants,
} from "../utils";

const meta: Meta = {
	title: "components/Close Button",
	component: CloseButton,
	argTypes: {
		size: {
			...commonArgTypes.size,
			options: closeButtonSizes,
			table: { defaultValue: { summary: "md" } },
		},
		variant: {
			...commonArgTypes.variant,
			options: closeButtonVariants,
			table: { defaultValue: { summary: "ghost" } },
		},
		colour: commonArgTypes.colour,
		disabled: commonArgTypes.disabled,
		class: commonArgTypes.class,
	},
	parameters: {
		controls: getControls([
			"size",
			"variant",
			"colour",
			"disabled",
			"class",
		]),
		docs: {
			description: {
				component:
					"A button specifically designed for closing or dismissing elements.",
			},
		},
		anatomy: `<script>
  import { CloseButton } from "@saas-ui/svelte/components/close-button";
</script>

<CloseButton size="md" variant="ghost" />`,
	},
	args: {
		size: "md",
		variant: "ghost",
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic close button with default styling.",
			},
		},
	},
	render: () =>
		({
			Component: CloseButtonWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `size` prop to change the size of the close button. Available sizes: `2xs`, `xs`, `sm`, `md`, `lg`, `xl`.",
			},
		},
	},
	render: () =>
		({
			Component: CloseButtonWrapper,
			props: { story: "sizes" },
		}) as any,
};

export const Variants: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `variant` prop to change the visual style. Available variants: `ghost`, `outline`, `subtle`, `solid`, `glass`.",
			},
		},
	},
	render: () =>
		({
			Component: CloseButtonWrapper,
			props: { story: "variants" },
		}) as any,
};

export const CustomIcon: Story = {
	parameters: {
		docs: {
			description: {
				story: "Close button with a custom icon.",
			},
		},
	},
	render: () =>
		({
			Component: CloseButtonWrapper,
			props: { story: "customIcon" },
		}) as any,
};
