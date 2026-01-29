import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Status } from "$saas/components/status";
import StatusWrapper from "../wrappers/components/Status.svelte";

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

const statusSizes = ["sm", "md", "lg"] as const;
const statusValues = ["error", "info", "warning", "success"] as const;

const meta: Meta = {
	title: "components/Status",
	component: Status,
	argTypes: {
		value: {
			control: "select",
			options: statusValues,
			description: "The status value determining the indicator colour.",
			table: { defaultValue: { summary: "info" } },
		},
		size: {
			control: "select",
			options: statusSizes,
			description: "The size of the status indicator.",
			table: { defaultValue: { summary: "md" } },
		},
		colour: {
			control: "select",
			options: colours,
			description: "The colour palette to use for the indicator.",
		},
		class: {
			control: "text",
			description: "CSS class to apply to the component.",
		},
	},
	parameters: {
		docs: {
			description: {
				component: "A visual indicator that displays the current status of an item or process.",
			},
		},
		anatomy: `<script>
  import { Status } from "@saas-ui/svelte/components/status";
</script>

<Status value="success">Active</Status>`,
	},
	args: {
		value: "info",
		size: "md",
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic status indicator with default styling.",
			},
		},
	},
	render: () =>
		({
			Component: StatusWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Values: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `value` prop to set different status types.",
			},
		},
	},
	render: () =>
		({
			Component: StatusWrapper,
			props: { story: "values" },
		}) as any,
};

export const Label: Story = {
	parameters: {
		docs: {
			description: {
				story: "Add text labels to status indicators.",
			},
		},
	},
	render: () =>
		({
			Component: StatusWrapper,
			props: { story: "label" },
		}) as any,
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `size` prop to change the size of the status indicator.",
			},
		},
	},
	render: () =>
		({
			Component: StatusWrapper,
			props: { story: "sizes" },
		}) as any,
};

export const Colours: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `colour` prop to customize the indicator colour.",
			},
		},
	},
	render: () =>
		({
			Component: StatusWrapper,
			props: { story: "colours" },
		}) as any,
};
