import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Alert } from "$saas/components/alert";
import AlertWrapper from "../wrappers/components/Alert.svelte";
import {
	commonArgTypes,
	getControls,
	alertVariants,
	alertStatuses,
} from "../utils";

const meta: Meta = {
	title: "components/Alert",
	component: Alert,
	argTypes: {
		status: {
			control: "select",
			options: alertStatuses,
			description: "The status of the alert.",
			table: { defaultValue: { summary: "info" } },
		},
		variant: {
			...commonArgTypes.variant,
			options: alertVariants,
			table: { defaultValue: { summary: "subtle" } },
		},
		colour: commonArgTypes.colour,
		title: {
			control: "text",
			description: "The title of the alert.",
		},
		icon: commonArgTypes.icon,
		children: commonArgTypes.children,
		class: commonArgTypes.class,
	},
	parameters: {
		controls: getControls([
			"status",
			"variant",
			"colour",
			"title",
			"icon",
			"children",
			"class",
		]),
		docs: {
			description: {
				component:
					"Displays a callout for user attention with contextual feedback messages for typical user actions.",
			},
		},
		anatomy: `<script>
  import { Alert } from "@saas-ui/svelte/components/alert";
</script>

<Alert status="info" title="Information">
  This is an informational alert message.
</Alert>

<Alert status="success" title="Success">
  Your changes have been saved successfully.
</Alert>

<Alert status="warning" title="Warning">
  Please review your input before continuing.
</Alert>

<Alert status="error" title="Error">
  An error occurred while processing your request.
</Alert>`,
	},
	args: {
		status: "info",
		variant: "subtle",
		title: "This is the alert title",
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic alert with default styling and title.",
			},
		},
	},
	render: () =>
		({
			Component: AlertWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Description: Story = {
	parameters: {
		docs: {
			description: {
				story: "Alert with additional description text as children content.",
			},
		},
	},
	render: () =>
		({
			Component: AlertWrapper,
			props: { story: "description" },
		}) as any,
};

export const Status: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `status` prop to change the alert status. Available statuses: `error`, `info`, `warning`, `success`, `neutral`.",
			},
		},
	},
	render: () =>
		({
			Component: AlertWrapper,
			props: { story: "status" },
		}) as any,
};

export const Variants: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `variant` prop to change the visual style. Available variants: `subtle`, `solid`, `surface`, `outline`.",
			},
		},
	},
	render: () =>
		({
			Component: AlertWrapper,
			props: { story: "variants" },
		}) as any,
};

export const CustomIcon: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `icon` prop to provide a custom icon component instead of the default status icon.",
			},
		},
	},
	render: () =>
		({
			Component: AlertWrapper,
			props: { story: "customIcon" },
		}) as any,
};
