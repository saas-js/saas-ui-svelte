<script lang="ts">
	import { Card } from "@saas-ui/svelte/components/card";
	import { Switch } from "@saas-ui/svelte/components/switch";
	import { Separator } from "@saas-ui/svelte/components/separator";
	import { Text } from "@saas-ui/svelte/typography/text";
	import { HStack, VStack } from "@saas-ui/svelte/layout/stack";

	const notifications = [
		{ title: "Assigned", description: "A conversation is assigned to me.", enabled: false },
		{ title: "Mentions", description: "Somebody mentions me.", enabled: true },
		{ title: "Lead qualified", description: "A lead is qualified.", enabled: true },
		{ title: "Deal closed", description: "A deal is closed.", enabled: true },
	];
</script>

<Card.Root variant="elevated">
	<Card.Header>
		<Card.Title>Notifications</Card.Title>
	</Card.Header>
	<Card.Body class="p-0">
		{#each notifications as notification, i}
			{#if i > 0}<Separator />{/if}
			<HStack class="items-center justify-between px-4 py-3">
				<VStack gap={0} class="flex-1 min-w-0">
					<Text weight="medium">{notification.title}</Text>
					<Text size="xs" class="text-fg-muted">{notification.description}</Text>
				</VStack>
				<Switch size="sm" colour="indigo" checked={notification.enabled} />
			</HStack>
		{/each}
	</Card.Body>
</Card.Root>
