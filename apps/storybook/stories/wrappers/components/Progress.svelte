<script lang="ts" module>
	// Wrapper components for complex Progress stories
	// These are imported by Progress.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { Progress } from "$saas/components/progress";
	import { Stack } from "$saas/layout/stack";
	import { Group } from "$saas/layout/group";
	import { Text } from "$saas/typography/text";
	import {
		colours,
		progressSizes,
		progressVariants,
		progressShapes,
	} from "../../utils";

	interface Props {
		story:
			| "basic"
			| "sizes"
			| "variants"
			| "shapes"
			| "colours"
			| "withLabel"
			| "inlineLabel"
			| "withInfoTip"
			| "indeterminate"
			| "stripes"
			| "animatedStripes"
			| "values"
			| "rangeColours";
	}

	let { story }: Props = $props();
</script>

{#if story === "basic"}
	<Progress.Root class="max-w-60" value={50}>
		<Progress.Track>
			<Progress.Range />
		</Progress.Track>
	</Progress.Root>
{:else if story === "sizes"}
	<Stack gap={4} class="max-w-60">
		{#each progressSizes as size}
			<Stack gap={1}>
				<Text size="xs" class="text-fg-muted">{size}</Text>
				<Progress.Root {size} value={50}>
					<Progress.Track>
						<Progress.Range />
					</Progress.Track>
				</Progress.Root>
			</Stack>
		{/each}
	</Stack>
{:else if story === "variants"}
	<Stack gap={4} class="max-w-52">
		{#each progressVariants as variant}
			<Stack gap={1}>
				<Text size="xs" class="text-fg-muted">{variant}</Text>
				<Progress.Root {variant} value={50}>
					<Progress.Track>
						<Progress.Range />
					</Progress.Track>
				</Progress.Root>
			</Stack>
		{/each}
	</Stack>
{:else if story === "shapes"}
	<Stack gap={4} class="max-w-60">
		{#each progressShapes as shape}
			<Stack gap={1}>
				<Text size="xs" class="text-fg-muted">{shape}</Text>
				<Progress.Root {shape} value={50}>
					<Progress.Track>
						<Progress.Range />
					</Progress.Track>
				</Progress.Root>
			</Stack>
		{/each}
	</Stack>
{:else if story === "colours"}
	<Stack gap={2} class="items-start">
		{#each colours as colour}
			<Group gap={10} class="items-center px-4">
				<Text class="min-w-[8ch]">{colour}</Text>
				<Progress.Root
					class="w-32"
					value={40}
					{colour}
					variant="outline"
				>
					<Progress.Track>
						<Progress.Range />
					</Progress.Track>
				</Progress.Root>
				<Progress.Root
					class="w-32"
					value={40}
					{colour}
					variant="subtle"
				>
					<Progress.Track>
						<Progress.Range />
					</Progress.Track>
				</Progress.Root>
			</Group>
		{/each}
	</Stack>
{:else if story === "withLabel"}
	<Progress.Root class="max-w-60" value={50}>
		<Progress.Label class="mb-2">Uploading</Progress.Label>
		<Progress.Track>
			<Progress.Range />
		</Progress.Track>
	</Progress.Root>
{:else if story === "inlineLabel"}
	<Progress.Root class="max-w-sm" value={40}>
		<Stack direction="row" gap={5} class="items-center">
			<Progress.Label class="mb-0">Usage</Progress.Label>
			<Progress.Track class="flex-1">
				<Progress.Range />
			</Progress.Track>
			<Progress.ValueText>40%</Progress.ValueText>
		</Stack>
	</Progress.Root>
{:else if story === "withInfoTip"}
	<Progress.Root class="max-w-60" value={50}>
		<Progress.Label class="mb-2" info="Uploading document to the server">
			Uploading
		</Progress.Label>
		<Progress.Track>
			<Progress.Range />
		</Progress.Track>
	</Progress.Root>
{:else if story === "indeterminate"}
	<Progress.Root class="max-w-60" value={null}>
		<Progress.Track>
			<Progress.Range />
		</Progress.Track>
	</Progress.Root>
{:else if story === "stripes"}
	<Progress.Root class="max-w-60" value={50} striped>
		<Progress.Track>
			<Progress.Range />
		</Progress.Track>
	</Progress.Root>
{:else if story === "animatedStripes"}
	<Progress.Root class="max-w-60" value={50} striped animated>
		<Progress.Track>
			<Progress.Range />
		</Progress.Track>
	</Progress.Root>
{:else if story === "values"}
	<Stack gap={4} class="max-w-60">
		{#each [0, 25, 50, 75, 100] as value}
			<Stack gap={1}>
				<Text size="xs" class="text-fg-muted">{value}%</Text>
				<Progress.Root {value}>
					<Progress.Track>
						<Progress.Range />
					</Progress.Track>
				</Progress.Root>
			</Stack>
		{/each}
	</Stack>
{:else if story === "rangeColours"}
	<Stack gap={4} class="max-w-60">
		<Progress.Root value={25} colour="red">
			<Progress.Track>
				<Progress.Range />
			</Progress.Track>
		</Progress.Root>
		<Progress.Root value={50} colour="amber">
			<Progress.Track>
				<Progress.Range />
			</Progress.Track>
		</Progress.Root>
		<Progress.Root value={75} colour="green">
			<Progress.Track>
				<Progress.Range />
			</Progress.Track>
		</Progress.Root>
		<Progress.Root value={100} colour="blue">
			<Progress.Track>
				<Progress.Range />
			</Progress.Track>
		</Progress.Root>
	</Stack>
{/if}
