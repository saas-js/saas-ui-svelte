import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Select } from "$saas/components/select";
import SelectWrapper from "../wrappers/components/Select.svelte";

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

const selectSizes = ["xs", "sm", "md", "lg"] as const;
const selectVariants = ["outline", "subtle"] as const;

const meta: Meta = {
	title: "components/Select",
	component: Select.Root,
	argTypes: {
		size: {
			control: "select",
			options: selectSizes,
			description: "The size of the component.",
			table: { defaultValue: { summary: "md" } },
		},
		variant: {
			control: "select",
			options: selectVariants,
			description: "The variant of the component.",
			table: { defaultValue: { summary: "outline" } },
		},
		colour: {
			control: "select",
			options: colours,
			description: "The colour of the component.",
			table: { defaultValue: { summary: "indigo" } },
		},
		disabled: {
			control: "boolean",
			description: "Whether the select is disabled.",
			table: { defaultValue: { summary: "false" } },
		},
		multiple: {
			control: "boolean",
			description: "Whether multiple items can be selected.",
			table: { defaultValue: { summary: "false" } },
		},
		closeOnSelect: {
			control: "boolean",
			description: "Whether to close the select when an item is selected.",
			table: { defaultValue: { summary: "true" } },
		},
		loopFocus: {
			control: "boolean",
			description: "Whether to loop keyboard navigation.",
			table: { defaultValue: { summary: "false" } },
		},
	},
	parameters: {
		docs: {
			description: {
				component:
					"A dropdown component that allows users to select one or more options from a list.",
			},
		},
		anatomy: `<script>
  import {
    Select,
    SelectRoot,
    SelectTrigger,
    SelectValue,
    SelectAvatarValue,
    SelectContent,
    SelectItem,
    SelectItemGroup,
    SelectLabel,
    SelectClearTrigger,
    SelectIndicator,
  } from "@saas-ui/svelte/components/select";
</script>

<Select.Root items={frameworks}>
  <Select.Label>Framework</Select.Label>
  <Select.Trigger>
    <Select.Value placeholder="Select a framework" />
  </Select.Trigger>
  <Select.Content>
    {#each frameworks as item}
      <Select.Item {item}>
        {item.label}
        <Select.Indicator />
      </Select.Item>
    {/each}
  </Select.Content>
</Select.Root>`,
		usesPortal: true,
		subComponents: [
			{
				name: "Select.Root",
				description: "The root container component for the select.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The select content.",
					},
					collection: {
						type: "ListCollection<T>",
						default: "-",
						description: "The collection of items to display.",
					},
					id: {
						type: "string",
						default: "-",
						description:
							"The unique identifier for the select. If not provided, a unique ID will be auto-generated.",
					},
					size: {
						type: '"xs" | "sm" | "md" | "lg"',
						default: '"md"',
						description: "The size of the select.",
					},
					variant: {
						type: '"outline" | "subtle"',
						default: '"outline"',
						description: "The visual variant of the select trigger.",
					},
					colour: {
						type: "ColourName",
						default: '"indigo"',
						description: "The colour palette for highlighted items.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Select.Trigger",
				description:
					"The trigger button that opens the select dropdown.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description:
							"The trigger content. If not provided, renders value and indicator.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
					clearable: {
						type: "boolean",
						default: "false",
						description:
							"Whether to show a clear button when a value is selected.",
					},
				},
			},
			{
				name: "Select.Content",
				description: "The dropdown content container for select items.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The select content.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
					portal: {
						type: "boolean",
						default: "true",
						description:
							"Whether to render the select content in a portal.",
					},
				},
			},
			{
				name: "Select.Item",
				description: "An individual selectable item in the dropdown.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The select item content.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
					showIndicator: {
						type: "boolean",
						default: "true",
						description:
							"Whether to show the check indicator when selected.",
					},
				},
			},
			{
				name: "Select.ItemGroup",
				description:
					"A group of related select items with an optional label.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "The group content (items).",
					},
					label: {
						type: "string",
						default: "-",
						description: "The group label text.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Select.Label",
				description: "A label for the select component.",
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
				name: "Select.Value",
				description:
					"Displays the currently selected value in the trigger.",
				props: {
					children: {
						type: "Snippet<[items: any[]]>",
						default: "-",
						description:
							"Custom render snippet for the selected value. Receives the selected items array.",
					},
					prefix: {
						type: "Snippet<[items: any[]]>",
						default: "-",
						description:
							"Prefix snippet rendered before the value text. Receives the selected items array.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
					placeholder: {
						type: "string",
						default: '"Select an option"',
						description: "Placeholder text when no value is selected.",
					},
					valueKey: {
						type: "string",
						default: "-",
						description:
							"Property key to get the display value from the selected item. If not set, uses the default item string representation.",
					},
				},
			},
			{
				name: "Select.Indicator",
				description:
					"The dropdown indicator icon (typically a caret/chevron).",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "Custom icon for the indicator.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Select.ClearTrigger",
				description: "A button to clear the current selection.",
				props: {
					children: {
						type: "Snippet",
						default: "-",
						description: "Custom icon or content for the clear trigger.",
					},
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
				},
			},
			{
				name: "Select.AvatarValue",
				description:
					"Displays the selected value with an avatar image.",
				props: {
					class: {
						type: "string",
						default: "-",
						description: "Additional CSS classes to apply.",
					},
					placeholder: {
						type: "string",
						default: '"Select an option"',
						description: "Placeholder text when no value is selected.",
					},
					avatarKey: {
						type: "string",
						default: '"avatar"',
						description:
							"Property key to get the avatar src from the selected item.",
					},
					nameKey: {
						type: "string",
						default: '"name"',
						description:
							"Property key to get the name/label from the selected item.",
					},
					avatarSize: {
						type: "number",
						default: "20",
						description: "Size of the avatar in pixels.",
					},
				},
			},
		],
	},
	args: {
		size: "sm",
		variant: "outline",
		colour: "indigo",
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic select with default styling.",
			},
		},
	},
	render: () =>
		({
			Component: SelectWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `size` prop to change the size of the select.",
			},
		},
	},
	render: () =>
		({
			Component: SelectWrapper,
			props: { story: "sizes" },
		}) as any,
};

export const Variants: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `variant` prop to change the visual style of the select.",
			},
		},
	},
	render: () =>
		({
			Component: SelectWrapper,
			props: { story: "variants" },
		}) as any,
};

export const OptionGroup: Story = {
	parameters: {
		docs: {
			description: {
				story: "Group options using `Select.ItemGroup` for better organization.",
			},
		},
	},
	render: () =>
		({
			Component: SelectWrapper,
			props: { story: "optionGroup" },
		}) as any,
};

export const Disabled: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `disabled` prop to disable the select.",
			},
		},
	},
	render: () =>
		({
			Component: SelectWrapper,
			props: { story: "disabled" },
		}) as any,
};

export const Invalid: Story = {
	parameters: {
		docs: {
			description: {
				story: "Wrap in `Field.Root` with `invalid` prop to show error state.",
			},
		},
	},
	render: () =>
		({
			Component: SelectWrapper,
			props: { story: "invalid" },
		}) as any,
};

export const AvatarSelect: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use `Select.AvatarValue` to display avatars in the selected value.",
			},
		},
	},
	render: () =>
		({
			Component: SelectWrapper,
			props: { story: "avatarSelect" },
		}) as any,
};

export const ClearTrigger: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use `clearable` prop on trigger to allow clearing the selection.",
			},
		},
	},
	render: () =>
		({
			Component: SelectWrapper,
			props: { story: "clearTrigger" },
		}) as any,
};

export const Overflow: Story = {
	parameters: {
		docs: {
			description: {
				story: "Long content is automatically scrollable.",
			},
		},
	},
	render: () =>
		({
			Component: SelectWrapper,
			props: { story: "overflow" },
		}) as any,
};

export const Positioning: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `positioning` prop to control dropdown placement.",
			},
		},
	},
	render: () =>
		({
			Component: SelectWrapper,
			props: { story: "positioning" },
		}) as any,
};

export const InPopover: Story = {
	parameters: {
		docs: {
			description: {
				story: "Select can be used inside a Popover component.",
			},
		},
	},
	render: () =>
		({
			Component: SelectWrapper,
			props: { story: "inPopover" },
		}) as any,
};

export const Colours: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `colour` prop to change the colour of the select.",
			},
		},
	},
	render: () =>
		({
			Component: SelectWrapper,
			props: { story: "colours" },
		}) as any,
};
