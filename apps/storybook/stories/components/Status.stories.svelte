<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Status } from "$saas/components/status";
	import { HStack, VStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import {
		commonArgTypes,
		getControls,
		colours,
		statusSizes,
		statusValues,
	} from "../utils";

	const { Story } = defineMeta({
		title: "components/Status",
		component: Status,
		argTypes: {
			value: {
				control: "select",
				options: statusValues,
				description:
					"The status value determining the indicator colour.",
				table: {
					defaultValue: { summary: "info" },
				},
			},
			size: {
				control: "select",
				options: statusSizes,
				description: "The size of the status indicator.",
				table: {
					defaultValue: { summary: "md" },
				},
			},
			colour: {
				control: "select",
				options: colours,
				description: "The colour palette to use for the indicator.",
			},
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls(["value", "size", "colour", "class"]),
		},
		args: {
			value: "info",
			size: "md",
		},
	});
</script>

{#snippet basicStory(args: any)}
	<Status {...args}>Status</Status>
{/snippet}

{#snippet valuesStory()}
	<HStack gap={6}>
		<Status value="error" />
		<Status value="info" />
		<Status value="warning" />
		<Status value="success" />
	</HStack>
{/snippet}

{#snippet labelStory()}
	<HStack gap={6}>
		<Status value="error">Error</Status>
		<Status value="info">Info</Status>
		<Status value="warning">Warning</Status>
		<Status value="success">Success</Status>
	</HStack>
{/snippet}

{#snippet sizesStory()}
	<VStack gap={2} align="start">
		{#each statusSizes as size}
			<HStack gap={10} class="px-4">
				<Status {size} class="w-24" value="warning">In Review</Status>
				<Status {size} class="w-24" value="error">Error</Status>
				<Status {size} class="w-24" value="success">Approved</Status>
			</HStack>
		{/each}
	</VStack>
{/snippet}

{#snippet coloursStory()}
	<VStack gap={4}>
		{#each colours as colour}
			<HStack gap={4} class="items-center">
				<Text size="xs" class="w-16">{colour}</Text>
				<Status {colour}>Active</Status>
			</HStack>
		{/each}
	</VStack>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Values" template={valuesStory} />

<Story name="Label" template={labelStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="Colours" template={coloursStory} />
