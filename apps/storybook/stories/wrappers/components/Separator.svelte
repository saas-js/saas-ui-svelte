<script lang="ts" module>
	// Wrapper components for complex Separator stories
	// These are imported by Separator.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { Separator } from "$saas/components/separator";
	import { Stack } from "$saas/layout/stack";
	import { Group } from "$saas/layout/group";
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

	const separatorSizes = ["xs", "sm", "md", "lg"] as const;
	const separatorVariants = ["solid", "dashed", "dotted"] as const;

	interface Props {
		story:
			| "basic"
			| "variants"
			| "sizes"
			| "label"
			| "vertical"
			| "colours";
	}

	let { story }: Props = $props();
</script>

{#if story === "basic"}
	<Stack gap={2}>
		<Text>First</Text>
		<Separator />
		<Text>Second</Text>
		<Separator />
		<Text>Third</Text>
	</Stack>
{:else if story === "variants"}
	<Stack gap={2}>
		{#each separatorVariants as variant}
			<Separator {variant} />
		{/each}
	</Stack>
{:else if story === "sizes"}
	<Stack gap={4}>
		{#each separatorSizes as size}
			<Stack gap={1}>
				<Text size="xs" class="text-fg-muted">{size}</Text>
				<Separator {size} />
			</Stack>
		{/each}
	</Stack>
{:else if story === "label"}
	<Stack gap={2}>
		<Group gap={2} class="items-center">
			<Text class="shrink-0">Label (start)</Text>
			<Separator class="flex-1" />
		</Group>
		<Group gap={2} class="items-center">
			<Separator class="flex-1" />
			<Text class="shrink-0">Label (end)</Text>
		</Group>
		<Group gap={2} class="items-center">
			<Separator />
			<Text class="shrink-0">Label (center)</Text>
			<Separator />
		</Group>
	</Stack>
{:else if story === "vertical"}
	<Group gap={4} class="items-center">
		<Text>First</Text>
		<Separator orientation="vertical" />
		<Text>Second</Text>
	</Group>
{:else if story === "colours"}
	<Stack gap={2} class="items-start">
		{#each colours as colour}
			<Group gap={10} class="items-center px-4">
				<Text class="min-w-[8ch]">{colour}</Text>
				<Separator class="w-32" {colour} />
			</Group>
		{/each}
	</Stack>
{/if}
