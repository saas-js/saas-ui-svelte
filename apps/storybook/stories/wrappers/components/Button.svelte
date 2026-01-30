<script lang="ts" module>
	// Wrapper components for complex Button stories
	// These are imported by Button.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { Button } from "$saas/components/button";
	import { Icon } from "$saas/components/icon";
	import { Text } from "$saas/typography/text";
	import { HStack, VStack } from "$saas/layout/stack";
	import Heart from "phosphor-svelte/lib/Heart";
	import Envelope from "phosphor-svelte/lib/Envelope";
	import ArrowRight from "phosphor-svelte/lib/ArrowRight";
	import CaretDown from "phosphor-svelte/lib/CaretDown";
	import { colours, buttonSizes, buttonVariants } from "../../utils";

	interface Props {
		story:
			| "basic"
			| "sizes"
			| "variants"
			| "icons"
			| "colours"
			| "loading"
			| "group";
	}

	let { story }: Props = $props();
</script>

{#if story === "basic"}
	<Button>Button</Button>
{:else if story === "sizes"}
	<HStack align="start" gap={4} class="flex-wrap">
		{#each buttonSizes as size}
			<VStack gap={2} class="items-center">
				<Text size="xs">{size}</Text>
				<Button {size}>Button ({size})</Button>
			</VStack>
		{/each}
	</HStack>
{:else if story === "variants"}
	<HStack align="start" gap={4} class="flex-wrap p-4">
		{#each buttonVariants as variant}
			<VStack gap={2} class="items-center">
				<Text size="xs">{variant}</Text>
				<Button {variant}>{variant}</Button>
			</VStack>
		{/each}
	</HStack>
{:else if story === "icons"}
	<HStack gap={4} class="flex-wrap">
		<Button colour="teal" variant="solid">
			<Icon as={Envelope} class="size-4" aria-hidden="true" />
			Mail
		</Button>

		<Button colour="teal" variant="outline">
			Call us
			<Icon as={ArrowRight} class="size-4" aria-hidden="true" />
		</Button>
	</HStack>

	<br />

	<VStack align="start" gap={4}>
		{#each buttonSizes as size}
			<Button colour="rose" variant="solid" {size} icon aria-label="Like">
				<Icon as={Heart} aria-hidden="true" />
			</Button>
		{/each}
	</VStack>
{:else if story === "colours"}
	<VStack gap={4}>
		{#each colours as colour}
			<HStack gap={4}>
				<Text size="xs" class="w-16">{colour}</Text>
				<Button variant="glass" {colour}>Glass</Button>
				<Button variant="solid" {colour}>Solid</Button>
				<Button variant="subtle" {colour}>Subtle</Button>
				<Button variant="surface" {colour}>Surface</Button>
				<Button variant="outline" {colour}>Outline</Button>
			</HStack>
		{/each}
	</VStack>
{:else if story === "loading"}
	<HStack gap={4} class="flex-wrap">
		<Button loading>Click me</Button>
		<Button loading loadingText="Saving...">Click me</Button>
	</HStack>
{:else if story === "group"}
	<Button.Group>
		<Button variant="outline" size="sm">Button</Button>
		<Button variant="outline" size="sm" icon aria-label="More options">
			<Icon as={CaretDown} aria-hidden="true" />
		</Button>
	</Button.Group>
{/if}
