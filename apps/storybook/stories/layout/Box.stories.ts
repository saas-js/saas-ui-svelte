import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Box } from "$saas/layout/box";
import BoxWrapper from "../wrappers/layout/Box.svelte";
import { commonArgTypes, getControls } from "../utils";

const meta: Meta = {
	title: "layout/Box",
	component: Box,
	argTypes: {
		as: {
			control: "text",
			description: "The HTML element to render.",
			table: { defaultValue: { summary: "div" } },
		},
		children: commonArgTypes.children,
		class: commonArgTypes.class,
	},
	parameters: {
		controls: getControls(["as", "children", "class"]),
		docs: {
			description: {
				component:
					"The most fundamental layout component that renders a div by default and can be styled with any CSS classes. It serves as a building block for creating other components.",
			},
		},
		anatomy: `<script>
  import { Box } from "@saas-ui/svelte/layout/box";
</script>

<Box class="p-4 bg-gray-100 rounded">
  Content goes here
</Box>`,
	},
	args: {
		as: "div",
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic `Box` component with padding and background styling applied via classes.",
			},
		},
	},
	render: (args) => ({ Component: BoxWrapper, props: { story: "basic", args } }) as any,
};

export const Shorthand: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use Tailwind utility classes directly on `Box` for quick styling without creating custom components.",
			},
		},
	},
	render: () => ({ Component: BoxWrapper, props: { story: "shorthand" } }) as any,
};

export const Border: Story = {
	parameters: {
		docs: {
			description: {
				story: "Apply border styles using Tailwind border utilities for outlined containers.",
			},
		},
	},
	render: () => ({ Component: BoxWrapper, props: { story: "border" } }) as any,
};

export const AsProp: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `as` prop to render `Box` as a different HTML element while maintaining all styling capabilities.",
			},
		},
	},
	render: () => ({ Component: BoxWrapper, props: { story: "asProp" } }) as any,
};

export const Shadow: Story = {
	parameters: {
		docs: {
			description: {
				story: "Apply shadow effects using Tailwind shadow utilities for elevated appearance.",
			},
		},
	},
	render: () => ({ Component: BoxWrapper, props: { story: "shadow" } }) as any,
};

export const Composition: Story = {
	parameters: {
		docs: {
			description: {
				story: "Compose `Box` with other components to create complex layouts and card-like structures.",
			},
		},
	},
	render: () => ({ Component: BoxWrapper, props: { story: "composition" } }) as any,
};

export const Nested: Story = {
	parameters: {
		docs: {
			description: {
				story: "Nest multiple `Box` components to create layered layouts with different styling contexts.",
			},
		},
	},
	render: () => ({ Component: BoxWrapper, props: { story: "nested" } }) as any,
};
