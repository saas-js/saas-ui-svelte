import type { Meta, StoryObj } from "@storybook/sveltekit";
import { CheckboxCard } from "$saas/components/checkbox-card";
import CheckboxCardWrapper from "../wrappers/components/CheckboxCard.svelte";
import {
	commonArgTypes,
	getControls,
	checkboxCardVariants,
	checkboxCardSizes,
} from "../utils";

const meta: Meta = {
	title: "components/Checkbox Card",
	component: CheckboxCard.Root,
	argTypes: {
		variant: {
			...commonArgTypes.variant,
			options: checkboxCardVariants,
			table: { defaultValue: { summary: "outline" } },
		},
		size: {
			...commonArgTypes.size,
			options: checkboxCardSizes,
			table: { defaultValue: { summary: "md" } },
		},
		colour: commonArgTypes.colour,
		disabled: commonArgTypes.disabled,
		checked: {
			control: "boolean",
			description: "Whether the checkbox card is checked.",
			table: { defaultValue: { summary: "false" } },
		},
		children: commonArgTypes.children,
		class: commonArgTypes.class,
	},
	parameters: {
		controls: getControls([
			"variant",
			"size",
			"colour",
			"disabled",
			"checked",
			"children",
			"class",
		]),
		docs: {
			description: {
				component:
					"A selectable card component that combines checkbox functionality with rich content display.",
			},
		},
		anatomy: `<script>
  import {
    CheckboxCard,
    CheckboxCardControl,
    CheckboxCardContent,
    CheckboxCardLabel,
    CheckboxCardDescription,
    CheckboxCardIndicator,
    CheckboxCardAddon,
  } from "@saas-ui/svelte/components/checkbox-card";
</script>

<CheckboxCard.Root>
  <CheckboxCardControl>
    <CheckboxCardContent>
      <CheckboxCardLabel>Option Label</CheckboxCardLabel>
      <CheckboxCardDescription>Option description</CheckboxCardDescription>
    </CheckboxCardContent>
    <CheckboxCardIndicator />
  </CheckboxCardControl>
  <CheckboxCardAddon>Additional info</CheckboxCardAddon>
</CheckboxCard.Root>`,
	},
	args: {
		variant: "outline",
		size: "md",
		colour: "indigo",
		disabled: false,
		checked: false,
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic checkbox card with label and description.",
			},
		},
	},
	render: () =>
		({
			Component: CheckboxCardWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Group: Story = {
	parameters: {
		docs: {
			description: {
				story: "Group of checkbox cards for selecting multiple options with shared state.",
			},
		},
	},
	render: () =>
		({
			Component: CheckboxCardWrapper,
			props: { story: "group" },
		}) as any,
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `size` prop to change the size of the checkbox card. Available sizes: `sm`, `md`, `lg`.",
			},
		},
	},
	render: () =>
		({
			Component: CheckboxCardWrapper,
			props: { story: "sizes" },
		}) as any,
};

export const Variants: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `variant` prop to change the visual style. Available variants: `subtle`, `surface`, `outline`.",
			},
		},
	},
	render: () =>
		({
			Component: CheckboxCardWrapper,
			props: { story: "variants" },
		}) as any,
};

export const Disabled: Story = {
	parameters: {
		docs: {
			description: {
				story: "Disabled checkbox card that prevents user interaction.",
			},
		},
	},
	render: () =>
		({
			Component: CheckboxCardWrapper,
			props: { story: "disabled" },
		}) as any,
};

export const WithAddon: Story = {
	parameters: {
		docs: {
			description: {
				story: "Checkbox card with an addon section for supplementary information like pricing.",
			},
		},
	},
	render: () =>
		({
			Component: CheckboxCardWrapper,
			props: { story: "withAddon" },
		}) as any,
};

export const WithIcon: Story = {
	parameters: {
		docs: {
			description: {
				story: "Checkbox cards with icons for visual identification of options.",
			},
		},
	},
	render: () =>
		({
			Component: CheckboxCardWrapper,
			props: { story: "withIcon" },
		}) as any,
};
