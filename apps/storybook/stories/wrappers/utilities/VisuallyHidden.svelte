<script lang="ts" module>
	// Wrapper components for VisuallyHidden stories
	// These are imported by VisuallyHidden.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { VisuallyHidden } from "$saas/utilities/visually-hidden";
	import { Button } from "$saas/components/button";
	import Bell from "phosphor-svelte/lib/Bell";

	interface Props {
		story: "basic";
		class?: string;
	}

	let { story, class: className }: Props = $props();
</script>

{#if story === "basic"}
	<Button>
		<Bell class="h-4 w-4" aria-hidden="true" />
		3
		<VisuallyHidden class={className}>Notifications</VisuallyHidden>
	</Button>
{/if}
