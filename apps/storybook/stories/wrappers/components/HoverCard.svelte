<script lang="ts" module>
	// Wrapper components for complex HoverCard stories
	// These are imported by HoverCard.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { HoverCard } from "$saas/components/hover-card";
	import { Avatar } from "$saas/components/avatar";
	import { Text } from "$saas/typography/text";
	import { Link } from "$saas/components/link";
	import { VStack, HStack } from "$saas/layout/stack";

	interface Props {
		story: "basic" | "controlled" | "delays" | "placement";
	}

	let { story }: Props = $props();
	let controlledOpen = $state(false);
</script>

{#if story === "basic"}
	<HoverCard.Root size="sm">
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
{:else if story === "controlled"}
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
{:else if story === "delays"}
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
{:else if story === "placement"}
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
{/if}
