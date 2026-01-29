import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Stat } from "$saas/components/stat";
import StatWrapper from "../wrappers/components/Stat.svelte";

const meta: Meta = {
	title: "components/Stat",
	component: Stat.Root,
	argTypes: {
		class: {
			control: "text",
			description: "CSS class to apply to the component.",
		},
	},
	parameters: {
		docs: {
			description: {
				component: "A component for displaying statistics with labels, values, and trend indicators.",
			},
		},
		anatomy: `<script>
  import { Stat } from "@saas-ui/svelte/components/stat";
</script>

<Stat.Root>
  <Stat.Label>Total Revenue</Stat.Label>
  <Stat.ValueText>$45,000</Stat.ValueText>
  <Stat.HelpText>
    <Stat.UpTrend>12%</Stat.UpTrend>
  </Stat.HelpText>
</Stat.Root>`,
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic stat with label and value.",
			},
		},
	},
	render: () =>
		({
			Component: StatWrapper,
			props: { story: "basic" },
		}) as any,
};

export const FormatOptions: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use `formatOptions` to format the value as currency, percentage, etc.",
			},
		},
	},
	render: () =>
		({
			Component: StatWrapper,
			props: { story: "formatOptions" },
		}) as any,
};

export const Indicator: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use `Stat.DownTrend` or `Stat.UpTrend` to show change indicators.",
			},
		},
	},
	render: () =>
		({
			Component: StatWrapper,
			props: { story: "indicator" },
		}) as any,
};

export const ValueUnit: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use `Stat.ValueUnit` to add units to the value.",
			},
		},
	},
	render: () =>
		({
			Component: StatWrapper,
			props: { story: "valueUnit" },
		}) as any,
};

export const ProgressBar: Story = {
	parameters: {
		docs: {
			description: {
				story: "Combine stat with a progress bar for visual representation.",
			},
		},
	},
	render: () =>
		({
			Component: StatWrapper,
			props: { story: "progressBar" },
		}) as any,
};

export const Icon: Story = {
	parameters: {
		docs: {
			description: {
				story: "Add icons to the stat label.",
			},
		},
	},
	render: () =>
		({
			Component: StatWrapper,
			props: { story: "icon" },
		}) as any,
};

export const Trend: Story = {
	parameters: {
		docs: {
			description: {
				story: "Show trend with value, percentage, and help text.",
			},
		},
	},
	render: () =>
		({
			Component: StatWrapper,
			props: { story: "trend" },
		}) as any,
};

export const Colours: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `colour` prop on trend indicators.",
			},
		},
	},
	render: () =>
		({
			Component: StatWrapper,
			props: { story: "colours" },
		}) as any,
};
