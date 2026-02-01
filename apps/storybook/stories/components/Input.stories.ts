import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Input } from "$saas/components/input";
import InputWrapper from "../wrappers/components/Input.svelte";
import {
	commonArgTypes,
	getControls,
	inputVariants,
	inputSizes,
	colours,
} from "../utils";

const meta: Meta = {
	title: "components/Input",
	component: Input,
	argTypes: {
		variant: {
			...commonArgTypes.variant,
			options: inputVariants,
		},
		size: {
			...commonArgTypes.size,
			options: inputSizes,
		},
		colour: {
			...commonArgTypes.colour,
			options: colours,
		},
		invalid: commonArgTypes.invalid,
		disabled: commonArgTypes.disabled,
		placeholder: {
			control: "text",
		},
		class: commonArgTypes.class,
	},
	parameters: {
		controls: getControls([
			"variant",
			"size",
			"colour",
			"invalid",
			"disabled",
			"placeholder",
			"class",
		]),
		docs: {
			description: {
				component:
					"A text input component with support for variants, sizes, addons, and element decorations.",
			},
		},
		anatomy: `<script>
  import {
    Input,
    InputAddon,
    InputGroup,
    InputElement,
  } from "@saas-ui/svelte/components/input";
</script>

<Input placeholder="Enter text..." variant="outline" size="md" />

<!-- With addons and elements -->
<Input.Group>
  <Input.Addon>https://</Input.Addon>
  <Input placeholder="example.com" />
  <Input.Element placement="right">
    <Icon as={SearchIcon} />
  </Input.Element>
</Input.Group>`,
	},
	args: {
		placeholder: "Enter text...",
		variant: "outline",
		size: "md",
		colour: "gray",
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic input with default styling.",
			},
		},
	},
	render: () =>
		({
			Component: InputWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Variants: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `variant` prop to change the visual style of the input. Available variants: `outline`, `subtle`, `flushed`.",
			},
		},
	},
	render: () =>
		({
			Component: InputWrapper,
			props: { story: "variants" },
		}) as any,
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `size` prop to change the size of the input. Available sizes: `xs`, `sm`, `md`, `lg`.",
			},
		},
	},
	render: () =>
		({
			Component: InputWrapper,
			props: { story: "sizes" },
		}) as any,
};

export const LeftElement: Story = {
	parameters: {
		docs: {
			description: {
				story: "Input with a left `Input.Element` (icon or text).",
			},
		},
	},
	render: () =>
		({
			Component: InputWrapper,
			props: { story: "leftElement" },
		}) as any,
};

export const LeftAndRightElement: Story = {
	parameters: {
		docs: {
			description: {
				story: "Input with both left and right `Input.Element` components.",
			},
		},
	},
	render: () =>
		({
			Component: InputWrapper,
			props: { story: "leftAndRightElement" },
		}) as any,
};

export const WithAddons: Story = {
	parameters: {
		docs: {
			description: {
				story: "Input with `Input.Addon` elements.",
			},
		},
	},
	render: () =>
		({
			Component: InputWrapper,
			props: { story: "withAddons" },
		}) as any,
};

export const Disabled: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `disabled` prop to disable the input.",
			},
		},
	},
	render: () =>
		({
			Component: InputWrapper,
			props: { story: "disabled" },
		}) as any,
};

export const Colours: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `colour` prop to change the colour of the input.",
			},
		},
	},
	render: () =>
		({
			Component: InputWrapper,
			props: { story: "colours" },
		}) as any,
};

export const InputWithPlaceholderStyle: Story = {
	parameters: {
		docs: {
			description: {
				story: "Input with custom `placeholder` styling.",
			},
		},
	},
	render: () =>
		({
			Component: InputWrapper,
			props: { story: "inputWithPlaceholderStyle" },
		}) as any,
};
