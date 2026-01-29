import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Skeleton } from "$saas/components/skeleton";
import SkeletonWrapper from "../wrappers/components/Skeleton.svelte";

const skeletonVariants = ["pulse", "shine", "none"] as const;

const meta: Meta = {
	title: "components/Skeleton",
	component: Skeleton,
	argTypes: {
		loading: {
			control: "boolean",
			description: "Whether to show the skeleton loading state.",
			table: { defaultValue: { summary: "true" } },
		},
		variant: {
			control: "select",
			options: skeletonVariants,
			description: "The animation variant.",
			table: { defaultValue: { summary: "pulse" } },
		},
		height: {
			control: "text",
			description: "The height of the skeleton.",
		},
		width: {
			control: "text",
			description: "The width of the skeleton.",
		},
		class: {
			control: "text",
			description: "CSS class to apply to the component.",
		},
	},
	parameters: {
		docs: {
			description: {
				component:
					"A placeholder component that displays a loading animation while content is being fetched or rendered.",
			},
		},
		anatomy: `<script>
  import {
    Skeleton,
    SkeletonCircle,
    SkeletonText,
  } from "@saas-ui/svelte/components/skeleton";
</script>

<Skeleton height="20px" width="100%" />
<SkeletonCircle size="40px" />
<SkeletonText lines={3} />`,
	},
	args: {
		loading: true,
		variant: "pulse",
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic skeleton with default styling.",
			},
		},
	},
	render: () =>
		({
			Component: SkeletonWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Composite: Story = {
	parameters: {
		docs: {
			description: {
				story: "Combine skeleton elements to create loading placeholders.",
			},
		},
	},
	render: () =>
		({
			Component: SkeletonWrapper,
			props: { story: "composite" },
		}) as any,
};

export const Feed: Story = {
	parameters: {
		docs: {
			description: {
				story: "Feed-style skeleton with avatar, text, and image placeholders.",
			},
		},
	},
	render: () =>
		({
			Component: SkeletonWrapper,
			props: { story: "feed" },
		}) as any,
};

export const Text: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use `SkeletonText` for multi-line text placeholders.",
			},
		},
	},
	render: () =>
		({
			Component: SkeletonWrapper,
			props: { story: "text" },
		}) as any,
};

export const WithChildren: Story = {
	parameters: {
		docs: {
			description: {
				story: "Wrap children to show skeleton while loading.",
			},
		},
	},
	render: () =>
		({
			Component: SkeletonWrapper,
			props: { story: "withChildren" },
		}) as any,
};

export const Variants: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `variant` prop to change the animation style.",
			},
		},
	},
	render: () =>
		({
			Component: SkeletonWrapper,
			props: { story: "variants" },
		}) as any,
};

export const ContentLoading: Story = {
	parameters: {
		docs: {
			description: {
				story: "Toggle loading state to show/hide content.",
			},
		},
	},
	render: () =>
		({
			Component: SkeletonWrapper,
			props: { story: "contentLoading" },
		}) as any,
};

export const CircleSizes: Story = {
	parameters: {
		docs: {
			description: {
				story: "`SkeletonCircle` supports various sizes.",
			},
		},
	},
	render: () =>
		({
			Component: SkeletonWrapper,
			props: { story: "circleSizes" },
		}) as any,
};

export const TextLines: Story = {
	parameters: {
		docs: {
			description: {
				story: "`SkeletonText` supports configurable number of lines.",
			},
		},
	},
	render: () =>
		({
			Component: SkeletonWrapper,
			props: { story: "textLines" },
		}) as any,
};
