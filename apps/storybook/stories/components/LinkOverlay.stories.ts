import type { Meta, StoryObj } from "@storybook/sveltekit";
import { LinkBox } from "$saas/components/link-overlay";
import LinkOverlayWrapper from "../wrappers/components/LinkOverlay.svelte";

const linkBoxAsOptions = ["div", "article", "section", "aside", "figure"] as const;

const meta: Meta = {
	title: "components/Link Overlay",
	component: LinkBox,
	argTypes: {
		as: {
			control: "select",
			options: linkBoxAsOptions,
			description: "The HTML element to render.",
			table: { defaultValue: { summary: "div" } },
		},
		class: {
			control: "text",
			description: "Additional CSS classes to apply.",
		},
	},
	parameters: {
		docs: {
			description: {
				component:
					"A component that makes an entire container clickable while allowing nested interactive elements.",
			},
		},
		anatomy: `<script>
  import { LinkBox, LinkOverlay } from "@saas-ui/svelte/components/link-overlay";
</script>

<LinkBox as="article">
  <h2>
    <LinkOverlay href="/post/1">
      Article Title
    </LinkOverlay>
  </h2>
  <p>Article description...</p>
  <a href="/author">Author Name</a>
</LinkBox>`,
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic `LinkOverlay` component that makes the entire container clickable.",
			},
		},
	},
	render: () =>
		({
			Component: LinkOverlayWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Article: Story = {
	parameters: {
		docs: {
			description: {
				story: "`LinkBox` as an `article` element with a nested inner link.",
			},
		},
	},
	render: () =>
		({
			Component: LinkOverlayWrapper,
			props: { story: "article" },
		}) as any,
};

export const Card: Story = {
	parameters: {
		docs: {
			description: {
				story: "`LinkBox` styled as a card component.",
			},
		},
	},
	render: () =>
		({
			Component: LinkOverlayWrapper,
			props: { story: "card" },
		}) as any,
};
