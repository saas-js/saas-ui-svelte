<script module lang="ts">
import { tv, type VariantProps } from "tailwind-variants";

export type ComboboxContext = {
	size: "xs" | "sm" | "md" | "lg";
	variant: "outline" | "subtle" | "flushed";
	styles: ReturnType<typeof combobox>;
	colourStyle: string;
};

export const combobox = tv({
	slots: {
		root: "flex-col gap-y-1.5 gap-x-1.5 w-full flex antialiased",
		label: [
			"select-none",
			"text-sm",
			"font-medium",
			"leading-5",
			"disabled:opacity-50",
			"disabled:cursor-not-allowed",
		],
		control: "relative",
		input: [
			"select-none",
			"outline-0",
			"justify-between",
			"items-center",
			"w-full",
			"flex",
			"rounded",
			"border",
			"text-fg-muted",
			"disabled:opacity-50",
			"disabled:cursor-not-allowed",
			"focus-visible:outline-1",
			"focus-visible:outline-solid",
		],
		indicatorGroup: [
			"end-0",
			"justify-center",
			"items-center",
			"gap-y-1",
			"gap-x-1",
			"flex",
			"absolute",
			"inset-y-0",
		],
		trigger: [
			"appearance-auto",
			"justify-center",
			"items-center",
			"inline-flex",
		],
		clearTrigger: [
			"appearance-auto",
			"text-fg-muted",
			"rounded",
			"focus-visible:outline-2",
			"focus-visible:outline-solid",
			"focus-visible:outline-fg-muted",
			"focus-visible:border-fg-muted",
		],
		positioner: "",
		content: [
			"flex-col",
			"flex",
			"antialiased",
			"text-sm",
			"leading-sm",
			"max-h-xs",
			"overflow-y-auto",
			"bg-bg-overlay",
			"backdrop-blur-xl",
			"rounded-lg",
			"shadow-overlay",
			"outline-none",
			"p-1",
		],
		item: [
			"flex",
			"items-center",
			"gap-y-2",
			"gap-x-2",
			"relative",
			"antialiased",
			"cursor-default",
			"select-none",
			"justify-between",
			"flex-1",
			"rounded",
			"outline-none",
			"data-highlighted:bg-(--c-subtle)",
			"data-disabled:opacity-50",
			"data-disabled:cursor-not-allowed",
		],
		itemText: "flex-1 truncate",
		itemIndicator:
			"flex items-center justify-center size-4 ml-auto text-(--c-fg)",
		itemGroup: "flex flex-col",
		itemGroupLabel: [
			"flex items-center",
			"text-fg-muted font-medium",
			"select-none",
		],
		empty: [
			"flex items-center justify-center",
			"min-h-10 px-2",
			"text-sm leading-5",
			"text-fg-muted",
		],
		startElement: [
			"absolute left-0 top-0 bottom-0 flex items-center justify-center",
			"text-fg-muted",
			"pointer-events-none",
		],
		itemDescription: ["text-fg-muted", "ml-2"],
		itemPrefix: "mr-2",
	},
	variants: {
		size: {
			xs: {
				input: "min-h-6 text-xs leading-4 px-2",
				indicatorGroup: "px-2",
				trigger:
					"gap-y-1 gap-x-1 text-xs leading-4 [&_svg]:w-3.5 [&_svg]:h-3.5",
				clearTrigger: "[&_svg]:w-3.5 [&_svg]:h-3.5",
				content: "rounded-md p-0.5",
				item: "py-1 px-1.5 gap-y-1.5 gap-x-1.5 text-xs leading-4 rounded-sm",
				itemGroupLabel: "min-h-5 px-1 text-xs leading-4",
				startElement: "px-2 [&_svg]:w-3 [&_svg]:h-3",
			},
			sm: {
				input: "min-h-7 text-sm leading-5 px-2.5",
				indicatorGroup: "px-2.5",
				trigger:
					"gap-y-1 gap-x-1 text-xs leading-4 [&_svg]:w-4 [&_svg]:h-4",
				clearTrigger: "[&_svg]:w-4 [&_svg]:h-4",
				content: "rounded-lg p-1",
				item: "py-1.5 px-2 gap-y-2 gap-x-2 text-sm leading-sm rounded",
				itemGroupLabel: "min-h-6 px-1.5 text-xs leading-4",
				startElement: "px-2.5 [&_svg]:w-3.5 [&_svg]:h-3.5",
			},
			md: {
				input: "min-h-8 text-sm leading-5 px-3",
				indicatorGroup: "px-3",
				trigger:
					"gap-y-2 gap-x-2 text-sm leading-5 [&_svg]:w-4 [&_svg]:h-4",
				clearTrigger: "[&_svg]:w-4 [&_svg]:h-4",
				content: "rounded-lg p-1",
				item: "py-1.5 px-2 gap-y-2 gap-x-2 text-sm leading-sm rounded",
				itemGroupLabel: "min-h-7 px-2 text-sm leading-5",
				startElement: "px-3 [&_svg]:w-4 [&_svg]:h-4",
			},
			lg: {
				input: "min-h-10 text-sm leading-5 px-4",
				indicatorGroup: "px-4",
				trigger:
					"gap-y-2 gap-x-2 text-sm leading-5 py-3 [&_svg]:w-5 [&_svg]:h-5",
				clearTrigger: "[&_svg]:w-5 [&_svg]:h-5",
				content: "rounded-lg p-1",
				item: "py-2 px-3 gap-y-2 gap-x-2 text-sm leading-sm rounded",
				itemGroupLabel: "min-h-9 px-3 text-sm leading-5",
				startElement: "px-4 [&_svg]:w-5 [&_svg]:h-5",
			},
		},
		variant: {
			outline: {
				input: [
					"border-border-default",
					"focus-visible:outline-(--c-focus-ring)",
				],
			},
			subtle: {
				input: [
					"border-transparent",
					"bg-(--c-subtle)",
					"focus-visible:outline-(--c-focus-ring)",
				],
			},
			flushed: {
				input: [
					"rounded-none",
					"border-t-0",
					"border-x-0",
					"border-b",
					"border-b-border-default",
					"px-0",
					"focus-visible:outline-none",
					"focus-visible:border-b-(--c-focus-ring)",
				],
				indicatorGroup: "px-0",
			},
		},
		invalid: {
			true: {
				input: [
					"border-border-error!",
					"focus-visible:border-border-error!",
					"focus-visible:outline-border-error!",
				],
			},
		},
	},
	defaultVariants: {
		size: "md",
		variant: "outline",
	},
});

export type ComboboxVariants = VariantProps<typeof combobox>;

export const COMBOBOX_CTX = Symbol("COMBOBOX_CTX");
</script>

<script lang="ts">
import { Combobox, type ComboboxRootProps } from "@ark-ui/svelte/combobox";
import type { CollectionItem, ListCollection } from "@ark-ui/svelte/combobox";
import { setContext, type Snippet } from "svelte";
import { twMerge } from "tailwind-merge";
import { type ColourName, getColourStyle } from "$saas/utils/colours";

interface Props extends Omit<
	ComboboxRootProps<CollectionItem>,
	"id" | "collection"
> {
	children: Snippet;
	id?: string;
	collection: ListCollection<CollectionItem>;
	size?: ComboboxVariants["size"];
	variant?: ComboboxVariants["variant"];
	invalid?: boolean;
	colour?: ColourName;
	class?: string;
}

let {
	children,
	id,
	collection,
	size = "md",
	variant = "outline",
	invalid = false,
	colour = "gray",
	class: className,
	...restProps
}: Props = $props();

const uniqueId = $derived(
	id || `combobox-${Math.random().toString(36).substring(2, 9)}`,
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
</script>

<Combobox.Root
	id={uniqueId}
	collection={collection}
	class={twMerge(ctx.styles.root(), className as string)}
	{...restProps}
>
	{@render children?.()}
</Combobox.Root>
