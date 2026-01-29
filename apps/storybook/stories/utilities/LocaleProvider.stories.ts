import type { Meta, StoryObj } from "@storybook/sveltekit";
import { LocaleProvider } from "$saas/utilities/locale-provider";
import LocaleProviderWrapper from "../wrappers/utilities/LocaleProvider.svelte";
import { commonArgTypes, getControls } from "../utils";

/**
 * LocaleProvider component for providing locale context to child components.
 */
const meta: Meta = {
	title: "utilities/Locale Provider",
	component: LocaleProvider,
	argTypes: {
		locale: {
			control: "text",
			description: "The locale to use for the application.",
			table: { defaultValue: { summary: "en-US" } },
		},
		children: commonArgTypes.children,
	},
	parameters: {
		controls: getControls(["locale"]),
		docs: {
			description: {
				component:
					"A context provider component that sets the locale for child components. Automatically determines text direction (LTR/RTL) based on the locale and provides locale context to formatting utilities.",
			},
		},
		anatomy: `<script>
  import { LocaleProvider } from "@saas-ui/svelte/utilities/locale-provider";
  import { FormatNumber } from "@saas-ui/svelte/utilities/format-number";
</script>

<!-- Wrap your app with LocaleProvider -->
<LocaleProvider locale="en-US">
  <FormatNumber value={1234.56} />
</LocaleProvider>

<!-- RTL locale support -->
<LocaleProvider locale="ar-SA">
  <FormatNumber value={1234.56} />
</LocaleProvider>`,
	},
	args: {
		locale: "en-US",
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic usage showing how `LocaleProvider` sets the locale context for child components.",
			},
		},
	},
	render: (args) =>
		({
			Component: LocaleProviderWrapper,
			props: { story: "basic", ...args },
		}) as any,
};

export const SettingLocale: Story = {
	name: "Setting Locale",
	parameters: {
		docs: {
			description: {
				story: "Demonstrates how changing the `locale` affects formatting and text direction throughout the component tree.",
			},
		},
	},
	render: () =>
		({
			Component: LocaleProviderWrapper,
			props: { story: "settingLocale" },
		}) as any,
};
