<script lang="ts" module>
	// Wrapper components for complex Code stories
	// These are imported by Code.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { Code } from "$saas/typography/code";
	import { Text } from "$saas/typography/text";
	import { HStack, VStack } from "$saas/layout/stack";
	import { availableColours } from "../../../../../packages/saas-svelte/utils/colours";

	const colours = availableColours;
	const codeVariants = ["solid", "outline", "subtle", "surface"] as const;
	const codeSizes = ["xs", "sm", "md", "lg"] as const;

	interface Props {
		story: "basic" | "sizes" | "variants" | "colours";
	}

	let { story }: Props = $props();
</script>

{#if story === "basic"}
	<Code>console.log("Hello, world!")</Code>
{:else if story === "sizes"}
	<VStack align="start" gap={2}>
		{#each codeSizes as size}
			<HStack align="center" gap={10} class="w-full px-4">
				<Text size="sm" class="min-w-[8ch]">{size}</Text>
				<Code {size}>console.log()</Code>
			</HStack>
		{/each}
	</VStack>
{:else if story === "variants"}
	<VStack align="start" gap={2}>
		{#each codeVariants as variant}
			<HStack align="center" gap={10} class="w-full px-4">
				<Text size="sm" class="min-w-[8ch]">{variant}</Text>
				<Code {variant}>console.log()</Code>
			</HStack>
		{/each}
	</VStack>
{:else if story === "colours"}
	<VStack gap={2}>
		{#each colours as colour}
			<HStack align="center" gap={10} class="w-full px-4">
				<Text size="sm" class="min-w-[8ch]">{colour}</Text>
				<Code variant="solid" colour={colour as any}>console.log()</Code
				>
				<Code variant="outline" colour={colour as any}
					>console.log()</Code
				>
				<Code variant="subtle" colour={colour as any}
					>console.log()</Code
				>
				<Code variant="surface" colour={colour as any}
					>console.log()</Code
				>
			</HStack>
		{/each}
	</VStack>
{/if}
