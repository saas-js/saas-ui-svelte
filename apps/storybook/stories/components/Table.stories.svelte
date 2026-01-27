<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { Table } from "$saas/components/table";
	import { Pagination } from "$saas/components/pagination";
	import { VStack } from "$saas/layout/stack";
	import { Heading } from "$saas/typography/heading";
	import { Checkbox } from "$saas/components/checkbox";
	import {
		ActionBar,
		ActionBarSelectionTrigger,
		ActionBarSeparator,
	} from "$saas/components/action-bar";
	import { Button } from "$saas/components/button";
	import { Kbd } from "$saas/components/kbd";
	import {
		commonArgTypes,
		getControls,
		tableSizes,
		tableVariants,
	} from "../utils";

	const { Story } = defineMeta({
		title: "components/Table",
		component: Table.Root,
		argTypes: {
			size: {
				control: "select",
				options: tableSizes,
				description: "The size of the table.",
				table: {
					defaultValue: { summary: "md" },
				},
			},
			variant: {
				control: "select",
				options: tableVariants,
				description: "The visual variant of the table.",
				table: {
					defaultValue: { summary: "line" },
				},
			},
			interactive: {
				control: "boolean",
				description: "Enable row hover highlighting.",
				table: {
					defaultValue: { summary: "false" },
				},
			},
			stickyHeader: {
				control: "boolean",
				description: "Make the header sticky.",
				table: {
					defaultValue: { summary: "false" },
				},
			},
			striped: {
				control: "boolean",
				description: "Add zebra-stripe pattern to rows.",
				table: {
					defaultValue: { summary: "false" },
				},
			},
			showColumnBorder: {
				control: "boolean",
				description: "Show borders between columns.",
				table: {
					defaultValue: { summary: "false" },
				},
			},
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls([
				"size",
				"variant",
				"interactive",
				"stickyHeader",
				"striped",
				"showColumnBorder",
				"class",
			]),
		},
		args: {
			size: "md",
			variant: "line",
			interactive: false,
			stickyHeader: false,
			striped: false,
			showColumnBorder: false,
		},
	});

	const items = [
		{ id: 1, name: "Laptop", category: "Electronics", price: 999.99 },
		{
			id: 2,
			name: "Coffee Maker",
			category: "Home Appliances",
			price: 49.99,
		},
		{ id: 3, name: "Desk Chair", category: "Furniture", price: 150.0 },
		{ id: 4, name: "Smartphone", category: "Electronics", price: 799.99 },
		{ id: 5, name: "Headphones", category: "Accessories", price: 199.99 },
	];
</script>

<script lang="ts">
	let selection = $state<string[]>([]);

	const hasSelection = $derived(selection.length > 0);
	const indeterminate = $derived(
		hasSelection && selection.length < items.length,
	);
</script>

{#snippet basicStory(args: any)}
	<Table.Root {...args}>
		<Table.Header>
			<Table.Row>
				<Table.ColumnHeader>Product</Table.ColumnHeader>
				<Table.ColumnHeader>Category</Table.ColumnHeader>
				<Table.ColumnHeader textAlign="end">Price</Table.ColumnHeader>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each items as item (item.id)}
				<Table.Row>
					<Table.Cell>{item.name}</Table.Cell>
					<Table.Cell>{item.category}</Table.Cell>
					<Table.Cell textAlign="end">{item.price}</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
{/snippet}

{#snippet sizesStory()}
	<VStack gap={10}>
		{#each tableSizes as size}
			<Table.Root {size}>
				<Table.Header>
					<Table.Row>
						<Table.ColumnHeader>Product</Table.ColumnHeader>
						<Table.ColumnHeader>Category</Table.ColumnHeader>
						<Table.ColumnHeader textAlign="end"
							>Price</Table.ColumnHeader
						>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each items as item (item.id)}
						<Table.Row>
							<Table.Cell>{item.name}</Table.Cell>
							<Table.Cell>{item.category}</Table.Cell>
							<Table.Cell textAlign="end">{item.price}</Table.Cell
							>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		{/each}
	</VStack>
{/snippet}

{#snippet variantsStory()}
	<VStack gap={10}>
		{#each tableVariants as variant}
			<Table.Root size="sm" {variant}>
				<Table.Header>
					<Table.Row>
						<Table.ColumnHeader>Product</Table.ColumnHeader>
						<Table.ColumnHeader>Category</Table.ColumnHeader>
						<Table.ColumnHeader textAlign="end"
							>Price</Table.ColumnHeader
						>
					</Table.Row>
				</Table.Header>
				<Table.Body>
					{#each items as item (item.id)}
						<Table.Row>
							<Table.Cell>{item.name}</Table.Cell>
							<Table.Cell>{item.category}</Table.Cell>
							<Table.Cell textAlign="end">{item.price}</Table.Cell
							>
						</Table.Row>
					{/each}
				</Table.Body>
			</Table.Root>
		{/each}
	</VStack>
{/snippet}

{#snippet stripedStory()}
	<Table.Root size="sm" striped>
		<Table.Header>
			<Table.Row>
				<Table.ColumnHeader>Product</Table.ColumnHeader>
				<Table.ColumnHeader>Category</Table.ColumnHeader>
				<Table.ColumnHeader textAlign="end">Price</Table.ColumnHeader>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each items as item (item.id)}
				<Table.Row>
					<Table.Cell>{item.name}</Table.Cell>
					<Table.Cell>{item.category}</Table.Cell>
					<Table.Cell textAlign="end">{item.price}</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
{/snippet}

{#snippet columnBorderStory()}
	<Table.Root size="sm" showColumnBorder>
		<Table.Header>
			<Table.Row>
				<Table.ColumnHeader>Product</Table.ColumnHeader>
				<Table.ColumnHeader>Category</Table.ColumnHeader>
				<Table.ColumnHeader textAlign="end">Price</Table.ColumnHeader>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each items as item (item.id)}
				<Table.Row>
					<Table.Cell>{item.name}</Table.Cell>
					<Table.Cell>{item.category}</Table.Cell>
					<Table.Cell textAlign="end">{item.price}</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
{/snippet}

{#snippet overflowStory()}
	<Table.ScrollArea borderWidth="1px" maxW="36rem" rounded="md">
		<Table.Root size="sm" variant="outline" showOuterBorder={false}>
			<Table.Header>
				<Table.Row>
					<Table.ColumnHeader minW="400px">Product</Table.ColumnHeader
					>
					<Table.ColumnHeader minW="400px"
						>Category</Table.ColumnHeader
					>
					<Table.ColumnHeader minW="200px" textAlign="end"
						>Price</Table.ColumnHeader
					>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each items as item (item.id)}
					<Table.Row>
						<Table.Cell>{item.name}</Table.Cell>
						<Table.Cell>{item.category}</Table.Cell>
						<Table.Cell textAlign="end">{item.price}</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</Table.ScrollArea>
{/snippet}

{#snippet stickyHeaderStory()}
	<Table.ScrollArea borderWidth="1px" height="160px" rounded="md">
		<Table.Root
			size="sm"
			variant="outline"
			showOuterBorder={false}
			stickyHeader
		>
			<Table.Header>
				<Table.Row>
					<Table.ColumnHeader>Product</Table.ColumnHeader>
					<Table.ColumnHeader>Category</Table.ColumnHeader>
					<Table.ColumnHeader textAlign="end"
						>Price</Table.ColumnHeader
					>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each items as item (item.id)}
					<Table.Row>
						<Table.Cell>{item.name}</Table.Cell>
						<Table.Cell>{item.category}</Table.Cell>
						<Table.Cell textAlign="end">{item.price}</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
	</Table.ScrollArea>
{/snippet}

{#snippet interactiveStory()}
	<Table.Root size="sm" interactive>
		<Table.Header>
			<Table.Row>
				<Table.ColumnHeader>Product</Table.ColumnHeader>
				<Table.ColumnHeader>Category</Table.ColumnHeader>
				<Table.ColumnHeader textAlign="end">Price</Table.ColumnHeader>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each items as item (item.id)}
				<Table.Row>
					<Table.Cell>{item.name}</Table.Cell>
					<Table.Cell>{item.category}</Table.Cell>
					<Table.Cell textAlign="end">{item.price}</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
{/snippet}

{#snippet paginationStory()}
	<VStack gap={5} class="w-full">
		<Heading as="h2" size="lg">Products</Heading>
		<Table.Root size="sm" variant="outline" striped>
			<Table.Header>
				<Table.Row>
					<Table.ColumnHeader>Product</Table.ColumnHeader>
					<Table.ColumnHeader>Category</Table.ColumnHeader>
					<Table.ColumnHeader textAlign="end"
						>Price</Table.ColumnHeader
					>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each items as item (item.id)}
					<Table.Row>
						<Table.Cell>{item.name}</Table.Cell>
						<Table.Cell>{item.category}</Table.Cell>
						<Table.Cell textAlign="end">{item.price}</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
		<Pagination count={25} pageSize={5} size="sm" />
	</VStack>
{/snippet}

{#snippet columnGroupStory()}
	<Table.Root size="sm" variant="outline">
		<Table.ColumnGroup>
			<Table.Column htmlWidth="50%" />
			<Table.Column htmlWidth="40%" />
			<Table.Column />
		</Table.ColumnGroup>
		<Table.Header>
			<Table.Row>
				<Table.ColumnHeader>Product</Table.ColumnHeader>
				<Table.ColumnHeader>Category</Table.ColumnHeader>
				<Table.ColumnHeader textAlign="end">Price</Table.ColumnHeader>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each items as item (item.id)}
				<Table.Row>
					<Table.Cell>{item.name}</Table.Cell>
					<Table.Cell>{item.category}</Table.Cell>
					<Table.Cell textAlign="end">{item.price}</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>
{/snippet}

{#snippet actionBarStory()}
	<Table.Root size="sm">
		<Table.Header>
			<Table.Row>
				<Table.ColumnHeader class="w-6">
					<Checkbox.Root
						class="relative top-1"
						aria-label="Select all rows"
						checked={indeterminate
							? "indeterminate"
							: selection.length === items.length}
						onCheckedChange={() => {
							if (selection.length === items.length) {
								selection = [];
							} else {
								selection = items.map((item) => item.name);
							}
						}}
					/>
				</Table.ColumnHeader>
				<Table.ColumnHeader>Product</Table.ColumnHeader>
				<Table.ColumnHeader>Category</Table.ColumnHeader>
				<Table.ColumnHeader>Price</Table.ColumnHeader>
			</Table.Row>
		</Table.Header>
		<Table.Body>
			{#each items as item (item.id)}
				<Table.Row
					class={selection.includes(item.name) ? "bg-bg-subtle" : ""}
					data-selected={selection.includes(item.name)
						? ""
						: undefined}
				>
					<Table.Cell>
						<Checkbox.Root
							class="relative top-1"
							aria-label="Select row"
							checked={selection.includes(item.name)}
							onCheckedChange={(details) => {
								selection = details.checked
									? [...selection, item.name]
									: selection.filter(
											(name) => name !== item.name,
										);
							}}
						/>
					</Table.Cell>
					<Table.Cell>{item.name}</Table.Cell>
					<Table.Cell>{item.category}</Table.Cell>
					<Table.Cell>${item.price}</Table.Cell>
				</Table.Row>
			{/each}
		</Table.Body>
	</Table.Root>

	<ActionBar open={hasSelection}>
		<ActionBarSelectionTrigger>
			{selection.length} selected
		</ActionBarSelectionTrigger>
		<ActionBarSeparator />
		<Button variant="outline" size="sm">
			Delete <Kbd>⌫</Kbd>
		</Button>
		<Button variant="outline" size="sm">
			Share <Kbd>T</Kbd>
		</Button>
	</ActionBar>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="Variants" template={variantsStory} />

<Story name="Striped" template={stripedStory} />

<Story name="Column Border" template={columnBorderStory} />

<Story name="Overflow" template={overflowStory} />

<Story name="Sticky Header" template={stickyHeaderStory} />

<Story name="Interactive" template={interactiveStory} />

<Story name="Pagination" template={paginationStory} />

<Story name="Column Group" template={columnGroupStory} />

<Story name="Action Bar" template={actionBarStory} />
