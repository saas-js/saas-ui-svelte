import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Container } from "$saas/layout/container";
import ContainerWrapper from "../wrappers/layout/Container.svelte";
import { commonArgTypes, getControls, containerSizes } from "../utils";

const meta: Meta = {
	title: "layout/Container",
	component: Container,
	argTypes: {
		maxW: {
			control: "select",
			options: containerSizes,
			description: "The maximum width of the container.",
			table: { defaultValue: { summary: "8xl" } },
		},
		fluid: {
			control: "boolean",
			description: "Whether the container should be fluid.",
			table: { defaultValue: { summary: "false" } },
		},
		centerContent: {
			control: "boolean",
			description: "Whether to center the content.",
			table: { defaultValue: { summary: "false" } },
		},
		children: commonArgTypes.children,
		class: commonArgTypes.class,
	},
	parameters: {
		controls: getControls(["maxW", "fluid", "centerContent", "children", "class"]),
		docs: {
			description: {
				component:
					"A layout component that constrains content width and centers it horizontally with responsive padding. Essential for creating consistent page layouts.",
			},
		},
		anatomy: `<script>
  import { Container } from "@saas-ui/svelte/layout/container";
</script>

<Container maxW="4xl">
  <p>Content constrained to max width</p>
</Container>`,
	},
	args: {
		maxW: "8xl",
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic container with default maximum width and responsive horizontal padding.",
			},
		},
	},
	render: (args) => ({ Component: ContainerWrapper, props: { story: "basic", args } }) as any,
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `maxW` prop to set different maximum widths: `sm`, `md`, `lg`, `xl`, `2xl`, `3xl`, `4xl`, `5xl`, `6xl`, `7xl`, `8xl`.",
			},
		},
	},
	render: () => ({ Component: ContainerWrapper, props: { story: "sizes" } }) as any,
};

export const Fluid: Story = {
	parameters: {
		docs: {
			description: {
				story: "Set `fluid` to `true` to make the container span the full width of its parent without a maximum width constraint.",
			},
		},
	},
	render: () => ({ Component: ContainerWrapper, props: { story: "fluid" } }) as any,
};
