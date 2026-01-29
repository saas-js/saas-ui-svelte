<script lang="ts" module>
	// Wrapper components for complex Persona stories
	// These are imported by Persona.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { Stack } from "$saas/layout/stack";
	import { Persona } from "$saas/components/persona";

	const personaSizes = ["2xs", "xs", "sm", "md", "lg", "xl", "2xl"] as const;
	const avatarShapes = ["square", "rounded", "full"] as const;
	const presenceOptions = ["online", "offline", "busy", "dnd", "away"] as const;

	interface Props {
		story:
			| "basic"
			| "sizes"
			| "shapes"
			| "presence"
			| "outOfOffice"
			| "presenceRing"
			| "ring"
			| "avatarOnly";
	}

	let { story }: Props = $props();
</script>

{#if story === "basic"}
	<Persona.Root>
		<Persona.Avatar
			name="David Wilson"
			src="https://api.dicebear.com/9.x/shapes/svg?seed=jacob"
		/>
		<Persona.Details>
			<Persona.Label>David Wilson</Persona.Label>
			<Persona.SecondaryLabel>Software Engineer</Persona.SecondaryLabel>
		</Persona.Details>
	</Persona.Root>
{:else if story === "sizes"}
	<Stack gap={4}>
		{#each personaSizes as size}
			<Persona.Root {size}>
				<Persona.Avatar
					name="David Wilson"
					src="https://api.dicebear.com/9.x/shapes/svg?seed=jacob"
				/>
				<Persona.Details>
					<Persona.Label>David Wilson</Persona.Label>
					<Persona.SecondaryLabel>Software Engineer</Persona.SecondaryLabel>
				</Persona.Details>
			</Persona.Root>
		{/each}
	</Stack>
{:else if story === "shapes"}
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
{:else if story === "presence"}
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
{:else if story === "outOfOffice"}
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
{:else if story === "presenceRing"}
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
{:else if story === "ring"}
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
				<Persona.SecondaryLabel>Software Engineer</Persona.SecondaryLabel>
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
				<Persona.SecondaryLabel>Product Designer</Persona.SecondaryLabel>
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
				<Persona.SecondaryLabel>Engineering Manager</Persona.SecondaryLabel>
			</Persona.Details>
		</Persona.Root>
	</Stack>
{:else if story === "avatarOnly"}
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
{/if}
