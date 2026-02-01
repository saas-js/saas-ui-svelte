<script lang="ts" module>
	// Wrapper components for VisuallyHidden stories
	// These are imported by VisuallyHidden.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { VisuallyHidden } from "$saas/utilities/visually-hidden";
	import { Button } from "$saas/components/button";
	import { Icon } from "$saas/components/icon";
	import Bell from "phosphor-svelte/lib/Bell";

	interface Props {
		story: "basic";
	}

	let { story }: Props = $props();
</script>

{#if story === "basic"}
	<Button>
		<Icon as={Bell} size="sm" />
		3
		<VisuallyHidden>Notifications</VisuallyHidden>
	</Button>
{/if}
