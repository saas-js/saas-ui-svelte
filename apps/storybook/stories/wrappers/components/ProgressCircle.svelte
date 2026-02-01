<script lang="ts" module>
	// Wrapper components for complex ProgressCircle stories
	// These are imported by ProgressCircle.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { ProgressCircle, type ProgressCircleVariants } from "$saas/components/progress-circle";
	import { Text } from "$saas/typography/text";
	import { HStack, VStack } from "$saas/layout/stack";
	import { colours, sizes } from "../../utils";

	type Size = NonNullable<ProgressCircleVariants["size"]>;

	interface Props {
		story:
			| "basic"
			| "rounded"
			| "sizes"
			| "colours"
			| "withValueText"
			| "customThickness"
			| "indeterminate"
			| "values"
			| "rangeColors";
	}

	let { story }: Props = $props();
</script>

{#if story === "basic"}
	<ProgressCircle value={75} />
{:else if story === "rounded"}
	<HStack gap={8}>
		<ProgressCircle value={75} colour="indigo" />
		<ProgressCircle value={75} colour="indigo" rounded />
	</HStack>
{:else if story === "sizes"}
	<HStack align="center" gap={8} class="flex-wrap">
		{#each sizes as size (size)}
			<VStack gap={2} class="items-center">
				<Text size="xs">{size}</Text>
				<ProgressCircle size={size as Size} value={30} colour="indigo" rounded />
			</VStack>
		{/each}
	</HStack>
{:else if story === "colours"}
	<VStack gap={4}>
		{#each colours as colour}
			<HStack gap={8} class="items-center px-4">
				<Text size="xs" class="w-16">{colour}</Text>
				<ProgressCircle size="sm" value={30} {colour} rounded />
				<ProgressCircle size="md" value={30} {colour} rounded />
				<ProgressCircle size="lg" value={30} {colour} rounded />
			</HStack>
		{/each}
	</VStack>
{:else if story === "withValueText"}
	<HStack gap={8} class="items-center">
		{#each ["md", "lg", "xl"] as size (size)}
			<ProgressCircle size={size as Size} value={65} colour="teal" showValue />
		{/each}
	</HStack>
{:else if story === "customThickness"}
	<HStack gap={8} class="items-center">
		<ProgressCircle value={75} colour="purple" thickness="2px" />
		<ProgressCircle value={75} colour="purple" />
		<ProgressCircle value={75} colour="purple" thickness="8px" />
	</HStack>
{:else if story === "indeterminate"}
	<HStack gap={8} class="items-center">
		{#each sizes as size (size)}
			<ProgressCircle size={size as Size} value={null} colour="blue" />
		{/each}
	</HStack>
{:else if story === "values"}
	<HStack gap={6} class="flex-wrap items-center">
		{#each [0, 25, 50, 75, 100] as value}
			<VStack gap={2} class="items-center">
				<ProgressCircle {value} colour="emerald" showValue size="lg" rounded />
			</VStack>
		{/each}
	</HStack>
{:else if story === "rangeColors"}
	<HStack gap={8}>
		<ProgressCircle value={75} colour="orange" />
		<ProgressCircle value={75} colour="rose" />
		<ProgressCircle value={75} colour="cyan" />
	</HStack>
{/if}
