import type { Meta, StoryObj } from "@storybook/sveltekit";
import { FormatNumber } from "$saas/utilities/format-number";
import FormatNumberWrapper from "../wrappers/utilities/FormatNumber.svelte";
import { getControls } from "../utils";

/**
 * FormatNumber component for displaying numbers in various formats.
 */
const meta: Meta = {
	title: "utilities/Format Number",
	component: FormatNumber,
	argTypes: {
		value: {
			control: "number",
			description: "The number to format.",
		},
		style: {
			control: "select",
			options: ["decimal", "currency", "percent", "unit"],
			description: "The formatting style to use.",
		},
		currency: {
			control: "text",
			description: "The currency to use in currency formatting.",
		},
		unit: {
			control: "text",
			description: "The unit to use in unit formatting.",
		},
		minimumFractionDigits: {
			control: "number",
			description: "The minimum number of fraction digits to use.",
		},
		maximumFractionDigits: {
			control: "number",
			description: "The maximum number of fraction digits to use.",
		},
		notation: {
			control: "select",
			options: ["standard", "scientific", "engineering", "compact"],
			description: "The formatting notation to use.",
		},
		compactDisplay: {
			control: "select",
			options: ["short", "long"],
			description:
				"How to display the number in compact notation (only used when notation is compact).",
		},
		locale: {
			control: "text",
			description:
				"The locale to use for formatting. If not provided, uses the locale from LocaleProvider context.",
		},
	},
	parameters: {
		controls: getControls([
			"value",
			"style",
			"currency",
			"unit",
			"minimumFractionDigits",
			"maximumFractionDigits",
			"notation",
			"compactDisplay",
			"locale",
		]),
		docs: {
			description: {
				component:
					"A utility component for formatting numbers with locale-aware styling. Supports decimal, currency, percentage, and unit formats using the Intl.NumberFormat API.",
			},
		},
		anatomy: `<script>
  import { FormatNumber } from "@saas-ui/svelte/utilities/format-number";
</script>

<!-- Basic decimal -->
<FormatNumber value={1234.56} />

<!-- Currency format -->
<FormatNumber value={1234.56} style="currency" currency="USD" />

<!-- Percentage -->
<FormatNumber value={0.75} style="percent" />

<!-- With locale -->
<FormatNumber value={1234.56} locale="de-DE" />

<!-- Compact notation -->
<FormatNumber value={1000000} notation="compact" />`,
	},
	args: {
		value: 1450.45,
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic usage showing default decimal number formatting.",
			},
		},
	},
	render: (args) =>
		({
			Component: FormatNumberWrapper,
			props: { story: "basic", ...args },
		}) as any,
};

export const Percentage: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Use `style="percent"` to format decimal values as percentages (`0.75` becomes `75%`).',
			},
		},
	},
	render: () =>
		({
			Component: FormatNumberWrapper,
			props: { story: "percentage" },
		}) as any,
};

export const Currency: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Use `style="currency"` with the `currency` prop to format values as monetary amounts.',
			},
		},
	},
	render: () =>
		({
			Component: FormatNumberWrapper,
			props: { story: "currency" },
		}) as any,
};

export const Locale: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `locale` prop to format numbers according to different regional conventions (e.g., decimal separators, grouping).",
			},
		},
	},
	render: () =>
		({
			Component: FormatNumberWrapper,
			props: { story: "locale" },
		}) as any,
};

export const Unit: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Use `style="unit"` with the `unit` prop to display numbers with measurement units (e.g., kilometers, liters).',
			},
		},
	},
	render: () =>
		({
			Component: FormatNumberWrapper,
			props: { story: "unit" },
		}) as any,
};

export const CompactNotation: Story = {
	name: "Compact Notation",
	parameters: {
		docs: {
			description: {
				story: 'Use `notation="compact"` to display large numbers in shortened form (e.g., `1M`, `1K`).',
			},
		},
	},
	render: () =>
		({
			Component: FormatNumberWrapper,
			props: { story: "compactNotation" },
		}) as any,
};
