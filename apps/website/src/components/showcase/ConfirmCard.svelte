<script lang="ts">
	import { Card } from "@saas-ui/svelte/components/card";
	import { Button } from "@saas-ui/svelte/components/button";
</script>

<Card.Root variant="elevated">
	<Card.Header>
		<Card.Title>Confirm</Card.Title>
	</Card.Header>
	<Card.Body>
		<p class="text-fg-muted">
			Are you sure you want to delete this file? This action cannot be
			undone.
		</p>
	</Card.Body>
	<Card.Footer class="justify-end gap-3">
		<Button variant="outline">Cancel</Button>
		<Button variant="solid" colour="red">Confirm</Button>
	</Card.Footer>
</Card.Root>
