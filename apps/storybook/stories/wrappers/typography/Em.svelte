<script lang="ts" module>
	// Wrapper components for complex Em stories
	// These are imported by Em.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { Em } from "$saas/typography/em";
	import { Text } from "$saas/typography/text";

	interface Props {
		story: "basic";
	}

	let { story }: Props = $props();
</script>

{#if story === "basic"}
	<Text>
		The <Em>design system</Em> is a collection of UI elements
	</Text>
{/if}
