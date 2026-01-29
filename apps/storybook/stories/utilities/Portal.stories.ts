import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Portal } from "$saas/components/portal";
import PortalWrapper from "../wrappers/utilities/Portal.svelte";

const meta: Meta = {
	title: "utilities/Portal",
	component: Portal,
	argTypes: {
		disabled: {
			control: "boolean",
			description: "Whether to disable the portal and render children in place.",
			table: { defaultValue: { summary: "false" } },
		},
		container: {
			control: false,
			description: "The container element to render the portal into.",
		},
	},
	parameters: {
		docs: {
			description: {
				component: "Used to render an element outside the DOM hierarchy.",
			},
		},
		anatomy: `<script>
  import { Portal } from "@saas-ui/svelte/components/portal";
</script>

<Portal>
  <div>Portal content</div>
</Portal>

<!-- Or with disabled for SSR -->
<Portal disabled>
  <div>Renders in place</div>
</Portal>`,
	},
	args: {
		disabled: false,
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic portal that renders content at the end of `document.body`.",
			},
		},
	},
	render: () =>
		({
			Component: PortalWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Disabled: Story = {
	parameters: {
		docs: {
			description: {
				story: "When `disabled`, the portal renders children in place instead of teleporting them.",
			},
		},
	},
	render: () =>
		({
			Component: PortalWrapper,
			props: { story: "disabled" },
		}) as any,
};

export const CustomContainer: Story = {
	parameters: {
		docs: {
			description: {
				story: "Portal can render into a custom `container` element instead of `document.body`.",
			},
		},
	},
	render: () =>
		({
			Component: PortalWrapper,
			props: { story: "customContainer" },
		}) as any,
};
