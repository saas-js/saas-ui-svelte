import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Toast } from "$saas/components/toast";
import ToastWrapper from "../wrappers/components/Toast.svelte";

const toastStatuses = [
	"info",
	"success",
	"warning",
	"error",
	"loading",
] as const;

const meta: Meta = {
	title: "components/Toast",
	component: Toast,
	argTypes: {
		status: {
			control: "select",
			options: toastStatuses,
			description: "The status of the toast.",
			table: { defaultValue: { summary: "info" } },
		},
		title: {
			control: "text",
			description: "The title of the toast.",
		},
		description: {
			control: "text",
			description: "The description of the toast.",
		},
		closable: {
			control: "boolean",
			description: "Whether to show the close button.",
			table: { defaultValue: { summary: "true" } },
		},
		class: {
			control: "text",
			description: "CSS class to apply to the component.",
		},
	},
	parameters: {
		docs: {
			description: {
				component:
					"A brief notification that appears temporarily to inform users of an action or event.",
			},
		},
		anatomy: `<script>
  import { Toaster, createToaster } from "@saas-ui/svelte/components/toast";

  const toaster = createToaster({ placement: "top-end" });
</script>

<button
  onclick={() => toaster.create({
    title: "Toast title",
    description: "Toast description",
    status: "success",
  })}
>
  Show Toast
</button>

<Toaster {toaster} />`,
		usesPortal: true,
		subComponents: [
			{
				name: "Toast",
				description:
					"The toast notification component that displays a message.",
				props: {
					class: {
						type: "string",
						description: "Additional CSS classes to apply.",
					},
					status: {
						type: '"info" | "success" | "warning" | "error" | "loading"',
						default: '"info"',
						description:
							"The status/type of the toast notification.",
					},
					icon: {
						type: "boolean | Component",
						description:
							"Custom icon component, or false to hide the icon.",
					},
					title: {
						type: "string",
						description: "The title text of the toast.",
					},
					description: {
						type: "string",
						description: "The description text of the toast.",
					},
					action: {
						type: "{ label: string; onClick?: () => void }",
						description:
							"An action button to display in the toast.",
					},
					closable: {
						type: "boolean",
						default: "true",
						description: "Whether the toast can be dismissed.",
					},
					onclose: {
						type: "() => void",
						description:
							"Callback invoked when the toast is closed.",
					},
					children: {
						type: "Snippet",
						description:
							"Custom content to render inside the toast.",
					},
				},
			},
			{
				name: "Toaster",
				description:
					"The container component that renders and manages toast notifications from a toaster store.",
				props: {
					toaster: {
						type: "ToasterStore",
						required: true,
						description:
							"The toaster store instance created by createToaster().",
					},
					class: {
						type: "string",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "createToaster",
				description:
					"A function that creates a toaster store for managing toast notifications.",
				props: {
					placement: {
						type: '"top" | "top-start" | "top-end" | "bottom" | "bottom-start" | "bottom-end"',
						default: '"bottom-end"',
						description:
							"The placement of the toast notifications.",
					},
					duration: {
						type: "number",
						default: "5000",
						description:
							"The default duration in milliseconds before toasts auto-dismiss.",
					},
					gap: {
						type: "number",
						description: "The gap between stacked toasts.",
					},
					overlap: {
						type: "boolean",
						description: "Whether toasts should overlap.",
					},
				},
			},
		],
	},
	args: {
		status: "info",
		title: "Toast Title",
		description: "This is a toast description.",
	},
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
	parameters: {
		docs: {
			description: {
				story: "Static toast preview without toaster.",
			},
		},
	},
	render: () =>
		({
			Component: ToastWrapper,
			props: { story: "default" },
		}) as any,
};

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic toast triggered by a button.",
			},
		},
	},
	render: () =>
		({
			Component: ToastWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Status: Story = {
	parameters: {
		docs: {
			description: {
				story: "Toast with different `status` types.",
			},
		},
	},
	render: () =>
		({
			Component: ToastWrapper,
			props: { story: "status" },
		}) as any,
};

export const WithAction: Story = {
	parameters: {
		docs: {
			description: {
				story: "Toast with an action button.",
			},
		},
	},
	render: () =>
		({
			Component: ToastWrapper,
			props: { story: "withAction" },
		}) as any,
};

export const Duration: Story = {
	parameters: {
		docs: {
			description: {
				story: "Toast with different `duration` values.",
			},
		},
	},
	render: () =>
		({
			Component: ToastWrapper,
			props: { story: "duration" },
		}) as any,
};

export const Stacking: Story = {
	parameters: {
		docs: {
			description: {
				story: "Multiple toasts stacking.",
			},
		},
	},
	render: () =>
		({
			Component: ToastWrapper,
			props: { story: "stacking" },
		}) as any,
};
