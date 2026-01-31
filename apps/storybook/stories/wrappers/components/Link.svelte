<script lang="ts" module>
	// Wrapper components for complex Link stories
	// These are imported by Link.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { Link } from "$saas/components/link";
	import { VStack, HStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import ArrowSquareOut from "phosphor-svelte/lib/ArrowSquareOut";
	import { Icon } from "$saas/components/icon";
	import { colours } from "../../utils";

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
	<Text>
		Visit the <Link href="https://chakra-ui.com" colour="teal" variant="underline"
			>Chakra UI</Link
		> website
	</Text>
{:else if story === "external"}
	<Link href="#" variant="plain">
		Visit Chakra UI
		<Icon as={ArrowSquareOut} size="xs" />
	</Link>
{:else if story === "colours"}
	<VStack gap={4}>
		{#each colours as colour}
			<HStack align="center" gap={4}>
				<Text as="span" size="xs" class="w-16 text-fg-muted">{colour}</Text>
				<Link href="#" variant="underline" {colour}>Link ({colour})</Link>
				<Link href="#" variant="plain" {colour}>Plain</Link>
			</HStack>
		{/each}
	</VStack>
{/if}
