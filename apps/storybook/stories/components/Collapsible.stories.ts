import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Collapsible } from "$saas/components/collapsible";
import CollapsibleWrapper from "../wrappers/components/Collapsible.svelte";
import { commonArgTypes, getControls } from "../utils";

const meta: Meta = {
	title: "components/Collapsible",
	component: Collapsible,
	argTypes: {
		defaultOpen: {
			control: "boolean",
			description: "Whether the collapsible is open by default.",
		},
		disabled: {
			control: "boolean",
			description: "Whether the collapsible is disabled.",
		},
		lazyMount: {
			control: "boolean",
			description: "Whether to enable lazy mounting of content.",
			table: { defaultValue: { summary: "false" } },
		},
		unmountOnExit: {
			control: "boolean",
			description: "Whether to unmount the content when collapsed.",
			table: { defaultValue: { summary: "false" } },
		},
		onPrefetch: {
			action: "prefetch",
			description:
				"Callback invoked when hovering over the trigger. Similar to Astro's link prefetching, this allows preloading data before expanding.",
			table: { category: "Events" },
		},
		class: commonArgTypes.class,
	},
	parameters: {
		controls: getControls([
			"defaultOpen",
			"disabled",
			"lazyMount",
			"unmountOnExit",
			"class",
		]),
		docs: {
			description: {
				component:
					"An interactive component that expands and collapses content sections.",
			},
		},
		anatomy: `<script>
  import {
    Collapsible,
    CollapsibleTrigger,
    CollapsibleContent,
    CollapsibleIndicator,
  } from "@saas-ui/svelte/components/collapsible";
</script>

<Collapsible.Root>
  <Collapsible.Trigger>
    Toggle Content
    <Collapsible.Indicator />
  </Collapsible.Trigger>
  <Collapsible.Content>
    Collapsible content goes here...
  </Collapsible.Content>
</Collapsible.Root>`,
	},
	args: {
		defaultOpen: false,
		disabled: false,
		lazyMount: false,
		unmountOnExit: false,
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic collapsible with default styling.",
			},
		},
	},
	render: () =>
		({
			Component: CollapsibleWrapper,
			props: { story: "basic" },
		}) as any,
};

export const LazyMounted: Story = {
	parameters: {
		docs: {
			description: {
				story: "Collapsible with `lazyMount` and `unmountOnExit` enabled to unmount content when collapsed.",
			},
		},
	},
	render: () =>
		({
			Component: CollapsibleWrapper,
			props: { story: "lazyMounted" },
		}) as any,
};
