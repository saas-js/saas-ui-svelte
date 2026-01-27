<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { HoverCard } from "$saas/components/hover-card";
	import { Avatar } from "$saas/components/avatar";
	import { Text } from "$saas/typography/text";
	import { Link } from "$saas/components/link";
	import { VStack, HStack } from "$saas/layout/stack";
	import { commonArgTypes, getControls, hoverCardSizes } from "../utils";

	const { Story } = defineMeta({
		title: "components/Hover Card",
		component: HoverCard.Root,
		argTypes: {
			size: {
				...commonArgTypes.size,
				options: hoverCardSizes,
				description: "The size of the hover card.",
				table: { defaultValue: { summary: "md" } },
			},
			openDelay: {
				control: "number",
				description:
					"The duration from when the mouse enters the trigger until the hover card opens.",
				table: { defaultValue: { summary: "700" } },
			},
			closeDelay: {
				control: "number",
				description:
					"The duration from when the mouse leaves the trigger or content until the hover card closes.",
				table: { defaultValue: { summary: "300" } },
			},
			lazyMount: {
				control: "boolean",
				description: "Whether to enable lazy mounting.",
				table: { defaultValue: { summary: "false" } },
			},
			unmountOnExit: {
				control: "boolean",
				description: "Whether to unmount on exit.",
				table: { defaultValue: { summary: "false" } },
			},
		},
		parameters: {
			controls: getControls([
				"size",
				"openDelay",
				"closeDelay",
				"lazyMount",
				"unmountOnExit",
			]),
		},
		args: {
			size: "sm",
			openDelay: 700,
			closeDelay: 300,
		},
	});
</script>

<script lang="ts">
	let controlledOpen = $state(false);
</script>

{#snippet basicStory(args: any)}
	<HoverCard.Root {...args}>
		Follow
		<HoverCard.Trigger>
			<Link href="#" colour="accent">@saas_js</Link>
		</HoverCard.Trigger>
		for updates
		<HoverCard.Content>
			<HoverCard.Arrow />
			<HStack gap={4}>
				<Avatar
					src="https://pbs.twimg.com/profile_images/1542114663420383235/Otz6CbhI_400x400.png"
					name="Saas UI"
				/>
				<VStack gap={0}>
					<Text size="sm" class="font-semibold">Saas UI</Text>
					<Text size="xs" class="text-fg-muted mb-2">@saas_js</Text>
					<Text size="sm" class="text-fg-muted">
						Design system and React components for startups.
					</Text>
				</VStack>
			</HStack>
		</HoverCard.Content>
	</HoverCard.Root>
{/snippet}

<Story name="Basic" template={basicStory} />

{#snippet controlledStory()}
	<HoverCard.Root size="sm" bind:open={controlledOpen}>
		Follow
		<HoverCard.Trigger>
			<Link href="#" colour="accent">@saas_js</Link>
		</HoverCard.Trigger>
		for updates
		<HoverCard.Content>
			<HoverCard.Arrow />
			<HStack gap={4}>
				<Avatar
					src="https://pbs.twimg.com/profile_images/1542114663420383235/Otz6CbhI_400x400.png"
					name="Saas UI"
				/>
				<VStack gap={0}>
					<Text size="sm" class="font-semibold">Saas UI</Text>
					<Text size="xs" class="text-fg-muted mb-2">@saas_js</Text>
					<Text size="sm" class="text-fg-muted">
						Design system and React components for startups.
					</Text>
				</VStack>
			</HStack>
		</HoverCard.Content>
	</HoverCard.Root>
{/snippet}

{#snippet delaysStory()}
	<HoverCard.Root size="sm" openDelay={1000} closeDelay={100}>
		Follow
		<HoverCard.Trigger>
			<Link href="#" colour="accent">@saas_js</Link>
		</HoverCard.Trigger>
		for updates
		<HoverCard.Content>
			<HoverCard.Arrow />
			<HStack gap={4}>
				<Avatar
					src="https://pbs.twimg.com/profile_images/1542114663420383235/Otz6CbhI_400x400.png"
					name="Saas UI"
				/>
				<VStack gap={0}>
					<Text size="sm" class="font-semibold">Saas UI</Text>
					<Text size="xs" class="text-fg-muted mb-2">@saas_js</Text>
					<Text size="sm" class="text-fg-muted">
						Design system and React components for startups.
					</Text>
				</VStack>
			</HStack>
		</HoverCard.Content>
	</HoverCard.Root>
{/snippet}

{#snippet placementStory()}
	<HoverCard.Root size="sm" positioning={{ placement: "top" }}>
		Follow
		<HoverCard.Trigger>
			<Link href="#" colour="accent">@saas_js</Link>
		</HoverCard.Trigger>
		for updates
		<HoverCard.Content>
			<HoverCard.Arrow />
			<HStack gap={4}>
				<Avatar
					src="https://pbs.twimg.com/profile_images/1542114663420383235/Otz6CbhI_400x400.png"
					name="Saas UI"
				/>
				<VStack gap={0}>
					<Text size="sm" class="font-semibold">Saas UI</Text>
					<Text size="xs" class="text-fg-muted mb-2">@saas_js</Text>
					<Text size="sm" class="text-fg-muted">
						Design system and React components for startups.
					</Text>
				</VStack>
			</HStack>
		</HoverCard.Content>
	</HoverCard.Root>
{/snippet}

<Story name="Controlled" template={controlledStory} />

<Story name="Delays" template={delaysStory} />

<Story name="Placement" template={placementStory} />
