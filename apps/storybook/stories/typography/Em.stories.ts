import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Em } from "$saas/typography/em";
import EmWrapper from "../wrappers/typography/Em.svelte";
import { commonArgTypes, getControls } from "../utils";

const meta: Meta = {
	title: "typography/Emphasis",
	component: Em,
	argTypes: {
		children: commonArgTypes.children,
		class: commonArgTypes.class,
	},
	parameters: {
		docs: {
			description: {
				component:
					"An emphasis element for italicizing text to indicate stress or importance.",
			},
		},
		anatomy: `<script>
  import { Em } from "@saas-ui/svelte/typography/em";
</script>

<!-- Basic emphasis -->
<Em>emphasized text</Em>

<!-- Within a sentence -->
<p>This is <Em>very important</Em> information.</p>`,
		controls: getControls(["class", "children"]),
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic emphasis element for italicizing text to indicate stress or importance.",
			},
		},
	},
	render: () =>
		({
			Component: EmWrapper,
			props: { story: "basic" },
		}) as any,
};
