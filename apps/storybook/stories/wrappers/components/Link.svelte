<script lang="ts" module>
	// Wrapper components for complex Link stories
	// These are imported by Link.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { Link } from "$saas/components/link";
	import { VStack } from "$saas/layout/stack";
	import ArrowSquareOut from "phosphor-svelte/lib/ArrowSquareOut";
	import { Icon } from "$saas/components/icon";

	const colours = [
		"gray",
		"red",
		"orange",
		"yellow",
		"green",
		"teal",
		"blue",
		"cyan",
		"purple",
		"pink",
		"rose",
	] as const;

	interface Props {
		story: "basic" | "variants" | "withinText" | "external" | "colours";
	}

	let { story }: Props = $props();
</script>

{#if story === "basic"}
	<Link href="#">Visit Chakra UI</Link>
{:else if story === "variants"}
	<VStack gap={2} class="items-center">
		<Link href="#" variant="underline">Link (Underline)</Link>
		<Link href="#" variant="plain">Link (Plain)</Link>
	</VStack>
{:else if story === "withinText"}
	<p>
		Visit the <Link href="https://chakra-ui.com" colour="teal" variant="underline"
			>Chakra UI</Link
		> website
	</p>
{:else if story === "external"}
	<Link href="#" variant="plain">
		Visit Chakra UI
		<Icon as={ArrowSquareOut} class="size-3.5" />
	</Link>
{:else if story === "colours"}
	<VStack gap={4}>
		{#each colours as colour}
			<div class="flex items-center gap-4">
				<span class="w-16 text-xs text-fg-muted">{colour}</span>
				<Link href="#" variant="underline" {colour}>Link ({colour})</Link>
				<Link href="#" variant="plain" {colour}>Plain</Link>
			</div>
		{/each}
	</VStack>
{/if}
