<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
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
	import {
		commonArgTypes,
		getControls,
		skeletonVariants,
		skeletonCircleSizes,
	} from "../utils";

	const { Story } = defineMeta({
		title: "components/Skeleton",
		component: Skeleton,
		argTypes: {
			loading: {
				control: "boolean",
				description: "Whether to show the skeleton loading state.",
				table: { defaultValue: { summary: "true" } },
			},
			variant: {
				control: "select",
				options: skeletonVariants,
				description: "The animation variant.",
				table: { defaultValue: { summary: "pulse" } },
			},
			height: {
				control: "text",
				description: "The height of the skeleton.",
			},
			width: {
				control: "text",
				description: "The width of the skeleton.",
			},
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls([
				"loading",
				"variant",
				"height",
				"width",
				"class",
			]),
		},
		args: {
			loading: true,
			variant: "pulse",
		},
	});
</script>

<script lang="ts">
	let loading = $state(true);
</script>

{#snippet basicStory(args: any)}
	<Skeleton height="1.25rem" width="200px" {...args} />
{/snippet}

{#snippet compositeStory()}
	<Group gap={5} class="items-center">
		<SkeletonCircle size="12" />
		<Stack gap={2} class="flex-1">
			<Skeleton height="1.25rem" />
			<Skeleton height="1.25rem" width="80%" />
		</Stack>
	</Group>
{/snippet}

{#snippet feedStory()}
	<Stack gap={6} class="max-w-xs">
		<Group gap={2} class="w-full items-center">
			<SkeletonCircle size="10" />
			<SkeletonText noOfLines={2} class="w-full" />
		</Group>
		<Skeleton height="200px" />
	</Stack>
{/snippet}

{#snippet textStory()}
	<SkeletonText noOfLines={3} gap={4} />
{/snippet}

{#snippet withChildrenStory()}
	<Group gap={4} class="items-center">
		<Skeleton loading={true}>
			<Badge>Select</Badge>
		</Skeleton>

		<Skeleton loading={false}>
			<Badge>Select</Badge>
		</Skeleton>
	</Group>
{/snippet}

{#snippet variantsStory()}
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
{/snippet}

{#snippet contentLoadingStory()}
	<Stack gap={4} class="items-start">
		<Skeleton {loading}>
			<Text>Saas UI is cool</Text>
		</Skeleton>
		<Button size="sm" onclick={() => (loading = !loading)}>Toggle</Button>
	</Stack>
{/snippet}

{#snippet circleSizesStory()}
	<Group gap={4} class="items-center">
		{#each skeletonCircleSizes as size}
			<SkeletonCircle {size} />
		{/each}
	</Group>
{/snippet}

{#snippet textLinesStory()}
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
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Composite" template={compositeStory} />

<Story name="Feed" template={feedStory} />

<Story name="Text" template={textStory} />

<Story name="WithChildren" template={withChildrenStory} />

<Story name="Variants" template={variantsStory} />

<Story name="ContentLoading" template={contentLoadingStory} />

<Story name="CircleSizes" template={circleSizesStory} />

<Story name="TextLines" template={textLinesStory} />
