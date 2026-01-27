<script module lang="ts">
	import { tv, type VariantProps } from "tailwind-variants";

	export type MenuContext = {
		size: "sm" | "md";
		styles: ReturnType<typeof menu>;
		colourStyle: string;
	};

	export const menu = tv({
		slots: {
			positioner: ["z-dropdown"],
			content: [
				"flex",
				"flex-col",
				"min-w-32",
				"max-h-[372px]",
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
				"gap-y-2",
				"gap-x-2",
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
			itemIndicator: [
				"flex",
				"items-center",
				"justify-center",
				"w-4",
				"h-4",
			],
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
				"gap-y-2",
				"gap-x-2",
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
					item: "min-h-6 h-6 px-1.5 gap-x-1 gap-y-1 text-xs leading-4",
					itemCommand: "text-2xs leading-3 pl-3",
					triggerItem:
						"min-h-6 h-6 px-1.5 gap-x-1 gap-y-1 text-xs leading-4",
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
	}

	let {
		children,
		id,
		size = "md",
		colour = "indigo",
		...restProps
	}: Props = $props();

	const uniqueId = $derived(
		id || `menu-${Math.random().toString(36).substring(2, 9)}`,
	);

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
	};

	setContext(MENU_CTX, ctx);
</script>

<Menu.Root id={uniqueId} {...restProps}>
	{@render children?.()}
</Menu.Root>
