import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Avatar } from "$saas/components/avatar";
import AvatarWrapper from "../wrappers/components/Avatar.svelte";
import {
	commonArgTypes,
	getControls,
	avatarSizes,
	avatarShapes,
	avatarVariants,
} from "../utils";

const meta: Meta = {
	title: "components/Avatar",
	component: Avatar,
	argTypes: {
		variant: {
			...commonArgTypes.variant,
			options: avatarVariants,
		},
		colour: commonArgTypes.colour,
		size: {
			...commonArgTypes.size,
			options: avatarSizes,
		},
		shape: {
			control: "select",
			options: avatarShapes,
			description: "The shape of the avatar.",
			table: { defaultValue: { summary: "full" } },
		},
		ring: {
			control: "boolean",
			description: "Whether to show a ring around the avatar.",
			table: { defaultValue: { summary: "false" } },
		},
		src: {
			control: "text",
			description: "The source for the avatar image.",
			table: { defaultValue: { summary: "" } },
		},
		name: {
			control: "text",
			description: "The name to use for alt text and fallback initials.",
			table: { defaultValue: { summary: "" } },
		},
		children: commonArgTypes.children,
		class: commonArgTypes.class,
	},
	parameters: {
		controls: getControls([
			"src",
			"name",
			"size",
			"variant",
			"shape",
			"colour",
			"borderless",
			"ring",
			"children",
			"class",
		]),
		docs: {
			description: {
				component:
					"A graphical representation of a user or entity, typically displaying an image or initials as a fallback.",
			},
		},
		anatomy: `<script>
  import { Avatar } from "@saas-ui/svelte/components/avatar";
</script>

<!-- Avatar with image -->
<Avatar src="https://example.com/avatar.jpg" name="John Doe" />

<!-- Avatar with fallback initials -->
<Avatar name="John Doe" />

<!-- Avatar group -->
<Avatar.Group>
  <Avatar src="user1.jpg" name="User 1" />
  <Avatar src="user2.jpg" name="User 2" />
  <Avatar src="user3.jpg" name="User 3" />
</Avatar.Group>`,
		subComponents: [
			{
				name: "Avatar",
				description: "The main avatar component.",
				props: {
					src: {
						type: "string",
						description: "The image source of the avatar.",
					},
					name: {
						type: "string",
						description:
							"The name of the person in the avatar. Used for the alt text and fallback initials.",
					},
					size: {
						type: '"2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full"',
						default: '"md"',
						description: "The size of the avatar.",
					},
					variant: {
						type: '"solid" | "subtle" | "outline"',
						default: '"solid"',
						description: "The visual style of the avatar.",
					},
					shape: {
						type: '"square" | "rounded" | "full"',
						default: '"full"',
						description: "The shape of the avatar.",
					},
					colour: {
						type: "ColourName",
						default: '"gray"',
						description: "The colour palette of the avatar.",
					},
					ring: {
						type: "boolean",
						default: "false",
						description:
							"Whether to show a ring around the avatar using the colour palette.",
					},
					fallback: {
						type: "string | Snippet",
						description:
							'Custom fallback content. Can be a string (like "+3") or a Snippet.',
					},
					class: {
						type: "string",
						description: "Additional CSS classes to apply.",
					},
					style: {
						type: "string",
						description:
							"Inline styles to apply via the style attribute.",
					},
					children: {
						type: "Snippet",
						description:
							"Any children to render (rarely used directly, usually fallback).",
					},
				},
			},
			{
				name: "Avatar.Group",
				description:
					"A container for grouping multiple avatars together in a stacked layout.",
				props: {
					size: {
						type: '"2xs" | "xs" | "sm" | "md" | "lg" | "xl" | "2xl" | "full"',
						default: '"md"',
						description: "The size of the avatars in the group.",
					},
					stacking: {
						type: '"first-on-top" | "last-on-top"',
						default: '"last-on-top"',
						description: "The stacking order of the avatars.",
					},
					spaceX: {
						type: '"1" | "2" | "3" | "4"',
						description: "The spacing between avatars.",
					},
					borderless: {
						type: "boolean",
						default: "false",
						description:
							"Whether the avatars should have a border.",
					},
					class: {
						type: "string",
						description: "Additional CSS classes.",
					},
					style: {
						type: "string",
						description: "Inline styles.",
					},
					children: {
						type: "Snippet",
						required: true,
						description: "The avatars to render in the group.",
					},
				},
			},
		],
	},
	args: {
		size: "md",
		variant: "solid",
		shape: "full",
		colour: "gray",
		name: "David Wilson",
		src: "https://api.dicebear.com/9.x/shapes/svg?seed=jacob",
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic avatar displaying an image with default styling.",
			},
		},
	},
	render: () =>
		({
			Component: AvatarWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `size` prop to change the size of the avatar. Available sizes: `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`.",
			},
		},
	},
	render: () =>
		({
			Component: AvatarWrapper,
			props: { story: "sizes" },
		}) as any,
};

export const Shape: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `shape` prop to change the shape of the avatar. Available shapes: `square`, `rounded`, `full`.",
			},
		},
	},
	render: () =>
		({
			Component: AvatarWrapper,
			props: { story: "shape" },
		}) as any,
};

export const Fallback: Story = {
	parameters: {
		docs: {
			description: {
				story: "Avatar with fallback initials or icon when no image is provided or fails to load.",
			},
		},
	},
	render: () =>
		({
			Component: AvatarWrapper,
			props: { story: "fallback" },
		}) as any,
};

export const WithRing: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `ring` prop to show a ring around the avatar, useful for indicating status or selection.",
			},
		},
	},
	render: () =>
		({
			Component: AvatarWrapper,
			props: { story: "withRing" },
		}) as any,
};

export const Group: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use `Avatar.Group` to display multiple avatars together in a stacked layout.",
			},
		},
	},
	render: () =>
		({
			Component: AvatarWrapper,
			props: { story: "group" },
		}) as any,
};

export const Stacking: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `stacking` prop with `first-on-top` or `last-on-top` to control avatar stacking order.",
			},
		},
	},
	render: () =>
		({
			Component: AvatarWrapper,
			props: { story: "stacking" },
		}) as any,
};

export const Variants: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `variant` prop to change the visual style. Available variants: `solid`, `subtle`, `outline`.",
			},
		},
	},
	render: () =>
		({
			Component: AvatarWrapper,
			props: { story: "variants" },
		}) as any,
};

export const Colours: Story = {
	parameters: {
		docs: {
			description: {
				story: "Use the `colour` prop to change the colour scheme. Supports all standard colour palettes.",
			},
		},
	},
	render: () =>
		({
			Component: AvatarWrapper,
			props: { story: "colours" },
		}) as any,
};
