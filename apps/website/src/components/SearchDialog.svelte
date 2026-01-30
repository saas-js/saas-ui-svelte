<script lang="ts">
	import { onMount } from "svelte";
	import { Dialog } from "@saas-ui/svelte/components/dialog";
	import { Kbd } from "@saas-ui/svelte/components/kbd";
	import { Separator } from "@saas-ui/svelte/components/separator";
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

	const allItems = getSearchItems();

	// Reset dialog state on mount (handles page navigation)
	onMount(() => {
		setSearchDialogOpen(false);
	});

	const filteredItems = $derived(filterSearchItems(allItems, inputValue));
	const groupedItems = $derived(groupSearchItems(filteredItems));

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
		if (!details.open) {
			inputValue = "";
		}
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
	<Dialog.Content class="mt-16 mx-4 sm:mx-auto max-w-xl">
		<div class="flex flex-col gap-1 p-2">
			<!-- Search Input -->
			<div class="relative">
				<div
					class="absolute left-3 top-1/2 -translate-y-1/2 text-fg-muted pointer-events-none"
				>
					<MagnifyingGlassIcon class="size-4" />
				</div>
				<input
					bind:this={inputRef}
					bind:value={inputValue}
					type="text"
					placeholder="Search components, tokens..."
					class="w-full h-10 pl-10 pr-16 text-sm bg-transparent border-0 outline-none text-fg-default placeholder:text-fg-muted"
				/>
				<div class="absolute right-3 top-1/2 -translate-y-1/2">
					<Kbd size="sm">Esc</Kbd>
				</div>
			</div>

			<Separator class="border-border-subtle" />

			<!-- Results -->
			<div class="max-h-80 overflow-y-auto">
				{#if filteredItems.length === 0}
					<div
						class="flex items-center justify-center min-h-32 text-sm text-fg-muted"
					>
						No results found for "{inputValue}"
					</div>
				{:else}
					{#each groupedItems as group}
						<div class="py-2">
							<div
								class="px-2 py-1 text-xs font-medium text-fg-muted uppercase tracking-wide"
							>
								{group.label}
							</div>
							{#each group.items.slice(0, 10) as item}
								<button
									type="button"
									onclick={() => handleSelect(item)}
									class="w-full flex items-center gap-2 px-2 py-2 text-sm text-left rounded hover:bg-bg-subtle focus:bg-bg-subtle focus:outline-none"
								>
									<span class="flex-1 truncate">{item.label}</span>
									{#if item.description}
										<span class="text-xs text-fg-muted truncate max-w-32">
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
