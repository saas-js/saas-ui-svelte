<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

	export type MenuContext = {
		size: "sm" | "md";
		styles: ReturnType<typeof menu>;
		colourStyle: string;
		onPrefetch?: (value: string) => void;
	};

	export const menu = tv({
		slots: {
			positioner: ["z-dropdown"],
			content: [
				"flex",
				"flex-col",
				"min-w-32",
				"max-h-93",
				"p-1",
				"rounded-lg",
				"bg-bg-overlay",
				"backdrop-blur-lg",
				"shadow-overlay",
				"outline-none",
				"overflow-y-auto",
				"antialiased",
			],
			item: [
				"flex",
				"items-center",
				"gap-2",
				"relative",
				"shrink-0",
				"min-h-7",
				"h-7",
				"px-2",
				"rounded",
				"text-sm",
				"leading-sm",
				"text-fg-default",
				"cursor-default",
				"select-none",
				"outline-none",
				"text-start",
				"no-underline",
				"antialiased",
				"data-highlighted:bg-(--c-solid)",
				"data-highlighted:text-(--c-contrast)",
				"data-disabled:opacity-50",
				"data-disabled:cursor-not-allowed",
			],
			itemCommand: [
				"text-xs",
				"leading-4",
				"text-fg-muted",
				"ps-4",
				"ml-auto",
				"tracking-wider",
				"font-mono",
			],
			itemIndicator: ["flex", "items-center", "justify-center", "size-4"],
			separator: ["my-1", "border-b", "border-border-default"],
			itemGroup: ["flex", "flex-col"],
			itemGroupLabel: [
				"flex",
				"items-center",
				"min-h-7",
				"px-2",
				"text-sm",
				"leading-5",
				"text-fg-muted",
				"select-none",
			],
			triggerItem: [
				"flex",
				"items-center",
				"justify-between",
				"gap-2",
				"relative",
				"shrink-0",
				"min-h-7",
				"h-7",
				"px-2",
				"rounded",
				"text-sm",
				"leading-sm",
				"text-fg-default",
				"cursor-default",
				"select-none",
				"outline-none",
				"antialiased",
				"data-highlighted:bg-(--c-solid)",
				"data-highlighted:text-(--c-contrast)",
				"data-[state=open]:bg-(--c-solid)",
				"data-[state=open]:text-(--c-contrast)",
			],
			contextTrigger: "",
		},
		variants: {
			size: {
				sm: {
					content: "",
					item: "min-h-6 h-6 px-1.5 gap-1 text-xs leading-4",
					itemCommand: "text-2xs leading-3 pl-3",
					triggerItem: "min-h-6 h-6 px-1.5 gap-1 text-xs leading-4",
					itemGroupLabel: "min-h-6 px-1.5 text-xs leading-4",
				},
				md: {},
			},
		},
		defaultVariants: {
			size: "md",
		},
	});

	export type MenuVariants = VariantProps<typeof menu>;

	export const MENU_CTX = Symbol("MENU_CTX");
</script>

<script lang="ts">
	import { Menu } from "@ark-ui/svelte/menu";
	import type { MenuRootProps } from "@ark-ui/svelte/menu";
	import { setContext, type Snippet } from "svelte";
	import { type ColourName, getColourStyle } from "$saas/utils/colours";
	import {
		registerOverlay,
		unregisterOverlay,
	} from "$saas/utils/overlay-singleton.svelte.js";

	interface Props extends Omit<MenuRootProps, "id"> {
		/**
		 * The menu content.
		 */
		children: Snippet;
		/**
		 * The unique identifier for the menu.
		 * If not provided, a unique ID will be auto-generated.
		 */
		id?: string;
		/**
		 * The size of the menu.
		 * @default "md"
		 */
		size?: MenuVariants["size"];
		/**
		 * The colour palette for highlighted items.
		 * @default "indigo"
		 */
		colour?: ColourName;
		/**
		 * Callback invoked when hovering over an item (for prefetching content).
		 * Similar to Astro's link prefetching, this allows preloading data before selection.
		 */
		onPrefetch?: (value: string) => void;
	}

	let {
		children,
		id,
		size = "md",
		colour = "indigo",
		onPrefetch,
		onOpenChange,
		...restProps
	}: Props = $props();

	let instanceId: symbol | null = $state(null);

	function handleOpenChange(details: { open: boolean }) {
		if (details.open) {
			if (!instanceId) {
				instanceId = registerOverlay("menu", () => {
					onOpenChange?.({ open: false });
				});
			}
		} else if (instanceId) {
			unregisterOverlay("menu", instanceId);
			instanceId = null;
		}
		onOpenChange?.(details);
	}

	const ctx: MenuContext = {
		get size() {
			return size;
		},
		get styles() {
			return menu({ size });
		},
		get colourStyle() {
			return getColourStyle(colour);
		},
		get onPrefetch() {
			return onPrefetch;
		},
	};

	setContext(MENU_CTX, ctx);
</script>

<Menu.Root {id} onOpenChange={handleOpenChange} {...restProps}>
	{@render children?.()}
</Menu.Root>
