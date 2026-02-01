import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Stack } from "$saas/layout/stack";
import StackWrapper from "../wrappers/layout/Stack.svelte";
import {
	commonArgTypes,
	getControls,
	stackDirections,
	stackAlignOptions,
	stackJustifyOptions,
} from "../utils";

const meta: Meta = {
	title: "layout/Stack",
	component: Stack,
	argTypes: {
		direction: {
			control: "select",
			options: stackDirections,
			table: { defaultValue: { summary: "column" } },
		},
		align: {
			control: "select",
			options: stackAlignOptions,
			table: { defaultValue: { summary: "stretch" } },
		},
		justify: {
			control: "select",
			options: stackJustifyOptions,
			table: { defaultValue: { summary: "start" } },
		},
		class: commonArgTypes.class,
		children: commonArgTypes.children,
	},
	parameters: {
		controls: getControls([
			"direction",
			"align",
			"justify",
			"class",
			"children",
		]),
		docs: {
			description: {
				component:
					"A flexbox layout component that stacks children with consistent spacing. Use HStack for horizontal layouts and VStack for vertical layouts.",
			},
		},
		anatomy: `<script>
  import { Stack, HStack, VStack } from "@saas-ui/svelte/layout/stack";
</script>

<!-- Vertical stack (default) -->
<Stack gap={4}>
  <div>Item 1</div>
  <div>Item 2</div>
</Stack>

<!-- Horizontal stack -->
<HStack gap={4}>
  <div>Item 1</div>
  <div>Item 2</div>
</HStack>

<!-- Explicit vertical stack -->
<VStack gap={4}>
  <div>Item 1</div>
  <div>Item 2</div>
</VStack>`,
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic vertical stack with items arranged in a column with consistent `gap`.",
			},
		},
	},
	render: (args) =>
		({ Component: StackWrapper, props: { story: "basic", args } }) as any,
};

export const Horizontal: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Use `direction="row"` to arrange items horizontally instead of vertically.',
			},
		},
	},
	render: () =>
		({ Component: StackWrapper, props: { story: "horizontal" } }) as any,
};

export const WithHStack: Story = {
	parameters: {
		docs: {
			description: {
				story: "`HStack` is a convenience component that defaults to horizontal direction with centered alignment.",
			},
		},
	},
	render: () =>
		({ Component: StackWrapper, props: { story: "withHStack" } }) as any,
};

export const WithVStack: Story = {
	parameters: {
		docs: {
			description: {
				story: "`VStack` is a convenience component that defaults to vertical direction with stretch alignment.",
			},
		},
	},
	render: () =>
		({ Component: StackWrapper, props: { story: "withVStack" } }) as any,
};

export const WithSeparator: Story = {
	parameters: {
		docs: {
			description: {
				story: "Add visual separators between stack items using the `Divider` component.",
			},
		},
	},
	render: () =>
		({ Component: StackWrapper, props: { story: "withSeparator" } }) as any,
};

export const Responsive: Story = {
	parameters: {
		docs: {
			description: {
				story: "Combine `Stack` with responsive classes to change layout direction based on viewport size.",
			},
		},
	},
	render: () =>
		({ Component: StackWrapper, props: { story: "responsive" } }) as any,
};
