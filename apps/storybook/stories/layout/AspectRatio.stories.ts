import type { Meta, StoryObj } from "@storybook/sveltekit";
import { AspectRatio } from "$saas/layout/aspect-ratio";
import AspectRatioWrapper from "../wrappers/layout/AspectRatio.svelte";
import { commonArgTypes, getControls } from "../utils";

const meta: Meta = {
	title: "layout/Aspect Ratio",
	component: AspectRatio,
	argTypes: {
		ratio: {
			control: "number",
			description:
				"The aspect ratio of the container. Common values are: 21/9, 16/9, 9/16, 4/3, 1.85/1, 1",
			table: { defaultValue: { summary: "4/3" } },
		},
		children: commonArgTypes.children,
		class: commonArgTypes.class,
	},
	parameters: {
		controls: getControls(["ratio", "children", "class"]),
		docs: {
			description: {
				component:
					"A layout component that maintains a specified aspect ratio for its content, useful for embedding responsive images, videos, and maps.",
			},
		},
		anatomy: `<script>
  import { AspectRatio } from "@saas-ui/svelte/layout/aspect-ratio";
</script>

<AspectRatio ratio={16/9}>
  <img src="image.jpg" alt="..." />
</AspectRatio>`,
	},
	args: {
		ratio: 2,
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic aspect ratio container with a configurable `ratio` value.",
			},
		},
	},
	render: (args) => ({ Component: AspectRatioWrapper, props: { story: "basic", args } }) as any,
};

export const Image: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use `AspectRatio` to display images that maintain their proportions within a fixed ratio container.",
			},
		},
	},
	render: () => ({ Component: AspectRatioWrapper, props: { story: "image" } }) as any,
};

export const Video: Story = {
	parameters: {
		docs: {
			description: {
				story: "Embed responsive videos that maintain a `16:9` aspect ratio regardless of container width.",
			},
		},
	},
	render: () => ({ Component: AspectRatioWrapper, props: { story: "video" } }) as any,
};

export const GoogleMap: Story = {
	parameters: {
		docs: {
			description: {
				story: "Embed responsive Google Maps or other iframes with consistent aspect ratios.",
			},
		},
	},
	render: () => ({ Component: AspectRatioWrapper, props: { story: "googleMap" } }) as any,
};

export const Responsive: Story = {
	parameters: {
		docs: {
			description: {
				story: "The aspect ratio is maintained across all viewport sizes while the container scales responsively.",
			},
		},
	},
	render: () => ({ Component: AspectRatioWrapper, props: { story: "responsive" } }) as any,
};

export const CommonRatios: Story = {
	parameters: {
		docs: {
			description: {
				story: "Examples of common aspect ratios: `1:1` (square), `4:3` (standard), `16:9` (widescreen), and `21:9` (ultrawide).",
			},
		},
	},
	render: () => ({ Component: AspectRatioWrapper, props: { story: "commonRatios" } }) as any,
};
