<script lang="ts">
	import { Card } from "@saas-ui/svelte/components/card";
	import { Button } from "@saas-ui/svelte/components/button";
	import { Text } from "@saas-ui/svelte/typography/text";
</script>

<Card.Root variant="elevated">
	<Card.Header>
		<Card.Title as="h2">Confirm</Card.Title>
	</Card.Header>
	<Card.Body>
		<Text class="text-fg-muted">
			Are you sure you want to delete this file? This action cannot be
			undone.
		</Text>
	</Card.Body>
	<Card.Footer class="justify-end gap-3">
		<Button variant="outline" onclick={(e: Event) => e.preventDefault()}
			>Cancel</Button
		>
		<Button
			variant="solid"
			colour="red"
			onclick={(e: Event) => e.preventDefault()}>Confirm</Button
		>
	</Card.Footer>
</Card.Root>
