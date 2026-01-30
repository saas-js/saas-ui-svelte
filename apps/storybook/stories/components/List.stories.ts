import type { Meta, StoryObj } from "@storybook/sveltekit";
import { List } from "$saas/components/list";
import ListWrapper from "../wrappers/components/List.svelte";

const listVariants = ["marker", "plain"] as const;
const alignOptions = ["start", "center", "end"] as const;
const listAsOptions = ["ul", "ol"] as const;

const meta: Meta = {
	title: "components/List",
	component: List.Root,
	argTypes: {
		variant: {
			control: "select",
			options: listVariants,
			description: "The visual style of the list.",
			table: { defaultValue: { summary: "marker" } },
		},
		align: {
			control: "select",
			options: alignOptions,
			description: "The alignment of list item content with indicators.",
			table: { defaultValue: { summary: "start" } },
		},
		as: {
			control: "select",
			options: listAsOptions,
			description: "The HTML element to render.",
			table: { defaultValue: { summary: "ul" } },
		},
		class: {
			control: "text",
			description: "Additional CSS classes to apply.",
		},
	},
	parameters: {
		docs: {
			description: {
				component:
					"A component for displaying ordered or unordered lists with customizable markers and indicators.",
			},
		},
		anatomy: `<script>
  import { List, ListItem, ListIndicator } from "@saas-ui/svelte/components/list";
</script>

<List.Root>
  <ListItem>
    <ListIndicator />
    First item
  </ListItem>
  <ListItem>
    <ListIndicator />
    Second item
  </ListItem>
</List.Root>`,
	},
	args: {
		variant: "marker",
		align: "start",
		as: "ul",
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic unordered `List` with default `marker` style.",
			},
		},
	},
	render: () =>
		({
			Component: ListWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Ordered: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Ordered list with numbered markers using the `as="ol"` prop.',
			},
		},
	},
	render: () =>
		({
			Component: ListWrapper,
			props: { story: "ordered" },
		}) as any,
};

export const WithIcon: Story = {
	parameters: {
		docs: {
			description: {
				story: "`List` with custom icons as indicators using the `ListIndicator` component.",
			},
		},
	},
	render: () =>
		({
			Component: ListWrapper,
			props: { story: "withIcon" },
		}) as any,
};

export const Nested: Story = {
	parameters: {
		docs: {
			description: {
				story: "Nested `List` structure with multiple levels of indentation.",
			},
		},
	},
	render: () =>
		({
			Component: ListWrapper,
			props: { story: "nested" },
		}) as any,
};
