import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Table } from "$saas/components/table";
import TableWrapper from "../wrappers/components/Table.svelte";

const tableSizes = ["sm", "md", "lg"] as const;
const tableVariants = ["line", "outline"] as const;

const meta: Meta = {
	title: "components/Table",
	component: Table.Root,
	argTypes: {
		size: {
			control: "select",
			options: tableSizes,
			description: "The size of the table.",
			table: { defaultValue: { summary: "md" } },
		},
		variant: {
			control: "select",
			options: tableVariants,
			description: "The visual variant of the table.",
			table: { defaultValue: { summary: "line" } },
		},
		interactive: {
			control: "boolean",
			description: "Enable row hover highlighting.",
			table: { defaultValue: { summary: "false" } },
		},
		stickyHeader: {
			control: "boolean",
			description: "Make the header sticky.",
			table: { defaultValue: { summary: "false" } },
		},
		striped: {
			control: "boolean",
			description: "Add zebra-stripe pattern to rows.",
			table: { defaultValue: { summary: "false" } },
		},
		showColumnBorder: {
			control: "boolean",
			description: "Show borders between columns.",
			table: { defaultValue: { summary: "false" } },
		},
		class: {
			control: "text",
			description: "CSS class to apply to the component.",
		},
	},
	parameters: {
		docs: {
			description: {
				component: "A component for displaying tabular data with rows and columns.",
			},
		},
		anatomy: `<script>
  import { Table } from "@saas-ui/svelte/components/table";
</script>

<Table.Root>
  <Table.Header>
    <Table.Row>
      <Table.ColumnHeader>Name</Table.ColumnHeader>
      <Table.ColumnHeader>Email</Table.ColumnHeader>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    <Table.Row>
      <Table.Cell>John Doe</Table.Cell>
      <Table.Cell>john@example.com</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table.Root>`,
		subComponents: [
			{
				name: "Table.Root",
				description: "The main table container.",
				props: {
					size: {
						type: '"sm" | "md" | "lg"',
						default: '"md"',
						description: "The size of the table.",
					},
					variant: {
						type: '"line" | "outline"',
						default: '"line"',
						description: "The visual variant of the table.",
					},
					interactive: {
						type: "boolean",
						default: "false",
						description: "Enable row hover highlighting.",
					},
					stickyHeader: {
						type: "boolean",
						default: "false",
						description: "Make the header sticky.",
					},
					striped: {
						type: "boolean",
						default: "false",
						description: "Add zebra-stripe pattern to rows.",
					},
					showColumnBorder: {
						type: "boolean",
						default: "false",
						description: "Show borders between columns.",
					},
					showOuterBorder: {
						type: "boolean",
						default: "true",
						description: "Whether to show the outer border. Set to false when embedded in ScrollArea.",
					},
					class: {
						type: "string",
						default: "undefined",
						description: "Additional CSS classes to apply.",
					},
					children: {
						type: "Snippet",
						default: "undefined",
						description: "Table content.",
					},
				},
			},
			{
				name: "Table.Header",
				description: "The table header section (thead).",
				props: {
					class: {
						type: "string",
						default: "undefined",
						description: "Additional CSS classes to apply.",
					},
					children: {
						type: "Snippet",
						default: "undefined",
						description: "Header content.",
					},
				},
			},
			{
				name: "Table.Body",
				description: "The table body section (tbody).",
				props: {
					class: {
						type: "string",
						default: "undefined",
						description: "Additional CSS classes to apply.",
					},
					children: {
						type: "Snippet",
						default: "undefined",
						description: "Body content.",
					},
				},
			},
			{
				name: "Table.Footer",
				description: "The table footer section (tfoot).",
				props: {
					class: {
						type: "string",
						default: "undefined",
						description: "Additional CSS classes to apply.",
					},
					children: {
						type: "Snippet",
						default: "undefined",
						description: "Footer content.",
					},
				},
			},
			{
				name: "Table.Row",
				description: "A table row (tr).",
				props: {
					class: {
						type: "string",
						default: "undefined",
						description: "Additional CSS classes to apply.",
					},
					children: {
						type: "Snippet",
						default: "undefined",
						description: "Row content.",
					},
				},
			},
			{
				name: "Table.ColumnHeader",
				description: "A table column header cell (th).",
				props: {
					textAlign: {
						type: '"start" | "center" | "end"',
						default: '"start"',
						description: "Text alignment for the column.",
					},
					minW: {
						type: "string",
						default: "undefined",
						description: "Minimum width of the column.",
					},
					w: {
						type: "string",
						default: "undefined",
						description: "Width of the column.",
					},
					class: {
						type: "string",
						default: "undefined",
						description: "Additional CSS classes to apply.",
					},
					children: {
						type: "Snippet",
						default: "undefined",
						description: "Header cell content.",
					},
				},
			},
			{
				name: "Table.Cell",
				description: "A table data cell (td).",
				props: {
					textAlign: {
						type: '"start" | "center" | "end"',
						default: '"start"',
						description: "Text alignment for the cell.",
					},
					class: {
						type: "string",
						default: "undefined",
						description: "Additional CSS classes to apply.",
					},
					children: {
						type: "Snippet",
						default: "undefined",
						description: "Cell content.",
					},
				},
			},
			{
				name: "Table.Caption",
				description: "A table caption element.",
				props: {
					placement: {
						type: '"top" | "bottom"',
						default: '"bottom"',
						description: "Placement of the caption.",
					},
					class: {
						type: "string",
						default: "undefined",
						description: "Additional CSS classes to apply.",
					},
					children: {
						type: "Snippet",
						default: "undefined",
						description: "Caption content.",
					},
				},
			},
			{
				name: "Table.ScrollArea",
				description: "A scrollable container for the table.",
				props: {
					maxW: {
						type: "string",
						default: "undefined",
						description: "Maximum width of the scroll area.",
					},
					height: {
						type: "string",
						default: "undefined",
						description: "Height of the scroll area.",
					},
					borderWidth: {
						type: "string",
						default: "undefined",
						description: "Border width for the scroll area.",
					},
					rounded: {
						type: "string",
						default: "undefined",
						description: "Border radius for the scroll area.",
					},
					class: {
						type: "string",
						default: "undefined",
						description: "Additional CSS classes to apply.",
					},
					children: {
						type: "Snippet",
						default: "undefined",
						description: "Scroll area content.",
					},
				},
			},
			{
				name: "Table.ColumnGroup",
				description: "A column group element (colgroup) for defining column widths.",
				props: {
					class: {
						type: "string",
						default: "undefined",
						description: "Additional CSS classes to apply.",
					},
					children: {
						type: "Snippet",
						default: "undefined",
						description: "Column definitions.",
					},
				},
			},
			{
				name: "Table.Column",
				description: "A column element (col) for defining individual column properties.",
				props: {
					htmlWidth: {
						type: "string",
						default: "undefined",
						description: "Width of the column (use htmlWidth for HTML table columns).",
					},
					class: {
						type: "string",
						default: "undefined",
						description: "Additional CSS classes to apply.",
					},
				},
			},
		],
	},
	args: {
		size: "md",
		variant: "line",
		interactive: false,
		stickyHeader: false,
		striped: false,
		showColumnBorder: false,
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic table with default styling.",
			},
		},
	},
	render: () =>
		({
			Component: TableWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `size` prop to change the size of the table.",
			},
		},
	},
	render: () =>
		({
			Component: TableWrapper,
			props: { story: "sizes" },
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
			Component: TableWrapper,
			props: { story: "variants" },
		}) as any,
};

export const Striped: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `striped` prop to add zebra-stripe pattern.",
			},
		},
	},
	render: () =>
		({
			Component: TableWrapper,
			props: { story: "striped" },
		}) as any,
};

export const ColumnBorder: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `showColumnBorder` prop to show column borders.",
			},
		},
	},
	render: () =>
		({
			Component: TableWrapper,
			props: { story: "columnBorder" },
		}) as any,
};

export const Overflow: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use `Table.ScrollArea` for horizontal overflow.",
			},
		},
	},
	render: () =>
		({
			Component: TableWrapper,
			props: { story: "overflow" },
		}) as any,
};

export const StickyHeader: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `stickyHeader` prop to make the header sticky.",
			},
		},
	},
	render: () =>
		({
			Component: TableWrapper,
			props: { story: "stickyHeader" },
		}) as any,
};

export const Interactive: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `interactive` prop to enable row hover effects.",
			},
		},
	},
	render: () =>
		({
			Component: TableWrapper,
			props: { story: "interactive" },
		}) as any,
};

export const Pagination: Story = {
	parameters: {
		docs: {
			description: {
				story: "Combine table with `Pagination` component.",
			},
		},
	},
	render: () =>
		({
			Component: TableWrapper,
			props: { story: "pagination" },
		}) as any,
};

export const ColumnGroup: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use `Table.ColumnGroup` to control column widths.",
			},
		},
	},
	render: () =>
		({
			Component: TableWrapper,
			props: { story: "columnGroup" },
		}) as any,
};

export const ActionBar: Story = {
	parameters: {
		docs: {
			description: {
				story: "Combine table with `ActionBar` for bulk actions.",
			},
		},
	},
	render: () =>
		({
			Component: TableWrapper,
			props: { story: "actionBar" },
		}) as any,
};
