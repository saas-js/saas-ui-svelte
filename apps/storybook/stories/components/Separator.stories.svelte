<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Separator } from "$saas/components/separator";
	import { Stack } from "$saas/layout/stack";
	import { Group } from "$saas/layout/group";
	import { Text } from "$saas/typography/text";
	import {
		commonArgTypes,
		getControls,
		colours,
		separatorSizes,
		separatorVariants,
		separatorOrientations,
	} from "../utils";

	const { Story } = defineMeta({
		title: "components/Separator",
		component: Separator,
		argTypes: {
			orientation: {
				control: "select",
				options: separatorOrientations,
				description: "The orientation of the separator.",
				table: { defaultValue: { summary: "horizontal" } },
			},
			variant: {
				control: "select",
				options: separatorVariants,
				description: "The visual variant of the separator.",
				table: { defaultValue: { summary: "solid" } },
			},
			size: {
				control: "select",
				options: separatorSizes,
				description: "The thickness of the separator.",
				table: { defaultValue: { summary: "sm" } },
			},
			colour: commonArgTypes.colour,
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls([
				"orientation",
				"variant",
				"size",
				"colour",
				"class",
			]),
		},
		args: {
			orientation: "horizontal",
			variant: "solid",
			size: "sm",
		},
	});
</script>

{#snippet basicStory(args: any)}
	<Stack gap={2}>
		<Text>First</Text>
		<Separator {...args} />
		<Text>Second</Text>
		<Separator {...args} />
		<Text>Third</Text>
	</Stack>
{/snippet}

{#snippet variantsStory()}
	<Stack gap={2}>
		{#each separatorVariants as variant}
			<Separator {variant} />
		{/each}
	</Stack>
{/snippet}

{#snippet sizesStory()}
	<Stack gap={4}>
		{#each separatorSizes as size}
			<Stack gap={1}>
				<Text size="xs" class="text-fg-muted">{size}</Text>
				<Separator {size} />
			</Stack>
		{/each}
	</Stack>
{/snippet}

{#snippet labelStartStory()}
	<Group gap={2} class="items-center">
		<Text class="shrink-0">Label (start)</Text>
		<Separator class="flex-1" />
	</Group>
{/snippet}

{#snippet labelEndStory()}
	<Group gap={2} class="items-center">
		<Separator class="flex-1" />
		<Text class="shrink-0">Label (end)</Text>
	</Group>
{/snippet}

{#snippet labelCenterStory()}
	<Group gap={2} class="items-center">
		<Separator class="flex-1" />
		<Text class="shrink-0">Label (center)</Text>
		<Separator class="flex-1" />
	</Group>
{/snippet}

{#snippet labelStory()}
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
{/snippet}

{#snippet verticalStory()}
	<Group gap={4} class="items-center">
		<Text>First</Text>
		<Separator orientation="vertical" />
		<Text>Second</Text>
	</Group>
{/snippet}

{#snippet coloursStory()}
	<Stack gap={2} class="items-start">
		{#each colours as colour}
			<Group gap={10} class="items-center px-4">
				<Text class="min-w-[8ch]">{colour}</Text>
				<Separator class="w-32" {colour} />
			</Group>
		{/each}
	</Stack>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Variants" template={variantsStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="Label" template={labelStory} />

<Story name="Vertical" template={verticalStory} />

<Story name="Colours" template={coloursStory} />
