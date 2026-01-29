import type { Meta, StoryObj } from "@storybook/sveltekit";
import { VisuallyHidden } from "$saas/utilities/visually-hidden";
import VisuallyHiddenWrapper from "../wrappers/utilities/VisuallyHidden.svelte";
import { commonArgTypes, getControls } from "../utils";

/**
 * VisuallyHidden component for hiding content visually while keeping it accessible to screen readers.
 */
const meta: Meta = {
	title: "utilities/Visually Hidden",
	component: VisuallyHidden,
	argTypes: {
		children: commonArgTypes.children,
		class: commonArgTypes.class,
	},
	parameters: {
		controls: getControls(["children", "class"]),
		docs: {
			description: {
				component:
					"A utility component for hiding content visually while keeping it accessible to screen readers. Essential for providing context to assistive technologies without affecting the visual design.",
			},
		},
		anatomy: `<script>
  import { VisuallyHidden } from "@saas-ui/svelte/utilities/visually-hidden";
</script>

<!-- Hide text visually but keep accessible -->
<button>
  <Icon />
  <VisuallyHidden>Close menu</VisuallyHidden>
</button>

<!-- Accessible form label -->
<label>
  <VisuallyHidden>Search</VisuallyHidden>
  <input type="search" placeholder="Search..." />
</label>`,
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic usage demonstrating content that is hidden from visual users but accessible to screen readers.",
			},
		},
	},
	render: (args) =>
		({
			Component: VisuallyHiddenWrapper,
			props: { story: "basic", ...args },
		}) as any,
};
