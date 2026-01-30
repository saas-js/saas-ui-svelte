import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Combobox } from "$saas/components/combobox";
import ComboboxWrapper from "../wrappers/components/Combobox.svelte";
import {
	commonArgTypes,
	getControls,
	comboboxSizes,
	comboboxVariants,
} from "../utils";

const meta: Meta = {
	title: "components/Combobox",
	component: Combobox,
	argTypes: {
		size: {
			control: "select",
			options: comboboxSizes,
			description: "The size of the combobox.",
			table: { defaultValue: { summary: "md" } },
		},
		variant: {
			control: "select",
			options: comboboxVariants,
			description: "The visual style of the input.",
			table: { defaultValue: { summary: "outline" } },
		},
		invalid: {
			control: "boolean",
			description: "Whether the combobox is in an invalid state.",
		},
		disabled: {
			control: "boolean",
			description: "Whether the combobox is disabled.",
		},
		colour: commonArgTypes.colour,
		class: commonArgTypes.class,
	},
	parameters: {
		controls: getControls([
			"size",
			"variant",
			"invalid",
			"disabled",
			"colour",
			"class",
		]),
		docs: {
			description: {
				component:
					"An autocomplete input that combines a text input with a dropdown list of suggestions.",
			},
		},
		anatomy: `<script>
  import {
    Combobox,
    ComboboxControl,
    ComboboxInput,
    ComboboxTrigger,
    ComboboxClearTrigger,
    ComboboxContent,
    ComboboxItem,
    ComboboxItemText,
    ComboboxItemIndicator,
    ComboboxItemGroup,
    ComboboxItemGroupLabel,
    ComboboxEmpty,
  } from "@saas-ui/svelte/components/combobox";
</script>

<Combobox.Root items={items}>
  <Combobox.Label>Select Item</Combobox.Label>
  <Combobox.Control>
    <Combobox.Input placeholder="Search..." />
    <Combobox.IndicatorGroup>
      <Combobox.ClearTrigger />
      <Combobox.Trigger />
    </Combobox.IndicatorGroup>
  </Combobox.Control>
  <Combobox.Content>
    <Combobox.Empty>No results found</Combobox.Empty>
    {#each items as item}
      <Combobox.Item item={item}>
        <Combobox.ItemText>{item.label}</Combobox.ItemText>
        <Combobox.ItemIndicator />
      </Combobox.Item>
    {/each}
  </Combobox.Content>
</Combobox.Root>`,
		usesPortal: true,
		subComponents: [
			{
				name: "Combobox.Root",
				description: "The root container component for the combobox.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The combobox content.",
					},
					collection: {
						type: "ListCollection<CollectionItem>",
						default: "-",
						description: "The collection of items to display.",
					},
					id: {
						type: "string",
						default: "-",
						description:
							"The unique identifier for the combobox. If not provided, a unique ID will be auto-generated.",
					},
					size: {
						type: '"xs" | "sm" | "md" | "lg"',
						default: '"md"',
						description: "The size of the combobox.",
					},
					variant: {
						type: '"outline" | "subtle" | "flushed"',
						default: '"outline"',
						description:
							"The visual variant of the combobox input.",
					},
					invalid: {
						type: "boolean",
						default: "false",
						description:
							"Whether the combobox is in an invalid state.",
					},
					colour: {
						type: "ColourName",
						default: '"gray"',
						description:
							"The colour palette for highlighted items.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Combobox.Label",
				description: "A label for the combobox component.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The label content.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Combobox.Control",
				description:
					"The control container that wraps the input and indicators.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description:
							"The control content (input, indicators, etc.).",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Combobox.Input",
				description: "The text input field for the combobox.",
				props: {
					placeholder: {
						type: "string",
						default: "-",
						description: "Placeholder text for the input.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Combobox.IndicatorGroup",
				description:
					"A container for grouping the clear trigger and dropdown trigger.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description:
							"The indicators (clear trigger, dropdown trigger, etc.).",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Combobox.Trigger",
				description:
					"The trigger button that opens the combobox dropdown.",
				props: {
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Combobox.ClearTrigger",
				description: "A button to clear the current selection.",
				props: {
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Combobox.Content",
				description:
					"The dropdown content container for combobox items.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The dropdown content.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Combobox.Item",
				description: "An individual selectable item in the dropdown.",
				props: {
					item: {
						type: "CollectionItem",
						default: "-",
						description: "The item data object.",
					},
					children: {
						type: "Snippet",
						default: "-",
						description: "The item content.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Combobox.ItemText",
				description: "The text content of a combobox item.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The item text content.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Combobox.ItemIndicator",
				description:
					"The check indicator shown when an item is selected.",
				props: {
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Combobox.ItemGroup",
				description:
					"A group of related combobox items with an optional label.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The group content.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Combobox.ItemGroupLabel",
				description: "A label for a group of combobox items.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The group label content.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Combobox.Empty",
				description:
					"Content displayed when no items match the filter.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The empty state content.",
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
		size: "md",
		variant: "outline",
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic combobox with default styling.",
			},
		},
	},
	render: () =>
		({
			Component: ComboboxWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `size` prop to change the size of the combobox. Available sizes: `xs`, `sm`, `md`, `lg`.",
			},
		},
	},
	render: () =>
		({
			Component: ComboboxWrapper,
			props: { story: "sizes" },
		}) as any,
};

export const Variants: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `variant` prop to change the visual style. Available variants: `outline`, `subtle`, `flushed`.",
			},
		},
	},
	render: () =>
		({
			Component: ComboboxWrapper,
			props: { story: "variants" },
		}) as any,
};

export const Multiple: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `multiple` prop to allow selecting multiple items.",
			},
		},
	},
	render: () =>
		({
			Component: ComboboxWrapper,
			props: { story: "multiple" },
		}) as any,
};

export const AsyncLoading: Story = {
	parameters: {
		docs: {
			description: {
				story: "Combobox with async data loading.",
			},
		},
	},
	render: () =>
		({
			Component: ComboboxWrapper,
			props: { story: "asyncLoading" },
		}) as any,
};

export const HighlightMatch: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `highlightMatch` prop to highlight matching text.",
			},
		},
	},
	render: () =>
		({
			Component: ComboboxWrapper,
			props: { story: "highlightMatch" },
		}) as any,
};

export const OpenOnClick: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `openOnClick` prop to open the dropdown on click.",
			},
		},
	},
	render: () =>
		({
			Component: ComboboxWrapper,
			props: { story: "openOnClick" },
		}) as any,
};

export const Field: Story = {
	parameters: {
		docs: {
			description: {
				story: "Combobox inside a `Field` component.",
			},
		},
	},
	render: () =>
		({
			Component: ComboboxWrapper,
			props: { story: "field" },
		}) as any,
};

export const Disabled: Story = {
	parameters: {
		docs: {
			description: {
				story: "Disabled combobox.",
			},
		},
	},
	render: () =>
		({
			Component: ComboboxWrapper,
			props: { story: "disabled" },
		}) as any,
};

export const DisabledItem: Story = {
	parameters: {
		docs: {
			description: {
				story: "Combobox with disabled items.",
			},
		},
	},
	render: () =>
		({
			Component: ComboboxWrapper,
			props: { story: "disabledItem" },
		}) as any,
};

export const InputGroup: Story = {
	parameters: {
		docs: {
			description: {
				story: "Combobox with a start icon.",
			},
		},
	},
	render: () =>
		({
			Component: ComboboxWrapper,
			props: { story: "inputGroup" },
		}) as any,
};

export const Invalid: Story = {
	parameters: {
		docs: {
			description: {
				story: "Combobox in an invalid state.",
			},
		},
	},
	render: () =>
		({
			Component: ComboboxWrapper,
			props: { story: "invalid" },
		}) as any,
};

export const ControlledValue: Story = {
	parameters: {
		docs: {
			description: {
				story: "Controlled combobox value.",
			},
		},
	},
	render: () =>
		({
			Component: ComboboxWrapper,
			props: { story: "controlledValue" },
		}) as any,
};

export const ControlledOpen: Story = {
	parameters: {
		docs: {
			description: {
				story: "Controlled combobox open state.",
			},
		},
	},
	render: () =>
		({
			Component: ComboboxWrapper,
			props: { story: "controlledOpen" },
		}) as any,
};

export const AllowCustomValue: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `allowCustomValue` prop to allow custom values.",
			},
		},
	},
	render: () =>
		({
			Component: ComboboxWrapper,
			props: { story: "allowCustomValue" },
		}) as any,
};

export const CustomObjects: Story = {
	parameters: {
		docs: {
			description: {
				story: "Combobox with custom objects and item prefix.",
			},
		},
	},
	render: () =>
		({
			Component: ComboboxWrapper,
			props: { story: "customObjects" },
		}) as any,
};

export const MinCharacters: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `minCharacters` prop to require minimum characters.",
			},
		},
	},
	render: () =>
		({
			Component: ComboboxWrapper,
			props: { story: "minCharacters" },
		}) as any,
};

export const Limit: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `limit` prop to limit the number of items shown.",
			},
		},
	},
	render: () =>
		({
			Component: ComboboxWrapper,
			props: { story: "limit" },
		}) as any,
};

export const Virtualised: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `virtualised` prop for better performance with large lists.",
			},
		},
	},
	render: () =>
		({
			Component: ComboboxWrapper,
			props: { story: "virtualised" },
		}) as any,
};

export const Colours: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `colour` prop to change the colour scheme.",
			},
		},
	},
	render: () =>
		({
			Component: ComboboxWrapper,
			props: { story: "colours" },
		}) as any,
};

export const CustomFilter: Story = {
	parameters: {
		docs: {
			description: {
				story: "Combobox with custom filter function.",
			},
		},
	},
	render: () =>
		({
			Component: ComboboxWrapper,
			props: { story: "customFilter" },
		}) as any,
};

export const Links: Story = {
	parameters: {
		docs: {
			description: {
				story: "Combobox items with links.",
			},
		},
	},
	render: () =>
		({
			Component: ComboboxWrapper,
			props: { story: "links" },
		}) as any,
};

export const InPopover: Story = {
	parameters: {
		docs: {
			description: {
				story: "Combobox inside a `Popover`.",
			},
		},
	},
	render: () =>
		({
			Component: ComboboxWrapper,
			props: { story: "inPopover" },
		}) as any,
};
