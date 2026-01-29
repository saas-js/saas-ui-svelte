import type { Meta, StoryObj } from "@storybook/sveltekit";
import { Persona } from "$saas/components/persona";
import PersonaWrapper from "../wrappers/components/Persona.svelte";

const personaSizes = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const;
const personaVariants = ["badge", "ring"] as const;
const presenceOptions = ["online", "offline", "busy", "dnd", "away"] as const;

const meta: Meta = {
	title: "components/Persona",
	component: Persona.Root,
	argTypes: {
		size: {
			control: "select",
			options: personaSizes,
			description: "The size of the component.",
			table: { defaultValue: { summary: "md" } },
		},
		variant: {
			control: "select",
			options: personaVariants,
			description: "The variant of the presence indicator.",
			table: { defaultValue: { summary: "badge" } },
		},
		presence: {
			control: "select",
			options: presenceOptions,
			description: "The presence status.",
		},
		outOfOffice: {
			control: "boolean",
			description: "Whether the person is out of office.",
			table: { defaultValue: { summary: "false" } },
		},
		children: {
			control: false,
			description: "The content to be rendered inside the component.",
			table: { type: { summary: "Snippet" } },
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
					"A component for displaying user identity information including avatar, name, presence status, and additional details.",
			},
		},
		anatomy: `<script>
  import {
    Persona,
    PersonaAvatar,
    PersonaPresenceBadge,
    PersonaDetails,
    PersonaLabel,
    PersonaSecondaryLabel,
    PersonaTertiaryLabel,
  } from "@saas-ui/svelte/components/persona";
</script>

<Persona.Root>
  <PersonaAvatar src="/avatar.jpg" name="John Doe" />
  <PersonaPresenceBadge presence="online" />
  <PersonaDetails>
    <PersonaLabel>John Doe</PersonaLabel>
    <PersonaSecondaryLabel>Software Engineer</PersonaSecondaryLabel>
    <PersonaTertiaryLabel>San Francisco, CA</PersonaTertiaryLabel>
  </PersonaDetails>
</Persona.Root>`,
	},
	args: {
		size: "md",
		variant: "badge",
	},
};

export default meta;
type Story = StoryObj;

export const Basic: Story = {
	parameters: {
		docs: {
			description: {
				story: "Basic persona with avatar and user details.",
			},
		},
	},
	render: () =>
		({
			Component: PersonaWrapper,
			props: { story: "basic" },
		}) as any,
};

export const Sizes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Persona in different sizes. Available sizes: `2xs`, `xs`, `sm`, `md`, `lg`, `xl`, `2xl`.",
			},
		},
	},
	render: () =>
		({
			Component: PersonaWrapper,
			props: { story: "sizes" },
		}) as any,
};

export const Shapes: Story = {
	parameters: {
		docs: {
			description: {
				story: "Persona with different avatar shapes: rounded, square, and full circle.",
			},
		},
	},
	render: () =>
		({
			Component: PersonaWrapper,
			props: { story: "shapes" },
		}) as any,
};

export const Presence: Story = {
	parameters: {
		docs: {
			description: {
				story: "Persona with presence badge indicator showing `online`, `offline`, `busy`, `dnd`, or `away` status.",
			},
		},
	},
	render: () =>
		({
			Component: PersonaWrapper,
			props: { story: "presence" },
		}) as any,
};

export const PresenceRing: Story = {
	parameters: {
		docs: {
			description: {
				story: "Persona with ring-style presence indicator using `variant=\"ring\"`.",
			},
		},
	},
	render: () =>
		({
			Component: PersonaWrapper,
			props: { story: "presenceRing" },
		}) as any,
};

export const OutOfOffice: Story = {
	parameters: {
		docs: {
			description: {
				story: "Persona showing out of office status using the `outOfOffice` prop.",
			},
		},
	},
	render: () =>
		({
			Component: PersonaWrapper,
			props: { story: "outOfOffice" },
		}) as any,
};

export const WithRing: Story = {
	parameters: {
		docs: {
			description: {
				story: "Persona with a coloured ring around the avatar for visual emphasis.",
			},
		},
	},
	render: () =>
		({
			Component: PersonaWrapper,
			props: { story: "ring" },
		}) as any,
};

export const AvatarOnly: Story = {
	parameters: {
		docs: {
			description: {
				story: "Avatar-only personas without the details section for compact displays.",
			},
		},
	},
	render: () =>
		({
			Component: PersonaWrapper,
			props: { story: "avatarOnly" },
		}) as any,
};
