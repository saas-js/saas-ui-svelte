<script lang="ts">
import { onMount, tick } from "svelte";
import { Dialog } from "@saas-ui/svelte/components/dialog";
import { Icon } from "@saas-ui/svelte/components/icon";
import { Kbd } from "@saas-ui/svelte/components/kbd";
import { Separator } from "@saas-ui/svelte/components/separator";
import { Highlight } from "@saas-ui/svelte/typography/highlight";
import { Box } from "@saas-ui/svelte/layout/box";
import { Flex } from "@saas-ui/svelte/layout/flex";
import { VStack } from "@saas-ui/svelte/layout/stack";
import { Text } from "@saas-ui/svelte/typography/text";
import { Centre } from "@saas-ui/svelte/layout/centre";
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
		const selectedOption = resultsRef.querySelectorAll('[role="option"]')[selectedIndex];
		selectedOption?.scrollIntoView({ block: "nearest" });
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
		<VStack gap={1} class="p-2">
			<!-- Search Input -->
			<Box class="relative">
				<Box
					class="text-fg-muted pointer-events-none absolute top-1/2 left-3 -translate-y-1/2"
				>
					<Icon as={MagnifyingGlassIcon} size="sm" />
				</Box>
				<input
					bind:this={inputRef}
					bind:value={inputValue}
					onkeydown={handleInputKeydown}
					type="text"
					placeholder="Search components, tokens..."
					class="text-fg-default placeholder:text-fg-muted h-10 w-full border-0 bg-transparent pr-16 pl-10 text-sm outline-none"
				/>
				<Box class="absolute top-1/2 right-3 -translate-y-1/2">
					<Kbd size="sm">Esc</Kbd>
				</Box>
			</Box>

			<Separator class="border-border-subtle" />

			<!-- Results -->
			<div bind:this={resultsRef} class="max-h-80 overflow-y-auto" role="listbox" aria-label="Search results">
				{#if filteredItems.length === 0}
					<Centre
						class="text-fg-muted min-h-32 text-sm"
						role="status"
					>
						No results found for "{inputValue}"
					</Centre>
				{:else}
					{@const indexOffset = { value: 0 }}
					{#each groupedItems as group}
						{@const groupStartIndex = indexOffset.value}
						{@const _ = (indexOffset.value += Math.min(group.items.length, 10))}
						<Box class="py-2" role="group" aria-label={group.label}>
							<Text
								as="div"
								size="xs"
								weight="medium"
								class="text-fg-muted px-2 py-1 tracking-wide uppercase"
								aria-hidden="true"
							>
								{group.label}
							</Text>
							{#each group.items.slice(0, 10) as item, i}
								{@const itemIndex = groupStartIndex + i}
								<Flex
									role="option"
									tabindex="-1"
									aria-selected={itemIndex === selectedIndex}
									onclick={() => handleSelect(item)}
									onkeydown={(e: KeyboardEvent) => {
										if (e.key === "Enter" || e.key === " ") {
											e.preventDefault();
											handleSelect(item);
										}
									}}
									align="center"
									gap={2}
									class="hover:bg-bg-subtle focus:bg-bg-subtle w-full cursor-pointer rounded px-2 py-2 text-left text-sm focus:outline-none {itemIndex === selectedIndex ? 'bg-bg-subtle' : ''}"
								>
									<Text as="span" class="flex-1 truncate">
										<Highlight
											query={inputValue}
											text={item.label}
											ignoreCase
											variant="text"
										/>
									</Text>
									{#if item.description}
										<Text
											as="span"
											size="xs"
											class="text-fg-muted max-w-32 truncate"
										>
											{item.description}
										</Text>
									{/if}
								</Flex>
							{/each}
						</Box>
					{/each}
				{/if}
			</div>
		</VStack>
	</Dialog.Content>
</Dialog.Root>
