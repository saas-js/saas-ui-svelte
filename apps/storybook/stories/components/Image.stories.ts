import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Image } from "$saas/components/image";
import ImageWrapper from "../wrappers/components/Image.svelte";
import {
	commonArgTypes,
	getControls,
	imageRoundedOptions,
	imageFitOptions,
} from "../utils";

const meta: Meta = {
	title: "components/Image",
	component: Image,
	argTypes: {
		src: {
			control: "text",
			description: "The image source URL.",
		},
		alt: {
			control: "text",
			description: "Alternative text for the image.",
		},
		width: {
			control: "text",
			description:
				"The width of the image (CSS value or number for pixels).",
		},
		height: {
			control: "text",
			description:
				"The height of the image (CSS value or number for pixels).",
		},
		aspectRatio: {
			control: "text",
			description: "The aspect ratio of the image (e.g., 16/9, 4/3, 1).",
		},
		rounded: {
			control: "select",
			options: imageRoundedOptions,
			description: "The border radius of the image.",
			table: { defaultValue: { summary: "none" } },
		},
		fit: {
			control: "select",
			options: imageFitOptions,
			description: "The object-fit property of the image.",
			table: { defaultValue: { summary: "cover" } },
		},
		class: commonArgTypes.class,
	},
	parameters: {
		controls: getControls([
			"src",
			"alt",
			"width",
			"height",
			"aspectRatio",
			"rounded",
			"fit",
			"class",
		]),
		docs: {
			description: {
				component:
					"An image component with built-in support for aspect ratio, object-fit, and border radius options.",
			},
		},
		anatomy: `<script>
  import { Image } from "@saas-ui/svelte/components/image";
</script>

<Image
  src="https://example.com/image.jpg"
  alt="Description"
  width="300"
  height="200"
  rounded="md"
  fit="cover"
  aspectRatio="16/9"
/>`,
	},
	args: {
		src: "https://picsum.photos/seed/saas/800/600",
		alt: "Sample image",
		rounded: "md",
		fit: "cover",
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic image with default styling.",
			},
		},
	},
	render: () =>
		({
			Component: ImageWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Height: Story = {
	parameters: {
		docs: {
			description: {
				story: "Image with a fixed height.",
			},
		},
	},
	render: () =>
		({
			Component: ImageWrapper,
			props: { story: "height" },
		}) as any,
};

export const Circular: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Circular image using `rounded="full"`.',
			},
		},
	},
	render: () =>
		({
			Component: ImageWrapper,
			props: { story: "circular" },
		}) as any,
};

export const AspectRatio: Story = {
	parameters: {
		docs: {
			description: {
				story: "Image with a specific `aspectRatio`.",
			},
		},
	},
	render: () =>
		({
			Component: ImageWrapper,
			props: { story: "aspectRatio" },
		}) as any,
};

export const ObjectFit: Story = {
	parameters: {
		docs: {
			description: {
				story: "Different `fit` options.",
			},
		},
	},
	render: () =>
		({
			Component: ImageWrapper,
			props: { story: "objectFit" },
		}) as any,
};

export const Rounded: Story = {
	parameters: {
		docs: {
			description: {
				story: "Different `rounded` options.",
			},
		},
	},
	render: () =>
		({
			Component: ImageWrapper,
			props: { story: "rounded" },
		}) as any,
};
