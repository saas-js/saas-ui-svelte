<script lang="ts">
import { Code } from "@saas-ui/svelte/typography/code";

interface Props {
	text: string;
}

let { text }: Props = $props();

// Parse text and split into segments - text between backticks becomes code
const segments = $derived.by(() => {
	const parts: Array<{ type: "text" | "code"; content: string }> = [];
	const regex = /`([^`]+)`/g;
	let lastIndex = 0;
	let match;

	while ((match = regex.exec(text)) !== null) {
		// Add text before the match
		if (match.index > lastIndex) {
			parts.push({
				type: "text",
				content: text.slice(lastIndex, match.index),
			});
		}
		// Add the code content
		parts.push({ type: "code", content: match[1] });
		lastIndex = regex.lastIndex;
	}

	// Add remaining text
	if (lastIndex < text.length) {
		parts.push({ type: "text", content: text.slice(lastIndex) });
	}

	return parts;
});
</script>

{#each segments as segment}{#if segment.type === "code"}<Code
			size="sm"
			colour="indigo">{segment.content}</Code
		>{:else}{segment.content}{/if}{/each}
