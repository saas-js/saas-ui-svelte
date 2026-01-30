import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Pagination } from "$saas/components/pagination";
import PaginationWrapper from "../wrappers/components/Pagination.svelte";

const paginationSizes = ["xs", "sm", "md", "lg"] as const;
const paginationVariants = ["ghost", "outline", "solid"] as const;
const paginationLabelVariants = ["short", "long"] as const;
const paginationTypes = ["button", "link"] as const;
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

const meta: Meta = {
	title: "components/Pagination",
	component: Pagination,
	parameters: {
		docs: {
			description: {
				component:
					"A navigation component for paginating through large datasets with customizable page controls.",
			},
		},
		anatomy: `<script>
  import { Pagination } from "@saas-ui/svelte/components/pagination";
</script>

<Pagination
  count={100}
  pageSize={10}
  defaultPage={1}
/>`,
		subComponents: [
			{
				name: "Pagination",
				description:
					"A navigation component for paginating through data.",
				props: {
					count: {
						type: "number",
						required: true,
						description: "Total number of data items.",
					},
					pageSize: {
						type: "number",
						default: "10",
						description: "Number of data items per page.",
					},
					page: {
						type: "number",
						description: "The controlled active page.",
					},
					defaultPage: {
						type: "number",
						default: "1",
						description:
							"The initial active page when uncontrolled.",
					},
					siblingCount: {
						type: "number",
						default: "1",
						description:
							"Number of pages to show beside active page.",
					},
					size: {
						type: '"xs" | "sm" | "md" | "lg"',
						default: '"md"',
						description: "The size of the pagination items.",
					},
					variant: {
						type: '"ghost" | "outline" | "solid"',
						default: '"ghost"',
						description:
							"The visual style variant of the pagination.",
					},
					colour: {
						type: "ColourName",
						default: '"gray"',
						description: "The colour theme of the pagination.",
					},
					compact: {
						type: "boolean",
						default: "false",
						description:
							"Whether to show compact page text instead of page items.",
					},
					pageTextFormat: {
						type: '"short" | "long"',
						default: '"short"',
						description:
							'The format of the page text when compact is true. "short" shows "1 of 7", "long" shows "1 - 5 of 50".',
					},
					attached: {
						type: "boolean",
						default: "false",
						description:
							"Whether items should be visually attached.",
					},
					type: {
						type: '"button" | "link"',
						default: '"button"',
						description: "The type of the trigger element.",
					},
					getHref: {
						type: "(page: number) => string",
						description:
							"Function to generate href attributes for pagination links. Only used when type is 'link'.",
					},
					onPageChange: {
						type: "(details: { page: number }) => void",
						description: "Called when the page number changes.",
					},
					class: {
						type: "string",
						description: "Additional CSS classes to apply.",
					},
					style: {
						type: "string",
						description: "Inline styles.",
					},
					id: {
						type: "string",
						description: "The id of the pagination element.",
					},
					"aria-label": {
						type: "string",
						default: '"pagination"',
						description:
							"Accessible label for the pagination navigation. Required when multiple paginations exist on a page.",
					},
				},
			},
		],
	},
	argTypes: {
		count: {
			control: "number",
			description: "Total number of data items.",
		},
		pageSize: {
			control: "number",
			description: "Number of data items per page.",
			table: { defaultValue: { summary: "10" } },
		},
		defaultPage: {
			control: "number",
			description: "The initial active page when uncontrolled.",
			table: { defaultValue: { summary: "1" } },
		},
		siblingCount: {
			control: "number",
			description: "Number of pages to show beside active page.",
			table: { defaultValue: { summary: "1" } },
		},
		size: {
			control: "select",
			options: paginationSizes,
			description: "The size of the component.",
			table: { defaultValue: { summary: "md" } },
		},
		variant: {
			control: "select",
			options: paginationVariants,
			description: "The visual style of the component.",
			table: { defaultValue: { summary: "ghost" } },
		},
		colour: {
			control: "select",
			options: colours,
			description: "The colour theme of the component.",
			table: { defaultValue: { summary: "gray" } },
		},
		compact: {
			control: "boolean",
			description:
				"Whether to show compact page text instead of page items.",
			table: { defaultValue: { summary: "false" } },
		},
		pageTextFormat: {
			control: "select",
			options: paginationLabelVariants,
			description:
				'The format of the page text. "short" shows "1 of 7", "long" shows "1 - 5 of 50".',
			table: { defaultValue: { summary: "short" } },
		},
		attached: {
			control: "boolean",
			description: "Whether items should be visually attached.",
			table: { defaultValue: { summary: "false" } },
		},
		type: {
			control: "select",
			options: paginationTypes,
			description: "The type of the trigger element.",
			table: { defaultValue: { summary: "button" } },
		},
		class: {
			control: "text",
			description: "Additional CSS classes to apply.",
		},
	},
	args: {
		count: 100,
		pageSize: 10,
		defaultPage: 1,
		siblingCount: 1,
		size: "md",
		variant: "ghost",
		colour: "gray",
		compact: false,
		pageTextFormat: "short",
		attached: false,
		type: "button",
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic pagination with default styling and page numbers.",
			},
		},
	},
	render: () =>
		({
			Component: PaginationWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Pagination in different sizes. Available sizes: `xs`, `sm`, `md`, `lg`.",
			},
		},
	},
	render: () =>
		({
			Component: PaginationWrapper,
			props: { story: "sizes" },
		}) as any,
};

export const Variants: Story = {
	parameters: {
		docs: {
			description: {
				story: "Pagination with different variants. Available variants: `ghost`, `outline`, `solid`.",
			},
		},
	},
	render: () =>
		({
			Component: PaginationWrapper,
			props: { story: "variants" },
		}) as any,
};

export const SiblingCount: Story = {
	parameters: {
		docs: {
			description: {
				story: "Pagination with more sibling pages visible using the `siblingCount` prop.",
			},
		},
	},
	render: () =>
		({
			Component: PaginationWrapper,
			props: { story: "siblingCount" },
		}) as any,
};

export const Controlled: Story = {
	parameters: {
		docs: {
			description: {
				story: "Controlled pagination with external state management using the `page` prop.",
			},
		},
	},
	render: () =>
		({
			Component: PaginationWrapper,
			props: { story: "controlled" },
		}) as any,
};

export const Compact: Story = {
	parameters: {
		docs: {
			description: {
				story: "Compact pagination showing page text only instead of individual page buttons.",
			},
		},
	},
	render: () =>
		({
			Component: PaginationWrapper,
			props: { story: "compact" },
		}) as any,
};

export const Attached: Story = {
	parameters: {
		docs: {
			description: {
				story: "Pagination with visually attached buttons using the `attached` prop.",
			},
		},
	},
	render: () =>
		({
			Component: PaginationWrapper,
			props: { story: "attached" },
		}) as any,
};

export const CountText: Story = {
	parameters: {
		docs: {
			description: {
				story: "Pagination with long count text format showing item range and total.",
			},
		},
	},
	render: () =>
		({
			Component: PaginationWrapper,
			props: { story: "countText" },
		}) as any,
};

export const AsLink: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Pagination as links for SEO-friendly navigation using `type="link"`.',
			},
		},
	},
	render: () =>
		({
			Component: PaginationWrapper,
			props: { story: "asLink" },
		}) as any,
};

export const DataDriven: Story = {
	parameters: {
		docs: {
			description: {
				story: "Pagination integrated with data-driven content to display paginated items.",
			},
		},
	},
	render: () =>
		({
			Component: PaginationWrapper,
			props: { story: "dataDriven" },
		}) as any,
};

export const Colours: Story = {
	parameters: {
		docs: {
			description: {
				story: "Pagination with different colour schemes using the `colour` prop.",
			},
		},
	},
	render: () =>
		({
			Component: PaginationWrapper,
			props: { story: "colours" },
		}) as any,
};
