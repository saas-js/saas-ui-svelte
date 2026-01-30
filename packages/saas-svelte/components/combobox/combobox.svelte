<script lang="ts">
	import { Combobox, createListCollection } from "@ark-ui/svelte/combobox";
	import type { CollectionItem } from "@ark-ui/svelte/combobox";
	import { Portal } from "@ark-ui/svelte/portal";
	import { setContext, type Snippet, type Component } from "svelte";
	import { type ColourName, getColourStyle } from "$saas/utils/colours";
	import {
		combobox,
		COMBOBOX_CTX,
		type ComboboxContext,
		type ComboboxVariants,
	} from "./combobox-root.svelte";
	import { Highlight } from "$saas/typography/highlight";
	import { Icon } from "$saas/components/icon";
	import CaretDown from "phosphor-svelte/lib/CaretDown";
	import X from "phosphor-svelte/lib/X";
	import Check from "phosphor-svelte/lib/Check";
	import ArrowSquareOut from "phosphor-svelte/lib/ArrowSquareOut";
	import { createVirtualizer } from "@tanstack/svelte-virtual";

	interface Props {
		/** The items to display in the combobox. */
		items: CollectionItem[];
		/** The label for the combobox. */
		label?: string;
		/** Placeholder text for the input. */
		placeholder?: string;
		/** Text shown when no items match the filter. @default "No results found" */
		emptyText?: string;
		/** The size of the combobox. @default "md" */
		size?: ComboboxVariants["size"];
		/** The visual style of the input. @default "outline" */
		variant?: ComboboxVariants["variant"];
		/** Whether the combobox is in an invalid state. @default false */
		invalid?: boolean;
		/** Whether the combobox is disabled. @default false */
		disabled?: boolean;
		/** The colour palette. @default "gray" */
		colour?: ColourName;
		/** The selected value(s). */
		value?: string[];
		/** Callback when the value changes. */
		onValueChange?: (details: {
			value: string[];
			items: CollectionItem[];
		}) => void;
		/** Whether to allow multiple selections. @default false */
		multiple?: boolean;
		/** Whether to open on click. @default false */
		openOnClick?: boolean;
		/** Whether the combobox is open. */
		open?: boolean;
		/** Callback when the open state changes. */
		onOpenChange?: (details: { open: boolean }) => void;
		/** Whether to allow custom values that aren't in the list. @default false */
		allowCustomValue?: boolean;
		/** The input behavior when an item is selected. @default "autohighlight" */
		inputBehavior?: "autohighlight" | "autocomplete" | "none";
		/** The behavior of the combobox input when an item is selected. @default "replace" */
		selectionBehavior?: "clear" | "replace" | "preserve";
		/** Function to determine if an item is disabled. */
		isItemDisabled?: (item: CollectionItem) => boolean;
		/** Whether the combobox is loading. @default false */
		loading?: boolean;
		/** Text shown when loading. @default "Loading..." */
		loadingText?: string;
		/** Callback when the input value changes. Use this for async loading. */
		onInputValueChange?: (details: { inputValue: string }) => void;
		/** Whether to disable local filtering. Useful for async loading. @default false */
		disableFilter?: boolean;
		/** Custom render snippet for items. */
		itemSnippet?: Snippet<[CollectionItem]>;
		/** Custom snippet for loading state content. */
		loadingContent?: Snippet;
		/** Whether to highlight matching text in item labels. @default false */
		highlightMatch?: boolean;
		/** Minimum characters required before showing the dropdown. @default 0 */
		minCharacters?: number;
		/** Maximum number of items to display in the dropdown. */
		limit?: number;
		/** Icon component to display at the start of the input. */
		startIcon?: Component;
		/** Element to display at the start of the input (for complex content). */
		startElement?: Snippet;
		/** Key to use for item description text. */
		itemDescriptionKey?: string;
		/** Key to use for item prefix (e.g., flag emoji). */
		itemPrefixKey?: string;
		/** Whether to enable virtualisation for large lists. @default false */
		virtualised?: boolean;
		/** Estimated height of each item in pixels when virtualised. @default 32 */
		virtualItemHeight?: number;
		/** Additional CSS classes to apply. */
		class?: string;
	}

	let {
		items,
		label,
		placeholder,
		emptyText = "No results found",
		size = "md",
		variant = "outline",
		invalid = false,
		disabled = false,
		colour = "gray",
		value = $bindable(),
		onValueChange,
		multiple = false,
		openOnClick = false,
		open = $bindable(),
		onOpenChange,
		allowCustomValue = false,
		inputBehavior = "autohighlight",
		selectionBehavior = "replace",
		isItemDisabled,
		loading = false,
		loadingText = "Loading...",
		onInputValueChange,
		disableFilter = false,
		itemSnippet,
		loadingContent,
		highlightMatch = false,
		minCharacters = 0,
		limit,
		startIcon,
		startElement,
		itemDescriptionKey,
		itemPrefixKey,
		virtualised = false,
		virtualItemHeight = 32,
		class: className,
	}: Props = $props();

	let inputValue = $state("");

	const effectiveSelectionBehavior = $derived(
		multiple || allowCustomValue ? "clear" : selectionBehavior,
	);
	const effectiveInputBehavior = $derived(
		allowCustomValue ? "none" : inputBehavior,
	);

	const filteredItems = $derived.by(() => {
		let result = disableFilter
			? items
			: items.filter((item) => {
					const itemLabel =
						typeof item === "string" ? item : item.label;
					return itemLabel
						.toLowerCase()
						.includes(inputValue.toLowerCase());
				});
		return limit && limit > 0 ? result.slice(0, limit) : result;
	});

	const customValueExists = $derived.by(() => {
		if (!allowCustomValue || !inputValue.trim()) return true;
		return items.some((item) => {
			const itemValue = typeof item === "string" ? item : item.value;
			return itemValue.toLowerCase() === inputValue.toLowerCase();
		});
	});

	const showCreateOption = $derived(
		allowCustomValue && inputValue.trim() && !customValueExists,
	);

	const collection = $derived(
		createListCollection({ items: filteredItems, isItemDisabled }),
	);

	const ctx: ComboboxContext = {
		get size() {
			return size ?? "md";
		},
		get variant() {
			return variant ?? "outline";
		},
		get styles() {
			return combobox({ size, variant, invalid });
		},
		get colourStyle() {
			return getColourStyle(colour);
		},
	};

	setContext(COMBOBOX_CTX, ctx);

	function handleInputValueChange(details: { inputValue: string }) {
		inputValue = details.inputValue;
		onInputValueChange?.(details);
	}

	function handleValueChange(details: {
		value: string[];
		items: CollectionItem[];
	}) {
		value = details.value;
		onValueChange?.(details);
	}

	function handleOpenChange(details: { open: boolean }) {
		open = details.open;
		onOpenChange?.(details);
	}

	function shouldOpen(details: { inputValue: string }): boolean {
		return minCharacters > 0
			? details.inputValue.length >= minCharacters
			: true;
	}

	// Virtualization
	let scrollElement: HTMLDivElement | null = $state(null);
	let virtualItems: Array<{ index: number; start: number; size: number }> =
		$state([]);
	let totalSize = $state(0);

	$effect(() => {
		if (!virtualised || !scrollElement) {
			virtualItems = [];
			totalSize = 0;
			return;
		}

		const store = createVirtualizer({
			count: collection.items.length,
			getScrollElement: () => scrollElement,
			estimateSize: () => virtualItemHeight,
			overscan: 5,
		});

		return store.subscribe((v) => {
			if (v) {
				virtualItems = v.getVirtualItems();
				totalSize = v.getTotalSize();
				if (collection.items.length !== v.options.count) {
					v.setOptions({ count: collection.items.length });
				}
			}
		});
	});

	// Helper to get item properties
	function getItemProps(item: CollectionItem) {
		const itemLabel = typeof item === "string" ? item : item.label;
		const itemDescription =
			itemDescriptionKey && typeof item === "object"
				? (item as Record<string, unknown>)[itemDescriptionKey]
				: null;
		const itemPrefix =
			itemPrefixKey && typeof item === "object"
				? (item as Record<string, unknown>)[itemPrefixKey]
				: null;
		const itemHref =
			typeof item === "object"
				? ((item as Record<string, unknown>).href as string | undefined)
				: undefined;
		return { itemLabel, itemDescription, itemPrefix, itemHref };
	}
</script>

<Combobox.Root
	id={`combobox-${Math.random().toString(36).substring(2, 9)}`}
	{collection}
	{disabled}
	{multiple}
	{openOnClick}
	{open}
	{allowCustomValue}
	inputBehavior={effectiveInputBehavior}
	selectionBehavior={effectiveSelectionBehavior}
	{value}
	onInputValueChange={handleInputValueChange}
	onValueChange={handleValueChange}
	onOpenChange={handleOpenChange}
	openOnChange={shouldOpen}
	class={ctx.styles.root({ class: className })}
>
	{#if label}
		<Combobox.Label class={ctx.styles.label()}>{label}</Combobox.Label>
	{/if}

	<Combobox.Control class={ctx.styles.control()}>
		{#if startIcon}
			<div class={ctx.styles.startElement()}>
				<Icon as={startIcon} aria-hidden="true" />
			</div>
		{:else if startElement}
			<div class={ctx.styles.startElement()}>
				{@render startElement()}
			</div>
		{/if}
		<Combobox.Input
			{placeholder}
			class="{ctx.styles.input()} {startIcon || startElement
				? 'pl-8'
				: ''}"
			style={ctx.colourStyle}
		/>
		<div class={ctx.styles.indicatorGroup()}>
			<Combobox.ClearTrigger class={ctx.styles.clearTrigger()}>
				<X aria-hidden="true" />
			</Combobox.ClearTrigger>
			<Combobox.Trigger class={ctx.styles.trigger()}>
				<CaretDown aria-hidden="true" />
			</Combobox.Trigger>
		</div>
	</Combobox.Control>

	<Portal>
		<Combobox.Positioner class={ctx.styles.positioner()}>
			<Combobox.Content
				class={ctx.styles.content()}
				style={ctx.colourStyle}
			>
				{#if loading}
					{#if loadingContent}
						{@render loadingContent()}
					{:else}
						<div class={ctx.styles.empty()}>{loadingText}</div>
					{/if}
				{:else if collection.items.length === 0 && !showCreateOption}
					<div class={ctx.styles.empty()}>{emptyText}</div>
				{:else if virtualised}
					<div
						bind:this={scrollElement}
						class="overflow-y-auto max-h-xs"
					>
						<div
							style="height: {totalSize}px; width: 100%; position: relative;"
						>
							{#each virtualItems as virtualItem (virtualItem.index)}
								{@const item =
									collection.items[virtualItem.index]}
								{#if item}
									{@const {
										itemLabel,
										itemDescription,
										itemPrefix,
										itemHref,
									} = getItemProps(item)}
									{@const virtualStyle = `position: absolute; top: 0; left: 0; width: 100%; height: ${virtualItem.size}px; transform: translateY(${virtualItem.start}px); ${ctx.colourStyle}`}
									{#if itemHref}
										<Combobox.Item {item}>
											{#snippet asChild(props)}
												<a
													{...props()}
													href={itemHref}
													class={ctx.styles.item()}
													style={virtualStyle}
													onclick={(e) => {
														e.preventDefault();
														window.open(
															itemHref,
															"_blank",
															"noopener,noreferrer",
														);
													}}
												>
													{#if itemSnippet}
														{@render itemSnippet(
															item,
														)}
													{:else}
														<Combobox.ItemText
															class={ctx.styles.itemText()}
														>
															{#if itemPrefix}<span
																	class={ctx.styles.itemPrefix()}
																	>{itemPrefix}</span
																>{/if}
															{#if highlightMatch && inputValue}
																<Highlight
																	query={inputValue}
																	text={itemLabel}
																	ignoreCase
																	colour="yellow"
																/>
															{:else}
																{itemLabel}
															{/if}
															{#if itemDescription}
																<span
																	class={ctx.styles.itemDescription()}
																	>{itemDescription}</span
																>
															{/if}
														</Combobox.ItemText>
														<ArrowSquareOut
															class="ml-auto size-4 text-fg-muted"
															aria-hidden="true"
														/>
													{/if}
												</a>
											{/snippet}
										</Combobox.Item>
									{:else}
										<Combobox.Item
											{item}
											class={ctx.styles.item()}
											style={virtualStyle}
										>
											{#if itemSnippet}
												{@render itemSnippet(item)}
											{:else}
												<Combobox.ItemText
													class={ctx.styles.itemText()}
												>
													{#if itemPrefix}<span
															class={ctx.styles.itemPrefix()}
															>{itemPrefix}</span
														>{/if}
													{#if highlightMatch && inputValue}
														<Highlight
															query={inputValue}
															text={itemLabel}
															ignoreCase
															colour="yellow"
														/>
													{:else}
														{itemLabel}
													{/if}
													{#if itemDescription}
														<span
															class={ctx.styles.itemDescription()}
															>{itemDescription}</span
														>
													{/if}
												</Combobox.ItemText>
												<Combobox.ItemIndicator
													class={ctx.styles.itemIndicator()}
												>
													<Check
														weight="bold"
														aria-hidden="true"
													/>
												</Combobox.ItemIndicator>
											{/if}
										</Combobox.Item>
									{/if}
								{/if}
							{/each}
						</div>
					</div>
				{:else}
					{#each collection.items as item (typeof item === "string" ? item : item.value)}
						{@const {
							itemLabel,
							itemDescription,
							itemPrefix,
							itemHref,
						} = getItemProps(item)}
						{#if itemHref}
							<Combobox.Item {item}>
								{#snippet asChild(props)}
									<a
										{...props()}
										href={itemHref}
										class={ctx.styles.item()}
										style={ctx.colourStyle}
										onclick={(e) => {
											e.preventDefault();
											window.open(
												itemHref,
												"_blank",
												"noopener,noreferrer",
											);
										}}
									>
										{#if itemSnippet}
											{@render itemSnippet(item)}
										{:else}
											<Combobox.ItemText
												class={ctx.styles.itemText()}
											>
												{#if itemPrefix}<span
														class={ctx.styles.itemPrefix()}
														>{itemPrefix}</span
													>{/if}
												{#if highlightMatch && inputValue}
													<Highlight
														query={inputValue}
														text={itemLabel}
														ignoreCase
														colour="yellow"
													/>
												{:else}
													{itemLabel}
												{/if}
												{#if itemDescription}
													<span
														class={ctx.styles.itemDescription()}
														>{itemDescription}</span
													>
												{/if}
											</Combobox.ItemText>
											<ArrowSquareOut
												class="ml-auto size-4 text-fg-muted"
												aria-hidden="true"
											/>
										{/if}
									</a>
								{/snippet}
							</Combobox.Item>
						{:else}
							<Combobox.Item
								{item}
								class={ctx.styles.item()}
								style={ctx.colourStyle}
							>
								{#if itemSnippet}
									{@render itemSnippet(item)}
								{:else}
									<Combobox.ItemText
										class={ctx.styles.itemText()}
									>
										{#if itemPrefix}<span
												class={ctx.styles.itemPrefix()}
												>{itemPrefix}</span
											>{/if}
										{#if highlightMatch && inputValue}
											<Highlight
												query={inputValue}
												text={itemLabel}
												ignoreCase
												colour="yellow"
											/>
										{:else}
											{itemLabel}
										{/if}
										{#if itemDescription}
											<span
												class={ctx.styles.itemDescription()}
												>{itemDescription}</span
											>
										{/if}
									</Combobox.ItemText>
									<Combobox.ItemIndicator
										class={ctx.styles.itemIndicator()}
									>
										<Check
											weight="bold"
											aria-hidden="true"
										/>
									</Combobox.ItemIndicator>
								{/if}
							</Combobox.Item>
						{/if}
					{/each}
					{#if showCreateOption}
						<Combobox.Item
							item={{
								label: `Create "${inputValue}"`,
								value: inputValue,
							}}
							class={ctx.styles.item()}
							style={ctx.colourStyle}
						>
							<Combobox.ItemText class={ctx.styles.itemText()}>
								Create "{inputValue}"
							</Combobox.ItemText>
						</Combobox.Item>
					{/if}
				{/if}
			</Combobox.Content>
		</Combobox.Positioner>
	</Portal>
</Combobox.Root>

<style global>
	[data-scope="combobox"][data-part="content"][data-placement^="bottom"] {
		animation: var(--animate-submenu-bottom);
	}
	[data-scope="combobox"][data-part="content"][data-placement^="top"] {
		animation: var(--animate-submenu-top);
	}
	[data-scope="combobox"][data-part="content"][data-placement^="left"] {
		animation: var(--animate-submenu-left);
	}
	[data-scope="combobox"][data-part="content"][data-placement^="right"] {
		animation: var(--animate-submenu-right);
	}
	[data-scope="combobox"][data-part="content"]:not([data-placement]) {
		animation: var(--animate-submenu-bottom);
	}
</style>
