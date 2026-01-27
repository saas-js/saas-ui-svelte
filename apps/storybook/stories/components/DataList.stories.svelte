<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { DataList } from "$saas/components/data-list";
	import { Stack, HStack, VStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import {
		commonArgTypes,
		getControls,
		orientations,
		dataListSizes,
	} from "../utils";

	const { Story } = defineMeta({
		title: "components/Data List",
		component: DataList.Root,
		argTypes: {
			size: {
				...commonArgTypes.size,
				options: dataListSizes,
				table: { defaultValue: { summary: "md" } },
			},
			orientation: {
				control: "select",
				options: orientations,
				table: { defaultValue: { summary: "horizontal" } },
			},
			divider: {
				control: "boolean",
				table: { defaultValue: { summary: "false" } },
			},
			colour: commonArgTypes.colour,
			class: commonArgTypes.class,
			children: commonArgTypes.children,
		},
		parameters: {
			controls: getControls([
				"size",
				"orientation",
				"divider",
				"colour",
				"class",
			]),
		},
		args: {
			size: "md",
			orientation: "horizontal",
			divider: false,
		},
	});

	export { DataList };

	const stats = [
		{ label: "New Users", value: "234" },
		{ label: "Sales", value: "£12,340" },
		{ label: "Revenue", value: "3,450" },
	];

	const items = [
		{ label: "First Name", value: "Jassie" },
		{ label: "Last Name", value: "Bhatia" },
		{ label: "Email", value: "jassie@jassie.dev" },
		{ label: "Phone", value: "1234567890" },
		{ label: "Address", value: "1234 Main St, Anytown, USA" },
	];
</script>

{#snippet basicStory(args: any)}
	<DataList.Root {...args}>
		{#each stats as item}
			<DataList.Item>
				<DataList.ItemLabel>{item.label}</DataList.ItemLabel>
				<DataList.ItemValue>{item.value}</DataList.ItemValue>
			</DataList.Item>
		{/each}
	</DataList.Root>
{/snippet}

{#snippet sizesStory()}
	<VStack align="start" gap={4}>
		{#each dataListSizes as size}
			<HStack gap={4} class="items-center">
				<Text size="xs" class="min-w-[3ch]">{size}</Text>
				<DataList.Root {size}>
					<DataList.Item>
						<DataList.ItemLabel>Name</DataList.ItemLabel>
						<DataList.ItemValue>John Doe</DataList.ItemValue>
					</DataList.Item>
				</DataList.Root>
			</HStack>
		{/each}
	</VStack>
{/snippet}

{#snippet orientationStory()}
	<DataList.Root orientation="horizontal">
		{#each stats as item}
			<DataList.Item>
				<DataList.ItemLabel>{item.label}</DataList.ItemLabel>
				<DataList.ItemValue>{item.value}</DataList.ItemValue>
			</DataList.Item>
		{/each}
	</DataList.Root>
{/snippet}

{#snippet verticalStory()}
	<DataList.Root orientation="vertical">
		{#each stats.slice(0, 2) as item}
			<DataList.Item>
				<DataList.ItemLabel>{item.label}</DataList.ItemLabel>
				<DataList.ItemValue>{item.value}</DataList.ItemValue>
			</DataList.Item>
		{/each}
	</DataList.Root>
{/snippet}

{#snippet dividerStory()}
	<DataList.Root orientation="horizontal" divider class="max-w-md">
		{#each items as item (item.label)}
			<DataList.Item>
				<DataList.ItemLabel>{item.label}</DataList.ItemLabel>
				<DataList.ItemValue>{item.value}</DataList.ItemValue>
			</DataList.Item>
		{/each}
	</DataList.Root>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="Orientation" template={orientationStory} />

<Story name="Vertical" template={verticalStory} />

<Story name="With Divider" template={dividerStory} />
