import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Highlight } from "$saas/typography/highlight";
import HighlightWrapper from "../wrappers/typography/Highlight.svelte";
import { commonArgTypes, getControls, markVariants } from "../utils";

const meta: Meta = {
	title: "typography/Highlight",
	component: Highlight,
	argTypes: {
		query: {
			control: "text",
		},
		text: {
			control: "text",
		},
		ignoreCase: {
			control: "boolean",
			table: { defaultValue: { summary: "false" } },
		},
		matchAll: {
			control: "boolean",
			table: { defaultValue: { summary: "true" } },
		},
		variant: {
			control: "select",
			options: markVariants,
			table: { defaultValue: { summary: "subtle" } },
		},
		colour: commonArgTypes.colour,
		markClass: {
			control: "text",
			description:
				"Additional CSS classes to apply to the highlighted text",
		},
		class: commonArgTypes.class,
	},
	parameters: {
		docs: {
			description: {
				component:
					"A utility component that automatically highlights matching text patterns within content, useful for search results and text emphasis.",
			},
		},
		anatomy: `<script>
  import { Highlight } from "@saas-ui/svelte/typography/highlight";
</script>

<!-- Basic highlight -->
<Highlight
  query="spotlight"
  text="With the Highlight component, you can spotlight words."
/>

<!-- Multiple queries -->
<Highlight
  query={["hello", "world"]}
  text="Hello world, hello everyone!"
/>

<!-- Case insensitive -->
<Highlight
  query="react"
  text="React is a library for building React apps"
  ignoreCase
/>`,
		controls: getControls([
			"query",
			"text",
			"ignoreCase",
			"matchAll",
			"variant",
			"colour",
			"markClass",
			"class",
		]),
	},
	args: {
		query: "spotlight",
		text: "With the Highlight component, you can spotlight words.",
		ignoreCase: false,
		matchAll: true,
		variant: "subtle",
		colour: "orange",
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic highlight with default styling for emphasizing matching text patterns.",
			},
		},
	},
	render: () =>
		({
			Component: HighlightWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Multiple: Story = {
	parameters: {
		docs: {
			description: {
				story: "Highlight multiple words by passing an array to the `query` prop.",
			},
		},
	},
	render: () =>
		({
			Component: HighlightWrapper,
			props: { story: "multiple" },
		}) as any,
};

export const CustomStyle: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `variant` and `colour` props to customize the highlight appearance.",
			},
		},
	},
	render: () =>
		({
			Component: HighlightWrapper,
			props: { story: "customStyle" },
		}) as any,
};

export const SearchQuery: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use `ignoreCase` for case-insensitive search highlighting, ideal for search results.",
			},
		},
	},
	render: () =>
		({
			Component: HighlightWrapper,
			props: { story: "searchQuery" },
		}) as any,
};

export const MarkClass: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use `markClass` to apply custom CSS classes to the highlighted text for advanced styling.",
			},
		},
	},
	render: () =>
		({
			Component: HighlightWrapper,
			props: { story: "markClass" },
		}) as any,
};
