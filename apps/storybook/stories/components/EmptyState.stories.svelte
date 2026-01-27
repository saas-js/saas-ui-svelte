<script module lang="ts">
	import { defineMeta } from "@storybook/addon-svelte-csf";
	import { EmptyState } from "$saas/components/empty-state";
	import { Button } from "$saas/components/button";
	import { List } from "$saas/components/list";
	import { Stack } from "$saas/layout/stack";
	import ShoppingCart from "phosphor-svelte/lib/ShoppingCart";
	import PaintBrush from "phosphor-svelte/lib/PaintBrush";
	import MagnifyingGlass from "phosphor-svelte/lib/MagnifyingGlass";
	import File from "phosphor-svelte/lib/File";
	import Users from "phosphor-svelte/lib/Users";
	import {
		commonArgTypes,
		getControls,
		colours,
		emptyStateSizes,
		emptyStateAlignOptions,
	} from "../utils";

	const { Story } = defineMeta({
		title: "components/Empty State",
		component: EmptyState,
		argTypes: {
			size: {
				...commonArgTypes.size,
				options: emptyStateSizes,
				table: { defaultValue: { summary: "md" } },
			},
			align: {
				control: "select",
				options: emptyStateAlignOptions,
				description: "The alignment of the empty state content.",
				table: { defaultValue: { summary: "centre" } },
			},
			colour: commonArgTypes.colour,
			icon: commonArgTypes.icon,
			title: {
				control: "text",
				description: "The title text to display.",
			},
			description: {
				control: "text",
				description: "The description text to display.",
			},
			children: commonArgTypes.children,
			class: commonArgTypes.class,
		},
		parameters: {
			controls: getControls([
				"size",
				"align",
				"colour",
				"icon",
				"title",
				"description",
				"children",
				"class",
			]),
		},
		args: {
			size: "md",
			align: "centre",
			colour: "indigo",
			title: "Your cart is empty",
			description: "Explore our products and add items to your cart",
		},
	});
</script>

{#snippet basicStory(args: any)}
	<EmptyState icon={ShoppingCart} {...args} />
{/snippet}

{#snippet withActionStory()}
	<EmptyState
		icon={PaintBrush}
		title="Start adding tokens"
		description="Add a new design token to get started"
		colour="indigo"
	>
		<Button variant="outline">Create token</Button>
		<Button variant="solid">Import</Button>
	</EmptyState>
{/snippet}

{#snippet withListStory()}
	<EmptyState
		icon={MagnifyingGlass}
		title="No results found"
		description="Try adjusting your search"
		colour="indigo"
	>
		<List.Root variant="marker">
			<List.Item>Try removing filters</List.Item>
			<List.Item>Try different keywords</List.Item>
		</List.Root>
	</EmptyState>
{/snippet}

{#snippet sizesStory()}
	<Stack gap={8} class="w-full">
		{#each emptyStateSizes as size}
			<div class="border border-border-default rounded-md">
				<EmptyState
					icon={File}
					title="No documents"
					description="Upload your first document to get started"
					colour="blue"
					{size}
				/>
			</div>
		{/each}
	</Stack>
{/snippet}

{#snippet alignmentStory()}
	<Stack gap={4} class="w-full">
		{#each emptyStateAlignOptions as align}
			<div class="border border-border-default rounded-md">
				<EmptyState
					icon={Users}
					title="No team members"
					description="Invite people to collaborate on your project"
					colour="green"
					{align}
				>
					<Button variant="solid">Invite members</Button>
				</EmptyState>
			</div>
		{/each}
	</Stack>
{/snippet}

{#snippet coloursStory()}
	<Stack gap={4} class="w-full">
		{#each colours as colour}
			<div class="border border-border-default rounded-md">
				<EmptyState
					icon={ShoppingCart}
					title="Empty state with {colour}"
					description="This is a {colour} colored empty state"
					{colour}
					size="sm"
				/>
			</div>
		{/each}
	</Stack>
{/snippet}

<Story name="Basic" template={basicStory} />

<Story name="With Action" template={withActionStory} />

<Story name="With List" template={withListStory} />

<Story name="Sizes" template={sizesStory} />

<Story name="Alignment" template={alignmentStory} />

<Story name="Colours" template={coloursStory} />
