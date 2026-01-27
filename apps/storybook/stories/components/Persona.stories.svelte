<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Stack, VStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import { Persona } from "$saas/components/persona";
	import {
		commonArgTypes,
		getControls,
		personaSizes,
		personaVariants,
		avatarShapes,
		presenceOptions,
	} from "../utils";

	const { Story } = defineMeta({
		title: "components/Persona",
		component: Persona.Root,
		argTypes: {
			size: {
				...commonArgTypes.size,
				options: personaSizes,
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
			children: commonArgTypes.children,
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls([
				"size",
				"variant",
				"presence",
				"outOfOffice",
				"children",
				"class",
			]),
		},
		args: {
			size: "md",
			variant: "badge",
		},
	});
</script>

{#snippet basicStory(args: any)}
	<Persona.Root {...args}>
		<Persona.Avatar
			name="David Wilson"
			src="https://api.dicebear.com/9.x/shapes/svg?seed=jacob"
		/>
		<Persona.Details>
			<Persona.Label>David Wilson</Persona.Label>
			<Persona.SecondaryLabel>Software Engineer</Persona.SecondaryLabel>
		</Persona.Details>
	</Persona.Root>
{/snippet}

{#snippet sizesStory()}
	<Stack gap={4}>
		{#each personaSizes as size}
			<Persona.Root {size}>
				<Persona.Avatar
					name="David Wilson"
					src="https://api.dicebear.com/9.x/shapes/svg?seed=jacob"
				/>
				<Persona.Details>
					<Persona.Label>David Wilson</Persona.Label>
					<Persona.SecondaryLabel
						>Software Engineer</Persona.SecondaryLabel
					>
				</Persona.Details>
			</Persona.Root>
		{/each}
	</Stack>
{/snippet}

{#snippet shapesStory()}
	<Stack gap={4}>
		{#each avatarShapes as shape}
			<Persona.Root>
				<Persona.Avatar
					name="David Wilson"
					src="https://api.dicebear.com/9.x/shapes/svg?seed=jacob"
					{shape}
				/>
				<Persona.Details>
					<Persona.Label>David Wilson</Persona.Label>
					<Persona.SecondaryLabel>{shape}</Persona.SecondaryLabel>
				</Persona.Details>
			</Persona.Root>
		{/each}
	</Stack>
{/snippet}

{#snippet presenceStory()}
	<Stack gap={4}>
		{#each presenceOptions as presence}
			<Persona.Root size="lg" {presence}>
				<Persona.Avatar
					name="David Wilson"
					src="https://api.dicebear.com/9.x/shapes/svg?seed=jacob"
				>
					<Persona.PresenceBadge />
				</Persona.Avatar>
				<Persona.Details>
					<Persona.Label>David Wilson</Persona.Label>
					<Persona.SecondaryLabel>{presence}</Persona.SecondaryLabel>
				</Persona.Details>
			</Persona.Root>
		{/each}
	</Stack>
{/snippet}

{#snippet outOfOfficeStory()}
	<Persona.Root size="lg" outOfOffice presence="away">
		<Persona.Avatar
			name="David Wilson"
			src="https://api.dicebear.com/9.x/shapes/svg?seed=jacob"
		>
			<Persona.PresenceBadge />
		</Persona.Avatar>
		<Persona.Details>
			<Persona.Label>David Wilson</Persona.Label>
			<Persona.SecondaryLabel>Software Engineer</Persona.SecondaryLabel>
			<Persona.TertiaryLabel>On a road trip</Persona.TertiaryLabel>
		</Persona.Details>
	</Persona.Root>
{/snippet}

{#snippet presenceRingStory()}
	<Stack gap={4}>
		{#each presenceOptions as presence}
			<Persona.Root size="lg" variant="ring" {presence}>
				<Persona.Avatar
					name="David Wilson"
					src="https://api.dicebear.com/9.x/shapes/svg?seed=jacob"
				>
					<Persona.PresenceBadge />
				</Persona.Avatar>
				<Persona.Details>
					<Persona.Label>David Wilson</Persona.Label>
					<Persona.SecondaryLabel>{presence}</Persona.SecondaryLabel>
				</Persona.Details>
			</Persona.Root>
		{/each}
	</Stack>
{/snippet}

{#snippet ringStory()}
	<Stack gap={4}>
		<Persona.Root size="lg">
			<Persona.Avatar
				name="David Wilson"
				src="https://api.dicebear.com/9.x/shapes/svg?seed=jacob"
				colour="pink"
				ring
			>
				<Persona.PresenceBadge presence="online" />
			</Persona.Avatar>
			<Persona.Details>
				<Persona.Label>David Wilson</Persona.Label>
				<Persona.SecondaryLabel
					>Software Engineer</Persona.SecondaryLabel
				>
			</Persona.Details>
		</Persona.Root>

		<Persona.Root size="lg">
			<Persona.Avatar
				name="Marcus Chen"
				src="https://api.dicebear.com/9.x/shapes/svg?seed=marcus"
				colour="green"
				ring
			>
				<Persona.PresenceBadge presence="busy" />
			</Persona.Avatar>
			<Persona.Details>
				<Persona.Label>Marcus Chen</Persona.Label>
				<Persona.SecondaryLabel>Product Designer</Persona.SecondaryLabel
				>
			</Persona.Details>
		</Persona.Root>

		<Persona.Root size="lg">
			<Persona.Avatar
				name="Sarah Johnson"
				src="https://api.dicebear.com/9.x/shapes/svg?seed=sarah"
				colour="blue"
				ring
			>
				<Persona.PresenceBadge presence="away" />
			</Persona.Avatar>
			<Persona.Details>
				<Persona.Label>Sarah Johnson</Persona.Label>
				<Persona.SecondaryLabel
					>Engineering Manager</Persona.SecondaryLabel
				>
			</Persona.Details>
		</Persona.Root>
	</Stack>
{/snippet}

{#snippet avatarOnlyStory()}
	<Stack gap={4} class="flex-row items-center">
		<Persona.Root size="md">
			<Persona.Avatar
				name="David Wilson"
				src="https://api.dicebear.com/9.x/shapes/svg?seed=jacob"
			>
				<Persona.PresenceBadge presence="online" />
			</Persona.Avatar>
		</Persona.Root>

		<Persona.Root size="lg">
			<Persona.Avatar
				name="Marcus Chen"
				src="https://api.dicebear.com/9.x/shapes/svg?seed=marcus"
			>
				<Persona.PresenceBadge presence="busy" />
			</Persona.Avatar>
		</Persona.Root>

		<Persona.Root size="xl">
			<Persona.Avatar
				name="Sarah Johnson"
				src="https://api.dicebear.com/9.x/shapes/svg?seed=sarah"
			>
				<Persona.PresenceBadge presence="away" />
			</Persona.Avatar>
		</Persona.Root>
	</Stack>
{/snippet}

<Story name="Basic" template={basicStory} />
<Story name="Sizes" template={sizesStory} />
<Story name="Shapes" template={shapesStory} />
<Story name="Presence" template={presenceStory} />
<Story name="Presence Ring" template={presenceRingStory} />
<Story name="Out of Office" template={outOfOfficeStory} />
<Story name="With Ring" template={ringStory} />
<Story name="Avatar Only" template={avatarOnlyStory} />
