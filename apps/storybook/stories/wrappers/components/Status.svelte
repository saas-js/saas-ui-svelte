<script lang="ts" module>
	// Wrapper components for complex Status stories
	// These are imported by Status.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { Status } from "$saas/components/status";
	import { HStack, VStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";

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

	const statusSizes = ["sm", "md", "lg"] as const;

	interface Props {
		story:
			| "basic"
			| "values"
			| "label"
			| "sizes"
			| "colours";
	}

	let { story }: Props = $props();
</script>

{#if story === "basic"}
	<Status>Status</Status>
{:else if story === "values"}
	<HStack gap={6}>
		<Status value="error" />
		<Status value="info" />
		<Status value="warning" />
		<Status value="success" />
	</HStack>
{:else if story === "label"}
	<HStack gap={6}>
		<Status value="error">Error</Status>
		<Status value="info">Info</Status>
		<Status value="warning">Warning</Status>
		<Status value="success">Success</Status>
	</HStack>
{:else if story === "sizes"}
	<VStack gap={2} align="start">
		{#each statusSizes as size}
			<HStack gap={10} class="px-4">
				<Status {size} class="w-24" value="warning">In Review</Status>
				<Status {size} class="w-24" value="error">Error</Status>
				<Status {size} class="w-24" value="success">Approved</Status>
			</HStack>
		{/each}
	</VStack>
{:else if story === "colours"}
	<VStack gap={4}>
		{#each colours as colour}
			<HStack gap={4} class="items-center">
				<Text size="xs" class="w-16">{colour}</Text>
				<Status {colour}>Active</Status>
			</HStack>
		{/each}
	</VStack>
{/if}
