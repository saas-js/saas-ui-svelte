<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Pagination } from "$saas/components/pagination";
	import { Stack, HStack } from "$saas/layout/stack";
	import { Text } from "$saas/typography/text";
	import {
		commonArgTypes,
		getControls,
		colours,
		paginationSizes,
		paginationVariants,
		paginationLabelVariants,
		paginationTypes,
	} from "../utils";

	const { Story } = defineMeta({
		title: "components/Pagination",
		component: Pagination,
		parameters: {
			controls: getControls([
				"count",
				"pageSize",
				"defaultPage",
				"siblingCount",
				"size",
				"variant",
				"colour",
				"compact",
				"pageTextFormat",
				"attached",
				"type",
				"class",
			]),
		},
		argTypes: {
			count: {
				control: "number",
				description: "Total number of data items.",
			},
			pageSize: {
				control: "number",
				description: "Number of data items per page.",
				table: { defaultValue: { summary: "10" } },
			},
			defaultPage: {
				control: "number",
				description: "The initial active page when uncontrolled.",
				table: { defaultValue: { summary: "1" } },
			},
			siblingCount: {
				control: "number",
				description: "Number of pages to show beside active page.",
				table: { defaultValue: { summary: "1" } },
			},
			size: {
				...commonArgTypes.size,
				options: paginationSizes,
			},
			variant: {
				...commonArgTypes.variant,
				options: paginationVariants,
				table: { defaultValue: { summary: "ghost" } },
			},
			colour: {
				...commonArgTypes.colour,
				options: colours,
			},
			compact: {
				control: "boolean",
				description:
					"Whether to show compact page text instead of page items.",
				table: { defaultValue: { summary: "false" } },
			},
			pageTextFormat: {
				control: "select",
				options: paginationLabelVariants,
				description:
					'The format of the page text. "short" shows "1 of 7", "long" shows "1 - 5 of 50".',
				table: { defaultValue: { summary: "short" } },
			},
			attached: {
				control: "boolean",
				description: "Whether items should be visually attached.",
				table: { defaultValue: { summary: "false" } },
			},
			type: {
				control: "select",
				options: paginationTypes,
				description: "The type of the trigger element.",
				table: { defaultValue: { summary: "button" } },
			},
			class: commonArgTypes.class,
		},
		args: {
			count: 100,
			pageSize: 10,
			defaultPage: 1,
			siblingCount: 1,
			size: "md",
			variant: "ghost",
			colour: "gray",
			compact: false,
			pageTextFormat: "short",
			attached: false,
			type: "button",
		},
	});

	const items = new Array(50)
		.fill(0)
		.map((_, index) => `Lorem ipsum dolor sit amet ${index + 1}`);
</script>

<script lang="ts">
	let controlledPage = $state(5);
	let dataDrivenPage = $state(1);

	const dataPageSize = 5;
	$effect(() => {
		// Keep page in bounds
		if (dataDrivenPage < 1) dataDrivenPage = 1;
	});

	const visibleItems = $derived(() => {
		const startRange = (dataDrivenPage - 1) * dataPageSize;
		const endRange = startRange + dataPageSize;
		return items.slice(startRange, endRange);
	});
</script>

{#snippet basicStory(args: any)}
	<Pagination {...args} />
{/snippet}

{#snippet sizesStory()}
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
{/snippet}

{#snippet variantsStory()}
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
{/snippet}

{#snippet siblingCountStory()}
	<Pagination count={200} pageSize={10} defaultPage={10} siblingCount={2} />
{/snippet}

{#snippet controlledStory()}
	<Pagination
		count={100}
		pageSize={10}
		page={controlledPage}
		onPageChange={(e) => (controlledPage = e.page)}
	/>
{/snippet}

{#snippet compactStory()}
	<Pagination count={20} pageSize={2} defaultPage={1} compact />
{/snippet}

{#snippet attachedStory()}
	<Pagination
		count={10}
		pageSize={2}
		defaultPage={1}
		variant="solid"
		attached
	/>
{/snippet}

{#snippet countTextStory()}
	<Pagination
		count={50}
		pageSize={5}
		defaultPage={1}
		pageTextFormat="long"
		class="max-w-60"
	/>
{/snippet}

{#snippet asLinkStory()}
	<Pagination
		count={20}
		pageSize={2}
		defaultPage={1}
		type="link"
		getHref={(page) => `?page=${page}`}
	/>
{/snippet}

{#snippet dataDrivenStory()}
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
{/snippet}

{#snippet coloursStory()}
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
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="Variants" template={variantsStory} />

<Story name="Sibling Count" template={siblingCountStory} />

<Story name="Controlled" template={controlledStory} />

<Story name="Compact" template={compactStory} />

<Story name="Attached" template={attachedStory} />

<Story name="Count Text" template={countTextStory} />

<Story name="As Link" template={asLinkStory} />

<Story name="Data Driven" template={dataDrivenStory} />

<Story name="Colours" template={coloursStory} />
