import type { Meta, StoryObj } from "@storybook/sveltekit";
import { FormatByte } from "$saas/utilities/format-byte";
import FormatByteWrapper from "../wrappers/utilities/FormatByte.svelte";
import { getControls } from "../utils";

/**
 * FormatByte component for displaying file sizes in a human-readable format.
 */
const meta: Meta = {
	title: "utilities/Format Byte",
	component: FormatByte,
	argTypes: {
		value: {
			control: "number",
			description: "The byte size to format.",
		},
		unit: {
			control: "select",
			options: ["byte", "bit"],
			description: "The unit granularity to display.",
			table: { defaultValue: { summary: "byte" } },
		},
		unitDisplay: {
			control: "select",
			options: ["long", "short", "narrow"],
			description: "The unit display format.",
			table: { defaultValue: { summary: "short" } },
		},
		locale: {
			control: "text",
			description:
				"The locale to use for formatting. If not provided, uses the locale from LocaleProvider context.",
		},
	},
	parameters: {
		controls: getControls(["value", "unit", "unitDisplay", "locale"]),
		docs: {
			description: {
				component:
					"A utility component for displaying file sizes in a human-readable format. Automatically converts bytes to appropriate units (KB, MB, GB, TB) and supports multiple display formats and locales.",
			},
		},
		anatomy: `<script>
  import { FormatByte } from "@saas-ui/svelte/utilities/format-byte";
</script>

<!-- Basic usage -->
<FormatByte value={1024} />

<!-- With unit type -->
<FormatByte value={1024} unit="bit" />

<!-- With custom locale -->
<FormatByte value={1024} locale="de-DE" />

<!-- With unit display format -->
<FormatByte value={1024} unitDisplay="long" />`,
	},
	args: {
		value: 1450.45,
		unit: "byte",
		unitDisplay: "short",
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic usage showing automatic byte size formatting with default options.",
			},
		},
	},
	render: (args) =>
		({
			Component: FormatByteWrapper,
			props: { story: "basic", ...args },
		}) as any,
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Demonstrates automatic unit scaling from bytes to kilobytes, megabytes, gigabytes, and terabytes.",
			},
		},
	},
	render: () =>
		({
			Component: FormatByteWrapper,
			props: { story: "sizes" },
		}) as any,
};

export const FormatBits: Story = {
	name: "Format Bits",
	parameters: {
		docs: {
			description: {
				story: "Use the `unit` prop set to `bit` to display values in bit units (bit, kbit, Mbit, Gbit, Tbit).",
			},
		},
	},
	render: () =>
		({
			Component: FormatByteWrapper,
			props: { story: "bits" },
		}) as any,
};

export const Locale: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `locale` prop to format numbers according to different regional conventions.",
			},
		},
	},
	render: () =>
		({
			Component: FormatByteWrapper,
			props: { story: "locale" },
		}) as any,
};

export const UnitDisplay: Story = {
	name: "Unit Display",
	parameters: {
		docs: {
			description: {
				story: "Use the `unitDisplay` prop to control unit format: `short` (kB), `narrow` (kB without space), or `long` (kilobytes).",
			},
		},
	},
	render: () =>
		({
			Component: FormatByteWrapper,
			props: { story: "unitDisplay" },
		}) as any,
};
