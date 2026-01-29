<script lang="ts" module>
	// Wrapper components for complex EmptyState stories
	// These are imported by EmptyState.stories.ts for stories that need loops/snippets
</script>

<script lang="ts">
	import { EmptyState } from "$saas/components/empty-state";
	import { Button } from "$saas/components/button";
	import { List } from "$saas/components/list";
	import { Stack } from "$saas/layout/stack";
	import ShoppingCart from "phosphor-svelte/lib/ShoppingCart";
	import PaintBrush from "phosphor-svelte/lib/PaintBrush";
	import MagnifyingGlass from "phosphor-svelte/lib/MagnifyingGlass";
	import File from "phosphor-svelte/lib/File";
	import Users from "phosphor-svelte/lib/Users";

	const colours = [
		"gray",
		"red",
		"orange",
		"yellow",
		"green",
		"teal",
		"blue",
		"cyan",
		"purple",
		"pink",
		"rose",
	] as const;

	const emptyStateSizes = ["sm", "md", "lg"] as const;
	const emptyStateAlignOptions = ["centre", "start", "end"] as const;

	interface Props {
		story: "basic" | "withAction" | "withList" | "sizes" | "alignment" | "colours";
	}

	let { story }: Props = $props();
</script>

{#if story === "basic"}
	<EmptyState
		icon={ShoppingCart}
		title="Your cart is empty"
		description="Explore our products and add items to your cart"
		colour="indigo"
	/>
{:else if story === "withAction"}
	<EmptyState
		icon={PaintBrush}
		title="Start adding tokens"
		description="Add a new design token to get started"
		colour="indigo"
	>
		<Button variant="outline">Create token</Button>
		<Button variant="solid">Import</Button>
	</EmptyState>
{:else if story === "withList"}
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
{:else if story === "sizes"}
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
{:else if story === "alignment"}
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
{:else if story === "colours"}
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
{/if}
