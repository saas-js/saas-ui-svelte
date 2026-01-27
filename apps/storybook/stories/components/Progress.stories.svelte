<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Progress } from "$saas/components/progress";
	import { Stack } from "$saas/layout/stack";
	import { Group } from "$saas/layout/group";
	import { Text } from "$saas/typography/text";
	import {
		commonArgTypes,
		getControls,
		colours,
		progressSizes,
		progressVariants,
		progressShapes,
	} from "../utils";

	const { Story } = defineMeta({
		title: "components/Progress",
		component: Progress.Root,
		argTypes: {
			value: {
				control: { type: "number", min: 0, max: 100 },
				description:
					"The current value of the progress (0-100). Set to null for indeterminate.",
				table: { defaultValue: { summary: "50" } },
			},
			min: {
				control: "number",
				description: "The minimum value.",
				table: { defaultValue: { summary: "0" } },
			},
			max: {
				control: "number",
				description: "The maximum value.",
				table: { defaultValue: { summary: "100" } },
			},
			size: {
				...commonArgTypes.size,
				options: progressSizes,
			},
			variant: {
				...commonArgTypes.variant,
				options: progressVariants,
			},
			shape: {
				control: "select",
				options: progressShapes,
				description: "The shape of the progress bar.",
				table: { defaultValue: { summary: "rounded" } },
			},
			colour: commonArgTypes.colour,
			striped: {
				control: "boolean",
				description: "Whether to show stripes on the progress bar.",
				table: { defaultValue: { summary: "false" } },
			},
			animated: {
				control: "boolean",
				description: "Whether to animate the stripes.",
				table: { defaultValue: { summary: "false" } },
			},
			class: commonArgTypes.class,
			children: commonArgTypes.children,
		},
		parameters: {
			controls: getControls([
				"value",
				"min",
				"max",
				"size",
				"variant",
				"shape",
				"colour",
				"striped",
				"animated",
				"class",
			]),
		},
		args: {
			value: 50,
			size: "md",
			variant: "outline",
			shape: "rounded",
			colour: "accent",
			striped: false,
			animated: false,
		},
	});
</script>

{#snippet basicStory(args: any)}
	<Progress.Root class="max-w-60" {...args}>
		<Progress.Track>
			<Progress.Range />
		</Progress.Track>
	</Progress.Root>
{/snippet}

{#snippet sizesStory()}
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
{/snippet}

{#snippet variantsStory()}
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
{/snippet}

{#snippet shapesStory()}
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
{/snippet}

{#snippet coloursStory()}
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
{/snippet}

{#snippet inlineLabelStory()}
	<Progress.Root class="max-w-sm" value={40}>
		<Stack direction="row" gap={5} class="items-center">
			<Progress.Label class="mb-0">Usage</Progress.Label>
			<Progress.Track class="flex-1">
				<Progress.Range />
			</Progress.Track>
			<Progress.ValueText>40%</Progress.ValueText>
		</Stack>
	</Progress.Root>
{/snippet}

{#snippet withLabelStory()}
	<Progress.Root class="max-w-60" value={50}>
		<Progress.Label class="mb-2">Uploading</Progress.Label>
		<Progress.Track>
			<Progress.Range />
		</Progress.Track>
	</Progress.Root>
{/snippet}

{#snippet withInfoTipStory()}
	<Progress.Root class="max-w-60" value={50}>
		<Progress.Label class="mb-2" info="Uploading document to the server">
			Uploading
		</Progress.Label>
		<Progress.Track>
			<Progress.Range />
		</Progress.Track>
	</Progress.Root>
{/snippet}

{#snippet indeterminateStory()}
	<Progress.Root class="max-w-60" value={null}>
		<Progress.Track>
			<Progress.Range />
		</Progress.Track>
	</Progress.Root>
{/snippet}

{#snippet stripesStory()}
	<Progress.Root class="max-w-60" value={50} striped>
		<Progress.Track>
			<Progress.Range />
		</Progress.Track>
	</Progress.Root>
{/snippet}

{#snippet animatedStripesStory()}
	<Progress.Root class="max-w-60" value={50} striped animated>
		<Progress.Track>
			<Progress.Range />
		</Progress.Track>
	</Progress.Root>
{/snippet}

{#snippet valuesStory()}
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
{/snippet}

{#snippet rangeColoursStory()}
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
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="Variants" template={variantsStory} />

<Story name="Shapes" template={shapesStory} />

<Story name="Colours" template={coloursStory} />

<Story name="With Label" template={withLabelStory} />

<Story name="Inline Label" template={inlineLabelStory} />

<Story name="With Info Tip" template={withInfoTipStory} />

<Story name="Indeterminate" template={indeterminateStory} />

<Story name="Stripes" template={stripesStory} />

<Story name="Animated Stripes" template={animatedStripesStory} />

<Story name="Values" template={valuesStory} />

<Story name="Range Colours" template={rangeColoursStory} />
