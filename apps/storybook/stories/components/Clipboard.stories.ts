import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Clipboard } from "$saas/components/clipboard";
import ClipboardWrapper from "../wrappers/components/Clipboard.svelte";
import { commonArgTypes, getControls } from "../utils";

const meta: Meta = {
	title: "components/Clipboard",
	component: Clipboard,
	argTypes: {
		value: {
			control: "text",
			description: "The value to be copied to the clipboard.",
		},
		timeout: {
			control: "number",
			description:
				"The timeout for showing the 'copied' state (in ms).",
			table: { defaultValue: { summary: "3000" } },
		},
		class: commonArgTypes.class,
	},
	parameters: {
		controls: getControls(["value", "timeout", "class"]),
		docs: {
			description: {
				component: "A component for copying text to the clipboard with visual feedback.",
			},
		},
		anatomy: `<script>
  import {
    Clipboard,
    ClipboardButton,
    ClipboardIconButton,
    ClipboardInput,
  } from "@saas-ui/svelte/components/clipboard";
</script>

<Clipboard.Root value="https://saas-ui.dev">
  <Clipboard.Label>Copy Link</Clipboard.Label>
  <Clipboard.Control>
    <Clipboard.Input />
    <Clipboard.Trigger>
      <Clipboard.Indicator copied={false}>
        <CopyIcon />
      </Clipboard.Indicator>
      <Clipboard.Indicator copied={true}>
        <CheckIcon />
      </Clipboard.Indicator>
    </Clipboard.Trigger>
  </Clipboard.Control>
</Clipboard.Root>`,
	},
	args: {
		value: "https://saas-ui.dev",
		timeout: 3000,
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic clipboard with icon button.",
			},
		},
	},
	render: () =>
		({
			Component: ClipboardWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Button: Story = {
	parameters: {
		docs: {
			description: {
				story: "Clipboard with text button.",
			},
		},
	},
	render: () =>
		({
			Component: ClipboardWrapper,
			props: { story: "button" },
		}) as any,
};

export const CustomLabels: Story = {
	parameters: {
		docs: {
			description: {
				story: "Clipboard with custom labels for copy and copied states.",
			},
		},
	},
	render: () =>
		({
			Component: ClipboardWrapper,
			props: { story: "customLabels" },
		}) as any,
};

export const Input: Story = {
	parameters: {
		docs: {
			description: {
				story: "Clipboard with an input field.",
			},
		},
	},
	render: () =>
		({
			Component: ClipboardWrapper,
			props: { story: "input" },
		}) as any,
};

export const Timeout: Story = {
	parameters: {
		docs: {
			description: {
				story: "Clipboard with custom `timeout` value.",
			},
		},
	},
	render: () =>
		({
			Component: ClipboardWrapper,
			props: { story: "timeout" },
		}) as any,
};
