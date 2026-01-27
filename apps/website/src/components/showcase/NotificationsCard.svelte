<script lang="ts">
	import { Card } from "@saas-ui/svelte/components/card";
	import { Switch } from "@saas-ui/svelte/components/switch";
	import { Separator } from "@saas-ui/svelte/components/separator";
	import { Text } from "@saas-ui/svelte/typography/text";
</script>

<Card.Root variant="elevated">
	<Card.Header>
		<Card.Title>Notifications</Card.Title>
	</Card.Header>
	<Card.Body class="p-0">
		<div>
			<div class="flex items-center justify-between px-4 py-3">
				<div class="min-w-0 flex-1">
					<Text weight="medium">Assigned</Text>
					<Text size="xs" class="text-fg-muted">
						A conversation is assigned to me.
					</Text>
				</div>
				<Switch size="sm" colour="indigo" />
			</div>
			<Separator />
			<div class="flex items-center justify-between px-4 py-3">
				<div class="min-w-0 flex-1">
					<Text weight="medium">Mentions</Text>
					<Text size="xs" class="text-fg-muted">
						Somebody mentions me.
					</Text>
				</div>
				<Switch size="sm" colour="indigo" checked={true} />
			</div>
			<Separator />
			<div class="flex items-center justify-between px-4 py-3">
				<div class="min-w-0 flex-1">
					<Text weight="medium">Lead qualified</Text>
					<Text size="xs" class="text-fg-muted">
						A lead is qualified.
					</Text>
				</div>
				<Switch size="sm" colour="indigo" checked={true} />
			</div>
			<Separator />
			<div class="flex items-center justify-between px-4 py-3">
				<div class="min-w-0 flex-1">
					<Text weight="medium">Deal closed</Text>
					<Text size="xs" class="text-fg-muted">
						A deal is closed.
					</Text>
				</div>
				<Switch size="sm" colour="indigo" checked={true} />
			</div>
		</div>
	</Card.Body>
</Card.Root>
