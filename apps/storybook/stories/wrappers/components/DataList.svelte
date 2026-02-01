<script lang="ts" module>
	// Wrapper components for complex DataList stories
	// These are imported by DataList.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { DataList } from "$saas/components/data-list";
	import { HStack, VStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";

	const dataListSizes = ["sm", "md", "lg"] as const;

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

	interface Props {
		story: "basic" | "sizes" | "orientation" | "vertical" | "withDivider";
	}

	let { story }: Props = $props();
</script>

{#if story === "basic"}
	<DataList.Root>
		{#each stats as item}
			<DataList.Item>
				<DataList.ItemLabel>{item.label}</DataList.ItemLabel>
				<DataList.ItemValue>{item.value}</DataList.ItemValue>
			</DataList.Item>
		{/each}
	</DataList.Root>
{:else if story === "sizes"}
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
{:else if story === "orientation"}
	<DataList.Root orientation="horizontal">
		{#each stats as item}
			<DataList.Item>
				<DataList.ItemLabel>{item.label}</DataList.ItemLabel>
				<DataList.ItemValue>{item.value}</DataList.ItemValue>
			</DataList.Item>
		{/each}
	</DataList.Root>
{:else if story === "vertical"}
	<DataList.Root orientation="vertical">
		{#each stats.slice(0, 2) as item}
			<DataList.Item>
				<DataList.ItemLabel>{item.label}</DataList.ItemLabel>
				<DataList.ItemValue>{item.value}</DataList.ItemValue>
			</DataList.Item>
		{/each}
	</DataList.Root>
{:else if story === "withDivider"}
	<DataList.Root orientation="horizontal" divider class="max-w-md">
		{#each items as item (item.label)}
			<DataList.Item>
				<DataList.ItemLabel>{item.label}</DataList.ItemLabel>
				<DataList.ItemValue>{item.value}</DataList.ItemValue>
			</DataList.Item>
		{/each}
	</DataList.Root>
{/if}
