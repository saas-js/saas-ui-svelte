<script lang="ts" module>
	// Wrapper components for complex Spinner stories
	// These are imported by Spinner.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { Spinner } from "$saas/components/spinner";
	import { VStack, HStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import { colours, spinnerSizes } from "../../utils";

	interface Props {
		story:
			| "basic"
			| "sizes"
			| "colours"
			| "trackColour"
			| "customSpeed"
			| "thickness"
			| "withLabel";
	}

	let { story }: Props = $props();
</script>

{#if story === "basic"}
	<Spinner />
{:else if story === "sizes"}
	<HStack align="start" gap={4} class="flex-wrap">
		{#each spinnerSizes as size}
			<VStack gap={2} class="items-center">
				<Text size="xs">{size}</Text>
				<Spinner {size} />
			</VStack>
		{/each}
	</HStack>
{:else if story === "colours"}
	<VStack gap={4}>
		{#each colours as colour}
			<HStack gap={4} class="items-center">
				<Text size="xs" class="w-16">{colour}</Text>
				<Spinner size="sm" {colour} />
				<Spinner size="md" {colour} />
				<Spinner size="lg" {colour} />
			</HStack>
		{/each}
	</VStack>
{:else if story === "trackColour"}
	<HStack gap={4}>
		<Spinner colour="red" trackColour="gray" />
		<Spinner colour="blue" trackColour="gray" />
		<Spinner colour="green" trackColour="gray" />
	</HStack>
{:else if story === "customSpeed"}
	<HStack align="start" gap={4} class="flex-wrap">
		<VStack gap={2} class="items-center">
			<Text size="xs">0.3s</Text>
			<Spinner colour="blue" animationDuration="0.3s" />
		</VStack>
		<VStack gap={2} class="items-center">
			<Text size="xs">0.5s</Text>
			<Spinner colour="blue" animationDuration="0.5s" />
		</VStack>
		<VStack gap={2} class="items-center">
			<Text size="xs">0.8s</Text>
			<Spinner colour="blue" animationDuration="0.8s" />
		</VStack>
		<VStack gap={2} class="items-center">
			<Text size="xs">1.2s</Text>
			<Spinner colour="blue" animationDuration="1.2s" />
		</VStack>
	</HStack>
{:else if story === "thickness"}
	<HStack align="start" gap={4} class="flex-wrap">
		<VStack gap={2} class="items-center">
			<Text size="xs">1px</Text>
			<Spinner colour="blue" size="lg" borderWidth="1px" />
		</VStack>
		<VStack gap={2} class="items-center">
			<Text size="xs">2px</Text>
			<Spinner colour="blue" size="lg" borderWidth="2px" />
		</VStack>
		<VStack gap={2} class="items-center">
			<Text size="xs">3px</Text>
			<Spinner colour="blue" size="lg" borderWidth="3px" />
		</VStack>
		<VStack gap={2} class="items-center">
			<Text size="xs">4px</Text>
			<Spinner colour="blue" size="lg" borderWidth="4px" />
		</VStack>
	</HStack>
{:else if story === "withLabel"}
	<VStack gap={2} class="items-center">
		<Spinner colour="teal" />
		<Text size="sm" class="text-teal-fg">Loading...</Text>
	</VStack>
{/if}
