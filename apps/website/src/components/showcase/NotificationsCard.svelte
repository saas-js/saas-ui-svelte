<script lang="ts">
	import { Card } from "@saas-ui/svelte/components/card";
	import { Switch } from "@saas-ui/svelte/components/switch";
	import { Separator } from "@saas-ui/svelte/components/separator";
	import { Text } from "@saas-ui/svelte/typography/text";

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
			<div class="flex items-center justify-between px-4 py-3">
				<div class="min-w-0 flex-1">
					<Text weight="medium">{notification.title}</Text>
					<Text size="xs" class="text-fg-muted">{notification.description}</Text>
				</div>
				<Switch size="sm" colour="indigo" checked={notification.enabled} />
			</div>
		{/each}
	</Card.Body>
</Card.Root>
