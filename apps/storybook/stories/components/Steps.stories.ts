import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Steps } from "$saas/components/steps";
import StepsWrapper from "../wrappers/components/Steps.svelte";

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

const stepsSizes = ["sm", "md", "lg"] as const;
const stepsVariants = ["subtle", "solid"] as const;
const orientations = ["horizontal", "vertical"] as const;

const meta: Meta = {
	title: "components/Steps",
	component: Steps.Root,
	argTypes: {
		count: {
			control: "number",
			description: "The total number of steps.",
			table: { defaultValue: { summary: "3" } },
		},
		defaultStep: {
			control: "number",
			description: "The initial step (0-indexed).",
			table: { defaultValue: { summary: "0" } },
		},
		size: {
			control: "select",
			options: stepsSizes,
			description: "The size of the steps.",
			table: { defaultValue: { summary: "md" } },
		},
		variant: {
			control: "select",
			options: stepsVariants,
			description: "The visual variant of the steps.",
			table: { defaultValue: { summary: "solid" } },
		},
		orientation: {
			control: "select",
			options: orientations,
			description: "The orientation of the steps.",
			table: { defaultValue: { summary: "horizontal" } },
		},
		colour: {
			control: "select",
			options: colours,
			description: "The colour palette.",
			table: { defaultValue: { summary: "accent" } },
		},
		linear: {
			control: "boolean",
			description: "Whether steps must be completed in order.",
			table: { defaultValue: { summary: "false" } },
		},
		class: {
			control: "text",
			description: "CSS class to apply to the component.",
		},
		onPrefetch: {
			action: "prefetch",
			description:
				"Callback invoked when hovering over a step. Receives the step index. Similar to Astro's link prefetching, this allows preloading data before selection.",
			table: { category: "Events" },
		},
	},
	parameters: {
		docs: {
			description: {
				component:
					"A multi-step progress indicator for guiding users through a sequence of steps.",
			},
		},
		anatomy: `<script>
  import { Steps } from "@saas-ui/svelte/components/steps";
</script>

<Steps.Root count={3}>
  <Steps.List>
    <Steps.Item index={0}>
      <Steps.Trigger>
        <Steps.Indicator />
        Step 1
      </Steps.Trigger>
      <Steps.Separator />
    </Steps.Item>
    <Steps.Item index={1}>
      <Steps.Trigger>
        <Steps.Indicator />
        Step 2
      </Steps.Trigger>
      <Steps.Separator />
    </Steps.Item>
    <Steps.Item index={2}>
      <Steps.Trigger>
        <Steps.Indicator />
        Step 3
      </Steps.Trigger>
    </Steps.Item>
  </Steps.List>
  <Steps.Content index={0}>Content for step 1</Steps.Content>
  <Steps.Content index={1}>Content for step 2</Steps.Content>
  <Steps.Content index={2}>Content for step 3</Steps.Content>
  <Steps.CompletedContent>All steps completed!</Steps.CompletedContent>
</Steps.Root>`,
		subComponents: [
			{
				name: "Steps.Root",
				description: "The root container component for the steps.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description:
							"Content to render inside the steps (composition API).",
					},
					count: {
						type: "number",
						default: "-",
						description: "The total number of steps.",
					},
					defaultStep: {
						type: "number",
						default: "0",
						description: "The initial step (0-indexed).",
					},
					step: {
						type: "number",
						default: "-",
						description: "The controlled current step.",
					},
					size: {
						type: '"sm" | "md" | "lg"',
						default: '"md"',
						description: "The size of the steps.",
					},
					variant: {
						type: '"subtle" | "solid"',
						default: '"solid"',
						description: "The visual variant.",
					},
					orientation: {
						type: '"horizontal" | "vertical"',
						default: '"horizontal"',
						description: "The orientation of the steps.",
					},
					colour: {
						type: "ColourName",
						default: '"gray"',
						description: "The colour palette.",
					},
					linear: {
						type: "boolean",
						default: "false",
						description:
							"Whether the steps must be completed in order.",
					},
					onStepChange: {
						type: "(details: { step: number }) => void",
						default: "-",
						description: "Callback when the step changes.",
					},
					onStepComplete: {
						type: "() => void",
						default: "-",
						description: "Callback when all steps are completed.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
					onPrefetch: {
						type: "(index: number) => void",
						default: "-",
						description:
							"Callback invoked when hovering over a step (for prefetching content). Receives the step index. Similar to Astro's link prefetching, this allows preloading data before selection.",
					},
				},
			},
			{
				name: "Steps.List",
				description: "Container for the step items.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The step items to render.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Steps.Item",
				description:
					"A single step item containing a trigger and separator.",
				props: {
					index: {
						type: "number",
						default: "-",
						description: "The index of this step (0-indexed).",
					},
					title: {
						type: "string",
						default: "-",
						description: "The title of this step.",
					},
					description: {
						type: "string",
						default: "-",
						description: "The description of this step.",
					},
					icon: {
						type: "Component<any>",
						default: "-",
						description:
							"Custom icon component to display instead of number.",
					},
					children: {
						type: "Snippet",
						default: "-",
						description: "Custom content for the step item.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Steps.Trigger",
				description: "The clickable trigger for a step.",
				props: {
					index: {
						type: "number",
						default: "-",
						description: "The index of this step.",
					},
					children: {
						type: "Snippet",
						default: "-",
						description: "The content of the trigger.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Steps.Indicator",
				description:
					"The visual indicator for a step (shows number or icon).",
				props: {
					index: {
						type: "number",
						default: "-",
						description: "The index of this step.",
					},
					current: {
						type: "boolean",
						default: "false",
						description: "Whether this step is the current step.",
					},
					completed: {
						type: "boolean",
						default: "false",
						description: "Whether this step is completed.",
					},
					children: {
						type: "Snippet",
						default: "-",
						description:
							"Content to render inside the indicator (defaults to step number).",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Steps.Separator",
				description: "The visual separator between steps.",
				props: {
					index: {
						type: "number",
						default: "-",
						description:
							"The index of the step this separator follows.",
					},
					last: {
						type: "boolean",
						default: "false",
						description:
							"Whether this is the last separator (should be hidden).",
					},
					completed: {
						type: "boolean",
						default: "false",
						description:
							"Whether the step this separator follows is completed.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Steps.Content",
				description: "The content panel for a specific step.",
				props: {
					index: {
						type: "number",
						default: "-",
						description:
							"The index of the step this content belongs to.",
					},
					children: {
						type: "Snippet",
						default: "-",
						description: "The content to render.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Steps.CompletedContent",
				description: "Content displayed when all steps are completed.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description:
							"The content to render when all steps are complete.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Steps.NextTrigger",
				description: "A button to navigate to the next step.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The content of the trigger.",
					},
					variant: {
						type: "ButtonVariants['variant']",
						default: '"outline"',
						description: "The button variant.",
					},
					size: {
						type: "ButtonVariants['size']",
						default: '"sm"',
						description: "The button size.",
					},
					colour: {
						type: "ColourName",
						default: '"gray"',
						description: "The colour theme.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Steps.PrevTrigger",
				description: "A button to navigate to the previous step.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The content of the trigger.",
					},
					variant: {
						type: "ButtonVariants['variant']",
						default: '"outline"',
						description: "The button variant.",
					},
					size: {
						type: "ButtonVariants['size']",
						default: '"sm"',
						description: "The button size.",
					},
					colour: {
						type: "ColourName",
						default: '"gray"',
						description: "The colour theme.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
		],
	},
	args: {
		count: 3,
		defaultStep: 1,
		size: "md",
		variant: "solid",
		orientation: "horizontal",
		colour: "gray",
		linear: false,
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic steps component with navigation.",
			},
		},
	},
	render: () =>
		({
			Component: StepsWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `size` prop to change the size of the steps.",
			},
		},
	},
	render: () =>
		({
			Component: StepsWrapper,
			props: { story: "sizes" },
		}) as any,
};

export const Variants: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `variant` prop to change the visual style.",
			},
		},
	},
	render: () =>
		({
			Component: StepsWrapper,
			props: { story: "variants" },
		}) as any,
};

export const Colours: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `colour` prop to change the colour theme.",
			},
		},
	},
	render: () =>
		({
			Component: StepsWrapper,
			props: { story: "colours" },
		}) as any,
};

export const Vertical: Story = {
	parameters: {
		docs: {
			description: {
				story: 'Use `orientation="vertical"` for vertical steps.',
			},
		},
	},
	render: () =>
		({
			Component: StepsWrapper,
			props: { story: "vertical" },
		}) as any,
};

export const Icon: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `icon` prop to display custom icons.",
			},
		},
	},
	render: () =>
		({
			Component: StepsWrapper,
			props: { story: "icon" },
		}) as any,
};

export const Description: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `description` prop to add descriptions to steps.",
			},
		},
	},
	render: () =>
		({
			Component: StepsWrapper,
			props: { story: "description" },
		}) as any,
};
