import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Tabs } from "$saas/components/tabs";
import TabsWrapper from "../wrappers/components/Tabs.svelte";

const colours = [
	"gray",
	"red",
	"orange",
	"yellow",
	"green",
	"teal",
	"blue",
	"cyan",
	"purple",
	"pink",
	"rose",
] as const;

const tabsSizes = ["xs", "sm", "md", "lg"] as const;
const tabsVariants = ["line", "subtle", "enclosed", "outline", "plain"] as const;
const alignOptions = ["start", "center", "end"] as const;
const orientations = ["horizontal", "vertical"] as const;

const meta: Meta = {
	title: "components/Tabs",
	component: Tabs.Root,
	argTypes: {
		size: {
			control: "select",
			options: tabsSizes,
			description: "The size of the tabs.",
			table: { defaultValue: { summary: "md" } },
		},
		variant: {
			control: "select",
			options: tabsVariants,
			description: "The visual variant of the tabs.",
			table: { defaultValue: { summary: "line" } },
		},
		fitted: {
			control: "boolean",
			description: "Whether tabs should stretch to fill the container.",
			table: { defaultValue: { summary: "false" } },
		},
		justify: {
			control: "select",
			options: alignOptions,
			description: "The alignment of the tabs.",
		},
		activationMode: {
			control: "select",
			options: ["automatic", "manual"],
			description: "The activation mode of the tabs.",
			table: { defaultValue: { summary: "automatic" } },
		},
		lazyMount: {
			control: "boolean",
			description: "Whether to enable lazy mounting.",
			table: { defaultValue: { summary: "false" } },
		},
		unmountOnExit: {
			control: "boolean",
			description: "Whether to unmount tab content when not active.",
			table: { defaultValue: { summary: "false" } },
		},
		orientation: {
			control: "select",
			options: orientations,
			description: "The orientation of the tabs.",
			table: { defaultValue: { summary: "horizontal" } },
		},
		colour: {
			control: "select",
			options: colours,
			description: "The colour theme.",
			table: { defaultValue: { summary: "gray" } },
		},
		class: {
			control: "text",
			description: "CSS class to apply to the component.",
		},
	},
	parameters: {
		docs: {
			description: {
				component: "A tabbed interface for organizing content into separate views.",
			},
		},
		anatomy: `<script>
  import { Tabs } from "@saas-ui/svelte/components/tabs";
</script>

<Tabs.Root defaultValue="tab1">
  <Tabs.List>
    <Tabs.Trigger value="tab1">Tab 1</Tabs.Trigger>
    <Tabs.Trigger value="tab2">Tab 2</Tabs.Trigger>
    <Tabs.Trigger value="tab3">Tab 3</Tabs.Trigger>
  </Tabs.List>
  <Tabs.Content value="tab1">Content for Tab 1</Tabs.Content>
  <Tabs.Content value="tab2">Content for Tab 2</Tabs.Content>
  <Tabs.Content value="tab3">Content for Tab 3</Tabs.Content>
</Tabs.Root>`,
		subComponents: [
			{
				name: "Tabs.Root",
				description: "The root container component for the tabs.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "Content to render inside the tabs.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional classes to apply.",
					},
					defaultValue: {
						type: "string",
						default: "-",
						description: "The default value of the selected tab.",
					},
					value: {
						type: "string",
						default: "-",
						description: "The controlled value of the selected tab.",
					},
					activationMode: {
						type: '"automatic" | "manual"',
						default: '"automatic"',
						description: "The activation mode of the tabs.",
					},
					lazyMount: {
						type: "boolean",
						default: "false",
						description: "Whether to enable lazy mounting.",
					},
					unmountOnExit: {
						type: "boolean",
						default: "false",
						description: "Whether to unmount tab content when not active.",
					},
					orientation: {
						type: '"horizontal" | "vertical"',
						default: '"horizontal"',
						description: "The orientation of the tabs.",
					},
					loopFocus: {
						type: "boolean",
						default: "true",
						description: "Whether the keyboard navigation will loop.",
					},
					size: {
						type: '"xs" | "sm" | "md" | "lg"',
						default: '"md"',
						description: "The size of the tabs.",
					},
					variant: {
						type: '"line" | "subtle" | "enclosed" | "outline" | "plain"',
						default: '"line"',
						description: "The visual style of the tabs.",
					},
					fitted: {
						type: "boolean",
						default: "false",
						description: "Whether tabs should stretch to fill the container.",
					},
					justify: {
						type: '"start" | "center" | "end"',
						default: "-",
						description: "The alignment of the tabs.",
					},
					colour: {
						type: "ColourName",
						default: '"gray"',
						description: "The colour palette of the tabs.",
					},
					onValueChange: {
						type: "(details: { value: string }) => void",
						default: "-",
						description: "Callback when the selected tab changes.",
					},
				},
			},
			{
				name: "Tabs.List",
				description: "The container for the tab triggers.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The content of the tabs list.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional classes to apply.",
					},
				},
			},
			{
				name: "Tabs.Trigger",
				description: "The clickable tab trigger that activates the corresponding content.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The content of the trigger.",
					},
					value: {
						type: "string",
						default: "-",
						description: "The unique value of the tab.",
					},
					disabled: {
						type: "boolean",
						default: "false",
						description: "Whether the tab is disabled.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional classes to apply.",
					},
				},
			},
			{
				name: "Tabs.Content",
				description: "The panel content associated with a tab trigger.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The content of the tab panel.",
					},
					value: {
						type: "string",
						default: "-",
						description: "The unique value of the tab this content belongs to.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional classes to apply.",
					},
				},
			},
			{
				name: "Tabs.ContentGroup",
				description: "A container for grouping tab content panels.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The content (tab panels) to render.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional classes to apply.",
					},
				},
			},
			{
				name: "Tabs.Indicator",
				description: "An animated indicator that highlights the active tab.",
				props: {
					class: {
						type: "string",
						default: "-",
						description: "Additional classes to apply.",
					},
				},
			},
		],
	},
	args: {
		size: "md",
		variant: "line",
		fitted: false,
		activationMode: "automatic",
		colour: "gray",
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic tabs with icons and default styling.",
			},
		},
	},
	render: () =>
		({
			Component: TabsWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Variants: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `variant` prop to change the visual style.",
			},
		},
	},
	render: () =>
		({
			Component: TabsWrapper,
			props: { story: "variants" },
		}) as any,
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `size` prop to change the size of the tabs.",
			},
		},
	},
	render: () =>
		({
			Component: TabsWrapper,
			props: { story: "sizes" },
		}) as any,
};

export const Fitted: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `fitted` prop to make tabs fill the container width.",
			},
		},
	},
	render: () =>
		({
			Component: TabsWrapper,
			props: { story: "fitted" },
		}) as any,
};

export const LazyMounted: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use `lazyMount` and `unmountOnExit` for performance optimization.",
			},
		},
	},
	render: () =>
		({
			Component: TabsWrapper,
			props: { story: "lazyMount" },
		}) as any,
};

export const WithIndicator: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use `Tabs.Indicator` for a custom animated indicator.",
			},
		},
	},
	render: () =>
		({
			Component: TabsWrapper,
			props: { story: "indicator" },
		}) as any,
};

export const Colours: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `colour` prop to change the colour theme.",
			},
		},
	},
	render: () =>
		({
			Component: TabsWrapper,
			props: { story: "colours" },
		}) as any,
};

export const DisabledTab: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `disabled` prop on individual triggers.",
			},
		},
	},
	render: () =>
		({
			Component: TabsWrapper,
			props: { story: "disabled" },
		}) as any,
};

export const ManualActivation: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use `activationMode=\"manual\"` to require Enter/click to activate.",
			},
		},
	},
	render: () =>
		({
			Component: TabsWrapper,
			props: { story: "manualActivation" },
		}) as any,
};

export const Dynamic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Dynamically add and remove tabs.",
			},
		},
	},
	render: () =>
		({
			Component: TabsWrapper,
			props: { story: "dynamic" },
		}) as any,
};
