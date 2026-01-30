<script lang="ts" module>
	// Wrapper components for complex Skeleton stories
	// These are imported by Skeleton.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import {
		Skeleton,
		SkeletonCircle,
		SkeletonText,
	} from "$saas/components/skeleton";
	import { Stack } from "$saas/layout/stack";
	import { Group } from "$saas/layout/group";
	import { Text } from "$saas/typography/text";
	import { Badge } from "$saas/components/badge";
	import { Button } from "$saas/components/button";

	const skeletonCircleSizes = ["6", "8", "10", "12", "14", "16"] as const;

	interface Props {
		story:
			| "basic"
			| "composite"
			| "feed"
			| "text"
			| "withChildren"
			| "variants"
			| "contentLoading"
			| "circleSizes"
			| "textLines";
	}

	let { story }: Props = $props();

	let loading = $state(true);
</script>

{#if story === "basic"}
	<Skeleton height="1.25rem" width="200px" />
{:else if story === "composite"}
	<Group gap={5} class="items-center">
		<SkeletonCircle size="12" />
		<Stack gap={2} class="flex-1">
			<Skeleton height="1.25rem" />
			<Skeleton height="1.25rem" width="80%" />
		</Stack>
	</Group>
{:else if story === "feed"}
	<Stack gap={6} class="max-w-xs">
		<Group gap={2} class="items-center w-full">
			<SkeletonCircle size="10" />
			<SkeletonText noOfLines={2} class="w-full" />
		</Group>
		<Skeleton height="200px" />
	</Stack>
{:else if story === "text"}
	<SkeletonText noOfLines={3} gap={4} />
{:else if story === "withChildren"}
	<Group gap={4} class="items-center">
		<Skeleton loading={true}>
			<Badge>Select</Badge>
		</Skeleton>

		<Skeleton loading={false}>
			<Badge>Select</Badge>
		</Skeleton>
	</Group>
{:else if story === "variants"}
	<Stack gap={5}>
		<Group gap={5} class="items-center">
			<Text class="w-[8ch]">pulse</Text>
			<Skeleton class="flex-1" height="1.25rem" variant="pulse" />
		</Group>
		<Group gap={5} class="items-center">
			<Text class="w-[8ch]">shine</Text>
			<Skeleton class="flex-1" height="1.25rem" variant="shine" />
		</Group>
	</Stack>
{:else if story === "contentLoading"}
	<Stack gap={4} class="items-start">
		<Skeleton {loading}>
			<Text>Saas UI is cool</Text>
		</Skeleton>
		<Button size="sm" onclick={() => (loading = !loading)}>Toggle</Button>
	</Stack>
{:else if story === "circleSizes"}
	<Group gap={4} class="items-center">
		{#each skeletonCircleSizes as size}
			<SkeletonCircle {size} />
		{/each}
	</Group>
{:else if story === "textLines"}
	<Stack gap={6}>
		{#each [1, 2, 3, 4] as noOfLines}
			<Stack gap={2}>
				<Text size="xs" class="text-fg-muted"
					>{noOfLines} line{noOfLines > 1 ? "s" : ""}</Text
				>
				<SkeletonText {noOfLines} gap={2} />
			</Stack>
		{/each}
	</Stack>
{/if}
