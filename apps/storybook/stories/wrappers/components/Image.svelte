<script lang="ts" module>
	// Wrapper components for complex Image stories
	// These are imported by Image.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { Image } from "$saas/components/image";
	import { Stack, VStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";

	const imageRoundedOptions = ["none", "sm", "md", "lg", "xl", "2xl", "3xl", "full"] as const;
	const imageFitOptions = ["contain", "cover", "fill", "none", "scale-down"] as const;

	interface Props {
		story: "basic" | "height" | "circular" | "aspectRatio" | "fit" | "rounded";
	}

	let { story }: Props = $props();
</script>

{#if story === "basic"}
	<Image
		src="https://picsum.photos/seed/saas/800/600"
		alt="Sample image"
		rounded="md"
		fit="cover"
	/>
{:else if story === "height"}
	<Image
		src="https://picsum.photos/seed/height/800/400"
		alt="Image with fixed height"
		height="200px"
		rounded="md"
	/>
{:else if story === "circular"}
	<Image
		src="https://picsum.photos/seed/circular/400/400"
		alt="Circular image"
		width={150}
		height={150}
		rounded="full"
		fit="cover"
	/>
{:else if story === "aspectRatio"}
	<Image
		src="https://picsum.photos/seed/aspect/800/600"
		alt="Image with aspect ratio"
		aspectRatio="4/3"
		width="300px"
		rounded="md"
	/>
{:else if story === "fit"}
	<Stack gap={6} class="flex-row flex-wrap items-start">
		{#each imageFitOptions as fit}
			<VStack gap={2} class="items-center">
				<Text size="xs">{fit}</Text>
				<Image
					src="https://picsum.photos/seed/fit/400/300"
					alt={`Image with ${fit} fit`}
					{fit}
					width={200}
					height={150}
					rounded="md"
					class="border border-border-subtle"
				/>
			</VStack>
		{/each}
	</Stack>
{:else if story === "rounded"}
	<Stack gap={6} class="flex-row flex-wrap items-start">
		{#each imageRoundedOptions as rounded}
			<VStack gap={2} class="items-center">
				<Text size="xs">{rounded}</Text>
				<Image
					src="https://picsum.photos/seed/rounded/200/200"
					alt={`Image with ${rounded} border radius`}
					{rounded}
					width={100}
					height={100}
				/>
			</VStack>
		{/each}
	</Stack>
{/if}
