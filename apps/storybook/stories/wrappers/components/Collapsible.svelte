<script lang="ts" module>
	// Wrapper components for complex Collapsible stories
</script>

<script lang="ts">
	import { Collapsible } from "$saas/components/collapsible";
	import { Card } from "$saas/components/card";

	interface Props {
		story: "basic" | "lazyMounted";
	}

	let { story }: Props = $props();
</script>

{#if story === "basic"}
	<Collapsible>
		<Collapsible.Trigger>Toggle Collapsible</Collapsible.Trigger>
		<Collapsible.Content>
			<Card.Root class="p-2 px-4 text-sm">
				Lorem Ipsum is simply dummy text of the printing and typesetting
				industry. Lorem Ipsum has been the industry's standard dummy
				text ever since the 1500s, when an unknown printer took a galley
				of type and scrambled it to make a type specimen book.
			</Card.Root>
		</Collapsible.Content>
	</Collapsible>
{:else if story === "lazyMounted"}
	<Collapsible unmountOnExit>
		<Collapsible.Trigger
			>Toggle Collapse (Unmount on exit)</Collapsible.Trigger
		>
		<Collapsible.Content>
			<Card.Root class="p-2 px-4 text-sm">
				If you inspect the DOM, you'll notice that the content is
				unmounted when collapsed. This is useful for performance reasons
				when you have a lot of collapsible content.
			</Card.Root>
		</Collapsible.Content>
	</Collapsible>
{/if}
