import type { Meta, StoryObj } from "@storybook/sveltekit";
import { EmptyState } from "$saas/components/empty-state";
import EmptyStateWrapper from "../wrappers/components/EmptyState.svelte";
import {
	commonArgTypes,
	getControls,
	emptyStateSizes,
	emptyStateAlignOptions,
} from "../utils";

const meta: Meta = {
	title: "components/Empty State",
	component: EmptyState,
	argTypes: {
		size: {
			...commonArgTypes.size,
			options: emptyStateSizes,
			table: { defaultValue: { summary: "md" } },
		},
		align: {
			control: "select",
			options: emptyStateAlignOptions,
			description: "The alignment of the empty state content.",
			table: { defaultValue: { summary: "centre" } },
		},
		colour: commonArgTypes.colour,
		icon: commonArgTypes.icon,
		title: {
			control: "text",
			description: "The title text to display.",
		},
		description: {
			control: "text",
			description: "The description text to display.",
		},
		children: commonArgTypes.children,
		class: commonArgTypes.class,
	},
	parameters: {
		controls: getControls([
			"size",
			"align",
			"colour",
			"icon",
			"title",
			"description",
			"children",
			"class",
		]),
		docs: {
			description: {
				component: "A placeholder component displayed when there is no data or content to show.",
			},
		},
		anatomy: `<script>
  import { EmptyState } from "@saas-ui/svelte/components/empty-state";
  import { ShoppingCartIcon } from "lucide-svelte";
</script>

<EmptyState
  icon={ShoppingCartIcon}
  title="Your cart is empty"
  description="Explore our products and add items to your cart"
>
  <Button>Start Shopping</Button>
</EmptyState>`,
	},
	args: {
		size: "md",
		align: "centre",
		colour: "indigo",
		title: "Your cart is empty",
		description: "Explore our products and add items to your cart",
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic `EmptyState` with `icon`, `title`, and `description`.",
			},
		},
	},
	render: () =>
		({
			Component: EmptyStateWrapper,
			props: { story: "basic" },
		}) as any,
};

export const WithAction: Story = {
	parameters: {
		docs: {
			description: {
				story: "`EmptyState` with action buttons.",
			},
		},
	},
	render: () =>
		({
			Component: EmptyStateWrapper,
			props: { story: "withAction" },
		}) as any,
};

export const WithList: Story = {
	parameters: {
		docs: {
			description: {
				story: "`EmptyState` with a list of suggestions.",
			},
		},
	},
	render: () =>
		({
			Component: EmptyStateWrapper,
			props: { story: "withList" },
		}) as any,
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `size` prop to change the size of the empty state.",
			},
		},
	},
	render: () =>
		({
			Component: EmptyStateWrapper,
			props: { story: "sizes" },
		}) as any,
};

export const Alignment: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `align` prop to change the alignment of the content.",
			},
		},
	},
	render: () =>
		({
			Component: EmptyStateWrapper,
			props: { story: "alignment" },
		}) as any,
};

export const Colours: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `colour` prop to change the colour scheme.",
			},
		},
	},
	render: () =>
		({
			Component: EmptyStateWrapper,
			props: { story: "colours" },
		}) as any,
};
