<script lang="ts" module>
	// Wrapper components for complex Badge stories
</script>

<script lang="ts">
	import { Text } from "$saas/typography/text";
	import Star from "phosphor-svelte/lib/Star";
	import CheckCircle from "phosphor-svelte/lib/CheckCircle";
	import { VStack, HStack } from "$saas/layout/stack";
	import { Badge } from "$saas/components/badge";
	import {
		colours,
		badgeVariants,
		badgeSizes,
	} from "../../utils";

	interface Props {
		story: "basic" | "withIcon" | "variants" | "sizes" | "colours";
	}

	let { story }: Props = $props();
</script>

{#if story === "basic"}
	<Badge>Badge</Badge>
{:else if story === "withIcon"}
	<VStack align="start" gap={2}>
		<Badge variant="solid" colour="blue">
			<Star class="h-3" aria-hidden="true" />
			New
		</Badge>
		<Badge variant="solid" colour="green">
			New
			<CheckCircle class="h-3" aria-hidden="true" />
		</Badge>
	</VStack>
{:else if story === "variants"}
	<HStack align="start" gap={4}>
		{#each badgeVariants as variant}
			<VStack gap={2}>
				<Text size="xs">{variant}</Text>
				<Badge {variant}>Badge</Badge>
			</VStack>
		{/each}
	</HStack>
{:else if story === "sizes"}
	<HStack align="start" gap={4}>
		{#each badgeSizes as size}
			<VStack gap={2}>
				<Text size="xs">{size}</Text>
				<Badge {size}>New</Badge>
			</VStack>
		{/each}
	</HStack>
{:else if story === "colours"}
	<VStack gap={2}>
		{#each colours as colour}
			<HStack gap={4} align="center">
				<Text size="xs" class="w-16">{colour}</Text>
				<Badge {colour} variant="outline">Outline</Badge>
				<Badge {colour} variant="solid">Solid</Badge>
				<Badge {colour} variant="subtle">Subtle</Badge>
				<Badge {colour} variant="surface">Surface</Badge>
			</HStack>
		{/each}
	</VStack>
{/if}
