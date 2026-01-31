<script lang="ts">
import { onMount, tick } from "svelte";
import { Dialog } from "@saas-ui/svelte/components/dialog";
import { Kbd } from "@saas-ui/svelte/components/kbd";
import { Separator } from "@saas-ui/svelte/components/separator";
import { Highlight } from "@saas-ui/svelte/typography/highlight";
import MagnifyingGlassIcon from "phosphor-svelte/lib/MagnifyingGlass";
import {
	getSearchDialogOpen,
	setSearchDialogOpen,
} from "../lib/search-dialog.svelte";
import {
	getSearchItems,
	filterSearchItems,
	groupSearchItems,
	type SearchItem,
} from "../lib/search-data";

let dialogOpen = $derived(getSearchDialogOpen());
let inputValue = $state("");
let inputRef: HTMLInputElement | null = $state(null);
let selectedIndex = $state(-1);
let resultsRef: HTMLDivElement | null = $state(null);

const allItems = getSearchItems();

// Reset dialog state on mount (handles page navigation)
onMount(() => {
	setSearchDialogOpen(false);
});

const filteredItems = $derived(filterSearchItems(allItems, inputValue));
const groupedItems = $derived(groupSearchItems(filteredItems));

// Flatten grouped items for keyboard navigation (respecting the 10-item limit per group)
const flatItems = $derived(
	groupedItems.flatMap((group) => group.items.slice(0, 10))
);

// Reset selection when filtered items change
$effect(() => {
	filteredItems;
	selectedIndex = -1;
});

async function scrollSelectedIntoView() {
	await tick();
	if (resultsRef && selectedIndex >= 0) {
		const selectedButton = resultsRef.querySelectorAll("button")[selectedIndex];
		selectedButton?.scrollIntoView({ block: "nearest" });
	}
}

function handleInputKeydown(e: KeyboardEvent) {
	const itemCount = flatItems.length;

	switch (e.key) {
		case "ArrowDown":
			e.preventDefault();
			if (itemCount > 0) {
				selectedIndex = selectedIndex < itemCount - 1 ? selectedIndex + 1 : 0;
				scrollSelectedIntoView();
			}
			break;
		case "ArrowUp":
			e.preventDefault();
			if (itemCount > 0) {
				selectedIndex = selectedIndex > 0 ? selectedIndex - 1 : itemCount - 1;
				scrollSelectedIntoView();
			}
			break;
		case "Home":
			e.preventDefault();
			if (itemCount > 0) {
				selectedIndex = 0;
				scrollSelectedIntoView();
			}
			break;
		case "End":
			e.preventDefault();
			if (itemCount > 0) {
				selectedIndex = itemCount - 1;
				scrollSelectedIntoView();
			}
			break;
		case "Enter":
			e.preventDefault();
			if (selectedIndex >= 0 && selectedIndex < itemCount) {
				handleSelect(flatItems[selectedIndex]);
			}
			break;
	}
}

function handleKeydown(e: KeyboardEvent) {
	if ((e.metaKey || e.ctrlKey) && e.key === "k") {
		e.preventDefault();
		setSearchDialogOpen(true);
	}
}

function handleSelect(item: SearchItem) {
	// Navigate immediately - onMount will reset state on the new page
	window.location.href = item.href;
}

function handleDialogOpenChange(details: { open: boolean }) {
	setSearchDialogOpen(details.open);
}

$effect(() => {
	if (dialogOpen && inputRef) {
		inputRef.focus();
	}
});
</script>

<svelte:window onkeydown={handleKeydown} />

<Dialog.Root
	open={dialogOpen}
	onOpenChange={handleDialogOpenChange}
	size="md"
	placement="top"
	motionPreset="slide-in-bottom"
	lazyMount
	unmountOnExit
>
	<Dialog.Content class="mx-4 mt-16 max-w-xl sm:mx-auto">
		<div class="flex flex-col gap-1 p-2">
			<!-- Search Input -->
			<div class="relative">
				<div
					class="text-fg-muted pointer-events-none absolute top-1/2 left-3 -translate-y-1/2"
				>
					<MagnifyingGlassIcon class="size-4" />
				</div>
				<input
					bind:this={inputRef}
					bind:value={inputValue}
					onkeydown={handleInputKeydown}
					type="text"
					placeholder="Search components, tokens..."
					class="text-fg-default placeholder:text-fg-muted h-10 w-full border-0 bg-transparent pr-16 pl-10 text-sm outline-none"
				/>
				<div class="absolute top-1/2 right-3 -translate-y-1/2">
					<Kbd size="sm">Esc</Kbd>
				</div>
			</div>

			<Separator class="border-border-subtle" />

			<!-- Results -->
			<div bind:this={resultsRef} class="max-h-80 overflow-y-auto">
				{#if filteredItems.length === 0}
					<div
						class="text-fg-muted flex min-h-32 items-center justify-center text-sm"
					>
						No results found for "{inputValue}"
					</div>
				{:else}
					{@const indexOffset = { value: 0 }}
					{#each groupedItems as group}
						{@const groupStartIndex = indexOffset.value}
						{@const _ = (indexOffset.value += Math.min(group.items.length, 10))}
						<div class="py-2">
							<div
								class="text-fg-muted px-2 py-1 text-xs font-medium tracking-wide uppercase"
							>
								{group.label}
							</div>
							{#each group.items.slice(0, 10) as item, i}
								{@const itemIndex = groupStartIndex + i}
								<button
									type="button"
									onclick={() => handleSelect(item)}
									class="hover:bg-bg-subtle focus:bg-bg-subtle flex w-full items-center gap-2 rounded px-2 py-2 text-left text-sm focus:outline-none {itemIndex === selectedIndex ? 'bg-bg-subtle' : ''}"
									data-selected={itemIndex === selectedIndex || undefined}
								>
									<span class="flex-1 truncate">
										<Highlight
											query={inputValue}
											text={item.label}
											ignoreCase
											variant="text"
										/>
									</span>
									{#if item.description}
										<span
											class="text-fg-muted max-w-32 truncate text-xs"
										>
											{item.description}
										</span>
									{/if}
								</button>
							{/each}
						</div>
					{/each}
				{/if}
			</div>
		</div>
	</Dialog.Content>
</Dialog.Root>
