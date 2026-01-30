<script lang="ts" module>
	// Wrapper components for complex Pagination stories
	// These are imported by Pagination.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { Pagination } from "$saas/components/pagination";
	import { Stack, HStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import { colours, paginationSizes, paginationVariants } from "../../utils";

	const items = new Array(50)
		.fill(0)
		.map((_, index) => `Lorem ipsum dolor sit amet ${index + 1}`);

	interface Props {
		story:
			| "basic"
			| "sizes"
			| "variants"
			| "siblingCount"
			| "controlled"
			| "compact"
			| "attached"
			| "countText"
			| "asLink"
			| "dataDriven"
			| "colours";
	}

	let { story }: Props = $props();

	let controlledPage = $state(5);
	let dataDrivenPage = $state(1);

	const dataPageSize = 5;
	$effect(() => {
		if (dataDrivenPage < 1) dataDrivenPage = 1;
	});

	const visibleItems = $derived(() => {
		const startRange = (dataDrivenPage - 1) * dataPageSize;
		const endRange = startRange + dataPageSize;
		return items.slice(startRange, endRange);
	});
</script>

{#if story === "basic"}
	<Pagination count={100} pageSize={10} defaultPage={1} />
{:else if story === "sizes"}
	<Stack gap={8}>
		{#each paginationSizes as size}
			<HStack align="center" gap={4}>
				<Text size="xs" class="min-w-[3ch]">{size}</Text>
				<Pagination
					count={50}
					pageSize={10}
					defaultPage={1}
					{size}
					aria-label="{size} size pagination"
				/>
			</HStack>
		{/each}
	</Stack>
{:else if story === "variants"}
	<Stack gap={8}>
		{#each paginationVariants as variant}
			<HStack align="center" gap={4}>
				<Text size="xs" class="min-w-[8ch] capitalize">{variant}</Text>
				<Pagination
					count={100}
					pageSize={10}
					defaultPage={1}
					{variant}
					aria-label="{variant} variant pagination"
				/>
			</HStack>
		{/each}
	</Stack>
{:else if story === "siblingCount"}
	<Pagination count={200} pageSize={10} defaultPage={10} siblingCount={2} />
{:else if story === "controlled"}
	<Pagination
		count={100}
		pageSize={10}
		page={controlledPage}
		onPageChange={(e) => (controlledPage = e.page)}
	/>
{:else if story === "compact"}
	<Pagination count={20} pageSize={2} defaultPage={1} compact />
{:else if story === "attached"}
	<Pagination count={10} pageSize={2} defaultPage={1} variant="solid" attached />
{:else if story === "countText"}
	<Pagination count={50} pageSize={5} defaultPage={1} pageTextFormat="long" class="max-w-60" />
{:else if story === "asLink"}
	<Pagination count={20} pageSize={2} defaultPage={1} type="link" getHref={(page) => `?page=${page}`} />
{:else if story === "dataDriven"}
	<Stack gap={4}>
		<Stack gap={2}>
			{#each visibleItems() as item}
				<Text>{item}</Text>
			{/each}
		</Stack>
		<Pagination
			page={dataDrivenPage}
			count={items.length}
			pageSize={dataPageSize}
			onPageChange={(e) => (dataDrivenPage = e.page)}
		/>
	</Stack>
{:else if story === "colours"}
	<Stack gap={4}>
		{#each colours as colour}
			<HStack align="center" gap={4}>
				<Text size="xs" class="min-w-[8ch] capitalize">{colour}</Text>
				<Pagination
					count={50}
					pageSize={10}
					defaultPage={1}
					variant="solid"
					{colour}
					aria-label="{colour} colour pagination"
				/>
			</HStack>
		{/each}
	</Stack>
{/if}
